const boardSize = 5; 
let board = Array(boardSize).fill().map(() => Array(boardSize).fill(0));
let score = 0;

document.addEventListener('DOMContentLoaded', () => {
    initGame();
    document.addEventListener('keydown', handleInput);
});

function initGame() {
    addRandomTile();
    addRandomTile();
    updateBoard();
}

function addRandomTile() {
    let emptyTiles = [];
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (board[row][col] === 0) {
                emptyTiles.push({ row, col });
            }
        }
    }
    if (emptyTiles.length === 0) return;
    const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    board[randomTile.row][randomTile.col] = Math.random() < 0.9 ? 2 : 4;
}

function updateBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Clear the board first
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            if (board[row][col] > 0) {
                tile.classList.add(`tile-${board[row][col]}`);
                tile.textContent = board[row][col];
            }
            gameBoard.appendChild(tile);
        }
    }
    document.getElementById('score').textContent = `Final score of the player: ${score}`;
}

function handleInput(event) {
    switch (event.key) {
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        default:
            return;
    }
    addRandomTile(); 
    updateBoard(); 
}

function moveLeft() {
    for (let row = 0; row < boardSize; row++) {
        let filteredRow = board[row].filter(val => val); 
        for (let col = 0; col < filteredRow.length - 1; col++) {
            if (filteredRow[col] === filteredRow[col + 1]) { 
                filteredRow[col] *= 2;
                score += filteredRow[col];
                filteredRow.splice(col + 1, 1); 
            }
        }
        while (filteredRow.length < boardSize) {
            filteredRow.push(0); 
        }
        board[row] = filteredRow; 
    }
}

function moveRight() {
    for (let row = 0; row < boardSize; row++) {
        let filteredRow = board[row].filter(val => val);
        for (let col = filteredRow.length - 1; col > 0; col--) {
            if (filteredRow[col] === filteredRow[col - 1]) { 
                filteredRow[col] *= 2; 
                score += filteredRow[col]; 
                filteredRow.splice(col - 1, 1); 
            }
        }
        while (filteredRow.length < boardSize) {
            filteredRow.unshift(0); 
        }
        board[row] = filteredRow; 
    }
}

function moveUp() {
    for (let col = 0; col < boardSize; col++) {
        let column = [];
        for (let row = 0; row < boardSize; row++) {
            if (board[row][col] !== 0) {
                column.push(board[row][col]);
            }
        }
        for (let row = 0; row < column.length - 1; row++) {
            if (column[row] === column[row + 1]) {
                column[row] *= 2;
                score += column[row];
                column.splice(row + 1, 1);
            }
        }
        while (column.length < boardSize) {
            column.push(0);
        }
        for (let row = 0; row < boardSize; row++) {
            board[row][col] = column[row];
        }
    }
}

function moveDown() {
    for (let col = 0; col < boardSize; col++) {
        let column = [];
        for (let row = 0; row < boardSize; row++) {
            if (board[row][col] !== 0) {
                column.push(board[row][col]);
            }
        }
        for (let row = column.length - 1; row > 0; row--) {
            if (column[row] === column[row - 1]) {
                column[row] *= 2;
                score += column[row];
                column.splice(row - 1, 1);
            }
        }
        while (column.length < boardSize) {
            column.unshift(0);
        }
        for (let row = 0; row < boardSize; row++) {
            board[row][col] = column[row];
        }
    }
}
