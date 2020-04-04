const dotenv = require('dotenv').config()
const dropboxToJson = require('./components/dropboxToJson');
const downloadShopifyProducts = require('./components/downloadShopifyProducts');
const checkWhatIsInStore = require('./components/sortProducts');
const updateStock = require('./components/updateStock');
const checkWhatIsInStoreButNoInCSV = require('./components/checkWhatIsInStoreButNoInCSV');
const updateProductThatIsNotInCsv = require('./components/updateProductThatIsNotInCsv');
const sendPushMessage = require('./components/sendPushMessage');

const index = async () => {
  try{
    let stockUpdateArray = await dropboxToJson.main()
    let productsArray = await downloadShopifyProducts.downloadShopifyData()
    let productsNotInCsvArray = await checkWhatIsInStoreButNoInCSV.checkWhatIsInStoreButNoInCSV(stockUpdateArray, productsArray)
    await updateProductThatIsNotInCsv.updateProductThatIsNotInCsv(productsNotInCsvArray)
    let shopifyUpdateArray = await checkWhatIsInStore.checkWhatIsInStore(stockUpdateArray, productsArray)
    await updateStock.updateShopify(shopifyUpdateArray)
    await sendPushMessage.sendPushMessage()
  }
  catch(err){
     sendPushMessage.sendPushMessage(err.name)
     console.log(err);
  }
}

index()
// exports.handler = index;
