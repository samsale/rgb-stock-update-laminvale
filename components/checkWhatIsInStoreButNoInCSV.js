function compareSkus(array, newSku) {
  return array.find(object => object["Stock Code"] === newSku);
}

module.exports =  (stockUpdateArray, inStoreArray) =>{
  let notInCsvArray = []
  for(let value of inStoreArray){
    if(!compareSkus(stockUpdateArray, value.sku)){
      notInCsvArray.push(value)
    }
  }
  return notInCsvArray
}
