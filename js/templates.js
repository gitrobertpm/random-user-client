"use strict";

const searchFormTemplate = `
  <form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>`;

const cardTemplate = em => {
  return `
    <div class="card">
      <div class="card-img-container">
          <img class="card-img" src="${em.picture.large}" alt="profile picture">
      </div>
      <div class="card-info-container">
          <h3 id="${em.name.first}-${em.name.last}" class="card-name cap">${em.name.first} ${em.name.last}</h3>
          <p class="card-text">${em.email}</p>
          <p class="card-text cap">${em.location.city}, ${em.location.state}</p>
      </div>
    </div>`;
};

const modalConstantsTemplate = `
  <div class="modal-container">
    <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
      </div>
    </div>
    <div class="modal-btn-container">
      <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
      <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
  </div>`;

const modalTemplate = (em, el) => {
  return `
    <img class="modal-img" src="${em.picture.large}" alt="profile picture">
    <h3 id="${em.name.first}-${em.name.last}" class="modal-name cap">${em.name.first} ${em.name.last}</h3>
    <p class="modal-text">${em.email}</p>
    <p class="modal-text cap">${em.location.city}</p>
    <hr>
    <p class="modal-text">${em.cell}</p>
    <p class="modal-text">${em.location.street.number} ${em.location.street.name}, ${em.location.city}, ${em.location.state} ${em.location.postcode}</p>
    <p class="modal-text">Birthday: ${em.dob.date.slice(0, 10)}</p>`;
};
