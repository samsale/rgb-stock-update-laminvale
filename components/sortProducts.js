function compareSkus(array, newSku) {
  return array.find(object => object.sku === newSku);
}

module.exports =  async (stockUpdateArray, inStoreArray) =>{
  let notInStoreArray = []
  let alreadyInStoreArray = []
  for(let value of stockUpdateArray){
    if(compareSkus(inStoreArray, value['Stock Code']) === undefined){
      notInStoreArray.push(value)
    }else{
      let objWithProductId = inStoreArray.find(obj => obj.sku === value['Stock Code']);
      value["inventory_item_id"] = objWithProductId.inventory_item_id
      alreadyInStoreArray.push(value)
    }
  }
  console.log(`${alreadyInStoreArray.length} products to update`);
  return alreadyInStoreArray
}
