// L'Ambassade (Flashion Food) · datos de la web.
// Fuentes (consultadas el 19-11-2026): ficha de Google «FLASHION FOOD», Instagram @lambassadelloretdemar,
// carta de Glovo «L'Ambassade Tacos & Burger» (precios de comida y refrescos) y ficha de Tripadvisor (carta del bar).
// Cambiar aquí precios, horario o teléfonos: la web se actualiza sola.
window.SHOP = {
  name: "L'Ambassade",
  phone: '613 70 77 03',
  tel: '+34613707703',
  wa: '34613707703',
  street: 'Carrer de Venècia, 74',
  city: '17310 Lloret de Mar',
  // Google: todos los días de 10:00 a 3:00 (cierra de madrugada del día siguiente). Horario a confirmar con el local.
  open: 10 * 60,
  close: 3 * 60,
  tz: 'Europe/Madrid',
  maps: 'https://maps.google.com/?cid=8146224621616299394',
  dir: 'https://www.google.com/maps/dir/?api=1&destination=41.7010727,2.8539849',
  embed: 'https://www.google.com/maps?q=41.7010727,2.8539849&z=17&output=embed',
  glovo: 'https://glovoapp.com/es/es/lloret-de-mar/stores/lambassade-tacos-burger-lloret-de-mar',
  ig: 'https://www.instagram.com/lambassadelloretdemar/',
  tiktok: 'https://www.tiktok.com/@lambassadelloret',
  ta: 'https://www.tripadvisor.es/Restaurant_Review-g494960-d24933319-Reviews-L_ambassade-Lloret_de_Mar_Costa_Brava_Province_of_Girona_Catalonia.html'
};

// Recetas de autor: cada una lleva el nombre de un país (así las presenta Glovo, sobre su bandera).
// flag = archivo en assets/flags; r = proporción de la bandera (ancho / alto).
window.SIGNATURES = {
  tacos: [
    { id: 'tfr', name: 'Tacos Français', price: 1550, flag: 'fr', r: 1.5,
      c: { fr: 'France', es: 'Francia', en: 'France' },
      d: { fr: 'Tenders de poulet, chèvre, miel, oignons caramélisés, frites et sauce blanche.',
           es: 'Tenders de pollo, queso de cabra, miel, cebolla caramelizada, patatas y salsa blanca.',
           en: 'Chicken tenders, goat cheese, honey, caramelised onion, fries and white sauce.' } },
    { id: 'tgb', name: 'Tacos Anglais', price: 1490, flag: 'gb', r: 5 / 3,
      c: { fr: 'Royaume-Uni', es: 'Reino Unido', en: 'United Kingdom' },
      d: { fr: 'Viande hachée, cheddar, tomate, sauce cheddar et sauce blanche.',
           es: 'Carne picada, queso cheddar, tomate, salsa cheddar y salsa blanca.',
           en: 'Minced meat, cheddar, tomato, cheddar sauce and white sauce.' } },
    { id: 'tkm', name: 'Tacos Comorien', price: 1290, flag: 'km', r: 5 / 3,
      c: { fr: 'Comores', es: 'Comoras', en: 'Comoros' },
      d: { fr: 'Nuggets et fingers de poulet croustillants, cheddar fondu, garam masala, curcuma, frites maison, sauce blanche et sauce curry.',
           es: 'Nuggets y fingers de pollo crujientes, cheddar fundido, garam masala, cúrcuma, patatas fritas caseras, salsa blanca y salsa de curry.',
           en: 'Chicken nuggets and crispy chicken fingers, melted cheddar, garam masala, turmeric, homemade fries, white sauce and curry sauce.' } },
    { id: 'tth', name: 'Tacos Thaïlandais', price: 1290, flag: 'th', r: 1.5,
      c: { fr: 'Thaïlande', es: 'Tailandia', en: 'Thailand' },
      d: { fr: 'Poulet épicé, légumes, galanga, frites maison fraîches, sauce blanche et sauce pimentée thaï.',
           es: 'Pollo picante, verduras variadas, galanga, patatas fritas caseras, salsa blanca y salsa picante de chile tailandés.',
           en: 'Spicy chicken, mixed vegetables, galangal, fresh homemade fries, white sauce and Thai chilli sauce.' } },
    { id: 'tes', name: 'Tacos Espagnol', price: 1290, flag: 'es', r: 1.5,
      c: { fr: 'Espagne', es: 'España', en: 'Spain' },
      d: { fr: 'Filet de poulet pané, galettes de pommes de terre, triple cheddar, épices curry, frites maison, sauce blanche et sauce andalouse.',
           es: 'Filete de pollo empanado, tortitas de patata, triple cheddar, especias de curry, patatas fritas caseras, salsa blanca y salsa andaluza.',
           en: 'Breaded chicken fillet, potato cakes, triple cheddar, curry spices, homemade fries, white sauce and Andalusian sauce.' } }
  ],
  burgers: [
    { id: 'bus', name: "Burger L'Américain", price: 1550, flag: 'us', r: 1.9,
      c: { fr: 'États-Unis', es: 'Estados Unidos', en: 'United States' },
      d: { fr: 'Deux steaks hachés de 200 g, double cheddar, oignons caramélisés, salade, tomate, sauce américaine, sauce blanche et pain artisanal.',
           es: 'Dos carnes picadas de 200 g, doble cheddar, cebolla caramelizada, lechuga, tomate, salsa americana, salsa blanca y pan artesanal.',
           en: 'Two 200 g meat patties, double cheddar, caramelised onion, lettuce, tomato, American sauce, white sauce and artisan bun.' } },
    { id: 'bma', name: 'Burger Le Marocain', price: 1550, flag: 'ma', r: 1.5,
      c: { fr: 'Maroc', es: 'Marruecos', en: 'Morocco' },
      d: { fr: 'Double poulet, double cheddar, oignons caramélisés, salade, tomate, sauce marocaine et pain artisanal.',
           es: 'Doble pollo, doble cheddar, cebolla caramelizada, lechuga, tomate, salsa marroquí y pan artesanal.',
           en: 'Double chicken, double cheddar, caramelised onion, lettuce, tomato, Moroccan sauce and artisan bun.' } },
    { id: 'bam', name: "Burger L'Arménien", price: 1550, flag: 'am', r: 2,
      c: { fr: 'Arménie', es: 'Armenia', en: 'Armenia' },
      d: { fr: 'Steak haché de 200 g, double cheddar, paprika, oignons caramélisés, salade, tomate, sauce blanche et pain artisanal.',
           es: 'Carne picada de 200 g, doble cheddar, pimentón, cebolla caramelizada, lechuga, tomate, salsa blanca y pan artesanal.',
           en: '200 g meat patty, double cheddar, paprika, caramelised onion, lettuce, tomato, white sauce and artisan bun.' } },
    { id: 'bit', name: "Burger L'Italien", price: 1550, flag: 'it', r: 1.5,
      c: { fr: 'Italie', es: 'Italia', en: 'Italy' },
      d: { fr: 'Double poulet, mozzarella, cheddar, oignons caramélisés, salade, tomate, pesto vert et pain artisanal.',
           es: 'Doble pollo, mozzarella, cheddar, cebolla caramelizada, lechuga, tomate, pesto verde y pan artesanal.',
           en: 'Double chicken, mozzarella, cheddar, caramelised onion, lettuce, tomato, green pesto and artisan bun.' } },
    { id: 'bpr', name: 'Burger Le Président', price: 1550, flag: 'fr', r: 1.5,
      c: { fr: 'France', es: 'Francia', en: 'France' },
      d: { fr: 'Steak haché de 200 g, un camembert entier, oignons caramélisés, salade, tomate, sauce blanche et pain artisanal.',
           es: 'Carne picada de 200 g, un camembert entero, cebolla caramelizada, lechuga, tomate, salsa blanca y pan artesanal.',
           en: '200 g meat patty, a whole camembert, caramelised onion, lettuce, tomato, white sauce and artisan bun.' } }
  ]
};

// Tacos XL: el precio depende de cuántas carnes lleve (Glovo: 1 = 10,00 €, 2 = 11,50 €, 3 = 16,00 €).
window.TACOS_XL = {
  prices: [1000, 1150, 1600],
  meats: [
    { id: 'tenders', t: { fr: 'Tenders de poulet', es: 'Tenders de pollo', en: 'Chicken tenders' } },
    { id: 'nuggets', t: { fr: 'Nuggets de poulet', es: 'Nuggets de pollo', en: 'Chicken nuggets' } },
    { id: 'hache', t: { fr: 'Viande hachée', es: 'Carne picada', en: 'Minced meat' } }
  ],
  base: { fr: 'Avec fromage râpé, frites et sauce blanche.', es: 'Con queso rallado, patatas y salsa blanca.', en: 'With grated cheese, fries and white sauce.' }
};

// Resto de la carta de Glovo. side: columna en escritorio (l/r) para que las dos columnas pesen lo mismo.
window.MENU = [
  { id: 'crousty', side: 'l',
    t: { fr: 'French Tasty Crousty', es: 'French Tasty Crousty', en: 'French Tasty Crousty' },
    n: { fr: 'Riz, fingers de poulet, oignons frits et sauce crousty. Choisissez la sauce.', es: 'Arroz, fingers de pollo, cebolla frita y salsa crousty. Elige la salsa.', en: 'Rice, chicken fingers, fried onion and crousty sauce. Pick your sauce.' },
    items: [
      { id: 'cr1', name: { fr: 'Crousty Classique', es: 'Crousty Clásico', en: 'Classic Crousty' }, price: 1000 },
      { id: 'cr2', name: { fr: 'Crousty Spicy', es: 'Crousty Spicy', en: 'Spicy Crousty' }, price: 1000, d: { fr: 'Avec sauce algérienne.', es: 'Con salsa argelina.', en: 'With Algerian sauce.' } },
      { id: 'cr3', name: { fr: 'Crousty Curry', es: 'Crousty Curry', en: 'Curry Crousty' }, price: 1000, d: { fr: 'Avec sauce curry.', es: 'Con salsa de curry.', en: 'With curry sauce.' } },
      { id: 'cr4', name: { fr: 'Crousty Boursin', es: 'Crousty queso Boursin', en: 'Boursin Crousty' }, price: 1000, d: { fr: 'Avec sauce fromage ail Boursin.', es: 'Con salsa de queso al ajo Boursin.', en: 'With Boursin garlic cheese sauce.' } }
    ] },
  { id: 'burgers', side: 'r',
    t: { fr: 'Burgers', es: 'Burgers', en: 'Burgers' },
    n: { fr: 'Pain artisanal, salade, tomate, ketchup et mayonnaise.', es: 'Pan artesanal, lechuga, tomate, kétchup y mayonesa.', en: 'Artisan bun, lettuce, tomato, ketchup and mayonnaise.' },
    items: [
      { id: 'bc1', name: { fr: 'Burger viande', es: 'Burger de carne', en: 'Meat burger' }, price: 650 },
      { id: 'bc2', name: { fr: 'Burger poulet', es: 'Burger de pollo', en: 'Chicken burger' }, price: 650 },
      { id: 'bd1', name: { fr: 'Double burger viande', es: 'Burger doble de carne', en: 'Double meat burger' }, price: 890, d: { fr: 'Double steak, double cheddar.', es: 'Doble carne, doble cheddar.', en: 'Double patty, double cheddar.' } },
      { id: 'bd2', name: { fr: 'Double burger poulet', es: 'Burger doble de pollo', en: 'Double chicken burger' }, price: 890, d: { fr: 'Double poulet, double cheddar.', es: 'Doble pollo, doble cheddar.', en: 'Double chicken, double cheddar.' } }
    ] },
  { id: 'wraps', side: 'l',
    t: { fr: 'Wraps maxi', es: 'Wraps maxi', en: 'Maxi wraps' },
    n: { fr: 'Salade, tomate et sauce blanche.', es: 'Lechuga, tomate y salsa blanca.', en: 'Lettuce, tomato and white sauce.' },
    items: [
      { id: 'wr1', name: { fr: 'Wrap tenders de poulet', es: 'Wrap de tenders de pollo', en: 'Chicken tenders wrap' }, price: 700, d: { fr: 'Avec cheddar.', es: 'Con cheddar.', en: 'With cheddar.' } },
      { id: 'wr2', name: { fr: 'Wrap bœuf', es: 'Wrap de ternera', en: 'Beef wrap' }, price: 700, d: { fr: 'Avec cheddar.', es: 'Con cheddar.', en: 'With cheddar.' } },
      { id: 'wr3', name: { fr: 'Wrap 4 fromages', es: 'Wrap 4 quesos', en: '4-cheese wrap' }, price: 700, d: { fr: 'Chèvre, emmental, mozzarella et cheddar.', es: 'Cabra, emmental francés, mozzarella y cheddar.', en: 'Goat cheese, French emmental, mozzarella and cheddar.' } }
    ] },
  { id: 'extras', side: 'r',
    t: { fr: 'À côté', es: 'Para acompañar', en: 'Sides' },
    n: { fr: 'Servis avec mayonnaise et ketchup.', es: 'Con mayonesa y kétchup.', en: 'Served with mayonnaise and ketchup.' },
    items: [
      { id: 'ex1', name: { fr: 'Frites', es: 'Patatas fritas', en: 'Fries' }, price: 400 },
      { id: 'ex2', name: { fr: 'Nuggets de poulet × 6', es: 'Nuggets de pollo × 6', en: 'Chicken nuggets × 6' }, price: 500 },
      { id: 'ex3', name: { fr: 'Nuggets × 10', es: 'Nuggets × 10', en: 'Nuggets × 10' }, price: 900 }
    ] },
  { id: 'paninis', side: 'l',
    t: { fr: 'Paninis et hot-dog', es: 'Paninis y hot dog', en: 'Paninis and hot dog' },
    items: [
      { id: 'pa1', name: { fr: 'Panini tenders', es: 'Panini de tenders', en: 'Tenders panini' }, price: 600, d: { fr: 'Tenders de poulet, cheddar, tomate et sauce blanche.', es: 'Tenders de pollo, cheddar, tomate y salsa blanca.', en: 'Chicken tenders, cheddar, tomato and white sauce.' } },
      { id: 'pa2', name: { fr: 'Panini tomate, mozza, pesto', es: 'Panini tomate, mozzarella y pesto', en: 'Tomato, mozzarella and pesto panini' }, price: 600 },
      { id: 'hd1', name: { fr: 'Hot-dog classique', es: 'Hot dog clásico', en: 'Classic hot dog' }, price: 600, d: { fr: 'Saucisse de Francfort, tomate, salade, mayonnaise et ketchup.', es: 'Salchicha de Frankfurt, tomate, lechuga, mayonesa y kétchup.', en: 'Frankfurter, tomato, lettuce, mayonnaise and ketchup.' } }
    ] },
  { id: 'desserts', side: 'r',
    t: { fr: 'Desserts', es: 'Postres', en: 'Desserts' },
    n: { fr: 'Tout au Nutella.', es: 'Todo con Nutella.', en: 'All with Nutella.' },
    items: [
      { id: 'de1', name: { fr: 'Gaufre Nutella', es: 'Gofre de Nutella', en: 'Nutella waffle' }, price: 600 },
      { id: 'de2', name: { fr: 'Panini Nutella', es: 'Panini de Nutella', en: 'Nutella panini' }, price: 600 },
      { id: 'de3', name: { fr: 'Burger Nutella', es: 'Burger de Nutella', en: 'Nutella burger' }, price: 600 }
    ] },
  { id: 'softs', side: 'l',
    t: { fr: 'Boissons fraîches', es: 'Refrescos', en: 'Soft drinks' },
    items: [
      { id: 'so1', name: { fr: 'Canette 33 cl', es: 'Lata 33 cl', en: '33 cl can' }, price: 200, d: { fr: 'Coca-Cola, Coca-Cola Zero, Fanta orange ou citron, Sprite, Aquarius citron, Nestea.', es: 'Coca-Cola, Coca-Cola Zero, Fanta naranja o limón, Sprite, Aquarius limón, Nestea.', en: 'Coca-Cola, Coca-Cola Zero, Fanta orange or lemon, Sprite, Aquarius lemon, Nestea.' }, ask: true },
      { id: 'so2', name: { fr: 'Eau 50 cl', es: 'Agua 50 cl', en: 'Water 50 cl' }, price: 200 },
      { id: 'so3', name: { fr: 'Vortex Mojito Energy 25 cl', es: 'Vortex Mojito Energy 25 cl', en: 'Vortex Mojito Energy 25 cl' }, price: 400, d: { fr: 'Boisson énergisante française, goût mojito.', es: 'Bebida energética francesa sabor mojito.', en: 'French energy drink, mojito flavour.' } }
    ] }
];

// Carta del bar publicada por el local en Tripadvisor (sin fecha): se muestra como información, no se pide por WhatsApp.
window.BAR = [
  { t: { fr: 'Mojitos', es: 'Mojitos', en: 'Mojitos' }, p: '6,00 €', l: '10,00 €',
    d: { fr: 'Citron et menthe, mangue et pêche, fraise et cerise.', es: 'Limón y menta, mango y melocotón, fresa y cereza.', en: 'Lemon and mint, mango and peach, strawberry and cherry.' } },
  { t: { fr: 'Cocktails', es: 'Cócteles', en: 'Cocktails' }, p: '5,00 – 7,00 €', l: '9,00 €',
    d: { fr: 'Tequila Sunrise, Sex on the Beach, Piña Colada, Daïquiri fraise, Jägerbomb.', es: 'Tequila Sunrise, Sex on the Beach, Piña Colada, Daiquiri de fresa, Jägerbomb.', en: 'Tequila Sunrise, Sex on the Beach, Piña Colada, Strawberry Daiquiri, Jägerbomb.' } },
  { t: { fr: 'Bière pression', es: 'Cerveza de barril', en: 'Draught beer' }, p: '2,50 € · 4,50 €', l: '8,90 €',
    d: { fr: 'Demi-pinte ou pinte.', es: 'Media pinta o pinta.', en: 'Half pint or pint.' } }
];

// Opiniones públicas (consultadas el 19-11-2026). o = idioma original: 'gt' = solo disponible en la traducción de Google
// al castellano (Gastroranking reproduce las reseñas recientes de Google). Las demás versiones son traducciones y se marcan.
// feat = reseña destacada (la del «visado»). Las fechas relativas de Google («hace 9 meses») se dan como año.
window.REVIEWS = [
  { feat: true, who: 'Sonia De Bodt', src: 'Google', date: { fr: 'septembre 2026', es: 'septiembre de 2026', en: 'September 2026' }, o: 'gt',
    q: { es: '¡La administración que todos quisiéramos tener! […] En Lloret, la Embajada es sinónimo de celebración y buena comida. […] La única visa que necesitas en Lloret de Mar es una mesa reservada en la Embajada.',
         fr: 'L’administration qu’on rêverait tous d’avoir ! […] À Lloret, l’Ambassade rime avec fête et bonne cuisine. […] Le seul visa dont vous avez besoin à Lloret de Mar, c’est une table réservée à l’Ambassade.',
         en: 'The administration we all wish we had! […] In Lloret, the Embassy means celebration and good food. […] The only visa you need in Lloret de Mar is a table booked at the Embassy.' } },
  { who: 'Matthis Menu', src: 'Google', date: { fr: 'septembre 2026', es: 'septiembre de 2026', en: 'September 2026' }, o: 'gt',
    q: { es: 'Una cálida bienvenida. Servicio impecable y rápido. Los cócteles son excelentes. Precios inmejorables.',
         fr: 'Un accueil chaleureux. Un service impeccable et rapide. Les cocktails sont excellents. Des prix imbattables.',
         en: 'A warm welcome. Fast, impeccable service. The cocktails are excellent. Unbeatable prices.' } },
  { who: 'Ambodambo', src: 'Tripadvisor', date: { fr: 'juin 2026', es: 'junio de 2026', en: 'June 2026' }, o: 'en',
    q: { en: 'The food there is wicked. We ordered a French taco. Definitely feeds 2, be warned.',
         fr: 'La cuisine est géniale. On a pris un tacos français. Il nourrit facilement deux personnes, vous êtes prévenus.',
         es: 'La comida es buenísima. Pedimos un tacos francés. Da de comer a dos, que conste.' } },
  { who: 'Angel Peña', src: 'Google', date: { fr: '2026', es: '2026', en: '2026' }, o: 'es',
    q: { es: 'Todo muy bueno y muy grandes, muy amables si eres fanático de los Tacos Franceses recomiendo venir a este lugar',
         fr: 'Tout est très bon et très copieux, l’équipe est très sympa. Si vous êtes fan de tacos français, je vous recommande cet endroit.',
         en: 'Everything is very good and very big, very friendly. If you’re a French tacos fan, I recommend this place.' } },
  { who: 'Annabelle Beziat', src: 'Google', date: { fr: 'septembre 2026', es: 'septiembre de 2026', en: 'September 2026' }, o: 'gt',
    q: { es: '¡Qué gran descubrimiento en Lloret! Se ha convertido en nuestra base. ¡Gracias!',
         fr: 'Quelle belle découverte à Lloret ! C’est devenu notre point de chute. Merci !',
         en: 'What a great find in Lloret! It has become our base. Thank you!' } },
  { who: 'purp81', src: 'Tripadvisor', date: { fr: 'avril 2026', es: 'abril de 2026', en: 'April 2026' }, o: 'en',
    q: { en: 'Lovely quirky little French bar, staff are so friendly, the drinks are the cheapest and best we have found. The food is next level, huge portions and friendly to the wallet.',
         fr: 'Un petit bar français original et adorable, une équipe très sympa, les boissons les moins chères et les meilleures qu’on ait trouvées. La cuisine est d’un autre niveau : portions énormes et prix doux.',
         es: 'Un barecito francés peculiar y encantador, el personal es muy amable y las bebidas, las más baratas y las mejores que hemos encontrado. La comida es de otro nivel: raciones enormes y buen precio.' } },
  { who: 'Andree Piet', src: 'Google', date: { fr: 'septembre 2026', es: 'septiembre de 2026', en: 'September 2026' }, o: 'gt',
    q: { es: 'Un establecimiento excelente con un personal encantador, precios asequibles y mojitos por 6 €.',
         fr: 'Un excellent établissement, un personnel adorable, des prix abordables et des mojitos à 6 €.',
         en: 'An excellent place with lovely staff, affordable prices and €6 mojitos.' } },
  { who: 'Aliver Wilson', src: 'Google', date: { fr: '2023', es: '2023', en: '2023' }, o: 'es',
    q: { es: 'Comida deliciosa, super limpio y una atención muy cercana, se esmeran en hacerte sentir a gusto […] ideal para venir con niños.',
         fr: 'Une cuisine délicieuse, un lieu très propre et un accueil très chaleureux ; ils font tout pour que l’on se sente bien […] idéal pour venir avec des enfants.',
         en: 'Delicious food, very clean and really warm service; they go out of their way to make you feel at home […] ideal for coming with kids.' } },
  { who: 'craig mckee', src: 'Google', date: { fr: 'octobre 2026', es: 'octubre de 2026', en: 'October 2026' }, o: 'gt',
    q: { es: 'Ambiente agradable, único y con un toque espacial. La comida es rica y fresca, y el servicio también es bueno.',
         fr: 'Une ambiance agréable, unique, avec une touche spatiale. La cuisine est bonne et fraîche, et le service aussi.',
         en: 'A pleasant, unique atmosphere with a space-age touch. The food is tasty and fresh, and the service is good too.' } },
  { who: 'Stephen A', src: 'Tripadvisor', date: { fr: 'octobre 2025', es: 'octubre de 2025', en: 'October 2025' }, o: 'en',
    q: { en: 'Excellent fun French and bit more themed Bar, great Drinks that are excellent value for money, Staff are helpful and friendly. […] Friendly to all Nationalities',
         fr: 'Un excellent bar français, fun et un peu à thème, de très bons verres au rapport qualité-prix excellent, une équipe serviable et sympa. […] Accueillant pour toutes les nationalités.',
         es: 'Un bar francés excelente, divertido y algo temático, buenas bebidas con una relación calidad-precio excelente, personal atento y amable. […] Acogedor con todas las nacionalidades.' } },
  { who: 'Albert Clemente', src: 'Google', date: { fr: '2026', es: '2026', en: '2026' }, o: 'es',
    q: { es: 'Nos regaló una ronda de chupitos, la comida muy buena y el ambiente super decorado. Sitio agradable',
         fr: 'On nous a offert une tournée de shots, la cuisine est très bonne et la déco est géniale. Un endroit agréable.',
         en: 'We were treated to a round of shots, the food was very good and the place is really well decorated. A nice spot.' } },
  { who: 'Ted Taras', src: 'Google', date: { fr: 'octobre 2026', es: 'octubre de 2026', en: 'October 2026' }, o: 'gt',
    q: { es: 'Un lugar muy bueno, personal amable, comida deliciosa y abundante.',
         fr: 'Un très bon endroit, un personnel sympathique, une cuisine délicieuse et copieuse.',
         en: 'A really good place, friendly staff, delicious and generous food.' } },
  { who: 'Amanda P', src: 'Tripadvisor', date: { fr: 'octobre 2025', es: 'octubre de 2025', en: 'October 2025' }, o: 'en',
    q: { en: 'They put peppa pig on big screen for my baby […] my girl had a kids meal and it was lovely 10/10 Recommend',
         fr: 'Ils ont mis Peppa Pig sur le grand écran pour mon bébé […] ma fille a pris un menu enfant et c’était délicieux. 10/10, je recommande.',
         es: 'Pusieron Peppa Pig en la pantalla grande para mi bebé […] mi niña tomó un menú infantil y estaba buenísimo. 10/10, lo recomiendo.' } },
  { who: 'Alejandra', src: 'Google', date: { fr: '2026', es: '2026', en: '2026' }, o: 'es',
    q: { es: 'Excelente super recomendado comida rica y a un muy buen precio y atención 10 de 10',
         fr: 'Excellent, je recommande vivement : une cuisine délicieuse à très bon prix et un service 10 sur 10.',
         en: 'Excellent, highly recommended: tasty food at a very good price and 10 out of 10 service.' } },
  { who: 'Nadège', src: 'Google', date: { fr: 'septembre 2026', es: 'septiembre de 2026', en: 'September 2026' }, o: 'gt',
    q: { es: 'Llevo yendo allí todos los años desde 2022.',
         fr: 'J’y vais tous les ans depuis 2022.',
         en: 'I’ve been going there every year since 2022.' } }
];
