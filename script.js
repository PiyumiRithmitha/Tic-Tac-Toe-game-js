let btnRef = document.querySelectorAll(".btn-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");


// Winning pattern array
let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [1, 4, 7],
    [3, 4, 5],
];

// Player 'X' plays first
let xTurn = true;
let count = 0;

// Disable all buttons
const disableButtons = () => {
    btnRef.forEach((element) => element.disabled = true);
    // Enable popup
    popupRef.classList.remove("hide");
};

// Enable all buttons (for new game/restart)
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.disabled = false;
        element.innerText = ""; // Clear the button text
    });
    // Hide popup
    popupRef.classList.add("hide");
};

// This function is executed when a player wins
const winFunction = (letter) => {
    disableButtons();
    if (letter === "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
    } else {
        msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
    }
};

// Function for draw
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

// New game
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

// Restart
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

// Win logic
const winChecker = () => {
    for (let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        // Check if elements are filled
        if (element1 !== "" && element2 !== "" && element3 !== "") {
            if (element1 === element2 && element2 === element3) {
                // If all 3 buttons have the same values, then pass
                winFunction(element1);
                return; // Stop further checking
            }
        }
    }
    // If all buttons are filled and no win, it's a draw
    if (count === 9) {
        drawFunction();
    }
};

// Display X/O on click
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            // Display X
            element.innerText = "X";
        } else {
            xTurn = true;
            // Display O
            element.innerText = "O";
        }
        element.disabled = true; // Disable the button after click
        // Increment count on each click
        count += 1;
        // Check for a winner
        winChecker();
    });
});

// Enable buttons and disable popup on page load
window.onload = enableButtons;
