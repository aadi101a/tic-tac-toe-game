let currentPlayer = "X";
let turnTimer;
let turnTimeLeft = 10;

// Start per-turn timer when page loads
window.onload = function () {
    document.getElementById("print").innerText = "Player X Turn";
    startTurnTimer();
};

// Handle cell click
function handleClick(cellId) {
    const cell = document.getElementById(cellId);

    if (cell.value === "") {
        cell.value = currentPlayer;
        checkWinner();

        // Switch player only if game not ended
        if (!isGameOver()) {
            currentPlayer = currentPlayer === "X" ? "0" : "X";
            document.getElementById("print").innerText = `Player ${currentPlayer} Turn`;
            resetTurnTimer();
        }
    }
}

// Check winner
function checkWinner() {
    const cells = [];
    for (let i = 1; i <= 9; i++) {
        cells[i] = document.getElementById("b" + i).value.toUpperCase();
    }

    const winCombos = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];

    for (let [a, b, c] of winCombos) {
        if (cells[a] && cells[a] === cells[b] && cells[b] === cells[c]) {
            const winner = cells[a];
            document.getElementById("print").innerText = `Player ${winner} won! 🎉`;
            highlightWin(a, b, c);
            disableAll();
            stopTurnTimer();
            return;
        }
    }

    // Check draw
    if ([...Array(9)].every((_, i) => document.getElementById("b" + (i + 1)).value !== "")) {
        document.getElementById("print").innerText = "Match Tie 🤝";
        stopTurnTimer();
    }
}

// Highlight winning cells
function highlightWin(a, b, c) {
    document.getElementById("b" + a).style.backgroundColor = "#90ee90";
    document.getElementById("b" + b).style.backgroundColor = "#90ee90";
    document.getElementById("b" + c).style.backgroundColor = "#90ee90";
}

// Disable all cells
function disableAll() {
    for (let i = 1; i <= 9; i++) {
        document.getElementById("b" + i).disabled = true;
    }
}

// Is game over?
function isGameOver() {
    const text = document.getElementById("print").innerText;
    return text.includes("won") || text.includes("Tie");
}

// Start turn timer
function startTurnTimer() {
    turnTimeLeft = 10;
    document.getElementById("timer").innerText = `⏳ Time left: ${turnTimeLeft}s`;

    turnTimer = setInterval(() => {
        turnTimeLeft--;
        document.getElementById("timer").innerText = `⏳ Time left: ${turnTimeLeft}s`;

        if (turnTimeLeft <= 0) {
            switchTurnTimeout();
        }
    }, 1000);
}

// Stop timer
function stopTurnTimer() {
    clearInterval(turnTimer);
    document.getElementById("timer").innerText = "";
}

// Reset timer for next turn
function resetTurnTimer() {
    stopTurnTimer();
    startTurnTimer();
}

// If player didn’t play in 10 sec
function switchTurnTimeout() {
    clearInterval(turnTimer);
    document.getElementById("print").innerText = `⏱️ Time up! Switching to Player ${currentPlayer === "X" ? "0" : "X"}`;
    
    currentPlayer = currentPlayer === "X" ? "0" : "X";
    
    setTimeout(() => {
        if (!isGameOver()) {
            document.getElementById("print").innerText = `Player ${currentPlayer} Turn`;
            startTurnTimer();
        }
    }, 1000);
}

// Reset Game
function resetGame() {
    for (let i = 1; i <= 9; i++) {
        const cell = document.getElementById("b" + i);
        cell.value = "";
        cell.disabled = false;
        cell.style.backgroundColor = "white";
    }

    currentPlayer = "X";
    document.getElementById("print").innerText = "Player X Turn";
    stopTurnTimer();
    startTurnTimer();
}
