const Shopify = require('shopify-api-node');

// create shopify store object
const shopify = new Shopify({
  shopName: process.env.SHOPIFY_NAME,
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_PASSWORD,
  autoLimit: { calls: 1, interval: 500, bucketSize: 5 },
  timeout: 60000
});


module.exports = async (productsNotInCsvArray) => {
  let laminvaleVendors = ['Alba Krapf', 'Amazonas']
  let params = { fields: 'vendor,tags' }
  let emptyArray = []
  let count = 0
  for(let vendor of laminvaleVendors){
    let fromShopify = await shopify.product.list({vendor: vendor, fields: 'vendor,tags,id'})
      emptyArray.push(fromShopify)
      }
  let laminvaleProductsOnShopify = [].concat.apply([],emptyArray)

  for (var product of laminvaleProductsOnShopify) {
    if(productsNotInCsvArray.some(object => object.product_id === product.id)){
      let tagsToUpdate = product.tags + ", delete"
      await shopify.product.update(product.id, {tags: tagsToUpdate, published_at: null })
      count++
    }
  }
  console.log(`${count} Laminvale products in store by not in csv`);
}
