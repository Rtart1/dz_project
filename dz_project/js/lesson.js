//PHONE CHECKER
const phoneInput = document.querySelector("#phone_input");
const phoneButton = document.querySelector("#phone_button");
const phoneResult = document.querySelector("#phone_result");

const regExp = /\+996 [2579] \d{2} \d{2}-\d{2}-\d{2} /;

phoneButton.onclick = () => {
  if (regExp.test(phoneInput.value)) {
    phoneResult.innerHTML = "Ok";
    phoneResult.style.color = "green";
  } else {
    phoneResult.innerHTML = "Not Ok";
    phoneResult.style.color = "red";
  }
};

//TAB SLIDER
const tabContentBlocks = document.querySelectorAll(".tab_content_block");
const tabs = document.querySelectorAll(".tab_content_item");
const tabsParent = document.querySelector(".tab_content_items");

let currentTabIndex = 0;

const hideTabContent = () => {
  tabContentBlocks.forEach((block) => {
    block.style.display = "none";
  });

  tabs.forEach((tab) => {
    tab.classList.remove("tab_content_item_active");
  });
};

const showTabContent = (id = 0) => {
  tabContentBlocks[id].style.display = "block";
  tabs[id].classList.add("tab_content_item_active");
};

hideTabContent();
showTabContent();

tabsParent.onclick = (event) => {
  if (event.target.classList.contains("tab_content_item")) {
    tabs.forEach((tab, tabIndex) => {
      if (event.target === tab) {
        hideTabContent();
        showTabContent(tabIndex);
      }
    });
  }
};

//Дз салйдер

setInterval(() => {
  currentTabIndex++;
  if (currentTabIndex >= tabs.length) {
    currentTabIndex = 0;
  }
  hideTabContent();
  showTabContent(currentTabIndex);
}, 3000);

// ДЗ Converter

const usdInput = document.querySelector("#usd");
const somInput = document.querySelector("#som");
const eurInput = document.querySelector("#eur");

const converter = (element, targetElement1, targetElement2) => {
  element.oninput = () => {
    const request = new XMLHttpRequest();
    request.open("GET", "../data/converter.json");
    request.setRequestHeader("Content-type", "application/json");
    request.send();

    request.onload = () => {
      const data = JSON.parse(request.response);

      if (element.id === "som") {
        targetElement1.value = (element.value / data.usd).toFixed(2);
        targetElement2.value = (element.value / data.eur).toFixed(2);
      }

      if (element.id === "usd") {
        targetElement1.value = (element.value * data.usd).toFixed(2);
        targetElement2.value = ((element.value * data.usd) / data.eur).toFixed(
          2
        );
      }

      if (element.id === "eur") {
        targetElement1.value = (element.value * data.eur).toFixed(2);
        targetElement2.value = ((element.value * data.eur) / data.usd).toFixed(
          2
        );
      }

      if (element.value === "") {
        targetElement1.value = "";
        targetElement2.value = "";
      }
    };
  };
};

converter(somInput, usdInput, eurInput);
converter(usdInput, somInput, eurInput);
converter(eurInput, somInput, usdInput);

// Card Switcher

const nextButton = document.querySelector("#btn-next");
const prevButton = document.querySelector("#btn-prev");
const cardBlock = document.querySelector(".card");
const maxCards = 200;
let cardIndex = 1;

const updateCard = () => {
  fetch(`https://jsonplaceholder.typicode.com/todos/${cardIndex}`)
    .then((response) => response.json())
    .then((data) => {
      cardBlock.innerHTML = `
          <p>${data.title}</p>
          <p>${data.completed}</p>
          <span>${data.id}</span>
        `;
    });
};

const Consolelog = () => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
};

nextButton.onclick = () => {
  cardIndex = cardIndex < maxCards ? cardIndex + 1 : 1;
  updateCard();
};

prevButton.onclick = () => {
  cardIndex = cardIndex > 1 ? cardIndex - 1 : maxCards;
  updateCard();
};

updateCard();
Consolelog();
