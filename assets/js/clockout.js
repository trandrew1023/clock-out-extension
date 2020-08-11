document.addEventListener('DOMContentLoaded', function() {
  var temp = document.getElementById('submitBtn');
  temp.addEventListener('click', calculateClockOutTime);
});

document.addEventListener('DOMContentLoaded', function() {
  var temp = document.getElementById('now');
  temp.addEventListener('click', currentTime);
});

document.addEventListener('DOMContentLoaded', function() {
  var temp = document.getElementById('forty');
  temp.addEventListener('click', setExpectedHoursForty);
});

document.addEventListener('DOMContentLoaded', function() {
  var temp = document.getElementById('eight');
  temp.addEventListener('click', setExpectedHoursEight);
});

function calculateClockOutTime() {
  var expectedHrs = document.getElementById("expectedHrs").value;
  if (isNaN(expectedHrs) || expectedHrs == "" || expectedHrs == null) {
    alert("Expected hours must be a number.\nPress OK or Enter");
    // return;
  }
  var currentHrs = document.getElementById("currentHrs").value;
  if (isNaN(currentHrs || currentHrs == "" || currentHrs == null)) {
    alert("Current hours must be a number.\nPress OK or Enter");
    // return;
  }
  var timeIn = document.getElementById("timeIn").value;
  var time = timeIn.split(":");
  var hour = parseInt(time[0])
  var min = parseInt(time[1]);
  var meridiem = (hour >= 12) ? "PM" : "AM";

  var remainingTime = expectedHrs - currentHrs;
  var clockOutHour = hour + Math.trunc(remainingTime);
  var clockOutMinute = ((remainingTime % 1) * 60) + min;
  var hourDif = Math.trunc(clockOutHour / 12);

  // case where remaining minutes and current minutes exceed 60
  if (clockOutMinute >= 60) {
    clockOutMinute = clockOutMinute - 60;
    clockOutHour++;
  }
  // convert from 24 to 12 hour clock, TODO add feature for both 24 and 12 hour clocks
  if (clockOutHour > 12) {
    clockOutHour = clockOutHour - (12 * hourDif);
  }
  // case where time is 00
  if (clockOutHour == 00) {
    clockOutHour = 12;
    meridiem = "AM";
  }
  // adjust morning/afternoon
  if (meridiem == "AM") {
    (hourDif % 2 == 0) ? meridiem = "AM": meridiem = "PM";
  } else {
    (hourDif % 2 == 0) ? meridiem = "PM": meridiem = "AM";
  }

  var clockOutTime = ("0" + clockOutHour).slice(-2) + ":" + ("0" + Math.ceil(clockOutMinute)).slice(-2) + " " + meridiem;

  // TODO fix so new submission do not keep adding on
  document.body.innerHTML += "<div class=\"box\" id=\"box\"><img src=\'assets/images/clock.png\' width=\'20\' height=\'20\'><h3> : " + clockOutTime + "</h3></div>";
}

function currentTime() {
  document.getElementById('timeIn').value = moment().format("HH:mm");
}

// TODO combime these functions
function setExpectedHoursForty() {
  document.getElementById('expectedHrs').value = 40;
}
function setExpectedHoursEight() {
  document.getElementById('expectedHrs').value = 8;
}
