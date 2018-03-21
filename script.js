//Auto Vars
var AmovementTeamA  = false;
var AmovementTeamB  = false;
var AmovementTeamC  = false;
var AboxesEX = 0;
var AboxesSW = 0;
var AboxesSC = 0;
function nextPageA() {
    AmovementTeamA = document.getElementById('mm1').checked;
    AmovementTeamB = document.getElementById('mm2').checked;
    AmovementTeamC = document.getElementById('mm3').checked;
    AboxesEX = document.getElementById('boxesE1').value;
    AboxesSW = document.getElementById('boxesSW1').value;
    AboxesSC = document.getElementById('boxesSC1').value;
    document.location.assign("loadingpage.html");
}
function move() {
    var elem = document.getElementById("progress");
    var width = 0;
    var id = setInterval(frame, 10);
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
var TboxesEX = 0;
var TboxesASW = 0;
var TboxesESW = 0;
var TboxesSC = 0;
function nextPageT(){
    TboxesEX = document.getElementById('boxesEX1').value;
    TboxesASW = document.getElementById('boxesASW1').value;
    TboxesESW = document.getElementById('boxesESW1').value;
    TboxesSC = document.getElementById('boxesSC1').value;
    document.location.assign("loadingpage.html");
}
