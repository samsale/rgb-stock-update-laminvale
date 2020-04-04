const Shopify = require('shopify-api-node');
const https = require('https');

// create shopify store object
const shopify = new Shopify({
  shopName: process.env.SHOPIFY_NAME,
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_PASSWORD,
  autoLimit: { calls: 2, interval: 5000, bucketSize: 35 },
  timeout: 180000 //six minutes
});

//get total number of products
async function getNumberOfPrducts(){
let numberOfProducts = await shopify.product.count()
return Math.ceil(numberOfProducts/250)
}

// create config for get requests to get data from multiple pages
function createApiCallForInstoreProducts(pages){
  let arrayOfOptions = []
  for(let i=1; i <= pages; i++){
    var optionsObj = {
      host:`${process.env.SHOPIFY_NAME}.myshopify.com`,
      port: 443,
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(process.env.SHOPIFY_API_KEY +
        ':' + process.env.SHOPIFY_PASSWORD).toString('base64')
      }
    }
    optionsObj["path"] = `/admin/variants.json?limit=250&page=${i}&fields=product_id,sku,inventory_item_id,id`
    arrayOfOptions.push(optionsObj)
  }
  return arrayOfOptions
}

// uses config objects for http get request and returns array of objects
async function getVariantsSkus(optionsArray){
  let inStoreSkus = []
  for(let value of optionsArray){
    let product = await getAPIData(value)
    inStoreSkus.push(product.variants)
  }
  return [].concat.apply([], inStoreSkus)

}

//calls shopify API and returns json
function getAPIData(optionsObj){

  return new Promise((resolve, reject) => {
    let dataArray = []
    https.get(optionsObj,(result)=>{
      result.on('data', function(data) {
        dataArray.push(data);
      }).on('end', function() {
        let data   = Buffer.concat(dataArray);
        let schema = JSON.parse(data);
        resolve(schema)
      });
      result.on('error', (error)=> {
          reject(error)
          });
        });
    })
}

module.exports = async function() {
  let numberOfPages = await getNumberOfPrducts()
  let arrayOfOptions = await createApiCallForInstoreProducts(numberOfPages)
  let products = await getVariantsSkus(arrayOfOptions)
  console.log(`${products.length} products downloaded from store`);
  return products
}
