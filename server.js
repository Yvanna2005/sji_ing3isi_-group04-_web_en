const { PeerServer } = require('peer');

// Configurer un serveur PeerJS simple
const peerServer = PeerServer({
  port: 9000, // Port d'écoute
  path: '/peerjs', // Chemin de l'API
  allow_discovery: true, // Permet aux pairs de découvrir d'autres pairs
});



console.log('Serveur PeerJS démarré sur le port 9000');