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

fetchData();

// event listener for delete button
document.querySelector('.table-wrapper').addEventListener('click', (e) => {
  const id = e.target.closest('td').nextElementSibling.textContent;
  const queryString = new URLSearchParams({id: id}).toString();

  postData('/api/delete.js', 'post', queryString, fetchData);
  document.getElementById('test').innerHTML = '';
  document.getElementById('svg').hidden = false;
});

const form = document.querySelector('form#register');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const queryString = new URLSearchParams(formData).toString()

  postData(form.getAttribute('action'), form.getAttribute('method'), queryString, fetchData);

  form.reset();
  document.getElementById('test').innerHTML = '';
  document.getElementById('svg').hidden = false;
});
