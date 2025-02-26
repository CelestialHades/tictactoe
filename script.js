// 1. Get DOM elements
const board = document.getElementById('board');
const status = document.getElementById('status');

// 2. Initialize game state
let cells = Array(9).fill(null); // 0-8 positions
let currentPlayer = 'X';
let gameActive = true;

// 3. Winning combinations
const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// 4. Create the game board
function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  }
}

// 5. Handle cell click
function handleClick(event) {
  const index = Number(event.target.dataset.index);
  
  if (!gameActive || cells[index]) return; // Ignore if game over or cell taken
  
  cells[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  
  if (checkWin()) {
    status.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (cells.every(cell => cell)) {
    status.textContent = "It's a tie!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// 6. Check for a win
function checkWin() {
  return winCombos.some(combo => {
    return combo.every(index => cells[index] === currentPlayer);
  });
}

// 7. Reset the game
function resetGame() {
  cells = Array(9).fill(null);
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = `Player ${currentPlayer}'s turn`;
  const cellElements = board.getElementsByClassName('cell');
  for (let cell of cellElements) {
    cell.textContent = '';
  }
}

// 8. Initialize the game
createBoard();