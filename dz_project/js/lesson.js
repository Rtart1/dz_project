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

const fetchRates = async () => {
  try {
    const response = await fetch("../data/converter.json");
    if (!response.ok) {
      throw new Error("Не удалось загрузить курсы валют");
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при загрузке курсов валют:", error);

    return null;
  }
};

const converter = (element, targetElement1, targetElement2) => {
  element.oninput = async () => {
    const data = await fetchRates();

    if (!data) {
      return;
    }

    try {
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
    } catch (error) {
      console.error("Ошибка при выполнении конвертации:", error);
    }
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

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Не удалось загрузить данные");
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);

    return null;
  }
};

const updateCard = async () => {
  const data = await fetchData(
    `https://jsonplaceholder.typicode.com/todos/${cardIndex}`
  );

  if (!data) return; // Если данных нет, прекращаем выполнение функции

  try {
    cardBlock.innerHTML = `
      <p>${data.title}</p>
      <p>${data.completed}</p>
      <span>${data.id}</span>
    `;
  } catch (error) {
    console.error("Ошибка при обновлении карточки:", error);
  }
};

const Consolelog = async () => {
  const data = await fetchData("https://jsonplaceholder.typicode.com/posts");

  if (!data) return; // Если данных нет, прекращаем выполнение функции

  try {
    console.log(data);
  } catch (error) {
    console.error("Ошибка при выводе данных в консоль:", error);
  }
};

nextButton.onclick = () => {
  try {
    cardIndex = cardIndex < maxCards ? cardIndex + 1 : 1;
    updateCard();
  } catch (error) {
    console.error("Ошибка при переходе к следующей карточке:", error);
  }
};

prevButton.onclick = () => {
  try {
    cardIndex = cardIndex > 1 ? cardIndex - 1 : maxCards;
    updateCard();
  } catch (error) {
    console.error("Ошибка при переходе к предыдущей карточке:", error);
  }
};

updateCard();
Consolelog();

// Weather
//http://api.openweathermap.org/data/2.5/weather

const searchButton = document.querySelector("#search");
const searchInput = document.querySelector(".cityName");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");

const APP_ID = "e417df62e04d3b1b111abeab19cea714";
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";

const fetchWeather = async (cityName) => {
  try {
    const response = await fetch(
      `${BASE_URL}?appid=${APP_ID}&q=${cityName}&units=metric&lang=ru`
    );
    if (!response.ok) {
      throw new Error("Не удалось получить данные о погоде.");
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при получении данных погоды:", error);

    return null;
  }
};

searchButton.onclick = async () => {
  try {
    const data = await fetchWeather(searchInput.value);

    if (!data || data.cod === "404") {
      city.innerHTML = "Город не найден";
      temp.innerHTML = "";
      return;
    }

    city.innerHTML = data.name || "Город не найден";
    temp.innerHTML = `${Math.round(data.main.temp)}°C`;

    const description = data.weather[0].description || "Неизвестно";
    const iconCode = data.weather[0].icon;

    temp.innerHTML += ` ${description} <img src="http://openweathermap.org/img/wn/${iconCode}.png" alt="${description}" />`;
  } catch (error) {
    console.error("Ошибка при обновлении погоды:", error);
  }
};
