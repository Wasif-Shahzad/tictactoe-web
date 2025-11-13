const cells = document.querySelectorAll('.item')
const outer_container = document.querySelector('.large-container')
const heading = document.querySelector('.large-container h1')
const inner_container = document.querySelector('.container')

function constructMatrix() {
    // construct the 3x3 matrix representing the state of our game
    // -1 => red's move
    // 0 => empty
    // 1 => blue's move
    let game = []
    let row = []
    for(let i = 0; i < 9; i++) {
        if(i % 3 == 0) {
            if(i > 0) {
                game.push(row)
            }
            row = []
        }
        const cell = cells[i]
        if(cell.classList.contains('empty')) {
            row.push(0)
            continue
        } 
        const text = cell.textContent
        if(text == 'O') {
            row.push(1);
        } else {
            row.push(-1);
        }
    }
    game.push(row)
    return game;
}

function checkLine(a, b, c) {
    if(a == b && b == c) {
        return a;
    } else {
        return 2;
    }
}

function movesAvailable(state) {
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(state[i][j] == 0) return true;
        }
    }
    return false;
}

function checkWin() {
    // get the state of the game
    let game = constructMatrix();
    for(let i = 0; i < 3; i++) {
        let row = checkLine(game[i][0], game[i][1], game[i][2]);
        if(Math.abs(row) == 1) {
            return row;
        }
        let col = checkLine(game[0][i], game[1][i], game[2][i]);
        if(Math.abs(col) == 1) {
            return col;
        }
    }
    let diag = checkLine(game[0][0], game[1][1], game[2][2]);
    if(Math.abs(diag) == 1) {
        return diag;
    }
    diag = checkLine(game[0][2], game[1][1], game[2][0]);
    if(Math.abs(diag) == 1) {
        return diag;
    }
    if(movesAvailable(game)) {
        return 2;
    } else {
        return 0;
    }
}

function showResult(result) {
    let newClass = "neutral";
    if(result == 1) {
        newClass = "friend";
    } else if(result == -1) {
        newClass = "enemy";
    }

    const alertScreen = document.querySelector('.alert-container');
    alertScreen.classList.add(newClass);
    const alertText = alertScreen.firstElementChild;

    if(newClass == "neutral") {
        alertText.textContent = "Draw!";
    } else if(newClass == "friend") {
        alertText.textContent = "Blue Won!";
    } else {
        alertText.textContent = "Red Won!";
    }
    const button = document.querySelector('.alert-btn');
    button.classList.add(newClass);
    
    setTimeout(() => alertScreen.parentElement.classList.add('active'), 0);
    button.addEventListener("click", () => {
        window.location.reload();
    }, {once: true});
}

function toggle(event) {
    // fill our clicked cell and remove empty class
    const clickedCell = event.target
    if(outer_container.classList.contains('friend')) {
        clickedCell.textContent = 'O';
    } else {
        clickedCell.textContent = 'X';
    }
    clickedCell.classList.remove('empty')

    // check if the game has reached a result
    const res = checkWin();
    if(res != 2) {
        setTimeout(() => {
            showResult(res);
        }, 250);
        return;
    }

    // update the theme
    const wasFriend = outer_container.classList.contains('friend');
    [outer_container, inner_container, heading].forEach(element => {
        if (wasFriend) {
            element.classList.remove('friend');
            element.classList.add('enemy');
        } else {
            element.classList.remove('enemy');
            element.classList.add('friend');
        }
    });

    // update cells of the board
    if(outer_container.classList.contains('friend')) {
        cells.forEach(cell => {
            cell.classList.remove('enemy');
            cell.classList.add('friend');
        });
    } else {
        cells.forEach(cell => {
            cell.classList.remove('friend');
            cell.classList.add('enemy');
        });
    }

    // update heading
    if(outer_container.classList.contains('friend')) {
        heading.textContent = "Blue's Turn"
    } else {
        heading.textContent = "Red's Turn"
    }
}

cells.forEach(cell => {
    if(cell.classList.contains('empty')) {
        cell.addEventListener("click", toggle, {once: true})
    }
})
