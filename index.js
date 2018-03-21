var ws = new WebSocket('ws://localhost:8060');
console.log(ws);

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
    ws.send(JSON.stringify(match_data));
};