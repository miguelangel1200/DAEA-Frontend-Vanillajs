document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // Realiza una solicitud POST a tu API para obtener el token de acceso
    fetch('https://localhost:7117/security/createToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Token generado:', data.token);
      // Guarda el token de acceso en el almacenamiento local (localStorage) o en una cookie
      localStorage.setItem('token', data.token);
      // Redirecciona a la pantalla de lista de usuarios
      window.location.href = 'user-list.html';
    })
    .catch(error => {
      console.error('Error de inicio de sesión:', error);
      // Maneja el error de inicio de sesión, por ejemplo, mostrando un mensaje de error en la pantalla
    });
  });
  
  