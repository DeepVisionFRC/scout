var WebSocket = require('ws');
var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
var BlueAlliance = require("bluealliance");
var tba = new BlueAlliance("53QztSBkXCtjaAgV98kdm6VyhgD0wQy30RReogRjxs8hPpsqDD6qmxFyz71WELeC");

var doc = new GoogleSpreadsheet('1lpqdJ_IX73w2ISV33tZoPAm6X7wjc6vrsQcqpQ17Nog');
var creds = require('./credentials.json');
var sheet;

const wss = new WebSocket.Server({ port: 8060 });

var sessions = [];

wss.on('connection', function connection(ws, req) {

    var ip = req.connection.remoteAddress + ":" + req.connection.remotePort;
    console.log(ip + " connected");

    ws.on('message', function incoming(message) {
      var request = JSON.parse(message);

      if (request.type == "matchdata") {

      }
    });
});

// data is as so: [(row, col, str), (row, col, str), ...]
function writeDataToDatabase(data) {
  if (data == []) {
    return;
  }
  var largestRow = 1;
  var largestCol = 1;
  for (i in data) {
    if (data[i][0] > largestRow) { largestRow = data[i][0] }
    if (data[i][1] > largestCol) { largestCol = data[i][1] }
  }
  async.series([
    function setSAuth(step) {
      doc.useServiceAccountAuth(creds, step);
    },
    function getInfoAndWorksheets(step) {
      doc.getInfo(function(err, info) {
        sheet = info.worksheets[0];
        step();
      });
    },
    function workingWithCells(step) {
      sheet.getCells({
        'min-row': 2,
        'max-row': largestRow + 1,
        'max-col': largestCol,
        'return-empty': true
      }, function(err, cells) {
        for (i in data) {
          cells[((data[i][0] - 1) * largestCol) + data[i][1] - 1].value = data[i][2];
        }
        sheet.bulkUpdateCells(cells);
        step();
      });
    },
  ], function(err){
      if (err) {
        console.log('Error: ' + err);
      }
  });
}

function findRowFromMatch(match_key) {
  async.series([
    function setSAuth(step) {
      doc.useServiceAccountAuth(creds, step);
    },
    function getInfoAndWorksheets(step) {
      doc.getInfo(function(err, info) {
        sheet = info.worksheets[0];
        step();
      });
    },
    function workingWithCells(step) {
      sheet.getCells({
        'max-col': 1,
        'return-empty': true
      }, function(err, cells) {
        for (i in cells) {
          if (match_key == cells[i].value) {
            return i + 1;
          }
        }
        step();
      });
    },
  ], function(err){
    if (err) {
      console.log('Error: ' + err);
    }
  });
}

function writeMatchToDatabase(match_data) {
  row = findRowFromMatch(match_data.key);
  data = [];
  data.push((row, 2, match_data.alliance));
  data.push((row, 3, match_data.scouter));
  data.push((row, 4, match_data.movement));
  writeDataToDatabase(data);
}