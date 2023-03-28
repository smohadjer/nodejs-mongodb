import { fetchData } from './fetchData.js';
const postData = (url, method, queryString, callback) => {
    const http = new XMLHttpRequest();
    http.open(method, url);
    http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            console.log(http.responseText);
            callback();
        }
    };
    http.send(queryString);
};
const parseData = (json) => {
    const data = json.data;
    document.getElementById('svg').hidden = true;
    const listing = document.getElementById('listing__content');
    if (data.length > 0) {
        let html = `<p><strong>${data.length}</strong> entries were found.</p>`;
        html += `<table>
      <tr>
        <th></th>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Age</th>
        <th>Gender</th>
        <th>Email</th>
      </tr>`;
        data.forEach((item) => {
            html += `<tr>
          <td class="actions"><button class="delete">X</button>
          <button class="details">Details</button></td>
          <td>${item.id}</td>
          <td>${item.firstName}</td>
          <td>${item.lastName}</td>
          <td>${item.age}</td>
          <td>${item.gender}</td>
          <td>${item.email || ''}</td>
        </tr>`;
        });
        html += '</table>';
        listing.innerHTML = html;
    }
    else {
        listing.innerHTML = 'No data found!';
    }
};
const show = (sectionId) => {
    document.querySelectorAll('section').forEach((section) => {
        section.classList.add('hidden');
    });
    document.querySelector(sectionId).classList.remove('hidden');
};
const addEventListeners = () => {
    document.querySelector('#addUser_btn').addEventListener('click', (e) => {
        show('#addUser');
    });
    document.querySelectorAll('.close').forEach((closeBtn) => {
        closeBtn.addEventListener('click', (e) => {
            show('#listing');
        });
    });
    document.querySelector('#reset').addEventListener('click', (e) => {
        document.getElementById('listing__content').innerHTML = '';
        document.getElementById('svg').hidden = false;
        postData('/api/update.js', 'post', null, function () {
            fetchData(null, parseData);
        });
    });
    document.querySelector('.table-wrapper').addEventListener('click', (e) => {
        const target = e.target;
        const id = target.closest('td').nextElementSibling.textContent;
        if (target.classList.contains('delete')) {
            const queryString = new URLSearchParams({ id: id }).toString();
            postData('/api/delete.js', 'post', queryString, function () {
                fetchData(null, parseData);
            });
            document.getElementById('listing__content').innerHTML = '';
            document.getElementById('svg').hidden = false;
        }
        else {
            // handler for info button
            fetchData(id, function (json) {
                const data = json.data;
                console.log(data);
                let html = `<h2>${data.firstName} ${data.lastName}</h2>
        <table>`;
                let details = document.querySelector('#details__content');
                for (const [key, value] of Object.entries(data)) {
                    console.log(key, value);
                    html += `<tr><td>${key}</td><td>${value}</td></tr>`;
                }
                html += '</table>';
                details.innerHTML = html;
                show('#details');
            });
        }
    });
    const addUserForm = document.querySelector('form#register');
    addUserForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Using type any for formData to avoid ts throwing an error on URLSearchParams(formData)
        // for more info see: https://github.com/microsoft/TypeScript/issues/30584
        const formData = new FormData(addUserForm);
        const queryString = new URLSearchParams(formData).toString();
        postData(addUserForm.getAttribute('action'), addUserForm.getAttribute('method'), queryString, function () {
            fetchData(null, parseData);
        });
        addUserForm.reset();
        document.getElementById('listing__content').innerHTML = '';
        document.getElementById('svg').hidden = false;
        show('#listing');
    });
};
addEventListeners();
fetchData(null, parseData);
//# sourceMappingURL=main.js.map