$(document).ready(function() {


    //Establish Variables


    var $currentDay = $("#currentDay");
    var $timeOfDay = $("#timeOfDay");
    var $timeBlock = $("#timeBlock")


    //Moment.JS Variables
    $currentDay.text(moment().format("dddd, MMMM Do"));
    $timeOfDay.text(moment().format("HH:mm"));

    //Calling Color Function
    changetimeColor()


    //Calling render Function
    renderAppointments()


    //Color-Coding TimeBlocks to indicate time of day

    function changetimeColor() {

        var getCurrentHour = moment().format("H")

        console.log(getCurrentHour)

        for (var i = 8; i < 18; i++) {

            if (i == getCurrentHour) {
                $("#" + i).children(".hour").addClass("present");
                console.log("im inside the if!")
                $("#" + i).children("#textarea").addClass("present");
            }
            if (i < getCurrentHour) {
                $("#" + i).children(".hour").addClass("past");
                $("#" + i).children("#textarea").addClass("past");
            }
            if (i > getCurrentHour) {
                $("#" + i).children(".hour").addClass("future");
                $("#" + i).children("#textarea").addClass("future");
            }
        }
    }

    $(".saveBtn").on('click', function() {

        var eventDetails = $(this).siblings("#textarea").val();
        console.log(eventDetails)
        var eventTime = $(this).parent().attr("id");
        console.log(eventTime)

        //Prototype

        savedInfo = { event: eventDetails, time: eventTime }
        console.log(savedInfo)

        //Local Storage

        var storageObject = JSON.parse(localStorage.getItem("storedEvents"))

        if (storageObject == null) {
            localStorage.setItem("storedEvents", JSON.stringify([{ event: eventDetails, time: eventTime }]))

        } else {
            storageObject.push(savedInfo)
            localStorage.setItem("storedEvents", JSON.stringify(storageObject))
        }

        //make text area display

        $(this).siblings("#textarea").val(eventDetails);
        changetimeColor();

    })

    function renderAppointments() {
        var arrayHolder = JSON.parse(localStorage.getItem("storedEvents"))
        console.log(arrayHolder)
        if (arrayHolder != null) {
            for (var i = 0; i < arrayHolder.length; i++) {

                var storedAppts = arrayHolder[i]
                console.log(storedAppts)
                var apptTime = storedAppts.time
                console.log(apptTime)
                var apptDetails = storedAppts.event
                console.log(apptDetails)

                if (apptDetails != null) {
                    $("#" + apptTime).children("#textarea").val(apptDetails)
                }

            }
        }
    }
});