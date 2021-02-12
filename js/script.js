"use strict"

const gallery = document.querySelector('#gallery');

const generateCards = data => data.forEach( em => gallery.insertAdjacentHTML('beforeend', cardTemplate(em)));

const generateModalConstants = () => {
    gallery.insertAdjacentHTML('afterend', modalConstantsTemplate);
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.style.display = 'none';
    document.querySelector('#modal-close-btn').addEventListener('click', e => modalContainer.style.display = 'none');
};

const updateModal = em => {
  const modalInfoContainer = document.querySelector('.modal-info-container');
  modalInfoContainer.innerHTML = '';
  modalInfoContainer.insertAdjacentHTML('afterbegin', modalTemplate(em));
}

const addClickToCards = data => {
  document.querySelectorAll('.card').forEach( (card, i) => {
    card.addEventListener('click', e => {
      document.querySelector('.modal-container').style.display = '';
      updateModal(data[i]);
    });
  });
};

(async () => {
  try {
    // const raw = await fetch('https://randomuser.me/api/?results=12&nat=US&lego');
    const raw = await fetch('https://fsjs-public-api-backup.herokuapp.com/api');
    const data = await raw.json();
    console.log(data.results);
    generateCards(data.results);
    generateModalConstants();
    addClickToCards(data.results);
  } catch (err) {
    console.log(err);
    throw err;
  }
})();
