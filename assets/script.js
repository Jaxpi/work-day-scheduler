// AS AN employee with a busy schedule I WANT to add important events to a daily planner SO THAT I can manage my time effectively
// WHEN I open the planner // THEN the current day is displayed at the top of the calendar
// WHEN I scroll down // THEN I am presented with time blocks for standard business hours
// WHEN I view the time blocks for that day // THEN each time block is color-coded to indicate whether it is in the past, present, or future
// WHEN I click into a time block // THEN I can enter an event
// WHEN I click the save button for that time block // THEN the text for that event is saved in local storage
// WHEN I refresh the page // THEN the saved events persist

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

        var rowEl = $("<div>").addClass("row time-block").attr("id", i);
        var hourEl = $("<div>").addClass("col-2 hour").text(hourDisplay).attr("style", "font-weight: bolder; font-size: 20px");
        var textAreaEl = $("<textarea>").addClass("col-8 description " + highlight).attr("style", "color: black; font-size: 20px").val(localStorage.getItem(i));
        
        var button = $("<button>").addClass("col-2 saveBtn").attr("id", i).attr("style", "font-size: 40px").click(function () { 
            var logTime = $(this).attr("id");
            var logText = $(this).siblings(".description").val();
            localStorage.setItem(logTime, logText);
        });

        var icon = $("<i>").addClass("fas fa-save");
        $(".container").append(rowEl.append(hourEl, textAreaEl, button.append(icon)));
    }
})