const modal = document.querySelector(".modal");
const triggerButton = document.querySelector("#btn-get");
const closeButton = document.querySelector(".modal_close");

const openModal = () => {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  modal.style.display = "none";
  document.body.style.overflow = "";
};

triggerButton.onclick = () => openModal();
closeButton.onclick = () => closeModal();
modal.onclick = (event) => {
  if (event.target === modal) {
    closeModal();
  }
};

//ДЗ Откртыие модальноко окна в конце старнцие и через 10 секунд
const openModalOnScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 0.5) {
    openModal();
    window.removeEventListener("scroll", openModalOnScroll);
  }
};

window.addEventListener("scroll", openModalOnScroll);

setTimeout(() => {
  openModal();
}, 10000);
