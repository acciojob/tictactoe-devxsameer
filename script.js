const submit = document.getElementById("submit");

let player1 = "";
let player2 = "";
let current = "X";
let board = ["", "", "", "", "", "", "", "", ""];

const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

submit.addEventListener("click", () => {
  player1 = document.getElementById("player-1").value;
  player2 = document.getElementById("player-2").value;

  document.getElementById("form").style.display = "none";
  document.getElementById("game").style.display = "block";

  document.querySelector(".message").innerText =
    `${player1}, you're up`;

  document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener("click", play);
  });
});

function play() {
  const idx = Number(this.id) - 1;

  if (board[idx] !== "") return;

  board[idx] = current;
  this.innerText = current.toLowerCase();

  if (checkWin()) {
    const winner = current === "X" ? player1 : player2;
    document.querySelector(".message").innerText =
      `${winner} congratulations you won!`;
    return;
  }

  current = current === "X" ? "O" : "X";

  document.querySelector(".message").innerText =
    `${current === "X" ? player1 : player2}, you're up`;
}

function checkWin() {
  return wins.some(pattern =>
    pattern.every(i => board[i] === current)
  );
}