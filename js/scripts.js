/**********************************************
List Pagination and Filtering
Developed by: James Estrada 

Employee directory
***********************************************/

const endpoint = 'https://randomuser.me/api/?results=12&nat=us'; //au,ca,gb,ie,nz,
const gallery = document.getElementById('gallery');
const body = document.querySelector('body');
let employees;

// check if data is fetched successfully 
async function getJSON(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        throw error;
    }
}

// fetch and get a response from API
async function displayEmployees() {
    const employees = await getJSON(endpoint);
    return employees;
}

// dynamically parse the json data from API response and generate html
function generateGallery(data) {
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
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
        `);

        // attach event listeners to the modal buttons (close, previous, next)
        const closeButton = modal.querySelector('.modal-close-btn');
        const prevButton = modal.querySelector('#modal-prev');
        const nextButton = modal.querySelector('#modal-next');

        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
            modal.firstElementChild.style.display = 'none';
        });

        prevButton.addEventListener('click', () => {
            modal.style.display = 'none';
            modal.firstElementChild.style.display = 'none';

            if (modal.previousElementSibling.firstElementChild) {
                modal.previousElementSibling.style.display = 'block';
                modal.previousElementSibling.firstElementChild.style.display = 'block';
            } else {
                const modals = document.querySelectorAll('.modal-container');
                modals[modals.length-1].style.display = 'block';
                modals[modals.length-1].firstElementChild.style.display = 'block';
            }
        });

        nextButton.addEventListener('click', () => {
            modal.style.display = 'none';
            modal.firstElementChild.style.display = 'none';
            
            if (modal.nextElementSibling) {
                modal.nextElementSibling.style.display = 'block';
                modal.nextElementSibling.firstElementChild.style.display = 'block';
            } else {
                const modals = document.querySelectorAll('.modal-container');
                modals[0].style.display = 'block';
                modals[0].firstElementChild.style.display = 'block';
            }
        });
    });

    modalListener();
}

// display the modal of selected employee
function modalListener() {
    const modals = document.querySelectorAll('.modal-container');
    const cards = document.querySelectorAll('.card');
    employees = cards;
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', () => {
            const modal = modals[i].querySelector('.modal');

            modals[i].style.display = 'block';
            modal.style.display = 'block';

        });
    }
}

// execute generateGallery if the response of promise is successful.
displayEmployees()
    .then(generateGallery)