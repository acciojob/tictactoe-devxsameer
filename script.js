const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", () => {
    const player1 = document.getElementById("player1").value;
    const player2 = document.getElementById("player2").value;

    // Prevent duplicate board creation
    if (document.getElementById("board")) return;

    const message = document.createElement("div");
    message.className = "message";
    message.textContent = `${player1}, you're up`;

    const board = document.createElement("div");
    board.id = "board";

    // Make board visible
    board.style.display = "grid";
    board.style.gridTemplateColumns = "repeat(3, 100px)";
    board.style.gridTemplateRows = "repeat(3, 100px)";
    board.style.marginTop = "20px";

    document.body.appendChild(message);
    document.body.appendChild(board);

    let currentPlayer = "x";
    let currentName = player1;
    let gameOver = false;

    const state = Array(9).fill("");

    for (let i = 1; i <= 9; i++) {
        const cell = document.createElement("div");

        cell.id = i;

        // Important for Cypress visibility
        cell.style.width = "100px";
        cell.style.height = "100px";
        cell.style.border = "1px solid black";
        cell.style.display = "flex";
        cell.style.justifyContent = "center";
        cell.style.alignItems = "center";
        cell.style.fontSize = "40px";
        cell.style.cursor = "pointer";

        board.appendChild(cell);

        cell.addEventListener("click", () => {
            if (gameOver) return;
            if (state[i - 1] !== "") return;

            state[i - 1] = currentPlayer;
            cell.textContent = currentPlayer;

            if (checkWinner(state, currentPlayer)) {
                message.textContent =
                    `${currentName} congratulations you won!`;
                gameOver = true;
                return;
            }

            if (currentPlayer === "x") {
                currentPlayer = "o";
                currentName = player2;
            } else {
                currentPlayer = "x";
                currentName = player1;
            }

            message.textContent = `${currentName}, you're up`;
        });
    }
});

function checkWinner(board, player) {
    const wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return wins.some(combo =>
        combo.every(index => board[index] === player)
    );
}