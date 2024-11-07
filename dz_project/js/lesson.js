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
