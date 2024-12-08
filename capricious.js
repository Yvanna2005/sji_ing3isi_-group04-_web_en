// Initialize the total number of objects
let totalObjects = 24; // Assuming you have 15 objects in total (5 divs with 3 objects each)

// Function to remove objects randomly
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

    // Get all remaining images (objects) in the game
    const allImages = document.querySelectorAll(".choose img");
    
    // Convert the NodeList to an array for easier manipulation
    let imageArray = Array.from(allImages);

    // Shuffle the array to randomize the removal
    shuffleArray(imageArray);

    // Remove the random images
    let removed = 0;
    for (let i = 0; i < imageArray.length && removed < numToRemove; i++) {
        imageArray[i].remove(); // Remove the image (object) from the UI
        removed++;
    }

    // Update the total number of objects
    totalObjects -= numToRemove;
    
    // Update turn information (assuming alternating turns)
    const turnInfo = document.getElementById("turn-info");
    if (turnInfo.textContent === "Your turn") {
        turnInfo.textContent = "Opponent's turn";
    } else {
        turnInfo.textContent = "Your turn";
    }

    // Check for end of game condition
    if (totalObjects === 0) {
        console.log("Game over! The player who removed the last object loses.");
        endGame();
    }
}

// Function to shuffle an array (Fisher-Yates Shuffle Algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

// Function to handle end of game
function endGame() {
    const turnInfo = document.getElementById("turn-info");
    turnInfo.textContent = "Game over! The player who removed the last object loses.";
    // Additional game-over logic can be added here
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

   // All possible image paths (more than 24 images in total)
    const imagePaths = [
        "./images/1.jpg", "./images/3.jpg", "./images/4.jpg",
        "./images/6.jpg", "./images/7.jpg", "./images/1.jpg",
        "./images/3.jpg", "./images/4.jpg", "./images/6.jpg",
        "./images/7.jpg", "./images/1.jpg", "./images/3.jpg",
        "./images/4.jpg", "./images/6.jpg", "./images/7.jpg",
        "./images/3.jpg", "./images/4.jpg", "./images/6.jpg",
        "./images/1.jpg", "./images/3.jpg", "./images/4.jpg",
        "./images/4.jpg", "./images/6.jpg", "./images/7.jpg"
    ];

    // Function to shuffle an array (Fisher-Yates Shuffle Algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

// Function to assign 24 random images to divs
function assignRandomImages() {
 

    // Shuffle the image paths array
    const shuffledImages = shuffleArray([...imagePaths]);

    // Get all the div containers where images will be placed
    const imageContainers = document.querySelectorAll('.choose div');
    
    // Ensure we're assigning exactly 24 images randomly
    const imagesToDisplay = shuffledImages.slice(0, 24); // Only 24 images

    let imageIndex = 0; // Track which image we're currently assigning

    // Iterate through the divs and assign the images
    imageContainers.forEach((container, index) => {
        // For each div container, append 3 images
        for (let i = 0; i < 3; i++) {
            // Create an img element
            const imgElement = document.createElement('img');
            imgElement.src = imagesToDisplay[imageIndex];
            imgElement.alt = "Object Image";

            // Append the image to the current div container
            container.appendChild(imgElement);

            imageIndex++; // Move to the next image in the array
        }
    });
}

// Call the function to assign images when the page loads
window.onload = assignRandomImages;