let moveNum = 0;
let twoTiles = [];
let started = false;

function moveTile() {
    const tile1 = document.getElementById(`tile${twoTiles[0]}`);
    const tile2 = document.getElementById(`tile${twoTiles[1]}`);
    if ((isAdjacent(twoTiles[0], twoTiles[1]) && tile1.textContent == "") || (isAdjacent(twoTiles[0], twoTiles[1]) && tile2.textContent == "")) {
        let temp = tile1.textContent;
        tile1.textContent = tile2.textContent;
        tile2.textContent = temp;
        moveNum++;
        document.getElementById("moves").textContent = `Moves: ${moveNum}`;
    }
    if (started) {
        checkWin();
    }
}

function clickTile(tileNumber) {
    twoTiles.push(tileNumber);
    console.log(tileNumber);
    console.log(twoTiles);
    if (twoTiles.length == 2) {
        if (twoTiles[0] == twoTiles[1]) {
            twoTiles = []; //reset if they are the same tile is clicked twice
        }
        else {
            moveTile();
            twoTiles = [];
        }
    }
}

function isAdjacent(tile1, tile2) { 
    let row1 = Math.floor((tile1 - 1) / 4);
    let column1 = (tile1 - 1) % 4
    let row2 = Math.floor((tile2 - 1) / 4);
    let column2 = (tile2 - 1) % 4

    return (row1 === row2 && Math.abs(column1 - column2) === 1) || (column1 === column2 && Math.abs(row1 - row2) === 1)
}

function start() {
    started = true;
    alert("You started the game");
    moveNum = 0;
    document.getElementById("moves").textContent = `Moves: ${moveNum}`;
}

function reset() {
    window.location.reload();
}

function checkWin() {
    let won = true;
    const tiles = document.getElementsByClassName("tile");
    for (let i = 0; i < tiles.length; i++) {
        if (i < 9) {
            if (tiles[i].textContent != tiles[i].id.slice(-1)) {
                won = false;
            }
        }
        if (i < 15 && i >= 9) {
            if (tiles[i].textContent != tiles[i].id.slice(-2)) {
                won = false;
            }
        }
        if (i == 15) {
            if (tiles[i].textContent != "") {
                won = false;
            }
        }
    }
    if (won == true) {
        win();
    }
}

function win() {
    alert("You won! Press reset to play again");
}

function initialize() {
    const tiles = document.getElementsByClassName("tile");

    for (let i = 0; i < tiles.length; i++) {
        tiles[i].textContent = i+1;
        if (i == 15) {
            tiles[i].textContent = "";
        }
        tiles[i].addEventListener("click", () => {
            if (i < 9) {
                clickTile(tiles[i].id.slice(-1));
            }
            else {
                clickTile(tiles[i].id.slice(-2));
            }
        });
    }
} 