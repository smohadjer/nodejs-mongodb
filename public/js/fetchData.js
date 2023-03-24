export const fetchData = () => {
  fetch('/api/fetch.js')
  .then((response) => response.json())
  .then((json) => {
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
            <th>Phone</th>
            <th>Date of Birth</th>
            <th>Height</th>
          </tr>`;
          data.forEach((item) => {
            html += `<tr>
              <td><button class="delete">DEL</button></td>
              <td>${item.id}</td>
              <td>${item.firstName}</td>
              <td>${item.lastName}</td>
              <td>${item.age}</td>
              <td>${item.gender}</td>
              <td>${item.email || ''}</td>
              <td>${item.phone || ''}</td>
              <td>${item.birthDate || ''}</td>
              <td>${item.height || ''}</td>
            </tr>`
          });
          html += '</table>';
          document.getElementById('test').innerHTML = html;
      } else {
          document.getElementById('test').innerHTML = 'No data found!';
      }
  });
};
