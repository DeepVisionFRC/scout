//Auto Vars
let AmovementTeamA  = false;
let AmovementTeamB  = false;
let AmovementTeamC  = false;
let AboxesEX = 0;
let AboxesSW = 0;
let AboxesSC = 0;
function nextPageA() {
    AmovementTeamA = document.getElementById('mm1').checked;
    AmovementTeamB = document.getElementById('mm2').checked;
    AmovementTeamC = document.getElementById('mm3').checked;
    AboxesEX = document.getElementById('boxesE1').value;
    AboxesSW = document.getElementById('boxesSW1').value;
    AboxesSC = document.getElementById('boxesSC1').value;
    /* idk how to write to a json to store the data.
    let jsonMovementData = {"movementTeamA":AmovementTeamA,"movementTeamB":AmovementTeamB,"movementTeamC":AmovementTeamC};
    let jsonBoxesData = {"boxesExchange":AboxesEX,"boxesSwitch":AboxesSW,"boxesScale":AboxesSC};
    let myJSON1 = JSON.stringify(jsonBoxesData);
    let myJSON2 = JSON.stringify(jsonMovementData);
    localStorage.setItem("data",myJSON2);
    localStorage.setItem("data.json",myJSON1);*/
    document.location.assign("loadingpage.html");
}
function move() {
    let elem = document.getElementById("progress");
    let width = 0;
    let id = setInterval(frame, 10);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
            document.location.assign("teleoppage.html");
        } else {
            width++;
            elem.style.width = width + '%';
            elem.innerHTML = width  + '%';
        }
    }
}
let TboxesEX = 0;
let TboxesASW = 0;
let TboxesESW = 0;
let TboxesSC = 0;
function nextPageT(){
    TboxesEX = document.getElementById('boxesEX1').value;
    TboxesASW = document.getElementById('boxesASW1').value;
    TboxesESW = document.getElementById('boxesESW1').value;
    TboxesSC = document.getElementById('boxesSC1').value;
    document.location.assign("loadingpage.html");
}
let EboostBoxes = 0;
let ElevitateBoxes = 0;
let EforceBoxes = 0;
let ElevitateActivated = false;
let EforceActivated = false;
let EboostActivated = false;
let ERedCardTeamA = false;
let ERedCardTeamB = false;
let ERedCardTeamC = false;
let EYellowCardTeamA = false;
let EYellowCardTeamB = false;
let EYellowCardTeamC = false;
let EparkTeamA = false;
let EparkTeamB = false;
let EparkTeamC = false;
let EclimbTeamA = false;
let EclimbTeamB = false;
let EclimbTeamC = false;
let EBrokenRobotTeamA = false;
let EBrokenRobotTeamB = false;
let EBrokenRobotTeamC = false;
let EFallenRobotTeamA = false;
let EFallenRobotTeamB = false;
let EFallenRobotTeamC = false;
let EDisabledRobotTeamA = false;
let EDisabledRobotTeamB = false;
let EDisabledRobotTeamC = false;
let EFlickeringRobotTeamA = false;
let EFlickeringRobotTeamB = false;
let EFlickeringRobotTeamC = false;
let DriverScoreTeamA = 0;
let DriverScoreTeamB = 0;
let DriverScoreTeamC = 0;
function nextPageEndGame(){
    EboostBoxes = document.getElementById("").value;
    ElevitateBoxes = document.getElementById("").value;
    EforceBoxes = document.getElementById("").value;
    ElevitateActivated = document.getElementById("").checked;
    EforceActivated = document.getElementById("").checked;
    EboostActivated = document.getElementById("").checked;
    ERedCardTeamA = document.getElementById("").checked;
    ERedCardTeamB = document.getElementById("").checked;
    ERedCardTeamC = document.getElementById("").checked;
    EYellowCardTeamA = document.getElementById("").checked;
    EYellowCardTeamB = document.getElementById("").checked;
    EYellowCardTeamC = document.getElementById("").checked;
    EparkTeamA = document.getElementById("").checked;
    EparkTeamB = document.getElementById("").checked;
    EparkTeamC = document.getElementById("").checked;
    EclimbTeamA = document.getElementById("").checked;
    EclimbTeamB = document.getElementById("").checked;
    EclimbTeamC = document.getElementById("").checked;
    EBrokenRobotTeamA = document.getElementById("").checked;
    EBrokenRobotTeamB = document.getElementById("").checked;
    EBrokenRobotTeamC = document.getElementById("").checked;
    EFallenRobotTeamA = document.getElementById("").checked;
    EFallenRobotTeamB = document.getElementById("").checked;
    EFallenRobotTeamC = document.getElementById("").checked;
    EDisabledRobotTeamA = document.getElementById("").checked;
    EDisabledRobotTeamB = document.getElementById("").checked;
    EDisabledRobotTeamC = document.getElementById("").checked;
    EFlickeringRobotTeamA = document.getElementById("").checked;
    EFlickeringRobotTeamB = document.getElementById("").checked;
    EFlickeringRobotTeamC = document.getElementById("").checked;
    DriverScoreTeamA = document.getElementById("").checked;
    DriverScoreTeamB = document.getElementById("").checked;
    DriverScoreTeamC = document.getElementById("").checked;
}
