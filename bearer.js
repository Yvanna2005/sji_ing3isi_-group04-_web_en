let conn; // This will hold the connection to the opponent

// Function to set up the connection with the opponent
function setupConnection(connection) {
    conn = connection;

    conn.on('open', () => {
        console.log('Connected to opponent');
        document.getElementById('opponent-info').textContent = 'Opponent: Connected';
    });

    conn.on('data', (data) => {
        if (data.type === 'move') {
            handleOpponentMove(data.move);
        }
    });
}

// Function to remove objects from the game
function removeObjects(numToRemove) {
    // Validate the number of objects to remove
    const currentObjects = document.querySelectorAll(".choose img").length;
    if (numToRemove > 0 && numToRemove <= currentObjects) {
        // Remove the specified number of objects from the UI
        for (let i = 0; i < numToRemove; i++) {
            const allImages = document.querySelectorAll(".choose img");
            if (allImages.length > 0) {
                allImages[0].remove(); // Remove the first image
            }
        }
        // Send the move to the opponent
        conn.send({ type: 'move', move: numToRemove });
    } else {
        alert("Invalid number of objects to remove.");
    }
}

// Function to handle the opponent's move
function handleOpponentMove(numToRemove) {
    // Logic to update the game state based on the opponent's move
    for (let i = 0; i < numToRemove; i++) {
        const allImages = document.querySelectorAll(".choose img");
        if (allImages.length > 0) {
            allImages[0].remove(); // Remove the first image as an example
        }
    }
}
