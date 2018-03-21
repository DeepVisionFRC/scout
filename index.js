var ws = new WebSocket('ws://localhost:8060');

var ready = false;
var matches = [];
var alliances = [];

ws.onopen = function (event) {
    console.log("Connected to server");
    match_data = {
        "type": "autodata",
        "auto": {
            "key": "2018txda_qm12",
            "alliance": "blue",
            "scout": "isaac",
            "movement": 2
        }
    }
    request = {
        "type": "matchinfo",
        "scout": "felix"
    }
    ws.send(JSON.stringify(request));
};

ws.onmessage = function (msg) {
    var message = JSON.parse(msg.data);
    console.log(message);
    if (message.type === "scoutinfoarray") {
        for (i in message.array) {
            matches.push(message.array[i].match_key.split("_")[1]);
            alliances.push(message.array[i].alliance);
        }
        console.log(matches);
        console.log(alliances);
        ready = true;
    }
}