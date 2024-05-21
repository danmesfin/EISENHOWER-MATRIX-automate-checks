function onEdit(e) {
  var sheet = e.source.getActiveSheet();
  var range = e.range;
  var column = range.getColumn();
  var row = range.getRow();
  
  // Assuming checkboxes are in column C starting from row 3
  if (sheet.getName() == "Network" && column == 3 && row >= 3 && range.isChecked()) {
    var today = new Date();
    var nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    var timestampRange = sheet.getRange(row, 5); // Column E for timestamps
    timestampRange.setValue(nextMonth);
  }
}

function uncheckExpired() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Network");
  var dataRange = sheet.getRange("C3:E"); // Adjust the range if necessary
  var data = dataRange.getValues();
  var today = new Date();
  
  for (var i = 0; i < data.length; i++) {
    var checkBox = data[i][0];
    var timestamp = data[i][2];
    
    if (checkBox && timestamp) {
      var timestampDate = new Date(timestamp);
      if (timestampDate <= today) {
        sheet.getRange(i + 3, 3).setValue(false); // Uncheck the checkbox
        sheet.getRange(i + 3, 5).setValue(""); // Clear the timestamp in column E
      }
    }
  }
}

function createTimeDrivenTrigger() {
  ScriptApp.newTrigger("uncheckExpired")
           .timeBased()
           .everyDays(1)
           .create();
}
