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

function checkWin() {
    // get the state of the game
    let game = constructMatrix();
    console.log(game)
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
        cell.addEventListener("click", toggle)
    }
})
