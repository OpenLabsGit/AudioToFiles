const musicNameInput = document.getElementById('musicName');
const downloadBtn = document.getElementById('downloadBtn');
const loadingIndicator = document.getElementById('loadingIndicator');
const downloadLoader = document.getElementById('downloadLoader');
const audioPlayer = document.getElementById('audioPlayer');
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
  const audioOnly = audioOnlyCheckbox.checked;

  try {
    const mergeUrl = `http://furia.kohost.fr:3509/merge?artist=${encodeURIComponent(musicName)}`;
    downloadLoader.style.display = 'block';
    const audioUrl = `https://scpanel.hostycord.com:10009/download?name=${encodeURIComponent(musicName)}`;

    let response;

    if (audioOnly) {
      response = await makeRequest(audioUrl);
    } else {
      response = await makeRequest(mergeUrl);
    }
    downloadLoader.style.display = 'none';

    const audioElement = new Howl({
      src: [`${window.URL.createObjectURL(response)}`],
      volume: 1,
      autoplay: true,
    });

    audioElement.once('load', function(){
      audioElement.play();
    });

    audioElement.on('end', function(){
      console.log('Finished!');
    });

    audioElement.once('loaderror', function(){
      console.error('Error loading audio');
    });

    audioPlayer.innerHTML = `
      <audio controls>
        <source src="${window.URL.createObjectURL(response)}" type="audio/mpeg">
      </audio>
    `;

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(response);
    downloadLink.textContent = 'Télécharger';
    downloadLink.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'w-full');

    if (audioOnly) {
      downloadLink.download = 'file.mp3';
    } else {
      downloadLink.download = 'file.mkv';
    }

    audioPlayer.appendChild(downloadLink);

    musicNameInput.value = '';
    downloadBtn.innerHTML = 'Rechercher';
  } catch (error) {
    console.error(error);
    // Gérer les erreurs de requête
    // Afficher un message d'erreur approprié à l'utilisateur
  } finally {
    loadingIndicator.style.display = 'none';
  }
});
