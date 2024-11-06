// Home work 1/1 проверка gmail
document.getElementById("gmail_button").addEventListener("click", function () {
  const gmailInput = document.getElementById("gmail_input").value;
  const gmailResult = document.getElementById("gmail_result");
  const regExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (regExp.test(gmailInput)) {
    gmailResult.textContent = "Gmail верный";
    gmailResult.style.color = "green";
  } else {
    gmailResult.textContent = "Gmail написан неправильно";
    gmailResult.style.color = "red";
  }
});

// Home work 1/2 - 2/1 движение блока
const parentBlock = document.querySelector(".parent_block");
const childBlock = document.querySelector(".child_block");

let positionX = 0,
  positionY = 0;

const offsetWidth = parentBlock.offsetWidth - childBlock.offsetWidth;
const offsetHeight = parentBlock.offsetHeight - childBlock.offsetHeight;

const movement = () => {
  if (positionX < offsetWidth && positionY === 0) {
    positionX++;
    childBlock.style.left = `${positionX}px`;
    requestAnimationFrame(movement);
  } else if (positionX >= offsetWidth && positionY < offsetHeight) {
    positionY++;
    childBlock.style.top = `${positionY}px`;
    requestAnimationFrame(movement);
  } else if (positionY >= offsetHeight && positionX > 0) {
    positionX--;
    childBlock.style.left = `${positionX}px`;
    requestAnimationFrame(movement);
  } else if (positionX <= 0 && positionY > 0) {
    positionY--;
    childBlock.style.top = `${positionY}px`;
    requestAnimationFrame(movement);
  } else {
    positionX = 0;
    positionY = 0;
    requestAnimationFrame(movement);
  }
};

movement();

// Home work 2/2 секундомер
let seconds = 0;
let timer;

const secondsDisplay = document.getElementById("seconds");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

startButton.addEventListener("click", () => {
  if (!timer) {
    timer = setInterval(() => (secondsDisplay.textContent = ++seconds), 1000);
  }
});

stopButton.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
});

resetButton.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  seconds = 0;
  secondsDisplay.textContent = seconds;
});
