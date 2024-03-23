
document.getElementById("passwordInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Evitar que se envíe el formulario
    checkPassword(); // Llamar a la función para verificar la contraseña
  }
});

function checkPassword() {
  var password = document.getElementById("passwordInput").value;
  if (password === "2309") {
    // Ocultar el cuadro de contraseña
    document.querySelector(".login-container").style.display = "none";
    // Mostrar mensaje emergente de contraseña correcta
    alert("¡Contraseña correcta!");
    // Mostrar el contenido
    document.getElementById("contentContainer").style.display = "block";
    // Iniciar el contador
    startCounter();
    // Cargar el álbum de fotos
    loadPhotoAlbum();
    // Agregar el fondo de video
    addVideoBackground();
  } else {
    alert("Contraseña incorrecta. Inténtalo de nuevo.");
  }
}

function addVideoBackground() {
  const content = document.getElementById('content');
  if (!content) {
    console.error("El elemento con el ID 'content' no fue encontrado.");
    return;
  }
  const video = document.createElement('video');
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.id = 'videoBG';
  
  const source = document.createElement('source');
  source.src = 'video.mp4';
  source.type = 'video/mp4';
  
  video.appendChild(source);
  content.appendChild(video);
}

// Las funciones startCounter() y loadPhotoAlbum() permanecen igual


function startCounter() {
  var startDate = new Date("September 23, 2021 00:00:00");
  setInterval(function() {
    var currentTime = new Date();
    var years = currentTime.getFullYear() - startDate.getFullYear();
    var months = currentTime.getMonth() - startDate.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }
    var days = currentTime.getDate() - startDate.getDate();
    if (days < 0) {
      months--;
      var tempDate = new Date(currentTime.getFullYear(), currentTime.getMonth(), 0);
      days += tempDate.getDate();
    }
    var hours = currentTime.getHours() - startDate.getHours();
    if (hours < 0) {
      days--;
      hours += 24;
    }
    var minutes = currentTime.getMinutes() - startDate.getMinutes();
    if (minutes < 0) {
      hours--;
      minutes += 60;
    }
    var seconds = currentTime.getSeconds() - startDate.getSeconds();
    if (seconds < 0) {
      minutes--;
      seconds += 60;
    }
    document.getElementById("timeCounter").innerText = "Llevamos juntos: " + years + " años, " + months + " meses, " + days + " días, " + hours + " horas, " + minutes + " minutos, " + seconds + " segundos";
  }, 1000);
}



function loadPhotoAlbum() {
  // Cargar datos del archivo JSON
  fetch('photos.json')
    .then(response => response.json())
    .then(data => {
      // Generar el contenido HTML del álbum de fotos
      const photoAlbum = document.getElementById('photoAlbum');
      data.forEach((photo, index) => {
        const photoElement = document.createElement('div');
        photoElement.classList.add('photo');
        photoElement.innerHTML = `
          <img src="${photo.src}" alt="${photo.alt}" style="width: 200px; height: 200px;"> <!-- Aplicar tamaño fijo -->
          <p class="photo-description">${photo.description}</p> <!-- Aplicar clase para estilos de descripción -->
        `;
        photoAlbum.appendChild(photoElement);
        // Agregar la clase "loaded" después de un pequeño retraso para activar la transición
        setTimeout(() => photoElement.classList.add('loaded'), index * 100);
      });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
}








