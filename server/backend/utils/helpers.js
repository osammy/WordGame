const Excel = require('exceljs');
const tempfile = require('tempfile');
const HeaderRowsCount = 1;
const handleError = require('./handleError');
const path = require('path');

async function generateSalesReport(salesNumbers,worksheetColumn,res) {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Sales Data');
//   var imageId1 = workbook.addImage({
//     filename: './img/instagram.png',
//     extension: 'png',
//     },'G11:K18');

// worksheet.getCell('A5').value = 'H';
// worksheet.getCell('A6').value = 'E';
// worksheet.getCell('A7').value = 'L';
// worksheet.getCell('A7').value = 'L';
// worksheet.getCell('A8').value = 'O';


worksheet.columns = worksheetColumn;
worksheet.getColumn(10).numFmt = '"₦"#,##0.00;[Red]\-"₦"#,##0.00';
worksheet.getColumn(11).numFmt = '"₦"#,##0.00;[Red]\-"₦"#,##0.00';
worksheet.getColumn(12).numFmt = '"₦"#,##0.00;[Red]\-"₦"#,##0.00';
worksheet.getColumn(13).numFmt = '"₦"#,##0.00;[Red]\-"₦"#,##0.00';
worksheet.getColumn(14).numFmt = '"₦"#,##0.00;[Red]\-"₦"#,##0.00';
worksheet.getColumn(15).numFmt = '"₦"#,##0.00;[Red]\-"₦"#,##0.00';
worksheet.getColumn(16).numFmt = '"₦"#,##0.00;[Red]\-"₦"#,##0.00';
worksheet.getColumn(1).fill = {
    type: 'pattern',
    pattern:'solid',
    fgColor:{argb:'FFFFFF00'},
    bgColor:{argb:'FF0000FF'}
};

    
const worksheetColumns = [ 
    { header: '', key: '', width: 7 },
    { header: 'ID', key: 'tracking_id', width: 12 },
    { header: 'Weight', key: 'weight', width: 10 },
    { header: 'Handling', key: 'handling', width: 10 },
    { header: 'Origin', key: 'origin', width: 10 },
    { header: 'Destination', key: 'destination', width: 10 },
    { header: 'Shipment Type', key: 'shipment_type', width: 10 },
    { header: 'Special Shipment Subcategory', key: 'special_shipment_subcategory', width: 20 },
    { header: 'Shipper Category', key: 'shipper_category', width: 20 },
    { header: 'Shipment Status', key: 'status', width: 20 },
    { header: 'Cost(₦)', key: 'cost', width: 10 },
    { header: 'Packaging Cost', key: 'packaging_cost', width: 10 },
    { header: 'Handling Cost', key: 'handling_cost', width: 10 },
    { header: 'Tax(₦)', key: 'tax', width: 7 },
    { header: 'Insurance(₦)', key: 'insurance_cost', width: 7 },
    { header: 'Total(₦)', key: 'total', width: 10 },
    { header: 'Payment Method', key: 'payment_method', width: 10 },
    { header: 'Payment Status', key: 'payment_status', width: 10 },
    { header: 'Sender Name', key: 'senderName', width: 20 },
    { header: 'Sender Phone', key: 'senderPhone', width: 20 },
    { header: 'Receiver Name', key: 'receiverName', width: 20 },
    { header: 'Receiver Phone', key: 'receiverPhone', width: 20 },
    { header: 'Date', key: 'created_at', width: 10 },

    // { header: 'Tax(%)', key: 'Tax', width: 10 },
  ];

    salesNumbers.forEach((data, index) => {
        const {tracking_id,weight,cost,tax,insurance_cost,total,created_at,payment_method,payment_status,special_shipment_subcategory,
               sender:{fullname:senderName,phone:senderPhone},origin:{name:origin},destination:{name:destination},handling_cost,
               packaging_cost,shipment_type,shipper_category,handling,status,
               receiver:{fullname:receiverName,phone:receiverPhone},attendant:{first_name,last_name}} = data;
        
        const excelData = {tracking_id,weight,handling,origin,destination,shipment_type,special_shipment_subcategory,shipper_category,status,cost,packaging_cost,handling_cost,tax,insurance_cost,total,payment_method,payment_status,senderName,senderPhone,
        receiverName,receiverPhone,created_at};
        
        worksheet.addRow({
            ...excelData
        });
    });

    const totalsRow = worksheet.addRow([
    salesNumbers[0].origin.name,
    'Total','','','','','','','','','','','','','',generateTotalCost(salesNumbers,worksheet),'','','','','','','','']);



  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  totalsRow.eachCell((cell) => {
    cell.font = { bold: true };
    cell.border = {
      top: { style: 'thin' }, bottom: { style: 'double' },
    };
  });

    worksheet.views = [
    { state: 'frozen', xSplit: 1, ySplit: 1, activeCell: 'B2' },
  ];
  
  // const filename = 'sales-report-'+generateRandomString() +'.xlsx';
  // console.log('..creating workbook')
  // await workbook.xlsx.writeFile(filename);
  const now = +(new Date())
  const filename = salesNumbers[0].origin.name.toUpperCase() + '-'+now +'.xlsx';
  let filePath = './reports/'+filename; 
//  filePath = path.resolve(__dirname, 'reports',filename)
  
  try {
    await workbook.xlsx.writeFile(filePath);
    res.json({url:filePath});
    console.log('..done');  
  }
  catch(e) {
    console.log(e);
    handleError(res,500,"Error in creating the excel sheet");
  }
  
    
//  res.download(filePath);
  // var rstream = fs.createReadStream(filename);
  // rstream.pipe(workbook.xlsx.createInputStream());
  

}

function generateTotalCost(salesNumbers,worksheet) {
    let total = 0;
    console.log('salesNumbers',salesNumbers)
    salesNumbers.forEach(function(data){
        total += Number(data.total);
    })

    return total;
}


function generateWeeklyTotalsCell(worksheet, columnLetter, totalDataRows) {
  const firstDataRow = HeaderRowsCount + 1;
  const lastDataRow = firstDataRow + totalDataRows - 1;

  const firstCellReference = `${columnLetter}${firstDataRow}`;
  const lastCellReference = `${columnLetter}${lastDataRow}`;
  const sumRange = `${firstCellReference}:${lastCellReference}`;
  
  return {
    formula: `SUM(${sumRange})`,
  };
}

function generateProductTotalsCell(worksheet, rowIndex) {
  const firstColumn = 'B';
  const lastColumn = 'D';

  const firstCellReference = `${firstColumn}${rowIndex + HeaderRowsCount}`;
  const lastCellReference = `${lastColumn}${rowIndex + HeaderRowsCount}`;

  const sumRange = `${firstCellReference}:${lastCellReference}`;
  console.log(`summing from ${sumRange}`)

  return {
    formula: `SUM(${sumRange})`,
  };
}

function generateRandomString() {
 var text = "";
 var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

 for (var i = 0; i < 5; i++)
   text += possible.charAt(Math.floor(Math.random() * possible.length));

 return text;
}

function isEmpty(obj){
    for (var key in obj){
        if(obj.hasOwnProperty(key)) {
            return false;
        }
        
        return true;
    }
}



module.exports = {
    generateSalesReport:generateSalesReport,
    generateRandomString:generateRandomString,
    isEmpty:isEmpty
}