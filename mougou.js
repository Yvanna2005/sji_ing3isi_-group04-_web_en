// Initialize the total number of objects
let totalObjects = 15; // Assuming you have 15 objects in total (5 divs with 3 objects each)

// Function to remove objects
function removeObjects(numToRemove) {
    // Ensure the player is only allowed to remove 1 to 3 objects
    if (numToRemove < 1 || numToRemove > 3) {
        console.log("Invalid move! You can only remove between 1 and 3 objects.");
        return;
    }

    // Ensure there are enough objects left to remove
    if (numToRemove > totalObjects) {
        console.log("Invalid move! Not enough objects left.");
        return;
    }

    // Find the images and remove them
    let removed = 0;
    const allImages = document.querySelectorAll(".choose img");
    for (let i = 0; i < allImages.length; i++) {
        if (removed < numToRemove) {
            allImages[i].remove(); // Remove the image (object) from the UI
            removed++;
        }
    }

    // Update the total number of objects
    totalObjects -= numToRemove;
    
    // Update turn information (assuming alternating turns, you can modify as needed)
    for (let i = 0; i < 15; i+=2){
        if(i % 2 ===0){
            const turnInfo = document.getElementById("turn-info");
            turnInfo.textContent = "Your turn";
        }
        else{
            const turnInfo = document.getElementById("turn-info");
            turnInfo.textContent = "Opponent's turn";
        }
    }
    

    // Check for end of game condition
    if (totalObjects === 0) {
        console.log("Game over! The player who removed the last object loses.");
        endGame();
    }
}

// Function to handle end of game (you can define the logic here)
function endGame() {
    const turnInfo = document.getElementById("turn-info");
    turnInfo.textContent = "Game over! The player who removed the last object loses.";
    // Additional game-over logic can be added here
}


// turns on two different machines
// let isPlayerTurn = true;  // Tracks whether it's the player's turn

// // Function to update the display for whose turn it is
// function updateTurnDisplay() {
//     const messageElement = document.getElementById('turn-message');
    
//     if (isPlayerTurn) {
//         messageElement.textContent = "It's your turn!";
//         toggleButtons(true);  // Enable buttons on the player's turn
//     } else {
//         messageElement.textContent = "It's your opponent's turn!";
//         toggleButtons(false);  // Disable buttons when it's the opponent's turn
//     }
// }

// // Function to enable/disable buttons
// function toggleButtons(isEnabled) {
//     document.getElementById('remove-1').disabled = !isEnabled;
//     document.getElementById('remove-2').disabled = !isEnabled;
//     document.getElementById('remove-3').disabled = !isEnabled;
// }

// // Function to handle when a player removes objects
// function removeObjects(number) {
//     if (!isPlayerTurn) return;  // Do nothing if it's not the player's turn

//     console.log(`Player removed ${number} object(s)`);

//     // After the player's turn, switch to the opponent's turn
//     isPlayerTurn = false;
//     updateTurnDisplay();

//     // Simulate opponent's turn after 2 seconds
//     setTimeout(() => {
//         console.log("Opponent's turn");
//         isPlayerTurn = true;
//         updateTurnDisplay();
//     }, 2000);  // 2 seconds delay for opponent's turn
// }

// // Initialize the game on load
// updateTurnDisplay();


// turns on the same machine

// let currentPlayer = 1;  // Tracks the current player (1 or 2)

// // Function to update the display for whose turn it is
// function updateTurnDisplay() {
//     const messageElement = document.getElementById('turn-message');
    
//     if (currentPlayer === 1) {
//         messageElement.textContent = "Player 1's turn!";
//         toggleButtons(true);  // Enable buttons on Player 1's turn
//     } else {
//         messageElement.textContent = "Player 2's turn!";
//         toggleButtons(true);  // Enable buttons on Player 2's turn
//     }
// }

// // Function to handle when a player removes objects
// function removeObjects(number) {
//     console.log(`Player ${currentPlayer} removed ${number} object(s)`);

//     // Switch turn to the other player
//     currentPlayer = (currentPlayer === 1) ? 2 : 1;
//     updateTurnDisplay();
// }

// // Function to enable/disable buttons (can be modified for future use if needed)
// function toggleButtons(isEnabled) {
//     document.getElementById('remove-1').disabled = !isEnabled;
//     document.getElementById('remove-2').disabled = !isEnabled;
//     document.getElementById('remove-3').disabled = !isEnabled;
// }

// // Initialize the game on load
// updateTurnDisplay();