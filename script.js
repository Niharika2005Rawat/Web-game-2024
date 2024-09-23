const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
let board = Array(4).fill(null).map(() => Array(4).fill(0));
let score = 0;

function init() {
    addRandomTile();
    addRandomTile();
    render();
    document.addEventListener('keydown', handleKey);
}

function addRandomTile() {
    let emptyTiles = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) emptyTiles.push({ x: i, y: j });
        }
    }
    if (emptyTiles.length) {
        const { x, y } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[x][y] = Math.random() < 0.9 ? 2 : 4;
    }
}

function handleKey(event) {
    let moved = false;
    if (event.key === 'ArrowUp') moved = move('up');
    if (event.key === 'ArrowDown') moved = move('down');
    if (event.key === 'ArrowLeft') moved = move('left');
    if (event.key === 'ArrowRight') moved = move('right');

    if (moved) {
        addRandomTile();
        render();
    }
}

function move(direction) {
    let moved = false;
    let tempBoard = board.map(row => row.slice());

    for (let i = 0; i < 4; i++) {
        let row = getRow(i, direction);
        let newRow = slideAndMerge(row);
        if (newRow.join(',') !== row.join(',')) {
            moved = true;
            setRow(i, newRow, direction);
        }
    }
    return moved;
}

function getRow(index, direction) {
    if (direction === 'up') return [board[0][index], board[1][index], board[2][index], board[3][index]];
    if (direction === 'down') return [board[3][index], board[2][index], board[1][index], board[0][index]];
    return board[index];
}

function setRow(index, newRow, direction) {
    if (direction === 'up') {
        for (let j = 0; j < 4; j++) board[j][index] = newRow[j];
    } else if (direction === 'down') {
        for (let j = 0; j < 4; j++) board[3 - j][index] = newRow[j];
    } else {
        board[index] = newRow;
    }
}

function slideAndMerge(row) {
    let newRow = row.filter(num => num);
    for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
            newRow[i] *= 2;
            score += newRow[i];
            newRow.splice(i + 1, 1);
        }
    }
    return newRow.concat(Array(4 - newRow.length).fill(0));
}

function render() {
    grid.innerHTML = '';
    board.forEach(row => {
        row.forEach(value => {
            const box = document.createElement('div');
            box.className = 'box';
            box.dataset.value = value;
            box.textContent = value !== 0 ? value : '';
            grid.appendChild(box);
        });
    });
    scoreDisplay.textContent = score;
}

init();
