// Banderas de tela en WebGL, sin librerías.
// Cada bandera es una malla que ondea desde el mástil (u = 0) hacia el extremo (u = 1), con pliegues
// iluminados. Al cambiar de nación, el dibujo nuevo entra desde el mástil como si lo trajera el viento.
// Las texturas salen de los SVG oficiales de assets/flags (Wikimedia Commons, dominio público).
(() => {
  const RM = matchMedia('(prefers-reduced-motion: reduce)');
  const cache = new Map();

  // SVG → canvas con la proporción pedida (la textura se estira al ancho de la malla)
  function texture(code, ratio) {
    const key = code + ':' + ratio.toFixed(3);
    if (cache.has(key)) return cache.get(key);
    const p = new Promise((ok) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        const H = 512, W = Math.round(H * ratio);
        const c = document.createElement('canvas');
        c.width = W; c.height = H;
        const g = c.getContext('2d');
        g.drawImage(img, 0, 0, W, H);
        ok(c);
      };
      img.onerror = () => ok(null);
      img.src = (window.FLAG_BASE || 'assets/flags/') + code + '.svg';
    });
    cache.set(key, p);
    return p;
  }

  const VS = `
attribute vec2 aUV;
uniform float uT, uAmp, uHoist, uRatioA, uRatioB, uGust;
uniform mediump float uMix, uMirror; // compartidas con el fragment shader: misma precisión
uniform vec4 uView; // x0, y0, sx, sy
varying vec2 vUV; varying vec3 vN; varying float vShade;
float wave(vec2 p, float t){
  float u = p.x, v = p.y;
  float a = u * (0.3 + 0.7 * u);
  return a * (0.62 * sin(4.4 * u - 2.6 * t + 0.9 * v)
            + 0.3 * sin(9.0 * u - 4.1 * t + 2.4 * v + 1.0)
            + 0.12 * sin(16.0 * u - 6.2 * t - 2.2 * v + 2.2)) * (0.8 + 0.2 * uGust);
}
void main(){
  vec2 p = aUV;
  float ratio = mix(uRatioA, uRatioB, uMix);
  float z = wave(p, uT) * uAmp;
  float e = 0.01;
  float zx = (wave(p + vec2(e, 0.), uT) - wave(p - vec2(e, 0.), uT)) / (2. * e) * uAmp / ratio;
  float zy = (wave(p + vec2(0., e), uT) - wave(p - vec2(0., e), uT)) / (2. * e) * uAmp;
  float x = p.x * ratio * (1.0 - 0.035 * p.x);
  float y = 1.0 - p.y - 0.05 * p.x * p.x * p.y + (uHoist - 1.0) * 1.15;
  x *= uMirror;
  vN = normalize(vec3(-zx * uMirror, zy, 1.0));
  vUV = p;
  vShade = z;
  // un poco de perspectiva: lo que se acerca crece desde el centro del lienzo
  float w = 1.0 + z * 0.14;
  gl_Position = vec4(((x - uView.x) * uView.z * 2.0 - 1.0) * w, ((y - uView.y) * uView.w * 2.0 - 1.0) * w, -z * 0.1, 1.0);
}`;

  const FS = `
precision mediump float;
uniform sampler2D uA, uB;
uniform float uMix, uWipe, uMirror;
varying vec2 vUV; varying vec3 vN; varying float vShade;
void main(){
  vec2 uv = vUV;
  // barrido desde el mástil: el borde ondula un poco
  float edge = uWipe * 1.3 - 0.15 + 0.035 * sin(uv.y * 11.0 + uWipe * 6.0);
  float m = smoothstep(uv.x - 0.06, uv.x + 0.06, edge);
  vec3 a = texture2D(uA, uv).rgb, b = texture2D(uB, uv).rgb;
  vec3 col = mix(a, b, m);
  vec3 N = normalize(vN);
  vec3 L = normalize(vec3(-0.45 * uMirror, 0.55, 0.75));
  float dif = clamp(dot(N, L), 0.0, 1.0);
  vec3 H = normalize(L + vec3(0.0, 0.0, 1.0));
  float spec = pow(clamp(dot(N, H), 0.0, 1.0), 26.0);
  float weave = 0.985 + 0.015 * sin(uv.x * 900.0) * sin(uv.y * 600.0);
  float hem = smoothstep(0.0, 0.025, uv.x);
  vec3 lit = col * (0.34 + 0.8 * dif) * weave + vec3(spec * 0.26);
  lit *= mix(0.82, 1.0, hem);
  lit *= 1.0 - clamp(-vShade, 0.0, 0.3) * 0.5;
  gl_FragColor = vec4(lit, 1.0);
}`;

  function sh(gl, type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  }

  const all = new Set();
  let raf = 0, last = 0;
  function loop(now) {
    raf = 0;
    const dt = Math.min(0.05, (now - (last || now)) / 1000);
    last = now;
    let any = false;
    all.forEach((f) => { if (f.visible && !document.hidden) { f.step(dt); any = true; } });
    if (any && !RM.matches) raf = requestAnimationFrame(loop);
    else last = 0;
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
  document.addEventListener('visibilitychange', kick);

  class Cloth {
    // opts: code, ratio, mirror (bandera hacia la izquierda), amp, hoist (empezar abajo)
    constructor(canvas, opts) {
      this.c = canvas;
      this.o = Object.assign({ ratio: 1.5, mirror: false, amp: 0.13, hoist: false, pad: [0.04, 0.16, 0.14, 0.1] }, opts);
      this.t = Math.random() * 10;
      this.hoist = this.o.hoist && !RM.matches ? 0 : 1;
      this.wipe = 1; this.mixv = 1;
      this.rA = this.rB = this.o.ratio;
      this.visible = true;
      const gl = canvas.getContext('webgl', { antialias: true, alpha: true, premultipliedAlpha: true });
      if (!gl) { this.fallback(); return; }
      this.gl = gl;
      try { this.setup(gl, canvas); } catch (err) { console.warn('Bandera sin WebGL:', err.message); this.gl = null; this.fallback(); }
    }
    // Sin WebGL: el SVG de la bandera, quieto, ocupando su sitio
    fallback(code, ratio) {
      this.failed = true;
      const c = this.c, o = this.o;
      const r = ratio || o.ratio, [pl, pr, pt, pb] = o.pad;
      const W = Math.max(r, o.ratioMax || r) + pl + pr, H = 1 + pt + pb;
      c.style.backgroundImage = `url("${(window.FLAG_BASE || 'assets/flags/')}${code || o.code}.svg")`;
      c.style.backgroundRepeat = 'no-repeat';
      c.style.backgroundSize = `${(r / W) * 100}% ${(1 / H) * 100}%`;
      c.style.backgroundPosition = o.mirror ? `${(1 - pl / W) * 100}% ${(pt / (H - 1)) * 100}%` : `${(pl / (W - r)) * 100 || 0}% ${(pt / (H - 1)) * 100}%`;
    }
    setup(gl, canvas) {
      const pr = gl.createProgram();
      gl.attachShader(pr, sh(gl, gl.VERTEX_SHADER, VS));
      gl.attachShader(pr, sh(gl, gl.FRAGMENT_SHADER, FS));
      gl.linkProgram(pr);
      if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(pr));
      gl.useProgram(pr);
      this.pr = pr;
      // malla NX × NY en tiras de triángulos indexadas
      const NX = 56, NY = 30, uv = [], idx = [];
      for (let j = 0; j <= NY; j++) for (let i = 0; i <= NX; i++) uv.push(i / NX, j / NY);
      for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) {
        const a = j * (NX + 1) + i, b = a + 1, c = a + NX + 1, d = c + 1;
        idx.push(a, c, b, b, c, d);
      }
      const vb = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vb);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.STATIC_DRAW);
      const ib = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(idx), gl.STATIC_DRAW);
      this.n = idx.length;
      const loc = gl.getAttribLocation(pr, 'aUV');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      this.u = {};
      ['uT', 'uAmp', 'uMirror', 'uHoist', 'uRatioA', 'uRatioB', 'uMix', 'uWipe', 'uView', 'uA', 'uB', 'uGust'].forEach((k) => (this.u[k] = gl.getUniformLocation(pr, k)));
      this.texA = gl.createTexture(); this.texB = gl.createTexture();
      [this.texA, this.texB].forEach((t) => {
        gl.bindTexture(gl.TEXTURE_2D, t);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([22, 51, 168, 255]));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      });
      gl.uniform1i(this.u.uA, 0); gl.uniform1i(this.u.uB, 1);
      gl.enable(gl.DEPTH_TEST);
      this.ready = texture(this.o.code, this.o.ratio).then((cv) => { if (cv) { this.upload(this.texA, cv); this.upload(this.texB, cv); } this.draw(); });
      new ResizeObserver(() => this.resize()).observe(canvas);
      new IntersectionObserver((es) => { this.visible = es[0].isIntersecting; if (this.visible) kick(); }, { rootMargin: '80px' }).observe(canvas);
      all.add(this);
      this.resize();
      kick();
      // seguro: si la animación no puede correr (pestaña en segundo plano), la bandera aparece izada igualmente
      setTimeout(() => { if (this.hoist < 1) { this.hoist = 1; this.draw(); } }, 3200);
    }
    upload(t, cv) {
      const gl = this.gl;
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cv);
    }
    resize() {
      const dpr = Math.min(2, devicePixelRatio || 1), r = this.c.getBoundingClientRect();
      const w = Math.max(1, Math.round(r.width * dpr)), h = Math.max(1, Math.round(r.height * dpr));
      if (this.c.width !== w || this.c.height !== h) { this.c.width = w; this.c.height = h; }
      this.draw();
    }
    // Cambia de bandera: el dibujo nuevo entra desde el mástil
    set(code, ratio) {
      if (this.failed) { this.fallback(code, ratio); return Promise.resolve(); }
      const gl = this.gl;
      return texture(code, ratio).then((cv) => {
        if (!cv) return;
        // lo que se ve ahora pasa a A; la nueva a B
        const prevB = this.curB || this.o.code, prevR = this.rB;
        this.curB = code;
        texture(prevB, prevR).then((pc) => {
          if (pc) this.upload(this.texA, pc);
          this.upload(this.texB, cv);
          this.rA = prevR; this.rB = ratio;
          this.wipe = RM.matches ? 1 : 0; this.mixv = RM.matches ? 1 : 0;
          this.draw(); kick();
        });
      });
    }
    step(dt) {
      this.t += dt;
      if (this.hoist < 1) this.hoist = Math.min(1, this.hoist + dt / 1.6);
      if (this.wipe < 1) this.wipe = Math.min(1, this.wipe + dt / 0.75);
      if (this.mixv < 1) this.mixv = Math.min(1, this.mixv + dt / 0.6);
      this.draw();
    }
    draw() {
      if (this.failed || !this.gl) return;
      const gl = this.gl, u = this.u, o = this.o;
      gl.viewport(0, 0, this.c.width, this.c.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      // ventana del mundo: el mástil queda en el borde (x = 0) y la bandera ocupa el resto
      const ar = this.c.width / this.c.height;
      const [pl, pr, pt, pb] = o.pad;
      const ratio = this.rA + (this.rB - this.rA) * ease(this.mixv);
      const H = 1 + pt + pb;
      const Wmin = Math.max(ratio, o.ratioMax || ratio) + pl + pr;
      let sy = 1 / H, sx = sy / ar;
      if (Wmin * sx > 1) { sx = 1 / Wmin; sy = sx * ar; }
      const x0 = o.mirror ? -(1 / sx) + pl : -pl;
      const y0 = -pb - ((1 / sy) - H) * (o.valign ?? 1);
      gl.uniform4f(u.uView, x0, y0, sx, sy);
      gl.uniform1f(u.uT, this.t);
      gl.uniform1f(u.uAmp, RM.matches ? o.amp * 0.6 : o.amp);
      gl.uniform1f(u.uGust, Math.sin(this.t * 0.37) * Math.sin(this.t * 0.11));
      gl.uniform1f(u.uMirror, o.mirror ? -1 : 1);
      gl.uniform1f(u.uHoist, ease(this.hoist));
      gl.uniform1f(u.uRatioA, this.rA);
      gl.uniform1f(u.uRatioB, this.rB);
      gl.uniform1f(u.uMix, ease(this.mixv));
      gl.uniform1f(u.uWipe, easeOut(this.wipe));
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, this.texA);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, this.texB);
      gl.drawElements(gl.TRIANGLES, this.n, gl.UNSIGNED_SHORT, 0);
    }
  }
  const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const easeOut = (x) => 1 - Math.pow(1 - x, 3);

  window.Flag = { Cloth, texture, kick };
})();
