const charactersList = document.querySelector(".characters-list");

const createCharacterCard = ({ title, body }) => `
  <div class="character-card">
    <img class="character-photo" src="https://avatars.mds.yandex.net/i?id=0465a7d4590dd9224b205019175401d7e1ceb06d-9148169-images-thumbs&n=13" alt="Character">
    <div class="character-text">
      <h4 class="character-name">${title}</h4>
      <p class="character-body">${body}</p>
    </div>
  </div>
`;

const createCharacterCards = (characters) => {
  charactersList.innerHTML = `
    <div class="characters-list-block">
      ${characters.slice(1, 9).map(createCharacterCard).join("")}
    </div>
  `;
};

const fetchJson = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=15"
    );

    if (!response.ok) {
      throw new Error("Не удалось загрузить данные о персонажах.");
    }

    const characters = await response.json();
    createCharacterCards(characters);
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  }
};

fetchJson();
