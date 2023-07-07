// Obtiene el token de acceso almacenado previamente
var token = localStorage.getItem('token');
// Verifica si el usuario está autenticado
if (!token) {
  // Si el token no existe, redirecciona a la pantalla de inicio de sesión
  window.location.href = 'login.html';
} else {
  // Realiza una solicitud GET a tu API para obtener la lista de usuarios
  fetch('https://localhost:7117/People/Get', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else if (response.status === 401) {
      throw new Error('No autorizado');
    } else {
      throw new Error('Error de solicitud: ' + response.status);
    }
  })
  .then(data => {
    var userList = document.getElementById('userList');
    console.log(data)
    // Agrega cada usuario a la lista
    data.forEach(function(person) {
      var listItem = document.createElement('li');
      listItem.textContent = person.firstName + ' ' + person.lastName;
      userList.appendChild(listItem);
    });
  })
  
  .catch(error => {
    console.error('Error al obtener la lista de usuarios:', error);
    // Maneja el error de obtener la lista de usuarios, por ejemplo, mostrando un mensaje de error en la pantalla
  });
}
