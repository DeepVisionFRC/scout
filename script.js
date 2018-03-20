//Auto vars
var AmovementTeamA  = false;
var AmovementTeamB  = false;
var AmovementTeamC  = false;
var AboxesEX = 0;
var AboxesSW = 0;
var AboxesSC = 0;
function nextPageAA() {
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
var TboxesSW = 0;
var TboxesSC = 0;
var TboxesSC = 0;