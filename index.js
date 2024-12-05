 
// // login
// window.onload = function() {
//     // Check if the user has a saved username in localStorage
//     if (!localStorage.getItem('username')) {
//       // If not, show the username prompt
//       document.getElementById('username-prompt').style.display = 'block';
//     } else {
//       // Otherwise, proceed to the game lobby
//       loadGameLobby();
//     }
//   };
  
//   function setUsername() {
//     const username = document.getElementById('username').value;
//     if (username) {
//       localStorage.setItem('username', username); // Save username in localStorage
//       document.getElementById('username-prompt').style.display = 'none';
//       loadGameLobby(); // Proceed to game lobby
//     }
//   }
  
//   function loadGameLobby() {
//     // Load the main game interface (categories, player list, etc.)
//     console.log('Loading game lobby...');
//     // Code to load categories and online players goes here
//   }


//   function resetUsername() {
//     localStorage.removeItem('username');
//     location.reload(); // Reload the page to show the username prompt again
// }

window.onload = function() {
  // Check if the player has already entered a username
  if (localStorage.getItem('username')) {
      // If username exists, display the home page
      showHomePage();
  } else {
      // Otherwise, prompt the user to enter their username
      document.getElementById('username-prompt').style.display = 'block';
  }
};


function setUsername() {
  const usernameInput = document.querySelector('input').value;

  // Check if the user entered a valid name
  if (usernameInput.trim()) {
      // Save the username to localStorage
      localStorage.setItem('username', usernameInput);

      // Hide the username prompt and show the home page
      // document.getElementById('username-prompt').style.display = 'none';

      // Redirect to the home page
      showHomePage();
  } else {
      alert('Please enter a valid name.');
  }
}

function showHomePage() {
  // Get the username from localStorage
  const username = localStorage.getItem('username');

  // Display the home page
  document.getElementById('home-page').classList.remove('d-none');
  document.body.querySelector('#home-page').style.display = 'block';

  // Show the player's name on the home page
  document.getElementById('player-name').textContent = username;
  document.getElementById('username-prompt').style.display = 'none'
}

// go back
function changeUsername() {
  // Clear the stored username
  localStorage.removeItem('username');

  // Hide the home page
  document.getElementById('home-page').classList.add('d-none');
  document.getElementById('home-page').style.display = 'none';

  // Show the username prompt again to allow user to change their username
  document.getElementById('username-prompt').style.display = 'block';
}

// classifications

// Player data
let player1 = { name: "Player 1", consecutiveWins: 0, classification: "Mougou" };
let player2 = { name: "Player 2", consecutiveWins: 0, classification: "Mougou" };

// Function to check classification based on consecutive wins
function updateClassification(player) {
    if (player.consecutiveWins >= 6) {
        player.classification = "Capricious Bearer";
    } else if (player.consecutiveWins >= 3) {
        player.classification = "Bearer";
    } else {
        player.classification = "Mougou";
    }
}

// Function to handle match result
function handleMatchResult(winner, loser) {
    // Update winner's consecutive wins
    winner.consecutiveWins++;
    
    // Reset loser's consecutive wins
    loser.consecutiveWins = 0;
    
    // Update classifications for both players
    updateClassification(winner);
    updateClassification(loser);
    
    // Display results
    displayPlayerInfo();
}

// Function to display player info
function displayPlayerInfo() {
    document.getElementById('player1-info').textContent = 
        `${player1.name}: ${player1.consecutiveWins} wins - ${player1.classification}`;
    
    document.getElementById('player2-info').textContent = 
        `${player2.name}: ${player2.consecutiveWins} wins - ${player2.classification}`;
}



// Initialize the display on page load
displayPlayerInfo();

handleMatchResult(player1, player2);
