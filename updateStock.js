const Shopify = require('shopify-api-node');

// create shopify store object
const shopify = new Shopify({
  shopName: process.env.SHOPIFY_NAME,
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_PASSWORD,
  autoLimit: { calls: 1, interval: 500, bucketSize: 5 },
  timeout: 60000
});


const updateShopify = async (arrayOfProducts) => {
  let count = 0
  for(let product of arrayOfProducts){
    let response = await shopify.inventoryLevel.set({"inventory_item_id": product['inventory_item_id'],
                                      "location_id": 4045635628,
                                      "available":product['Qty in Stock)']})
    count++
  }
  console.log(`${count} products updated in store`);
}

module.exports = {updateShopify}
