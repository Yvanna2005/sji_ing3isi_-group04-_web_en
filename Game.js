let peer;
        let conn;
        let category;
        let isHost = false;
        let gameState = {
            objects: 20,
            currentTurn: null,
            gameStarted: false
        };
        
        // Initialize PeerJS when the page loads
        function initializePeer() {
            peer = new Peer();
            
            peer.on('open', id => {
                console.log('Your Peer ID is:', id);
                document.getElementById('host-id').textContent = id;
            });

            peer.on('error', error => {
                console.error('PeerJS error:', error);
                document.getElementById('connection-status').textContent = 'Connection error: ' + error.message;
            });

            peer.on('connection', connection => {
                conn = connection;
                document.getElementById('host-connection-status').textContent = 'Player connected!';
                setupConnectionHandlers();
                if (isHost) {
                    startGame();
                }
            });
        }

        // Initialize PeerJS when the page loads
        window.addEventListener('load', () => {
            initializePeer();
            const currentUser = localStorage.getItem('currentUser');
            if (currentUser) {
                showGame();
            } else {
                document.getElementById('welcome-screen').classList.remove('d-none');
            }
        });

        function showLogin() {
            document.getElementById('welcome-screen').classList.add('d-none');
            document.getElementById('signup-container').classList.add('d-none');
            document.getElementById('login-container').classList.remove('d-none');
        }

        function showSignup() {
            document.getElementById('welcome-screen').classList.add('d-none');
            document.getElementById('login-container').classList.add('d-none');
            document.getElementById('signup-container').classList.remove('d-none');
        }

        function signOut() {
            localStorage.removeItem('currentUser');
            window.location.reload();
        }

        function showGame() {
            document.getElementById('welcome-screen').classList.add('d-none');
            document.getElementById('login-container').classList.add('d-none');
            document.getElementById('signup-container').classList.add('d-none');
            document.getElementById('dashboard').classList.remove('d-none');
        }

        function validatePassword(password) {
            return password.length >= 8 && /[A-Z]/.test(password);
        }

        function showError(message) {
            alert(message);
        }

        document.getElementById('signup-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('signup-username').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;

            if (!validatePassword(password)) {
                showError('Password must contain at least 8 characters and one capital letter');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users') || '[]');
            if (users.some(user => user.email === email)) {
                showError('User with this email already exists');
                return;
            }

            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify({ username, email }));

            showGame();
        });

        document.getElementById('login-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);

            if (!user) {
                showError('Invalid email or password');
                return;
            }

            localStorage.setItem('currentUser', JSON.stringify({ username: user.username, email: user.email }));
            showGame();
        });

        function selectCategory(selectedCategory) {
            category = selectedCategory;
            document.getElementById('dashboard').classList.add('d-none');
            document.getElementById('host-join-selection').classList.remove('d-none');
        }

        function hostGame() {
            isHost = true;
            document.getElementById('host-join-selection').classList.add('d-none');
            document.getElementById('host-lobby').classList.remove('d-none');
        }

        function showJoinGame() {
            document.getElementById('host-join-selection').classList.add('d-none');
            document.getElementById('join-lobby').classList.remove('d-none');
        }

        function joinGame() {
            const hostId = document.getElementById('host-id-input').value.trim();
            
            if (!hostId) {
                document.getElementById('connection-status').textContent = 'Please enter a valid Host ID';
                return;
            }

            document.getElementById('connection-status').textContent = 'Connecting...';
            
            conn = peer.connect(hostId);
            
            conn.on('open', () => {
                document.getElementById('connection-status').textContent = 'Connected successfully!';
                document.getElementById('join-lobby').classList.add('d-none');
                document.getElementById('game-interface').classList.remove('d-none');
                setupConnectionHandlers();
            });

            conn.on('error', (err) => {
                document.getElementById('connection-status').textContent = 'Connection error: ' + err.message;
            });
        }

        function setupConnectionHandlers() {
            if (!conn) return;

            conn.on('data', handleGameData);
            conn.on('error', error => {
                console.error('Connection error:', error);
                document.getElementById('connection-status').textContent = 'Connection error occurred.';
            });

            conn.on('close', () => {
                console.log('Connection closed');
                document.getElementById('connection-status').textContent = 'Connection closed. Returning to menu...';
                setTimeout(returnToCategories, 2000);
            });
        }

        function handleGameData(data) {
            console.log('Received data:', data);
            switch(data.type) {
                case 'gameInit':
                    category = data.category;
                    gameState = data.gameState;
                    document.getElementById('game-title').textContent = `Game Mode: ${category}`;
                    updateGameUI();
                    break;

                case 'move':
                    handleMove(data.objects);
                    break;

                case 'gameStart':
                    gameState.gameStarted = true;
                    gameState.currentTurn = data.firstTurn;
                    updateTurnInfo();
                    break;
            }
        }

        function sendMove(objects) {
            if (!conn || !gameState.gameStarted || gameState.currentTurn !== (isHost ? 'host' : 'guest')) {
                return;
            }

            if (objects > gameState.objects) {
                showError("Can't remove more objects than available!");
                return;
            }

            conn.send({ type: 'move', objects: objects });
            gameState.objects -= objects;
            gameState.currentTurn = isHost ? 'guest' : 'host'; // Switch turn
            updateGameUI();
            checkGameEnd();
        }

        function handleMove(removedObjects) {
            gameState.objects -= removedObjects;
            gameState.currentTurn = isHost ? 'host' : 'guest'; // Switch turn
            updateGameUI();
            checkGameEnd();
        }

        function updateGameUI() {
            const gameImages = document.getElementById('game-images');
            gameImages.innerHTML = '';
            for (let i = 0; i < gameState.objects; i++) {
                const img = document.createElement('img');
                img.src = "/images/2.jpg"; // Update this to the correct image path for your game objects
                img.alt = "Game object";
                img.className = "game-object";
                gameImages.appendChild(img);
            }
            updateTurnInfo();
        }

        function updateTurnInfo() {
            const isMyTurn = (isHost && gameState.currentTurn === 'host') || 
                             (!isHost && gameState.currentTurn === 'guest');
            document.getElementById('turn-info').textContent = 
                isMyTurn ? 'Your turn!' : "Opponent's turn";
        }

        function checkGameEnd() {
            if (gameState.objects <= 0) {
                const winner = gameState.currentTurn === 'host' ? 'guest' : 'host';
                const gameOverMessage = document.getElementById('game-over-message');
                gameOverMessage.textContent = winner === (isHost ? 'host' : 'guest') ? 'You Win!' : 'You Lose!';
                document.getElementById('game-over-controls').classList.remove('d-none');
            }
        }

        function startGame() {
            if (!isHost || !conn) return;

            gameState = {
                objects: 20,
                currentTurn: 'host',
                gameStarted: true
            };

            conn.send({
                type: 'gameInit',
                category: category,
                gameState: gameState
            });

            conn.send({
                type: 'gameStart',
                firstTurn: 'host'
            });

            document.getElementById('host-lobby').classList.add('d-none');
            document.getElementById('game-interface').classList.remove('d-none');
            document.getElementById('game-title').textContent = `Game Mode: ${category}`;
            updateGameUI();
        }

        function returnToCategories() {
            if (conn) {
                conn.close();
            }
            if (peer) {
                peer.destroy();
            }
            gameState = {
                objects: 20,
                currentTurn: null,
                gameStarted: false
            };
            isHost = false;
            document.getElementById('host-lobby').classList.add('d-none');
            document.getElementById('join-lobby').classList.add('d-none');
            document.getElementById('game-interface').classList.add('d-none');
            document.getElementById('host-join-selection').classList.add('d-none');
            document.getElementById('game-over-controls').classList.add('d-none');
            document.getElementById('dashboard').classList.remove('d-none');
            initializePeer();
        }

        function cancelHosting() {
            if (peer) {
                peer.destroy();
            }
            initializePeer();
            document.getElementById('host-lobby').classList.add('d-none');
            document.getElementById('host-join-selection').classList.remove('d-none');
        }

        function cancelJoining() {
            if (conn) {
                conn.close();
            }
            document.getElementById('join-lobby').classList.add('d-none');
            document.getElementById('host-join-selection').classList.remove('d-none');
            document.getElementById('connection-status').textContent = '';
        }