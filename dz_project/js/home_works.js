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

// Home work 1/2 движение блока
function movement(position = 0) {
  const parentBlock = document.querySelector(".parent_block");
  const childBlock = document.querySelector(".child_block");

  const parentWidth = parentBlock.offsetWidth;
  const childWidth = childBlock.offsetWidth;

  if (position + childWidth < parentWidth) {
    childBlock.style.left = `${position}px`;

    setTimeout(() => movement(position + 5), 25);
  }
}

movement();
