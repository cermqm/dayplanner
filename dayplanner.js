var test = true;

// function currentday() {

var tdate = new Date();
if (test) console.log(tdate);
var strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var d = tdate.getDate();
var m = strArray[tdate.getMonth()];
var y = tdate.getFullYear();
var h = tdate.getHours();
// var m = tdate.getMinutes();

if (test) console.log(h);
currdate = '' + (d <= 9 ? '0' + d : d) + '-' + m + '-' + y;
if (test) console.log(currdate);

var todo = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];


// }

function writeJumbo() {

    var jumbop1 = $("<p>").attr({ id: "jumbop" }).addClass("lead text-center").text("3 ways to save - tab or click somewhere else, hit return or click the disk icon...");
    var jumbohtag = $("<h1>").attr({ id: "jumboh1" }).addClass("display-4 text-center").text("Damm Tech Day Planner");
    var jumbohtag2 = $("<h2>").attr({ id: "jumboh12" }).addClass("display-4 text-center ").text(currdate);
    var jumboContainer = $("<div>").attr({ id: "jumboContainer" }).addClass("container");
    jumboContainer.append(jumbohtag, jumbohtag2, jumbop1);
    var jumbo1 = $("<div>").attr({ id: "jumbo1" }).addClass("jumbotron jumbotron-fluid");
    jumbo1.append(jumboContainer);
    $("#jumbodiv").append(jumbo1);

}

function writePage() {
    // var businessHours = ["0900", "1000", "1100", "1200", "1300", "1400", "1500", "1600", "1700"];
    var businessHours = ["0900", "0930", "1000", "1030", "1100", "1130", "1200", "1230", "1300", "1330", "1400", "1430", "1500", "1530", "1600", "1630", "1700"];

    for (let i = 0; i < businessHours.length; i++) {
        if (test) console.log("in for loop");
        // Adding work day times
        var plannerTimes = $("<a>").text(businessHours[i]).attr({ id: "hours" + i, float: "left" }).addClass("border border-secondary rounded-lg hours bg-secondary text-light");
        // Adding input box
        var inputid = ("input" + i);
        if (test) console.log("i = " + i);
        if (test) console.log("todo[i] = " + todo[i]);
        var plannerInput = $("<input>").attr({ id: inputid, value: todo[i], v: i, float: "left", size: "40" }).addClass("border border-secondary rounded-lg input");
        // Adding save button
        var plannerSave = $("<button>").attr({ id: "save" + i, value: i }).addClass("border border-secondary rounded-lg button fa fa-floppy-o bg-secondary");
        // Creating a div container for these 3 items...
        var container = $("<div>").attr({ id: "container" + i, style: "font-size: 2vw" });
        container.append(plannerTimes, plannerInput, plannerSave);
        $("#startdiv").append(container);
        $(".bg").css("background-image", "url('techbackground.jpg')");
        updateRowColor(businessHours[i], inputid);
    }

}

// init function to pull highscores if there are any and put into highScorearray...
function init(parameter) {
    if (test) console.log("todo array in init = " + todo)
    var todosaved = JSON.parse(localStorage.getItem("todos-" + currdate));
    if (todosaved !== null) {
        todo = todosaved;
        if (test) console.log("todo array in init after localstorage read = " + todo)
    }
}

function saveRow(index) {
    var inputText = $("#input" + index).val();
    if (test) console.log("inputText = " + inputText);
    if (test) console.log("todo array = " + todo);
    if (test) console.log("index = " + index);
    todo.splice(index, 1, inputText);
    if (test) console.log("todo array = " + todo);
    localStorage.setItem("todos-" + currdate, JSON.stringify(todo));

}

// function to update row color
function updateRowColor(hour, inputid) {

    if (test) console.log("rowColor ", h, hour, inputid);

    var time2 = String(h) + "00";
    if (test) console.log("time2 = " + time2);

    if (hour < time2) {
        // update inputid.css('')
        if (test) { console.log("lessThan"); }
        $(`#${inputid}`).css("background-color", "lightgrey");
        //add disabled attribut on element
    } else if (hour > time2) {
        if (test) console.log("greaterthan");
        $(`#${inputid}`).css("background-color", "lightgreen")
    } else {
        if (test) console.log("equal");
        $(`#${inputid}`).css("background-color", "tomato")
    }
};

init();
writeJumbo();
writePage();

//location reload and set a timer
//or set an interval

// listener for save button
$(".button").on("click", function() {
    // if (test) alert("button clicked");
    var valueofbtn = this.value;
    if (test) console.log("button clicked - value - " + this.value)
    if (test) console.log("valueofbtn = " + valueofbtn);
    saveRow(valueofbtn);
});

// listener for focus off of input
$(".input").on("focusout", function() {
    // if (test) alert("button clicked");
    var inputID = this.id;
    var valueofinput = inputID.substring(5);
    if (test) console.log("inputID = " + inputID);
    if (test) console.log("valueofinput = " + valueofinput);
    saveRow(valueofinput);
});

// listener for return keydown
$('.input').on('keydown', function(e) {
    if (test) console.log("in return listener");
    var key = e.which;
    if (key == 13) {
        alert("enter");
        $('#button').click();
        return false;
    }
});