
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



// Function to handle button clicks for removing objects
function setupButtons() {
  // Get the buttons
  const remove1Button = document.getElementById("remove-1");
  const remove2Button = document.getElementById("remove-2");
  const remove3Button = document.getElementById("remove-3");

  // Add event listeners for each button
  remove1Button.addEventListener("click", () => removeObjects(1)); // Remove 1 object
  remove2Button.addEventListener("click", () => removeObjects(2)); // Remove 2 objects
  remove3Button.addEventListener("click", () => removeObjects(3)); // Remove 3 objects
}