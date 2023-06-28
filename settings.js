function updateMaintenance() {
    // Effectuer une requête AJAX pour récupérer le contenu du fichier settings.json
    fetch('https://scpanel.hostycord.com:10009/settings.json')
      .then(response => response.json())
      .then(settings => {
        let { maintenance } = settings;
  
        if (maintenance) {
          // Rediriger vers maintenance.html
          window.location.href = './make/maintenance.html';
          // Afficher une alerte avec le message de maintenance
          alert(`Maintenance en cours : ${settings.maintenanceMessage}. Veuillez réessayer ultérieurement.`);
        } else {
          // Diminuer la valeur de maintenance de 1
          maintenance -= 1;
          settings.maintenance = maintenance;
  
  
          // Effectuer une requête AJAX pour mettre à jour le fichier settings.json sur le serveur distant
          fetch('https://scpanel.hostycord.com:10009/update-settings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(settings)
          })
            .then(() => {
              // Le fichier settings.json a été mis à jour avec succès sur le serveur distant
            })
            .catch(error => {
              console.error('Une erreur s\'est produite lors de la mise à jour du fichier settings.json :', error);
            });
        }
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la lecture du fichier settings.json :', error);
      });
  }
  
  updateMaintenance();
  
  // Mettre à jour la valeur de maintenance chaque minute
  setInterval(updateMaintenance, 60000);
  
  