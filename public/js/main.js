import { fetchData } from './fetchData.js';

const postData = (url, method, queryString, callback) => {
  const http = new XMLHttpRequest();
  http.open(method, url);
  http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  http.onreadystatechange = function() {
      if (http.readyState == 4 && http.status == 200) {
          console.log(http.responseText);
          callback();
      }
  }
  http.send(queryString);
};
const parseData = (json) => {
  const data = json.data;

  document.getElementById('svg').hidden = true;

  if (data.length > 0) {
      let html = `<p>${data.length} entries were found.</p>`;
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
          <td class="actions"><button class="delete">DEL</button> <button class="details">INFO</button></td>
          <td>${item.id}</td>
          <td>${item.firstName}</td>
          <td>${item.lastName}</td>
          <td>${item.age}</td>
          <td>${item.gender}</td>
          <td>${item.email || ''}</td>
        </tr>`
      });
      html += '</table>';
      document.getElementById('test').innerHTML = html;
  } else {
      document.getElementById('test').innerHTML = 'No data found!';
  }
};
const show = (sectionId) => {
  console.log(sectionId);
  document.querySelectorAll('section').forEach((section) => {
    section.classList.add('hidden');
  });
  document.querySelector(sectionId).classList.remove('hidden');
};

fetchData(null, parseData);

document.querySelector('#addUser_btn').addEventListener('click', (e) => {
  show('#addUser');
});

document.querySelectorAll('.close').forEach((closeBtn) => {
  closeBtn.addEventListener('click', (e) => {
    show('#listing');
  });
});

document.querySelector('#reset').addEventListener('click', (e) => {
  postData('/api/update.js', 'post', null, function() {
    fetchData(null, parseData);
  });
});

document.querySelector('.table-wrapper').addEventListener('click', (e) => {
  console.log(e.target);
  const id = e.target.closest('td').nextElementSibling.textContent;

  if (e.target.classList.contains('delete')) {
    const queryString = new URLSearchParams({id: id}).toString();

    postData('/api/delete.js', 'post', queryString, function() {
      fetchData(null, parseData);
    });
    document.getElementById('test').innerHTML = '';
    document.getElementById('svg').hidden = false;
  } else {
    // handler for info button
    fetchData(id, function(json) {
      const data = json.data;
      console.log(data);
      let html = `<h2>${data.firstName} ${data.lastName}</h2>
      <table>`;

      let details = document.querySelector('#details__content');
      for (const [key, value] of Object.entries(data)) {
        console.log(key, value);
        html += `<tr><td>${key}</td><td>${value}</td></tr>`;
      }
      html += '</table>'
      details.innerHTML = html;
      show('#details');
    });
  }
});

const form = document.querySelector('form#register');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const queryString = new URLSearchParams(formData).toString()

  postData(form.getAttribute('action'), form.getAttribute('method'), queryString, function() {
    fetchData(null, parseData);
  });

  form.reset();
  document.getElementById('test').innerHTML = '';
  document.getElementById('svg').hidden = false;
  show('#listing');
});
