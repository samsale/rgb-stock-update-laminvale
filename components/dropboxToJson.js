var fetch = require('node-fetch');
var XLSX = require('xlsx')
request = require('request');
var Dropbox = require('dropbox').Dropbox;

var dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN,
                        fetch});

const downloadSpreadSheet = async () => {
  const listOfFiles = await dbx.filesListFolder({path: '/stock updates'})
  const path = listOfFiles.entries[0].path_lower
  return dbx.filesDownload({path: path})
}

const parseSpreadSheetToJson = async (spreadSheet) => {
        var workbook = XLSX.read(spreadSheet.fileBinary);
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        var stockArray = XLSX.utils.sheet_to_json(worksheet, {range: 1});
        return stockArray
}

const main = async () => {
  let xlsxFile = await downloadSpreadSheet()
  let stockArray = await parseSpreadSheetToJson(xlsxFile)
  console.log(`${stockArray.length} products in Dropbox csv`);
  return stockArray
}


module.exports = {main}
