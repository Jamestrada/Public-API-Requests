/**********************************************
Developed by: James Estrada 

Search and display employees.
***********************************************/

// Creating and inserting a search bar into the page header.
const searchBar = document.querySelector('.search-container');
searchBar.insertAdjacentHTML('beforeend', `
    <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
`);
const input = searchBar.querySelector('.search-input');
const submit = searchBar.querySelector('.search-submit');

/**
 * Search and filter in real time any employee name that includes the search input value.
 * 
 * @param {HTMLElement} input - Input element that holds the the search input
 * @param {NodeList} employees - The list of employees.
 * @returns {undefined} Display the employees that match the search result
 */
const search = (input, employees) => {
    for (const employee of employees) {
        employee.style.display = 'none';
        const employeeName = employee.childNodes[3];
        if (employeeName.firstElementChild.textContent.toLowerCase().includes(input.value.toLowerCase())) {
            employee.style.display = 'flex';
        }
    }

}

// Event listeners to search in real time through the search bar's input field or button.
input.addEventListener('keyup', () => {
	search(input, employees);
});
submit.addEventListener('click', () => {
	search(input, employees);
});