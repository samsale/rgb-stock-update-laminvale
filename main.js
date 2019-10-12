const dotenv = require('dotenv').config()
const dropboxToJson = require('./dropboxToJson');
const downloadShopifyProducts = require('./downloadShopifyProducts');
const checkWhatIsInStore = require('./sortProducts');
const updateStock = require('./updateStock');
const sendPushMessage = require('./sendPushMessage');

const main = async () => {
  try{
  let stockUpdateArray = await dropboxToJson.main()
  let productsArray = await downloadShopifyProducts.downloadShopifyData()
  let shopifyUpdateArray = await checkWhatIsInStore.checkWhatIsInStore(stockUpdateArray, productsArray)
  await updateStock.updateShopify(shopifyUpdateArray)
  await sendPushMessage.sendPushMessage()
  }
  catch(err){
     sendPushMessage.sendPushMessage(err.name)
     console.log(err);
  }
}

main()
