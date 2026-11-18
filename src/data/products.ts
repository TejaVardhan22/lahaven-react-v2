import type { Product, ProductCategory } from '@/types';

export const products: Product[] = [
  {
    "id": "chocolate-truffle-cake",
    "name": "Belgian Chocolate Truffle",
    "slug": "chocolate-truffle-cake",
    "shortDescription": "Decadent 54% dark Belgian chocolate ganache over moist, slow-baked sponge.",
    "description": "Our signature masterpiece. Layer upon layer of velvety Belgian chocolate ganache enveloping our impossibly moist dark chocolate sponge. Finished with mirror-smooth ganache piping and delicate chocolate curls, this cake is pure artisan indulgence. 100% eggless available.",
    "category": "celebration-cakes",
    "subcategory": "Signature Truffle",
    "startingPrice": {
      "amount": 799,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/belgian-chocolate-truffle.jpg",
        "alt": "LaHaven Belgian Chocolate Truffle Cake",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/hero/belgian-truffle-desktop.jpg",
        "alt": "Belgian Chocolate Truffle — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/belgium-pastry.jpg",
        "alt": "Belgian Chocolate Truffle — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "chocolate",
      "truffle",
      "ganache",
      "bestseller",
      "eggless"
    ],
    "isAvailable": true,
    "isFeatured": true,
    "occasions": [
      "birthday",
      "anniversary",
      "celebration"
    ],
    "sizes": [
      "0.5 kg",
      "1.0 kg",
      "1.5 kg",
      "2.0 kg"
    ],
    "flavors": [
      "Dark Ganache",
      "Milk Truffle"
    ],
    "flavorProfile": "chocolate",
    "isEggless": true
  },
  {
    "id": "red-velvet-cake",
    "name": "Red Velvet Cream Cheese",
    "slug": "red-velvet-cake",
    "shortDescription": "Velvety crimson sponge paired with Philadelphia-style cream cheese frosting.",
    "description": "A timeless classic crafted with buttermilk-infused crimson sponge, gentle cocoa undertones, and generous layers of silky, tangy cream cheese frosting. Crowned with crimson velvet sponge crumbs and delicate rosettes.",
    "category": "celebration-cakes",
    "subcategory": "Patisserie Classic",
    "startingPrice": {
      "amount": 849,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/red-velvet-cream-cheese.jpg",
        "alt": "LaHaven Red Velvet Cream Cheese Cake",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/heart-shaped-red-velvet.jpg",
        "alt": "Red Velvet Cream Cheese — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/artisan-cupcakes.jpg",
        "alt": "Red Velvet Cream Cheese — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "red velvet",
      "cream cheese",
      "classic",
      "eggless"
    ],
    "isAvailable": true,
    "isFeatured": true,
    "occasions": [
      "birthday",
      "anniversary",
      "celebration",
      "just-because"
    ],
    "sizes": [
      "0.5 kg",
      "1.0 kg",
      "1.5 kg",
      "2.0 kg"
    ],
    "flavors": [
      "Cream Cheese"
    ],
    "flavorProfile": "cream-vanilla",
    "isEggless": true
  },
  {
    "id": "black-forest-cake",
    "name": "Black Forest Classic",
    "slug": "black-forest-cake",
    "shortDescription": "Traditional German chocolate sponge layered with Morello cherries and dairy cream.",
    "description": "Our authentic Schwarzwälder tribute — rich chocolate sponge soaked in natural cherry infusion, layered with whipped fresh dairy cream and imported dark cherries. Finished with handcrafted dark chocolate curls and maraschino cherries.",
    "category": "celebration-cakes",
    "subcategory": "Heritage Recipe",
    "startingPrice": {
      "amount": 749,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/black-forest-classic.jpg",
        "alt": "LaHaven Black Forest Classic Cake",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/chocolate-forest-cake.jpg",
        "alt": "Black Forest Classic — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/black-forest-jar.jpg",
        "alt": "Black Forest Classic — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "black forest",
      "cherry",
      "chocolate",
      "eggless",
      "bestseller"
    ],
    "isAvailable": true,
    "isFeatured": true,
    "occasions": [
      "birthday",
      "celebration",
      "anniversary"
    ],
    "sizes": [
      "0.5 kg",
      "1.0 kg",
      "1.5 kg",
      "2.0 kg"
    ],
    "flavors": [
      "Classic Morello Cherry"
    ],
    "flavorProfile": "chocolate",
    "isEggless": true
  },
  {
    "id": "lotus-biscoff-cheesecake",
    "name": "Lotus Biscoff Baked Cheesecake",
    "slug": "lotus-biscoff-cheesecake",
    "shortDescription": "Creamy baked cheesecake layered with spiced speculoos spread and biscuit crunch.",
    "description": "For Biscoff lovers — rich baked European cream cheese swirled with caramelised Belgian Biscoff spread, sitting atop a buttery Biscoff biscuit crust. Finished with a molten Biscoff drizzle and crushed spiced biscuits.",
    "category": "celebration-cakes",
    "subcategory": "Artisan Cheesecake",
    "startingPrice": {
      "amount": 899,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/lotus-biscoff-cheesecake.jpg",
        "alt": "LaHaven Lotus Biscoff Cheesecake",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/blueberry-cheesecake.jpg",
        "alt": "Lotus Biscoff Baked Cheesecake — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/classic-tiramisu.jpg",
        "alt": "Lotus Biscoff Baked Cheesecake — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "biscoff",
      "cheesecake",
      "caramel",
      "trending",
      "eggless"
    ],
    "isAvailable": true,
    "isFeatured": true,
    "occasions": [
      "birthday",
      "celebration",
      "just-because"
    ],
    "sizes": [
      "0.5 kg",
      "1.0 kg",
      "1.5 kg"
    ],
    "flavors": [
      "Belgian Biscoff"
    ],
    "flavorProfile": "cheesecake",
    "isEggless": true
  },
  {
    "id": "ferrero-rocher-cake",
    "name": "Ferrero Rocher Hazelnut Cake",
    "slug": "ferrero-rocher-cake",
    "shortDescription": "Roasted hazelnut praline, crunchy wafers, and Nutella ganache.",
    "description": "Layers of moist chocolate sponge filled with crunchy hazelnut feuilletine, Nutella chocolate cream, and crowned with whole Ferrero Rocher chocolates. Rich, nutty, and irresistibly textured.",
    "category": "celebration-cakes",
    "subcategory": "Praline Luxe",
    "startingPrice": {
      "amount": 949,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/ferrero-rocher-cake.jpg",
        "alt": "LaHaven Ferrero Rocher Hazelnut Cake",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/ferrero-pastry.jpg",
        "alt": "Ferrero Rocher Hazelnut Cake — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/chocolate-crunchy-cake.jpg",
        "alt": "Ferrero Rocher Hazelnut Cake — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "ferrero",
      "hazelnut",
      "nutella",
      "bestseller",
      "eggless"
    ],
    "isAvailable": true,
    "isFeatured": true,
    "occasions": [
      "birthday",
      "anniversary",
      "celebration"
    ],
    "sizes": [
      "0.5 kg",
      "1.0 kg",
      "1.5 kg",
      "2.0 kg"
    ],
    "flavors": [
      "Roasted Hazelnut"
    ],
    "flavorProfile": "nutty-caramel",
    "isEggless": true
  },
  {
    "id": "death-by-chocolate",
    "name": "Death By Chocolate (DBC)",
    "slug": "death-by-chocolate",
    "shortDescription": "Triple chocolate overload with fudge brownie bites and dark truffle ganache.",
    "description": "An unapologetic tribute to pure cocoa. Decadent dark sponge layered with warm fudge brownie chunks, rich chocolate cream, and cascading chocolate syrup. An all-time Bengaluru favourite.",
    "category": "celebration-cakes",
    "subcategory": "Fudge Decadence",
    "startingPrice": {
      "amount": 849,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/death-by-chocolate.jpg",
        "alt": "LaHaven Death by Chocolate Cake",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/chocolate-overload-cake.jpg",
        "alt": "Death By Chocolate (DBC) — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/fudge-brownie-stack.jpg",
        "alt": "Death By Chocolate (DBC) — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "chocolate",
      "dbc",
      "fudge",
      "brownie",
      "contains-egg"
    ],
    "isEggless": false,
    "isAvailable": true,
    "isFeatured": true,
    "occasions": [
      "birthday",
      "celebration",
      "just-because"
    ],
    "sizes": [
      "0.5 kg",
      "1.0 kg",
      "1.5 kg",
      "2.0 kg"
    ],
    "flavors": [
      "Triple Chocolate"
    ],
    "flavorProfile": "chocolate"
  },
  {
    "id": "dutch-truffle-cake",
    "name": "Dutch Chocolate Truffle",
    "slug": "dutch-truffle-cake",
    "shortDescription": "Silky European Dutch-processed cocoa ganache over airy chocolate gateau.",
    "description": "Smooth, refined, and distinctly sophisticated. Dutch-processed alkalised cocoa delivers an intensely deep mahogany colour with mild acidity, paired with silken ganache that melts effortlessly on the tongue.",
    "category": "celebration-cakes",
    "subcategory": "European Patisserie",
    "startingPrice": {
      "amount": 829,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/dutch-truffle-cake.jpg",
        "alt": "LaHaven Dutch Chocolate Truffle Cake",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/belgian-chocolate-truffle.jpg",
        "alt": "Dutch Chocolate Truffle — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/belgium-pastry.jpg",
        "alt": "Dutch Chocolate Truffle — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "dutch cocoa",
      "truffle",
      "ganache",
      "eggless"
    ],
    "isAvailable": true,
    "isFeatured": false,
    "occasions": [
      "birthday",
      "celebration"
    ],
    "sizes": [
      "0.5 kg",
      "1.0 kg",
      "1.5 kg"
    ],
    "flavors": [
      "Dutch Cocoa"
    ],
    "flavorProfile": "chocolate",
    "isEggless": true
  },
  {
    "id": "royal-opera-cake",
    "name": "Royal French Opera Gateau",
    "slug": "royal-opera-cake",
    "shortDescription": "Almond joconde sponge soaked in espresso, coffee buttercream & dark ganache.",
    "description": "The quintessential French classic. Delicate layers of almond joconde sponge soaked with premium Arabica espresso syrup, alternating with smooth French coffee buttercream and rich chocolate ganache, topped with a glass-like chocolate glaze.",
    "category": "celebration-cakes",
    "subcategory": "French Gateau",
    "startingPrice": {
      "amount": 999,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/royal-opera-cake.jpg",
        "alt": "LaHaven Royal French Opera Gateau",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/classic-tiramisu.jpg",
        "alt": "Royal French Opera Gateau — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/swiss-chocolate-cake.jpg",
        "alt": "Royal French Opera Gateau — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "opera",
      "coffee",
      "french",
      "almond",
      "contains-egg"
    ],
    "isEggless": false,
    "isAvailable": true,
    "isFeatured": true,
    "occasions": [
      "anniversary",
      "birthday",
      "celebration"
    ],
    "sizes": [
      "0.5 kg",
      "1.0 kg"
    ],
    "flavors": [
      "Espresso Mocha"
    ],
    "flavorProfile": "coffee-mocha"
  },
  {
    "id": "white-forest-cake",
    "name": "White Forest Gateau",
    "slug": "white-forest-cake",
    "shortDescription": "Vanilla sponge with white chocolate curls, cherries and fresh vanilla cream.",
    "description": "An ethereal contrast to the dark classic. Tender vanilla sponge layered with juicy cherry compote and whipped vanilla cream, draped entirely in hand-shaved Belgian white chocolate curls.",
    "category": "celebration-cakes",
    "subcategory": "Vanilla & White Chocolate",
    "startingPrice": {
      "amount": 779,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/white-forest-cake.jpg",
        "alt": "LaHaven White Forest Gateau",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/lychee-gateau.jpg",
        "alt": "White Forest Gateau — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/black-forest-classic.jpg",
        "alt": "White Forest Gateau — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "white forest",
      "white chocolate",
      "vanilla",
      "eggless"
    ],
    "isAvailable": true,
    "isFeatured": false,
    "occasions": [
      "birthday",
      "baby-shower",
      "celebration"
    ],
    "sizes": [
      "0.5 kg",
      "1.0 kg",
      "1.5 kg"
    ],
    "flavors": [
      "White Chocolate & Cherry"
    ],
    "flavorProfile": "fruit-berry",
    "isEggless": true
  },
  {
    "id": "roasted-almond-cake",
    "name": "Roasted Almond Nougat Cake",
    "slug": "roasted-almond-cake",
    "shortDescription": "Slow-roasted Californian almonds, caramel drizzle, and velvety vanilla cream.",
    "description": "Freshly roasted Californian almond slivers tossed in sea salt caramel, layered between soft vanilla sponge and rich almond praline buttercream. Delivers an irresistible nutty crunch in every forkful.",
    "category": "celebration-cakes",
    "subcategory": "Nutty Crunch",
    "startingPrice": {
      "amount": 849,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/roasted-almond-cake.jpg",
        "alt": "LaHaven Roasted Almond Nougat Cake",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/butterscotch-crunch-cake.jpg",
        "alt": "Roasted Almond Nougat Cake — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/ferrero-rocher-cake.jpg",
        "alt": "Roasted Almond Nougat Cake — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "almond",
      "caramel",
      "praline",
      "crunchy",
      "eggless"
    ],
    "isAvailable": true,
    "isFeatured": false,
    "occasions": [
      "birthday",
      "anniversary",
      "celebration"
    ],
    "sizes": [
      "0.5 kg",
      "1.0 kg",
      "1.5 kg"
    ],
    "flavors": [
      "Caramel Almond"
    ],
    "flavorProfile": "nutty-caramel",
    "isEggless": true
  },
  {
    "id": "butterscotch-crunch-cake",
    "name": "Butterscotch Praline Cake",
    "slug": "butterscotch-crunch-cake",
    "shortDescription": "Golden butterscotch caramel sponge studded with homemade cashew praline crunch.",
    "description": "A nostalgic celebration favourite. Golden sponge infused with rich butterscotch caramel sauce, filled with our signature crunch of freshly prepared candied cashew praline and whipped cream.",
    "category": "celebration-cakes",
    "subcategory": "Classic Butterscotch",
    "startingPrice": {
      "amount": 729,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/butterscotch-crunch-cake.jpg",
        "alt": "LaHaven Butterscotch Praline Cake",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/roasted-almond-cake.jpg",
        "alt": "Butterscotch Praline Cake — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/lotus-biscoff-cheesecake.jpg",
        "alt": "Butterscotch Praline Cake — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "butterscotch",
      "caramel",
      "praline",
      "eggless"
    ],
    "isAvailable": true,
    "isFeatured": false,
    "occasions": [
      "birthday",
      "celebration"
    ],
    "sizes": [
      "0.5 kg",
      "1.0 kg",
      "1.5 kg"
    ],
    "flavors": [
      "Butterscotch Caramel"
    ],
    "flavorProfile": "nutty-caramel",
    "isEggless": true
  },
  {
    "id": "mango-raspberry-cake",
    "name": "Alphonso Mango & Raspberry Delice",
    "slug": "mango-raspberry-cake",
    "shortDescription": "Alphonso mango compote layered with tart raspberry coulis and light vanilla sponge.",
    "description": "Sun-ripened Alphonso mango pulp meets the zesty brightness of wild raspberry coulis. Light, airy, and bursting with vibrant fruit sweetness without artificial flavouring.",
    "category": "celebration-cakes",
    "subcategory": "Fruit Patisserie",
    "startingPrice": {
      "amount": 879,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/mango-raspberry-cake.jpg",
        "alt": "LaHaven Alphonso Mango Raspberry Cake",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/hero/mango-raspberry-desktop.jpg",
        "alt": "Alphonso Mango & Raspberry Delice — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/mango-mousse-cup.jpg",
        "alt": "Alphonso Mango & Raspberry Delice — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "mango",
      "raspberry",
      "fruit",
      "fresh",
      "eggless"
    ],
    "isAvailable": true,
    "isFeatured": false,
    "occasions": [
      "birthday",
      "summer",
      "celebration"
    ],
    "sizes": [
      "0.5 kg",
      "1.0 kg",
      "1.5 kg"
    ],
    "flavors": [
      "Mango Raspberry"
    ],
    "flavorProfile": "fruit-berry",
    "isEggless": true
  },
  {
    "id": "black-currant-cake",
    "name": "Wild Blackcurrant Gateau",
    "slug": "black-currant-cake",
    "shortDescription": "Deep purple blackcurrant fruit compote with vanilla cream and soft sponge.",
    "description": "Tangy and refreshing wild European blackcurrant reduction paired with vanilla sponge and whipped cream. The natural berry tartness cuts through the cream for an invigorating dessert experience.",
    "category": "celebration-cakes",
    "subcategory": "Berry Selection",
    "startingPrice": {
      "amount": 769,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/black-currant-cake.jpg",
        "alt": "LaHaven Wild Blackcurrant Gateau",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/blueberry-cake.jpg",
        "alt": "Wild Blackcurrant Gateau — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/hero/blueberry-desktop.jpg",
        "alt": "Wild Blackcurrant Gateau — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "blackcurrant",
      "berry",
      "fruit",
      "eggless"
    ],
    "isAvailable": true,
    "isFeatured": false,
    "occasions": [
      "birthday",
      "celebration"
    ],
    "sizes": [
      "0.5 kg",
      "1.0 kg",
      "1.5 kg"
    ],
    "flavors": [
      "Wild Blackcurrant"
    ],
    "flavorProfile": "fruit-berry",
    "isEggless": true
  },
  {
    "id": "lychee-gateau",
    "name": "Fresh Lychee Rose Gateau",
    "slug": "lychee-gateau",
    "shortDescription": "Juicy sweet lychee chunks infused with subtle rosewater and light sponge.",
    "description": "Floral, delicate, and refined. Soft vanilla sponge soaked with fragrant rose infusion, layered with generous chunks of sweet lychee fruit and fresh whipped cream.",
    "category": "celebration-cakes",
    "subcategory": "Floral & Fruit",
    "startingPrice": {
      "amount": 799,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/lychee-gateau.jpg",
        "alt": "LaHaven Fresh Lychee Rose Gateau",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/hero/lychee-gateau-desktop.jpg",
        "alt": "Fresh Lychee Rose Gateau — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/white-forest-cake.jpg",
        "alt": "Fresh Lychee Rose Gateau — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "lychee",
      "rose",
      "floral",
      "fruit",
      "eggless"
    ],
    "isAvailable": true,
    "isFeatured": false,
    "occasions": [
      "birthday",
      "anniversary",
      "celebration"
    ],
    "sizes": [
      "0.5 kg",
      "1.0 kg",
      "1.5 kg"
    ],
    "flavors": [
      "Lychee Rose"
    ],
    "flavorProfile": "fruit-berry",
    "isEggless": true
  },
  {
    "id": "heart-shaped-chocolate-bento",
    "name": "Heart-Shaped Chocolate Truffle Bento",
    "slug": "heart-shaped-chocolate-bento",
    "shortDescription": "Romantic 4-inch heart bento cake finished in velvety chocolate ganache.",
    "description": "Petite 4-inch Korean bento cake sculpted into a delicate heart shape, coated with rich dark chocolate ganache, custom hand-piped inscription, and packed in our signature sugarcane box with candle and spork.",
    "category": "bento-cakes",
    "subcategory": "Couple Bento",
    "startingPrice": {
      "amount": 549,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/heart-shaped-chocolate.jpg",
        "alt": "LaHaven Heart-Shaped Chocolate Bento Cake",
        "width": 1000,
        "height": 800
      },
      {
        "src": "/images/products/belgian-chocolate-truffle.jpg",
        "alt": "Heart-Shaped Chocolate Truffle Bento — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/heart-shaped-red-velvet.jpg",
        "alt": "Heart-Shaped Chocolate Truffle Bento — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "bento",
      "heart",
      "chocolate",
      "trending",
      "romantic",
      "eggless"
    ],
    "isAvailable": true,
    "isFeatured": true,
    "occasions": [
      "anniversary",
      "birthday",
      "just-because"
    ],
    "sizes": [
      "4 inch (1-2 portions)"
    ],
    "flavors": [
      "Belgian Chocolate Truffle"
    ],
    "flavorProfile": "chocolate",
    "isEggless": true
  },
  {
    "id": "heart-shaped-red-velvet-bento",
    "name": "Heart-Shaped Red Velvet Bento",
    "slug": "heart-shaped-red-velvet-bento",
    "shortDescription": "4-inch crimson heart bento cake with tangy cream cheese frosting.",
    "description": "Designed for sweet gestures and romantic celebrations. Moist red velvet cake sculpted in a heart silhouette, layered with Philadelphia-style cream cheese frosting and piped with your custom message.",
    "category": "bento-cakes",
    "subcategory": "Couple Bento",
    "startingPrice": {
      "amount": 579,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/heart-shaped-red-velvet.jpg",
        "alt": "LaHaven Heart-Shaped Red Velvet Bento Cake",
        "width": 1000,
        "height": 800
      },
      {
        "src": "/images/products/red-velvet-cream-cheese.jpg",
        "alt": "Heart-Shaped Red Velvet Bento — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/heart-shaped-strawberry.jpg",
        "alt": "Heart-Shaped Red Velvet Bento — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "bento",
      "red velvet",
      "heart",
      "trending",
      "eggless"
    ],
    "isAvailable": true,
    "isFeatured": true,
    "occasions": [
      "anniversary",
      "birthday",
      "just-because"
    ],
    "sizes": [
      "4 inch (1-2 portions)"
    ],
    "flavors": [
      "Red Velvet Cream Cheese"
    ],
    "flavorProfile": "cream-vanilla",
    "isEggless": true
  },
  {
    "id": "heart-shaped-strawberry-bento",
    "name": "Heart-Shaped Strawberry Bento",
    "slug": "heart-shaped-strawberry-bento",
    "shortDescription": "Pastel pink 4-inch heart bento with fresh strawberry compote.",
    "description": "Adorable pastel pink bento cake filled with natural strawberry compote and whipped vanilla cream, sculpted into a romantic heart with delicate beaded borders.",
    "category": "bento-cakes",
    "subcategory": "Fruit Bento",
    "startingPrice": {
      "amount": 549,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/heart-shaped-strawberry.jpg",
        "alt": "LaHaven Heart-Shaped Strawberry Bento Cake",
        "width": 1000,
        "height": 800
      },
      {
        "src": "/images/hero/strawberry-heart-desktop.jpg",
        "alt": "Heart-Shaped Strawberry Bento — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/heart-shaped-red-velvet.jpg",
        "alt": "Heart-Shaped Strawberry Bento — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "bento",
      "strawberry",
      "heart",
      "pink",
      "eggless"
    ],
    "isAvailable": true,
    "isFeatured": false,
    "occasions": [
      "anniversary",
      "birthday",
      "just-because"
    ],
    "sizes": [
      "4 inch (1-2 portions)"
    ],
    "flavors": [
      "Strawberry Cream"
    ],
    "flavorProfile": "fruit-berry",
    "isEggless": true
  },
  {
    "id": "blueberry-bento-cake",
    "name": "Blueberry Petite Bento Cake",
    "slug": "blueberry-bento-cake",
    "shortDescription": "4-inch bento cake with wild blueberry compote and lavender cream.",
    "description": "Tangy wild blueberry reduction layered between light vanilla sponge, decorated with minimalist Korean-style piping and served in an eco clamshell box.",
    "category": "bento-cakes",
    "subcategory": "Minimal Bento",
    "startingPrice": {
      "amount": 549,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/blueberry-cake.jpg",
        "alt": "LaHaven Blueberry Petite Bento Cake",
        "width": 1000,
        "height": 800
      },
      {
        "src": "/images/hero/blueberry-desktop.jpg",
        "alt": "Blueberry Petite Bento Cake — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/blueberry-cheesecake.jpg",
        "alt": "Blueberry Petite Bento Cake — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "bento",
      "blueberry",
      "minimal",
      "eggless"
    ],
    "isAvailable": true,
    "isFeatured": false,
    "occasions": [
      "birthday",
      "just-because"
    ],
    "sizes": [
      "4 inch (1-2 portions)"
    ],
    "flavors": [
      "Wild Blueberry"
    ],
    "flavorProfile": "fruit-berry",
    "isEggless": true
  },
  {
    "id": "chocolate-bomb-cake",
    "name": "Chocolate Smash Bomb Cake",
    "slug": "chocolate-bomb-cake",
    "shortDescription": "Interactive chocolate sphere shell that breaks open to reveal surprises inside.",
    "description": "The ultimate party spectacle! A handcrafted chocolate sphere filled with your choice of cake, macaroons, chocolates, and celebration confetti. Includes an artisan wooden hammer to smash and reveal.",
    "category": "designer-cakes",
    "subcategory": "Interactive Cake",
    "startingPrice": {
      "amount": 1499,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/chocolate-bomb.jpg",
        "alt": "LaHaven Chocolate Smash Bomb Cake",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/chocolate-fantasy-cake.jpg",
        "alt": "Chocolate Smash Bomb Cake — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/chocolate-overload-cake.jpg",
        "alt": "Chocolate Smash Bomb Cake — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "bomb cake",
      "smash cake",
      "designer",
      "interactive",
      "eggless"
    ],
    "isAvailable": true,
    "isFeatured": true,
    "occasions": [
      "birthday",
      "anniversary",
      "celebration"
    ],
    "sizes": [
      "1.0 kg",
      "1.5 kg"
    ],
    "flavors": [
      "Truffle Bomb",
      "Nutella Bomb"
    ],
    "flavorProfile": "chocolate",
    "isEggless": true
  },
  {
    "id": "chocolate-fantasy-cake",
    "name": "Chocolate Fantasy Luxe Cake",
    "slug": "chocolate-fantasy-cake",
    "shortDescription": "Sculpted chocolate drips, caramel pearls, and rich layered ganache.",
    "description": "An artistic statement cake loaded with cascading dark ganache drips, crisp chocolate pearls, chocolate shards, and premium confectionery toppings. An eye-catching centerpiece for milestone celebrations.",
    "category": "designer-cakes",
    "subcategory": "Sculpted Design",
    "startingPrice": {
      "amount": 1299,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/chocolate-fantasy-cake.jpg",
        "alt": "LaHaven Chocolate Fantasy Luxe Cake",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/chocolate-overload-cake.jpg",
        "alt": "Chocolate Fantasy Luxe Cake — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/chocolate-crunchy-cake.jpg",
        "alt": "Chocolate Fantasy Luxe Cake — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "fantasy",
      "designer",
      "chocolate",
      "luxury",
      "eggless"
    ],
    "isAvailable": true,
    "isFeatured": false,
    "occasions": [
      "birthday",
      "anniversary",
      "celebration"
    ],
    "sizes": [
      "1.0 kg",
      "1.5 kg",
      "2.0 kg"
    ],
    "flavors": [
      "Dark Fantasy",
      "Belgian Praline"
    ],
    "flavorProfile": "chocolate",
    "isEggless": true
  },
  {
    "id": "classic-cheesecake",
    "name": "Blueberry Baked Cheesecake",
    "slug": "classic-cheesecake",
    "shortDescription": "Slow-baked Philadelphia-style cheesecake topped with wild blueberry compote.",
    "description": "Baked low and slow for a velvety, dense center on a crunchy butter graham cracker crust. Smothered in artisanal wild blueberry compote with whole berries.",
    "category": "desserts",
    "subcategory": "Cheesecakes",
    "startingPrice": {
      "amount": 699,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/blueberry-cheesecake.jpg",
        "alt": "LaHaven Blueberry Baked Cheesecake",
        "width": 1000,
        "height": 800
      },
      {
        "src": "/images/products/lotus-biscoff-cheesecake.jpg",
        "alt": "Blueberry Baked Cheesecake — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/hero/blueberry-desktop.jpg",
        "alt": "Blueberry Baked Cheesecake — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "cheesecake",
      "blueberry",
      "baked",
      "contains-egg"
    ],
    "isEggless": false,
    "isAvailable": true,
    "isFeatured": true,
    "occasions": [
      "birthday",
      "anniversary",
      "just-because"
    ],
    "sizes": [
      "0.5 kg",
      "Slice (Box of 2)"
    ],
    "flavors": [
      "Blueberry",
      "Classic NY"
    ],
    "flavorProfile": "cheesecake"
  },
  {
    "id": "tiramisu",
    "name": "Traditional Italian Tiramisu",
    "slug": "tiramisu",
    "shortDescription": "Espresso-soaked ladyfingers with whipped mascarpone cream and Valrhona cocoa.",
    "description": "Layers of Savoiardi ladyfingers soaked in double-shot espresso, layered between clouds of whipped mascarpone cream, and dusted with dark cocoa powder. No shortcuts, just authentic Italian comfort.",
    "category": "desserts",
    "subcategory": "Italian Patisserie",
    "startingPrice": {
      "amount": 599,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/classic-tiramisu.jpg",
        "alt": "LaHaven Traditional Italian Tiramisu",
        "width": 1000,
        "height": 800
      },
      {
        "src": "/images/products/royal-opera-cake.jpg",
        "alt": "Traditional Italian Tiramisu — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/chocolate-mousse-cup.jpg",
        "alt": "Traditional Italian Tiramisu — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "tiramisu",
      "coffee",
      "italian",
      "mascarpone",
      "contains-egg"
    ],
    "isEggless": false,
    "isAvailable": true,
    "isFeatured": true,
    "occasions": [
      "anniversary",
      "just-because"
    ],
    "sizes": [
      "500g Tub",
      "Dessert Cup"
    ],
    "flavors": [
      "Classic Espresso"
    ],
    "flavorProfile": "coffee-mocha"
  },
  {
    "id": "brownie-tower",
    "name": "Artisan Chocochip Brownies",
    "slug": "brownie-tower",
    "shortDescription": "Fudge brownies packed with melted chocolate chips and toasted walnuts.",
    "description": "Thick, ultra-fudgy brownie squares made with 60% dark chocolate and real European butter, studded with melted dark chocolate chips and a crackly crinkled top.",
    "category": "desserts",
    "subcategory": "Brownies",
    "startingPrice": {
      "amount": 399,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/chocochips-brownie.jpg",
        "alt": "LaHaven Artisan Chocochip Brownies",
        "width": 1000,
        "height": 800
      },
      {
        "src": "/images/products/fudge-brownie-stack.jpg",
        "alt": "Artisan Chocochip Brownies — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/choco-lava.jpg",
        "alt": "Artisan Chocochip Brownies — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "brownie",
      "fudge",
      "chocochip",
      "eggless"
    ],
    "isAvailable": true,
    "isFeatured": false,
    "occasions": [
      "birthday",
      "just-because",
      "corporate"
    ],
    "sizes": [
      "Box of 4",
      "Box of 6",
      "Box of 9"
    ],
    "flavors": [
      "Dark Chocochip",
      "Walnut Fudge"
    ],
    "flavorProfile": "chocolate",
    "isEggless": true
  },
  {
    "id": "warm-choco-lava",
    "name": "Molten Choco Lava Cakes",
    "slug": "warm-choco-lava",
    "shortDescription": "Warm chocolate sponge cakes with a decadent flowing ganache center.",
    "description": "Individual chocolate cakes with a molten, oozing chocolate ganache center that pours out when pierced. Best enjoyed warm with a scoop of vanilla ice cream.",
    "category": "desserts",
    "subcategory": "Warm Patisserie",
    "startingPrice": {
      "amount": 299,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/choco-lava.jpg",
        "alt": "LaHaven Molten Choco Lava Cakes",
        "width": 1000,
        "height": 800
      },
      {
        "src": "/images/products/fudge-brownie-stack.jpg",
        "alt": "Molten Choco Lava Cakes — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/chocochips-brownie.jpg",
        "alt": "Molten Choco Lava Cakes — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "choco lava",
      "molten",
      "chocolate",
      "eggless"
    ],
    "isAvailable": true,
    "isFeatured": false,
    "occasions": [
      "just-because",
      "celebration"
    ],
    "sizes": [
      "Set of 2",
      "Set of 4"
    ],
    "flavors": [
      "Dark Ganache Lava"
    ],
    "flavorProfile": "chocolate",
    "isEggless": true
  },
  {
    "id": "gourmet-macarons",
    "name": "French Macaron Gift Box",
    "slug": "gourmet-macarons",
    "shortDescription": "Assorted French almond macarons filled with chocolate ganache and fruit curds.",
    "description": "Crisp almond meringue shells with chewy centers, filled with Belgian chocolate ganache, pistachio buttercream, and raspberry curd. Beautifully boxed in our slate-blue gift packaging.",
    "category": "desserts",
    "subcategory": "French Patisserie",
    "startingPrice": {
      "amount": 499,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/gourmet-macarons.jpg",
        "alt": "LaHaven French Macaron Gift Box",
        "width": 1000,
        "height": 800
      },
      {
        "src": "/images/products/cookies-selection.jpg",
        "alt": "French Macaron Gift Box — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/artisan-cupcakes.jpg",
        "alt": "French Macaron Gift Box — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "macarons",
      "french",
      "gift box",
      "almond"
    ],
    "isAvailable": true,
    "isFeatured": false,
    "occasions": [
      "anniversary",
      "birthday",
      "gift"
    ],
    "sizes": [
      "Box of 6",
      "Box of 12"
    ],
    "flavors": [
      "Assorted 6 Flavours"
    ],
    "flavorProfile": "party-bites",
    "isEggless": false
  },
  {
    "id": "artisan-cupcakes",
    "name": "Artisan Cupcake Collection",
    "slug": "artisan-cupcakes",
    "shortDescription": "Hand-piped buttercream cupcakes in Belgian chocolate and red velvet flavours.",
    "description": "Tender sponge cupcakes crowned with Swiss meringue buttercream swirls, chocolate shavings, and edible gold flakes. The perfect handheld indulgence for parties and office treats.",
    "category": "desserts",
    "subcategory": "Cupcakes",
    "startingPrice": {
      "amount": 349,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/artisan-cupcakes.jpg",
        "alt": "LaHaven Artisan Cupcake Collection",
        "width": 1000,
        "height": 800
      },
      {
        "src": "/images/products/muffins-selection.jpg",
        "alt": "Artisan Cupcake Collection — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/gourmet-macarons.jpg",
        "alt": "Artisan Cupcake Collection — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "cupcakes",
      "buttercream",
      "chocolate",
      "eggless"
    ],
    "isAvailable": true,
    "isFeatured": false,
    "occasions": [
      "birthday",
      "party",
      "corporate"
    ],
    "sizes": [
      "Box of 4",
      "Box of 6"
    ],
    "flavors": [
      "Assorted Flavours"
    ],
    "flavorProfile": "party-bites",
    "isEggless": true
  },
  {
    "id": "glazed-donuts",
    "name": "Gourmet Glazed Donut Box",
    "slug": "glazed-donuts",
    "shortDescription": "Brioche dough donuts with Belgian chocolate, KitKat, and caramel glazes.",
    "description": "Fluffy, slow-proofed brioche donuts hand-dipped in premium Belgian chocolate, sprinkled with KitKat crunch, and drizzled with salted caramel.",
    "category": "desserts",
    "subcategory": "Donuts",
    "startingPrice": {
      "amount": 329,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/glazed-donuts.jpg",
        "alt": "LaHaven Gourmet Glazed Donut Box",
        "width": 1000,
        "height": 800
      },
      {
        "src": "/images/products/cookies-selection.jpg",
        "alt": "Gourmet Glazed Donut Box — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/chocochips-brownie.jpg",
        "alt": "Gourmet Glazed Donut Box — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "donuts",
      "glazed",
      "chocolate",
      "kitkat"
    ],
    "isAvailable": true,
    "isFeatured": false,
    "occasions": [
      "party",
      "just-because"
    ],
    "sizes": [
      "Box of 4",
      "Box of 6"
    ],
    "flavors": [
      "Chocolate, KitKat, Butterscotch"
    ],
    "flavorProfile": "party-bites",
    "isEggless": false
  },
  {
    "id": "chocolate-mousse-cup",
    "name": "Belgian Chocolate Mousse Cups",
    "slug": "chocolate-mousse-cup",
    "shortDescription": "Airy 54% dark chocolate mousse layered with chocolate sponge and ganache.",
    "description": "Individual dessert cups layered with airy chocolate mousse made with European cream and dark cocoa, finished with chocolate shavings.",
    "category": "desserts",
    "subcategory": "Mousse & Jars",
    "startingPrice": {
      "amount": 199,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/chocolate-mousse-cup.jpg",
        "alt": "LaHaven Belgian Chocolate Mousse Cups",
        "width": 1000,
        "height": 800
      },
      {
        "src": "/images/products/chocolate-jar-cake.jpg",
        "alt": "Belgian Chocolate Mousse Cups — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/belgium-pastry.jpg",
        "alt": "Belgian Chocolate Mousse Cups — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "mousse",
      "chocolate",
      "cup",
      "eggless"
    ],
    "isAvailable": true,
    "isFeatured": false,
    "occasions": [
      "party",
      "just-because"
    ],
    "sizes": [
      "Set of 2",
      "Set of 4"
    ],
    "flavors": [
      "Dark Chocolate Mousse"
    ],
    "flavorProfile": "chocolate",
    "isEggless": true
  },
  {
    "id": "swiss-chocolate-cake",
    "name": "Swiss Milk Chocolate Gateau",
    "slug": "swiss-chocolate-cake",
    "shortDescription": "Silky Swiss milk chocolate cream layered with feather-light chiffon sponge.",
    "description": "Inspired by classic Swiss confectionery, this gateau pairs ultra-smooth alpine milk chocolate cream with delicate chiffon sponge layers. Finished with hand-tempered white chocolate shards and cocoa dusting.",
    "category": "celebration-cakes",
    "subcategory": "Swiss Patisserie",
    "startingPrice": {
      "amount": 849,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/swiss-chocolate-cake.jpg",
        "alt": "LaHaven Swiss Milk Chocolate Gateau",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/dutch-truffle-cake.jpg",
        "alt": "Swiss Milk Chocolate Gateau — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/chocolate-forest-cake.jpg",
        "alt": "Swiss Milk Chocolate Gateau — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "swiss",
      "milk chocolate",
      "chiffon",
      "contains-egg"
    ],
    "isEggless": false,
    "isAvailable": true,
    "isFeatured": false,
    "occasions": [
      "birthday",
      "anniversary",
      "celebration"
    ],
    "sizes": [
      "0.5 kg",
      "1.0 kg",
      "1.5 kg"
    ],
    "flavors": [
      "Swiss Milk Chocolate"
    ],
    "flavorProfile": "chocolate"
  },
  {
    "id": "chocolate-overload-cake",
    "name": "Chocolate Overload Luxe Cake",
    "slug": "chocolate-overload-cake",
    "shortDescription": "Triple-layered dark chocolate cake crowned with KitKat bars, Ferrero, and ganache drip.",
    "description": "For the ultimate chocolate fanatic. Dark sponge filled with chocolate fudge cream, coated in mirror ganache, and dramatically topped with KitKat bars, whole Ferrero Rocher, chocolate bars, and cascading ganache drips. A true showstopper.",
    "category": "designer-cakes",
    "subcategory": "Loaded Luxe",
    "startingPrice": {
      "amount": 1099,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/chocolate-overload-cake.jpg",
        "alt": "LaHaven Chocolate Overload Luxe Cake",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/chocolate-fantasy-cake.jpg",
        "alt": "Chocolate Overload Luxe Cake — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/death-by-chocolate.jpg",
        "alt": "Chocolate Overload Luxe Cake — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "chocolate overload",
      "kitkat",
      "ferrero",
      "designer",
      "eggless"
    ],
    "isAvailable": true,
    "isFeatured": true,
    "occasions": [
      "birthday",
      "celebration",
      "anniversary"
    ],
    "sizes": [
      "1.0 kg",
      "1.5 kg",
      "2.0 kg"
    ],
    "flavors": [
      "Dark Chocolate",
      "Milk Chocolate"
    ],
    "flavorProfile": "chocolate",
    "isEggless": true
  },
  {
    "id": "black-forest-jar",
    "name": "Black Forest Dessert Jar",
    "slug": "black-forest-jar",
    "shortDescription": "Classic black forest layered in a portable eco-glass jar — cherries, cream, chocolate sponge.",
    "description": "All the magic of our beloved Black Forest Classic, beautifully layered in a portable eco-glass jar. Chocolate sponge, Morello cherry compote, and fresh whipped cream — sealed and ready to gift or enjoy on the go.",
    "category": "desserts",
    "subcategory": "Mousse & Jars",
    "startingPrice": {
      "amount": 219,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/black-forest-jar.jpg",
        "alt": "LaHaven Black Forest Dessert Jar",
        "width": 1000,
        "height": 800
      },
      {
        "src": "/images/products/black-forest-classic.jpg",
        "alt": "Black Forest Dessert Jar — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/chocolate-jar-cake.jpg",
        "alt": "Black Forest Dessert Jar — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "jar cake",
      "black forest",
      "cherry",
      "portable",
      "eggless"
    ],
    "isAvailable": true,
    "isFeatured": false,
    "occasions": [
      "birthday",
      "just-because",
      "corporate"
    ],
    "sizes": [
      "Single Jar",
      "Set of 2",
      "Set of 4"
    ],
    "flavors": [
      "Black Forest"
    ],
    "flavorProfile": "chocolate",
    "isEggless": true
  },
  {
    "id": "chocolate-jar-cake",
    "name": "Chocolate Fudge Jar Cake",
    "slug": "chocolate-jar-cake",
    "shortDescription": "Fudge brownie chunks, ganache cream, and chocolate sponge stacked in a jar.",
    "description": "Rich, indulgent, and perfectly portable. Layers of dark chocolate sponge, silky ganache cream, and fudge brownie crumbles packed into an eco-glass jar. Sealed and ready for gifting.",
    "category": "desserts",
    "subcategory": "Mousse & Jars",
    "startingPrice": {
      "amount": 199,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/chocolate-jar-cake.jpg",
        "alt": "LaHaven Chocolate Fudge Jar Cake",
        "width": 1000,
        "height": 800
      },
      {
        "src": "/images/products/chocolate-mousse-cup.jpg",
        "alt": "Chocolate Fudge Jar Cake — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/black-forest-jar.jpg",
        "alt": "Chocolate Fudge Jar Cake — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "jar cake",
      "chocolate",
      "fudge",
      "portable",
      "eggless"
    ],
    "isAvailable": true,
    "isFeatured": false,
    "occasions": [
      "birthday",
      "just-because",
      "corporate",
      "gift"
    ],
    "sizes": [
      "Single Jar",
      "Set of 2",
      "Set of 4"
    ],
    "flavors": [
      "Chocolate Fudge"
    ],
    "flavorProfile": "chocolate",
    "isEggless": true
  },
  {
    "id": "mango-mousse-cup",
    "name": "Alphonso Mango Mousse Cup",
    "slug": "mango-mousse-cup",
    "shortDescription": "Airy Alphonso mango mousse with fresh mango compote in an individual dessert cup.",
    "description": "Velvety Alphonso mango mousse made with real Ratnagiri mango pulp, layered over a buttery biscuit base and topped with fresh mango compote. Light, tropical, and refreshingly indulgent.",
    "category": "desserts",
    "subcategory": "Mousse & Jars",
    "startingPrice": {
      "amount": 199,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/mango-mousse-cup.jpg",
        "alt": "LaHaven Alphonso Mango Mousse Cup",
        "width": 1000,
        "height": 800
      },
      {
        "src": "/images/products/mango-raspberry-cake.jpg",
        "alt": "Alphonso Mango Mousse Cup — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/hero/mango-raspberry-desktop.jpg",
        "alt": "Alphonso Mango Mousse Cup — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "mousse",
      "mango",
      "alphonso",
      "cup",
      "fruit",
      "eggless"
    ],
    "isAvailable": true,
    "isFeatured": false,
    "occasions": [
      "birthday",
      "party",
      "just-because"
    ],
    "sizes": [
      "Set of 2",
      "Set of 4"
    ],
    "flavors": [
      "Alphonso Mango"
    ],
    "flavorProfile": "fruit-berry",
    "isEggless": true
  },
  {
    "id": "gourmet-cookie-box",
    "name": "Artisan Cookie Selection Box",
    "slug": "gourmet-cookie-box",
    "shortDescription": "Assorted handcrafted cookies — Belgian chocolate chip, almond biscotti, and salted caramel.",
    "description": "A thoughtfully curated selection of handcrafted artisan cookies. Belgian dark chocolate chip, toasted almond biscotti, and rich salted caramel cookies — each baked fresh and boxed in our signature packaging.",
    "category": "desserts",
    "subcategory": "Sweet Bites",
    "startingPrice": {
      "amount": 299,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/cookies-selection.jpg",
        "alt": "LaHaven Artisan Cookie Selection Box",
        "width": 1000,
        "height": 800
      },
      {
        "src": "/images/products/gourmet-macarons.jpg",
        "alt": "Artisan Cookie Selection Box — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/fudge-brownie-stack.jpg",
        "alt": "Artisan Cookie Selection Box — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "cookies",
      "artisan",
      "gift box",
      "assorted",
      "eggless"
    ],
    "isAvailable": true,
    "isFeatured": false,
    "occasions": [
      "gift",
      "corporate",
      "just-because",
      "party"
    ],
    "sizes": [
      "Box of 6",
      "Box of 12"
    ],
    "flavors": [
      "Chocochip",
      "Almond Biscotti",
      "Salted Caramel"
    ],
    "flavorProfile": "party-bites",
    "isEggless": true
  },
  {
    "id": "artisan-muffins",
    "name": "Artisan Muffin Selection",
    "slug": "artisan-muffins",
    "shortDescription": "Soft bakery muffins — blueberry, double chocolate, and banana walnut.",
    "description": "Dome-topped artisan muffins baked fresh each morning. Bursting with real blueberries, chunks of dark Belgian chocolate, or caramelised banana and walnut. Perfectly portioned for breakfast, gifting, or office celebrations.",
    "category": "desserts",
    "subcategory": "Sweet Bites",
    "startingPrice": {
      "amount": 249,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/muffins-selection.jpg",
        "alt": "LaHaven Artisan Muffin Selection",
        "width": 1000,
        "height": 800
      },
      {
        "src": "/images/products/artisan-cupcakes.jpg",
        "alt": "Artisan Muffin Selection — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/cookies-selection.jpg",
        "alt": "Artisan Muffin Selection — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "muffins",
      "blueberry",
      "chocolate",
      "banana",
      "eggless"
    ],
    "isAvailable": true,
    "isFeatured": false,
    "occasions": [
      "birthday",
      "corporate",
      "just-because",
      "party"
    ],
    "sizes": [
      "Box of 4",
      "Box of 6"
    ],
    "flavors": [
      "Blueberry",
      "Double Chocolate",
      "Banana Walnut"
    ],
    "flavorProfile": "fruit-berry",
    "isEggless": true
  },
  {
    "id": "chocolate-crunchy-cake",
    "name": "Chocolate Crunchy Praline Cake",
    "slug": "chocolate-crunchy-cake",
    "shortDescription": "Belgian dark chocolate ganache layered with crispy hazelnut feuilletine crunch.",
    "description": "Rich chocolate sponge layered with silky dark chocolate ganache and roasted hazelnut feuilletine crunch for an irresistible texture in every bite.",
    "category": "celebration-cakes",
    "subcategory": "Crunchy Truffle",
    "startingPrice": {
      "amount": 849,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/chocolate-crunchy-cake.jpg",
        "alt": "LaHaven Chocolate Crunchy Praline Cake",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/ferrero-rocher-cake.jpg",
        "alt": "Chocolate Crunchy Praline Cake — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/ferrero-pastry.jpg",
        "alt": "Chocolate Crunchy Praline Cake — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "chocolate",
      "crunchy",
      "praline",
      "eggless",
      "bestseller"
    ],
    "isEggless": true,
    "isAvailable": true,
    "isFeatured": true,
    "occasions": [
      "birthday",
      "anniversary",
      "celebration"
    ],
    "sizes": [
      "0.5 kg",
      "1.0 kg",
      "1.5 kg",
      "2.0 kg"
    ],
    "flavors": [
      "Crunchy Praline",
      "Belgian Dark"
    ],
    "flavorProfile": "chocolate"
  },
  {
    "id": "chocolate-forest-cake",
    "name": "Belgian Chocolate Forest Gateau",
    "slug": "chocolate-forest-cake",
    "shortDescription": "Dark cocoa sponge, cherry reduction, whipped cream, and shaved Belgian chocolate bark.",
    "description": "An artisan upgrade to the classic forest gateau — layered with dark chocolate mousse, tart cherry compote, and tall Belgian chocolate bark curls.",
    "category": "celebration-cakes",
    "subcategory": "Forest Collection",
    "startingPrice": {
      "amount": 829,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/chocolate-forest-cake.jpg",
        "alt": "LaHaven Belgian Chocolate Forest Gateau",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/black-forest-classic.jpg",
        "alt": "Belgian Chocolate Forest Gateau — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/swiss-chocolate-cake.jpg",
        "alt": "Belgian Chocolate Forest Gateau — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "chocolate",
      "forest",
      "cherry",
      "eggless"
    ],
    "isEggless": true,
    "isAvailable": true,
    "isFeatured": false,
    "occasions": [
      "birthday",
      "celebration",
      "anniversary"
    ],
    "sizes": [
      "0.5 kg",
      "1.0 kg",
      "1.5 kg"
    ],
    "flavors": [
      "Dark Chocolate Cherry"
    ],
    "flavorProfile": "chocolate"
  },
  {
    "id": "belgium-pastry",
    "name": "Belgian Dark Truffle Pastry",
    "slug": "belgium-pastry",
    "shortDescription": "Individual layered slice of our signature 54% Belgian dark chocolate truffle.",
    "description": "Five delicate layers of moist Dutch cocoa sponge and 54% Belgian couverture ganache, topped with a chocolate rosette. Perfect for instant indulgence.",
    "category": "desserts",
    "subcategory": "Pastries",
    "startingPrice": {
      "amount": 179,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/belgium-pastry.jpg",
        "alt": "LaHaven Belgian Dark Truffle Pastry",
        "width": 1000,
        "height": 800
      },
      {
        "src": "/images/products/belgian-chocolate-truffle.jpg",
        "alt": "Belgian Dark Truffle Pastry — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/ferrero-pastry.jpg",
        "alt": "Belgian Dark Truffle Pastry — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "pastry",
      "chocolate",
      "belgian",
      "eggless"
    ],
    "isEggless": true,
    "isAvailable": true,
    "isFeatured": false,
    "occasions": [
      "just-because",
      "party",
      "birthday"
    ],
    "sizes": [
      "Box of 2",
      "Box of 4"
    ],
    "flavors": [
      "54% Belgian Truffle"
    ],
    "flavorProfile": "chocolate"
  },
  {
    "id": "ferrero-pastry",
    "name": "Ferrero Rocher Hazelnut Pastry",
    "slug": "ferrero-pastry",
    "shortDescription": "Hazelnut praline and Nutella ganache pastry crowned with Ferrero crunch.",
    "description": "Decadent chocolate sponge layered with roasted hazelnut praline, Nutella cream, and crunchy wafer feuilletine in individual patisserie slices.",
    "category": "desserts",
    "subcategory": "Pastries",
    "startingPrice": {
      "amount": 199,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/ferrero-pastry.jpg",
        "alt": "LaHaven Ferrero Rocher Hazelnut Pastry",
        "width": 1000,
        "height": 800
      },
      {
        "src": "/images/products/ferrero-rocher-cake.jpg",
        "alt": "Ferrero Rocher Hazelnut Pastry — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/belgium-pastry.jpg",
        "alt": "Ferrero Rocher Hazelnut Pastry — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "pastry",
      "ferrero",
      "hazelnut",
      "contains-egg"
    ],
    "isEggless": false,
    "isAvailable": true,
    "isFeatured": false,
    "occasions": [
      "just-because",
      "party",
      "anniversary"
    ],
    "sizes": [
      "Box of 2",
      "Box of 4"
    ],
    "flavors": [
      "Ferrero Hazelnut"
    ],
    "flavorProfile": "nutty-caramel"
  },
  {
    "id": "fudge-brownie-stack",
    "name": "Belgian Fudge Brownie Gift Stack",
    "slug": "fudge-brownie-stack",
    "shortDescription": "Ribbon-tied stack of warm gooey dark chocolate fudge brownies.",
    "description": "Hand-cut slabs of dense, crackle-top Belgian dark chocolate fudge brownies stacked for celebrations, office gifting, and dessert tables.",
    "category": "desserts",
    "subcategory": "Brownies",
    "startingPrice": {
      "amount": 449,
      "currency": "INR",
      "label": "Starting from"
    },
    "images": [
      {
        "src": "/images/products/fudge-brownie-stack.jpg",
        "alt": "LaHaven Belgian Fudge Brownie Gift Stack",
        "width": 1000,
        "height": 800
      },
      {
        "src": "/images/products/chocochips-brownie.jpg",
        "alt": "Belgian Fudge Brownie Gift Stack — Angle 2",
        "width": 1200,
        "height": 900
      },
      {
        "src": "/images/products/choco-lava.jpg",
        "alt": "Belgian Fudge Brownie Gift Stack — Texture & Slice Detail",
        "width": 1200,
        "height": 900
      }
    ],
    "tags": [
      "brownie",
      "fudge",
      "gift",
      "eggless"
    ],
    "isEggless": true,
    "isAvailable": true,
    "isFeatured": false,
    "occasions": [
      "gift",
      "corporate",
      "birthday"
    ],
    "sizes": [
      "Box of 4",
      "Box of 8"
    ],
    "flavors": [
      "Belgian Fudge",
      "Sea Salt Caramel"
    ],
    "flavorProfile": "chocolate"
  }
];

/**
 * Returns all products belonging to a given category.
 */
export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((product) => product.category === category);
}

/**
 * Returns all featured products.
 */
export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.isFeatured);
}

const SLUG_ALIASES: Record<string, string> = {
  'heart-shaped-strawberry': 'heart-shaped-strawberry-bento',
  'blueberry-cake': 'blueberry-bento-cake',
  'blueberry-petite-bento': 'blueberry-bento-cake',
  'strawberry-heart': 'heart-shaped-strawberry-bento',
  'chocolate-truffle': 'chocolate-truffle-cake',
  'belgian-truffle': 'chocolate-truffle-cake',
  'red-velvet': 'red-velvet-cake',
  'black-forest': 'black-forest-cake',
  'mango-raspberry': 'mango-raspberry-cake',
  'classic-cheesecake': 'classic-cheesecake',
};

/**
 * Finds a single product by its slug (URL-friendly identifier) with fallback aliases.
 */
export function getProductBySlug(slug: string): Product | undefined {
  if (!slug) return undefined;
  const direct = products.find((product) => product.slug === slug || product.id === slug);
  if (direct) return direct;

  const aliased = SLUG_ALIASES[slug];
  if (aliased) {
    const aliasMatch = products.find((product) => product.slug === aliased || product.id === aliased);
    if (aliasMatch) return aliasMatch;
  }

  // Fuzzy fallback: check if product slug or id includes target or vice versa
  return products.find(
    (product) =>
      slug.includes(product.slug) ||
      product.slug.includes(slug) ||
      slug.includes(product.id) ||
      product.id.includes(slug)
  );
}
