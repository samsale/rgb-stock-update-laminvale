const dotenv = require('dotenv').config()
const Shopify = require('shopify-api-node');

// create shopify store object
const shopify = new Shopify({
  shopName: process.env.SHOPIFY_NAME,
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_PASSWORD,
  autoLimit: { calls: 1, interval: 500, bucketSize: 5 },
  timeout: 60000
});


//get total number of products
async function getNumberOfPrducts(){
let numberOfProducts = await shopify.product.count()
console.log(num);
return Math.ceil(numberOfProducts/250)
}
