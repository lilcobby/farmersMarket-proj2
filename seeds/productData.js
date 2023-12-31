const productData = [
     {
          id: "1",
          name: "Fuji Apples",
          description:
               "Fuji apples are a crisp, sweet apple with a juicy texture. They are a great snacking apple and are delicious in salads, pies, sauces, and baked goods.",
          price: 1.5,
          stock: 39,
          image_url: "https://images.publixcdn.com/pct/images/products/20000/023833-600x600-A.jpg",
          category_id: 1,
          vendor_id: 1,
     },
     {
          id: "2",
          name: "Organic Granny Smith Apples",
          description:
               "Granny Smith apples are a tart apple with a firm texture. They are bright green in color and are excellent for both cooking and snacking.",
          price: 2.0,
          stock: 33,
          image_url: "https://images.publixcdn.com/pct/images/products/25000/025858-600x600-A.jpg",
          category_id: 1,
          vendor_id: 1,
     },
     {
          id: "3",
          name: "Danvers Carrots",
          description: "Danvers carrots are firm and crunchy, with excellent flavor that can be enhanced by cooking. This 'half-size' variety holds its shape well when cooked, making it ideal for soups, stews, roasting, or stir-frying.",
          price: 2.75,
          stock: 54,
          image_url: "https://isteam.wsimg.com/neb/obj/Mzc4NTJCQTI0OTQzQURDREUwNDk6YzQyNDI0ZTc5OWExNmUwOGYyZDIzODM2MDVlMWYwZTU6Ojo6OjA=/:/rs=w:600,h:600",
          categories: "Category3",
          vendor_id: 6,
     },
     {
          id: "4",
          name: "Organic Purple Carrots",
          description: "Purple carrots are a colorful twist on a classic vegetable. They are sweet and earthy in flavor, often with a peppery taste. These carrots are great to eat raw, as cruudites, or can be used to make spicy carrot pickles",
          price: 3.5,
          stock: 25,
          image_url: "https://media.istockphoto.com/photos/purple-carrots-isolated-picture-id484817111?k=6&m=484817111&s=612x612&w=0&h=MB8bpiVvPvrn0-DeLCjyJxx1dYtppqSr8VmEogDjviI=",
          categories: "Category4",
          vendor_id: 4,
     },
     {
          id: "5",
          name: "Beefsteak Tomatoes",
          description: "The Beefsteak Tomato is a large, red, heirloom tomato cultivar generally considered to be the classic slicing variety of tomato. They are known for their huge size, firm texture, and old-fashioned characteristic tomato taste and aroma.",
          price: 3.5,
          stock: 44,
          image_url: "https://cdn.shopify.com/s/files/1/1698/1675/products/Tomato_Beefsteak.jpg?v=1555102096",
          categories: "Category5",
          vendor_id: 4,
     },
     {
          id: "6",
          name: "Cherokee Purple Tomatoes",
          description: "Cherokee Purple is renowned for its full old-fashioned tomato taste. The balance of sweetness and acidity is near perfect. The fruits are juicy with a nice firm texture, making them perfect for slicing and snacking",
          price: 3.75,
          stock: 32,
          image_url: "https://cdn.shopify.com/s/files/1/1698/1675/products/Tomato_Cherokee_Purple.jpg?v=1537064909",
          categories: "Category6",
          vendor_id: 5,
          is_active: true,
     },
     {
          id: "7",
          name: "Roma Tomatoes",
          description: "Roma tomatoes are egg- or pear-shaped and red when fully ripe. They have few seeds and their robust flavor makes them excellent for canning and sauces.",
          price: 1.5,
          stock: 110,
          image_url: "https://www.nicepng.com/png/detail/17-177062_tomatoes-plum-tomato-roma.png",
          categories: "Category7",
          vendor_id: 5,
     },
     {
          id: "8",
          name: "Colorado Freestone Peaches",
          description: "Colorado Freestone Peaches are a sweet, juicy peach with a firm texture. These large variety peaches are excellent for eating fresh, canning, baking, and grilling.",
          price: 3.5,
          stock: 45,
          image_url: "https://cdn.shopify.com/s/files/1/0731/1159/products/Peaches_Colorado_Freestone_3_1200x1200.jpg?v=1530229567",
          categories: "Category8",
          vendor_id: 6,
     },
     {
          id: "9",
          name: "Ghost Peppers",
          description: "Ghost peppers are renowned for their exceptional spiciness, registering significantly higher on the Scoville scale than other well-known chili varieties like jalapeños or habaneros. Ghost peppers exhibit a distinctly fruity and mildly sweet taste.",
          price: 2.0,
          stock: 60,
          image_url: "https://spicytrio.com/wp-content/uploads/2021/06/Ghost-Pepper-1.jpg",
          categories: "Category9",
          vendor_id: 6,
     },
     {
          id: "10",
          name: "Chocolate Habanero Peppers",
          description: "Chocolate habanero peppers are known for their intense heat and sweet, fruity flavor. It has a unique, citrus-like taste with a subtle hint of smoke that makes it very popular in hot sauces, powders, and rubs.",
          price: 1.5,
          stock: 35,
          image_url: "https://growingnorth.ca/wp-content/uploads/2020/04/Pepper-Chocolate-Habanero-Hpp136-DSC00397_11.jpg",
          categories: "Category10",
          vendor_id: 3,
     },
     {
          id: "11",
          name: "Napa Cabbage",
          description: "Napa cabbage is a type of Chinese cabbage. It is a large, leafy vegetable that is used in a variety of dishes, including stir-fries, soups, kimchi, and slaws.",
          price: 2.75,
          stock: 24,
          image_url: "https://www.specialtyproduce.com/sppics/65721.png",
          categories: "Category11",
          vendor_id: 3,
     },
     {
          id: "12",
          name: "Savoy Cabbage",
          description: "Savoy cabbage is a type of cabbage that has crinkled, lacy leaves that are more loosely packed than regular green cabbage. It has a mild flavor and is tender and crisp when cooked.",
          price: 3.0,
          stock: 22,
          image_url: "https://step-by-step-cook.co.uk/images/vegetables/savoy/savoy.jpg",
          categories: "Category12",
          vendor_id: 3,
     },
     {
          id: "13",
          name: "Red Cabbage",
          description: "Red cabbage is a type of cabbage that has a deep purple color. It is a popular vegetable in Europe and Asia, where it is used in a variety of dishes, including salads, soups, saurkrut, and stir-fries.",
          price: 2.0,
          stock: 51,
          image_url: "https://seedlefarms.com/wp-content/uploads/2021/04/Red-Cabbage-600x450.jpg",
          categories: "Category13",
          vendor_id: 4,
          is_active: true,
     },
     {
          id: "14",
          name: "Red Raspberries",
          description: "Red raspberries are a sweet, juicy berry with a tart flavor. They are excellent for eating fresh, baking, and making jams and jellies.",
          price: 5.0,
          stock: 20,
          image_url: "https://thumbs.dreamstime.com/b/red-raspberries-plate-close-up-berries-consumption-red-raspberries-plate-close-up-berries-consumption-140732638.jpg",
          categories: "Category14",
          vendor_id: 4,
          is_active: true,
     },
     {
          id: "15",
          name: "All-star Strawberries",
          description: "All-star strawberries are a large, sweet strawberry with a juicy texture. They are excellent for eating fresh, baking, and making jams and jellies.",
          price: 4.25,
          stock: 41,
          image_url: "https://www.akfruitsandberries.com/wp-content/uploads/2020/12/allstar.jpg",
          categories: "Category15",
          vendor_id: 4,
          is_active: true,
     },
     {
          id: "16",
          name: "Pawpaw fruit",
          description: "Pawpaws are a sweet, fruit with a creamy texture.These fruits are native to the Appalachian reigon and are excellent for eating fresh, baking, and making jams and jellies.",
          price: 1.25,
          stock: 62,
          image_url: "https://marylandgrows.files.wordpress.com/2021/07/hgic_fruits_pawpaw_gettystock.jpg",
          categories: "Category16",
          vendor_id: 4,
          is_active: true,
     },
];

module.exports = productData;
