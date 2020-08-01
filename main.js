const dotenv = require('dotenv').config()
const googleDriveToJson = require('./components/googleDriveToJson');
const downloadShopifyProducts = require('./components/downloadShopifyProducts');
const checkWhatIsInStore = require('./components/sortProducts');
const updateStock = require('./components/updateStock');
const checkWhatIsInStoreButNoInCSV = require('./components/checkWhatIsInStoreButNoInCSV');
const updateProductThatIsNotInCsv = require('./components/updateProductThatIsNotInCsv');
const sendPushMessage = require('./components/sendPushMessage');

const index = async () => {
  try{
    let stockUpdateArray = await googleDriveToJson()
    let productsArray = await downloadShopifyProducts()
    let productsNotInCsvArray = await checkWhatIsInStoreButNoInCSV(stockUpdateArray, productsArray)
    await updateProductThatIsNotInCsv(productsNotInCsvArray)
    let shopifyUpdateArray = await checkWhatIsInStore(stockUpdateArray, productsArray)
    let numberOfProductsUpdated = await updateStock(shopifyUpdateArray)
    await sendPushMessage(`${numberOfProductsUpdated} products updated`,  -2)
  }
  catch(err){
     await sendPushMessage(`Error (${err.source})`, 1)
     console.log(err);
  }
}

exports.handler = index;
