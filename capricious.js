// Initialize the total number of objects
let totalObjects = 25; // Assuming you have 15 objects in total (5 divs with 3 objects each)

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
    const turnInfo = document.getElementById("turn-info");
    turnInfo.textContent = "Opponent's turn";

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