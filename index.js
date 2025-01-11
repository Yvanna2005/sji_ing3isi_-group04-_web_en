const { PeerServer } = require("peer");

let peer;
let conn;
let targetPage = ""; // This will hold the page URL set by the host.

window.onload = function () {
    // Check if the player has already entered a username
    if (localStorage.getItem('username')) {
        // If username exists, display the home page
        showHomePage();
    } else {
        // Otherwise, prompt the user to enter their username
        document.getElementById('username-prompt').style.display = 'block';
    }
};

// Show registration form
function showRegistration() {
    document.getElementById('username-prompt').style.display = 'none';
    document.getElementById('registration-prompt').style.display = 'block';
}

// Show login form
function showLogin() {
    document.getElementById('registration-prompt').style.display = 'none';
    document.getElementById('username-prompt').style.display = 'block';
}

// Register user
document.getElementById('registration-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const verifyPassword = document.getElementById('reg-verify-password').value;

    if (password !== verifyPassword) {
        alert('Passwords do not match.');
        return;
    }

    // Save to local storage
    const userData = {
        email: email,
        password: password,
        wins: 0,
        fails: 0,
        trophies: 0,
        level: 'mougou' // Default level
    };

    localStorage.setItem(email, JSON.stringify(userData));
    alert('Registration successful! You can now log in.');
    showLogin();
});

// Login user
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = JSON.parse(localStorage.getItem(email));

    if (userData && userData.password === password) {
        localStorage.setItem('username', email); // Store the logged-in user's email
        showHomePage();
    } else {
        alert('Invalid email or password.');
    }
});

function showHomePage() {
    const username = localStorage.getItem('username');

    // Display the home page
    document.getElementById('home-page').classList.remove('d-none');
    document.body.querySelector('#home-page').style.display = 'block';

    // Show the player's name on the home page
    document.getElementById('player-name').textContent = username;
    document.getElementById('username-prompt').style.display = 'none';
    document.getElementById('registration-prompt').style.display = 'none';

    // Set up game options
    setupGameOptions();
}

function setupGameOptions() {
    // Event listeners for hosting and joining a game
    document.getElementById('host-game').addEventListener('click', hostGame);
    document.getElementById('join-game').addEventListener('click', joinGame);
}

function hostGame() {
    const generatePeerId = () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let id = '';
        for (let i = 0; i < 4; i++) {
            id += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        return id;
    };

    const peerId = generatePeerId();

    peer = new PeerServer(peerId, {
        host: 'localhost',
        port: 9000,
        path: '/peerjs',
        secure: false
    });

    peer.on('open', (id) => {
        console.log('My peer ID is: ' + id);
        alert('You are hosting the game. Your Peer ID is: ' + id + '. Share this ID with the player who wants to join.');

        // Prompt the host to set the target page
        targetPage = prompt('Enter the page URL (e.g., "mougou.html") for both players to redirect to:');
    });

    peer.on('error', (err) => {
        console.error('Peer error:', err);
        alert('An error occurred: Ngandui' + err.message);
    });

    peer.on('connection', (connection) => {
        conn = connection;
        setupConnection(conn);
    });
}

function joinGame() {
    const opponentId = prompt("Enter the Peer ID of the opponent you want to join:");
    if (opponentId) {
        peer = new PeerServer({
            host: '172.20.10.5',
            port: 9000,
            path: '/peerjs',
            secure: false
        });

        peer.on('open', () => {
            conn = peer.connect(opponentId);

            conn.on('open', () => {
                console.log('Connected to opponent with ID:', opponentId);
                document.getElementById('opponent-info').textContent = 'Opponent: Connected';

                // Request target page from host
                conn.send({ type: 'requestPage' });
            });

            conn.on('data', (data) => {
                if (data.type === 'redirect') {
                    // Redirect both players to the target page
                    alert('Redirecting to the game...');
                    window.location.href = data.page;
                }
            });

            conn.on('error', (err) => {
                console.error('Connection error:', err);
                alert('Connection error: ' + err.message);
            });
        });

        peer.on('error', (err) => {
            console.error('Peer error:', err);
            alert('An error occurred: ' + err.message);
        });
    }
}

function setupConnection(connection) {
    connection.on('open', () => {
        console.log('Connected to opponent');
        document.getElementById('opponent-info').textContent = 'Opponent: Connected';

        // Send the target page to the client
        connection.on('data', (data) => {
            if (data.type === 'requestPage') {
                connection.send({ type: 'redirect', page: targetPage });
                alert('Redirecting both players to the game...');
                window.location.href = targetPage;
            }
        });
    });

    connection.on('error', (err) => {
        console.error('Connection error:', err);
    });
}
