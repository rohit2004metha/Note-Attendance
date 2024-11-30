const { GoogleSpreadsheet } = require('google-spreadsheet')

async function getColumnIndexFromName(columnName) {
  const doc = new GoogleSpreadsheet('YOUR_SPREADSHEET_ID')

  // Load the credentials JSON file obtained from Google Developers Console
  await doc.useServiceAccountAuth({
    client_email: 'YOUR_SERVICE_ACCOUNT_EMAIL',
    private_key: 'YOUR_PRIVATE_KEY',
  })

  await doc.loadInfo() // Load spreadsheet information

  const sheet = doc.sheetsByIndex[0] // Assuming you want to access the first sheet
  await sheet.loadHeaderRow() // Load header row to get column names

  const columnIndex = sheet.headerValues.indexOf(columnName) // Get the index of the column name

  if (columnIndex === -1) {
    console.log(`Column "${columnName}" not found.`)
    return
  }

  await sheet.loadCells(`A${sheet.headerProperties.length + 1}:A`) // Load all cells in the column

  const columnValues = []
  for (let i = sheet.headerProperties.length + 1; i < sheet.rowCount; i++) {
    const cell = sheet.getCell(i, columnIndex)
    columnValues.push(cell.value)
  }

  console.log(`Column "${columnName}" values:`)
  console.log(columnValues)
}

// Call the function with the column name you want to access
getColumnIndexFromName('Column1') // Replace 'Column1' with the desired column name
