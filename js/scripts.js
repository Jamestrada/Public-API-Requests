const endpoint = 'https://randomuser.me/api/?results=12&nat=us'; //au,ca,gb,ie,nz,
const gallery = document.getElementById('gallery');
const body = document.querySelector('body');

async function getJSON(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        throw error;
    }
}
 
async function displayEmployees() {
    const employees = await getJSON(endpoint);
    return employees;
}

function generateGallery(data) {
    console.log(data);
    data.results.map( employee => {
        const divCard = document.createElement('div');
        divCard.classList.add('card');
        gallery.appendChild(divCard);
        divCard.insertAdjacentHTML('beforeend', `
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}</p>
            </div>
        `);
    });
    

    data.results.map( employee => {
        // regex to format cell number to (XXX) XXX-XXXX
        const cellRegex = /^\D*(\d{3})\D*(\d{3})\D*(\d{4})\D*$/;
        employee.cell = employee.cell.replace(cellRegex, '($1) $2-$3');
        const birthday = employee.dob.date.slice(0,10);

        const modal = document.createElement('div');
        modal.classList.add('modal-container');
        body.appendChild(modal);
        modal.insertAdjacentHTML('beforeend', `
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="modal-text">${employee.email}</p>
                    <p class="modal-text cap">${employee.location.city}</p>
                    <hr>
                    <p class="modal-text">${employee.cell}</p>
                    <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state}, ${employee.location.postcode}</p>
                    <p class="modal-text">Birthday: ${birthday.replace(/(\d{4})-(\d{2})-(\d{2})/, '$2/$3/$1')}</p>
                </div>
            </div>
        `);
    });

    modalListener();
}

function modalListener() {
    const modals = document.querySelectorAll('.modal-container');
    const cards = document.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i++) {
        // console.log(cards[i]);
        // cards[i].addEventListener('click', openModal(i));
        cards[i].addEventListener('click', () => {
            const modal = modals[i].querySelector('.modal');
            const closeButton = modal.querySelector('.modal-close-btn');

            modals[i].style.display = 'block';
            modal.style.display = 'block';

            closeButton.addEventListener('click', () => {
                modal.style.display = 'none';
                modal.parentNode.style.display = 'none';
            });

        });
    }
    // closeButton.addEventListener('click', closeModal[modals[i]]);
}

function openModal(card) {
    // console.log(card);
    // const modals = document.querySelectorAll('.modal');
    // const modal = modals[card];
    // const container = modal.querySelector('.modal-info-container');
    // modal.style.display = '';
    // container.style.display = '';
}

function closeModal(modal) {
    const container = modal.querySelector('.modal-info-container');
    modal.style.display = 'none';
    container.style.display = 'none';
}

// function handleError(err) {
//     console.log(err);
// }

displayEmployees()
    .then(generateGallery)