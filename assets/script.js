$(document).ready(function () {
    window.setInterval(function () {
    $("#currentDay").text(moment().format("MMMM Do YYYY, h:mm:ss a"));
    }, 1000);
    
    var timeNow = moment().hours();
    for (var i = 9; i < 18; i++) {
        var highlight = "";
        if (i < timeNow) {
            highlight = "past";
        } else if (i === timeNow) {
            highlight = "present";
        } else {
            highlight = "future";
        }
        
        var hourDisplay = "";
        if (i < 12) {
            hourDisplay = i + "am";
        } else if (i === 12) {
            hourDisplay = i + "pm";
        } else {
            hourDisplay = i - 12 + "pm";
        }

        var rowEl = $("<div>").addClass("row time-block");
        var hourEl = $("<div>").addClass("col-2 hour").text(hourDisplay).attr("style", "font-weight: bolder; font-size: 20px; display: flex; align-items: center; justify-content: center");
        var textAreaEl = $("<textarea>").addClass("col-8 description " + highlight).attr("style", "color: black; font-size: 20px").val(localStorage.getItem(i));
        
        var button = $("<button>").addClass("col-2 saveBtn").attr("id", i).attr("style", "font-size: 40px").click(function () { 
            var logTime = $(this).attr("id");
            var logText = $(this).siblings(".description").val();
            localStorage.setItem(logTime, logText);
            alert("Saved!")
        });

        var icon = $("<i>").addClass("fas fa-save");
        $(".container").append(rowEl.append(hourEl, textAreaEl, button.append(icon)));
    }
})