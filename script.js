//DOM elements, connext Javascript to HTML


//Timer setup
function setTime() {
  var clock = setInterval(function () {
    if (secondsLeft <= 0) {
      clearInterval(clock);
      //insert game over here
      sendMessage();
    } else {
      secondsLeft--;
      console.log(secondsLeft);
      timerEl.innerHTML = secondsLeft;
    }
  }, 1000);
}

