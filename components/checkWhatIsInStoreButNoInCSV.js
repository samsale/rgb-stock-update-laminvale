function compareSkus(array, newSku) {
  return array.find(object => object["Stock Code"] === newSku);
}

const checkWhatIsInStoreButNoInCSV = (stockUpdateArray, inStoreArray) =>{
  let notInCsvArray = []
  for(let value of inStoreArray){
    if(!compareSkus(stockUpdateArray, value.sku)){
      notInCsvArray.push(value)
    }
  }
  return notInCsvArray
}

module.exports = {checkWhatIsInStoreButNoInCSV}
