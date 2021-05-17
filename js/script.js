"use strict"

const gallery = document.querySelector('#gallery');
const searchContainer = document.querySelector('.search-container');

// Add search form to DOM
searchContainer.innerHTML = searchFormTemplate;

const searchForm = searchContainer.querySelector('form');
const searchInput = document.querySelector('#search-input');

// Add cards to DOM
const generateCards = data => data.forEach( em => gallery.insertAdjacentHTML('beforeend', cardTemplate(em)));

// Search function
const search = (searchVal) => {
  const cards = document.querySelectorAll('.card');
  [...cards].forEach(card => {
    const name = card.querySelector('h3').textContent.toLocaleLowerCase();
    card.classList.remove('fade-in');
    card.classList.add('fade-out');
    if (name.includes(searchVal)) {
      card.classList.remove('fade-out');
      card.classList.add('fade-in');
    }
  });
}

// Wire up search feature
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  search(searchInput.value.toLocaleLowerCase());
});

searchInput.addEventListener('keyup', e => {
  e.preventDefault();
  search(searchInput.value.toLocaleLowerCase());
});

// Update modal info
const updateModal = (em, i) => {
  const modalInfoContainer = document.querySelector('.modal-info-container');
  modalInfoContainer.setAttribute('data-indy', i);
  modalInfoContainer.innerHTML = '';
  modalInfoContainer.insertAdjacentHTML('beforeend', modalTemplate(em));
}

// Program modal next and prev buttons 
const nextAndPrev = data => {
  const modalInfoContainer = document.querySelector('.modal-info-container');
  const prev = document.querySelector('#modal-prev');
  const next = document.querySelector('#modal-next');

  prev.addEventListener('click', e => {
    let indy = +modalInfoContainer.getAttribute('data-indy') - 1;
    if (indy < 0) {
      indy = data.length - 1;
    }

    return updateModal(data[indy], indy);
  });

  next.addEventListener('click', e => {
    let indy = +modalInfoContainer.getAttribute('data-indy') + 1;
    if (indy > data.length - 1) {
      indy = 0;
    }

    return updateModal(data[indy], indy);
  });
}

// Add main bits of modal to DOM
const generateModalConstants = data => {
    gallery.insertAdjacentHTML('afterend', modalConstantsTemplate);
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.style.display = 'none';

    // Add click functionality to modal close button
    document.querySelector('#modal-close-btn').addEventListener('click', e => {
      modalContainer.classList.remove('fade-in');
      modalContainer.classList.add('fade-out');
      setTimeout(() => modalContainer.style.display = 'none', 400);
    });
    nextAndPrev(data);
};

// Add click functionality to cards
const addClickToCards = data => {
  document.querySelectorAll('.card').forEach( (card, i) => { 
    card.addEventListener('click', e => { 
      const modalContainer = document.querySelector('.modal-container'); console.log(modalContainer);
      modalContainer.style.display = '';
      modalContainer.classList.remove('fade-out');
      modalContainer.classList.add('fade-in');
      updateModal(data[i], i);
    });
  });
};

// Initialize
(async () => {
  try {
    // const raw = await fetch('https://randomuser.me/api/?results=12&nat=US&lego');
    const raw = await fetch('https://ez-random-user-api.herokuapp.com/api/');
    // const raw = await fetch('http://localhost:5000/api');
    const data = await raw.json();
    console.log(data.results);
    generateCards(data.results);
    generateModalConstants(data.results);
    addClickToCards(data.results);
  } catch (err) {
    console.log(err);
    throw err;
  }
})();
