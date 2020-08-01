const { google } = require('googleapis');
const privatekey = require('../credentials.json');
const fs = require('fs');
const csv = require('csvtojson')


var laminvaleSheetFileId = '1xt0oBVdAjRmpy0LXwdN8J311na_K8lBAMXmE2KBBISg';


const createJTW = () => {

  // configure a JWT auth client
  let jwtClient = new google.auth.JWT(
    privatekey.client_email,
    null,
    privatekey.private_key,
    ['https://www.googleapis.com/auth/drive'],
    'sales@rubys-garden-boutique.co.uk'
  );
  //authenticate request
  jwtClient.authorize((err, tokens) => {
    if (err) {
      throw err
    } else {
      console.log("Successfully connected to Google Drive!");

    }
  });
  return jwtClient
}

const downloadCSV =  () => {
return new Promise(function(resolve, reject) {
  let auth = createJTW()
  const dest = fs.createWriteStream('/tmp/stock.csv');
  const drive = google.drive({version: 'v3', auth});
  drive.files.export({fileId: laminvaleSheetFileId, mimeType: 'text/csv'}, {responseType: 'stream'},

      function(err, res){

          res.data
          .on('end', () => {
            console.log('CSV Donwloaded');
              resolve('CSV Donwloaded')

          })
          .on('error', err => {
              console.log('Error', err);
          })
          .pipe(dest);
          }
  );
    });
}

const createJsonFromCSV = async () => {

let csvData = fs.readFileSync('/tmp/stock.csv', 'utf8')

//Convert CSV string to Array and remove the first two elements i.e. the first 2 rows of the csv
let stringWithRowsRemoved = csvData.split('\n').slice(2)
//Convert the Array to JSON
let jsonOfSkusAndQty = await csvToJson(stringWithRowsRemoved.toString())

return jsonOfSkusAndQty
}


const csvToJson = async  (csvStr) => {
  const jsonArray = await csv({
    noheader:true,
    headers: ['blank','sku', 'desc', 'qty']
})
 .fromString(csvStr)

 return jsonArray
}

module.exports =  async () => {
  let csvAsJson = await downloadCSV()
  let jsonDataOfStock = await createJsonFromCSV()
  return jsonDataOfStock
}
