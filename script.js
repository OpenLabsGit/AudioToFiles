const musicNameInput = document.getElementById('musicName');
const downloadBtn = document.getElementById('downloadBtn');
const loadingIndicator = document.getElementById('loadingIndicator');
const downloadLoader = document.getElementById('downloadLoader');
const videoPreviewContainer = document.getElementById('videoPreviewContainer');
const audioOnlyCheckbox = document.getElementById('audioOnlyCheckbox');

async function makeRequest(url) {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Une erreur s\'est produite lors de la requête.');
  }
  
  const reader = response.body.getReader();
  const contentLength = +response.headers.get('Content-Length');
  let receivedLength = 0;
  const chunks = [];
  
  while (true) {
    const { done, value } = await reader.read();
    
    if (done) {
      break;
    }
    
    chunks.push(value);
    receivedLength += value.length;
    const percentComplete = (receivedLength / contentLength) * 100;
    updateProgressBar(percentComplete);
    updateEstimatedTime(receivedLength, contentLength);
  }
  
  const blob = new Blob(chunks);
  return blob;
}



downloadLoader.classList.add('hidden');

function updateButtonContent() {
  const splashText = splashArray[splashIndex];
  const estimatedTime = calculateEstimatedTime(); // Fonction pour calculer le temps estimé

  downloadBtn.innerHTML = `${splashText} <span class="estimated-time">(${estimatedTime})</span>`;
  splashIndex = (splashIndex + 1) % splashArray.length;
}

// Fonction de calcul du temps estimé (exemple)
function updateProgressBar(percentComplete) {
  const progressBar = document.getElementById('progressBar');
  progressBar.style.width = percentComplete + '%';
}

function updateEstimatedTime(loaded, total) {
  const estimatedTimeElement = document.getElementById('estimatedTime');
  const remainingBytes = total - loaded;
  const speedBytesPerSecond = loaded / (performance.now() / 1000);
  const remainingSeconds = remainingBytes / speedBytesPerSecond;
  const remainingTime = formatTime(remainingSeconds);
  estimatedTimeElement.textContent = `Temps estimé : ${remainingTime}`;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes} min ${remainingSeconds} sec`;
}


downloadBtn.addEventListener('click', async () => {
  if (musicNameInput.value === '') return;
   

  loadingIndicator.style.display = 'block';
  downloadLoader.classList.remove('hidden');
  const audioOnly = audioOnlyCheckbox.checked; // Vérifie si la case à cocher est cochée

  setInterval(updateButtonContent, 1000);
  downloadBtn.innerHTML = `<svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>`;
  const musicName = musicNameInput.value;

  if (musicName.trim() !== '') {
    try {
      const mergeUrl = `http://furia.kohost.fr:3509/merge?artist=${encodeURIComponent(musicName)}`;
      downloadLoader.style.display = 'block';
      const audioUrl = `http://scpanel.hostycord.com:10009/download?name=${encodeURIComponent(musicName)}`;

      let response;

      if (audioOnly) {
        response = await makeRequest(audioUrl); // Effectue une requête uniquement pour l'audio
      } else {
        response = await makeRequest(mergeUrl); // Effectue une requête pour fusionner l'audio et la vidéo
      }
      downloadLoader.style.display = 'none';

      const videoElement = document.createElement('video');
      videoElement.controls = true;
      videoElement.src = window.URL.createObjectURL(response);
      videoElement.addEventListener('loadeddata', () => {
        loadingIndicator.style.display = 'none';
      });

      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(response);
      downloadLink.download = 'file.mkv';
      downloadLink.textContent = 'Télécharger';
      downloadLink.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'w-full');

      const downloadIcon = document.createElement('svg');
      downloadIcon.classList.add('inline-block', 'w-4', 'h-4', 'mr-2');
      downloadIcon.setAttribute('viewBox', '0 0 20 20');
      downloadIcon.setAttribute('fill', 'currentColor');
      downloadIcon.innerHTML = '<path fill-rule="evenodd" d="M2 5a1 1 0 011-1h2.586a1 1 0 01.707.293l5.414 5.414V8a1 1 0 112 0v2.707l5.414-5.414A1 1 0 0117.414 4H20a1 1 0 011 1v9a1 1 0 01-1 1h-1v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-1H1a1 1 0 01-1-1V5zm14.707 1L10 10.293 3.293 4H15z" clip-rule="evenodd" />';

      downloadLink.prepend(downloadIcon);

      videoPreviewContainer.innerHTML = '';
      videoPreviewContainer.appendChild(videoElement);
      videoPreviewContainer.appendChild(downloadLink);

      // Réinitialise le bouton de recherche
      musicNameInput.value = '';
      downloadBtn.innerHTML = 'Rechercher';
    } catch (error) {
      console.error(error);
      // Handle fusion server request errors
      // Display an appropriate error message to the user
    } finally {
      loadingIndicator.style.display = 'none';
    }
  }
});