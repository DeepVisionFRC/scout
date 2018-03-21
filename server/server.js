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

    //configureDatabaseForEvent("txda", 2018);

    ws.on('message', function incoming(message) {
      var request = JSON.parse(message);
      console.log(request);

      if (request.type == "autodata") {
        writeMatchToDatabase(request.auto);
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
        'min-col': 2,
        'max-row': largestRow + 1,
        'max-col': largestCol + 1,
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

function writeRawDataToDatabase(data) {
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
        'max-row': largestRow,
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

function findRowOfMatch(match_key, callback) {
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
        'return-empty': false
      }, function(err, cells) {
        for (i in cells) {
          if (match_key === cells[i].value) {
            callback(cells[i].row - 1);
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

async function writeMatchToDatabase(match_data) {
  findRowOfMatch(match_data.key, function(row) {
    data = [];
    alliance = match_data.alliance;
    var shift = 0;
    if (alliance === "red") { shift = 1 }
    data.push([row, 1 + shift, match_data.scout]);
    data.push([row, 5 + shift, match_data.movement]);
    writeDataToDatabase(data);
  });
}

async function configureDatabaseForEvent(event_code, event_year) {
  var event = await tba.getEvent(event_code, event_year);
  var matches = await tba.getMatchesAtEvent(event);
  if (matches != []) {
    console.log("Starting job of " + matches.length + " matches (this may take a while)");
    matches.sort(compareMatches);
    match_keys = [];
    blue_teams = [];
    red_teams = [];
    for (i in matches) {
      console.log(((i / matches.length) * 100).toFixed(2) + "%");
      match_keys.push([parseInt(i) + 2, parseInt(1), matches[i].key]);
      var teams = await tba.getTeamsInMatch(matches[i]);
      var bluestr = "";
      var redstr = "";
      for (b in teams.blue) {
        bluestr += teams.blue[b].team_number;
        if ((teams.blue.length - b) > 1) {
          bluestr += ", ";
        }
      }
      blue_teams.push([parseInt(i) + 2, parseInt(4), bluestr]);
      for (r in teams.red) {
        redstr += teams.red[r].team_number;
        if ((teams.red.length - r) > 1) {
          redstr += ", ";
        }
      }
      red_teams.push([parseInt(i) + 2, parseInt(5), redstr]);
    }
    console.log("100% - Uploading to database");
    writeRawDataToDatabase(match_keys.concat(blue_teams).concat(red_teams));
  }
}

function compareMatches(a, b) {
  if (a.time < b.time)
    return -1;
  if (a.time > b.time)
    return 1;
  return 0;
}