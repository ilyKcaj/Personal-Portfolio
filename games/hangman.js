const htmlTiles = document.getElementsByClassName('tile');
const tiles = Array.prototype.slice.call(htmlTiles);
const playButton = document.getElementById('playButton');
const hangmanContainer = document.querySelector('.hangmanContainer');
const wordContainer = document.querySelector(".wordContainer");
const hangmanDiv = document.querySelector(".ascii-art");
const endText = document.getElementById('endText');
const retryButton = document.getElementById('retryButton');

const settings = {
    word: '',
    streak: 0,
    highscore: 0,
    wrongCounter: 0,
    win: null,
};

const hangmanAsciiArt = [
    "",
    "  +---+",
    "  |   |",
    "  O   |",
    " /|\\  |",
    " / \\  |",
    "      |",
    "========",
    " /    |",
    " /|   |",
    " /    |",
];

function updateAsciiArt() {
    if (settings.wrongCounter === 0) {
        hangmanDiv.innerHTML = hangmanAsciiArt[0] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[1] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[2] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[6] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[6] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[6] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[6] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[7] + "<br>";
    } else if (settings.wrongCounter === 1) {
        hangmanDiv.innerHTML = hangmanAsciiArt[0] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[1] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[2] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[3] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[6] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[6] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[6] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[7] + "<br>";
    } else if (settings.wrongCounter === 2) {
        hangmanDiv.innerHTML = hangmanAsciiArt[0] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[1] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[2] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[3] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[8] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[6] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[6] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[7] + "<br>";
    } else if (settings.wrongCounter === 3) {
        hangmanDiv.innerHTML = hangmanAsciiArt[0] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[1] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[2] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[3] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[9] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[6] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[6] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[7] + "<br>";
    } else if (settings.wrongCounter === 4) {
        hangmanDiv.innerHTML = hangmanAsciiArt[0] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[1] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[2] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[3] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[4] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[6] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[6] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[7] + "<br>";
    } else if (settings.wrongCounter === 5) {
        hangmanDiv.innerHTML = hangmanAsciiArt[0] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[1] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[2] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[3] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[4] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[10] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[6] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[7] + "<br>";
    } else {
        hangmanDiv.innerHTML = hangmanAsciiArt[0] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[1] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[2] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[3] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[4] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[5] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[6] + "<br>";
        hangmanDiv.innerHTML += hangmanAsciiArt[7] + "<br>";
    }
}


function playGame() {
    endText.style.display = 'none';
    retryButton.style.display = 'none';
    settings.win = null;
    settings.wrongCounter = 0;
    settings.word = '';
    playButton.style.display = 'none';
    updateAsciiArt();
    // const hangmanDiv = document.querySelector(".ascii-art");
    // for (let line of hangmanAsciiArt) {
    //     hangmanDiv.innerHTML += line + "<br>";
    // }

    tiles.forEach((x) => {
        x.className = 'tile';
    });

    const url = 'https://random-word-api.herokuapp.com/word?number=1';
    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let word = data[0];
        settings.word = word;
        hangmanContainer.style.display = 'flex';
        tiles.forEach((x) => {
            x.style.display = 'inline-block';
        });
        let string = [];
        for (let i = 0; i < settings.word.length; i += 1) {
            string.push('_');
        };
        wordContainer.innerHTML = string.join(" "); 
        const wordArray = settings.word.split("");

        window.addEventListener("keydown", (event) => {
            try {
            let key = event.key.toString();
            if (word.includes(key)) {
                document.getElementById(key).className = 'tile pressedRight';
                for (let i = 0; i < settings.word.length; i += 1) {
                    if (wordArray[i] === key) {
                    string[i] = key;
                    wordContainer.innerHTML = string.join(" "); 
                    }
                };
            } else if (document.getElementById(key).classList.contains('pressedRight') || document.getElementById(key).classList.contains('pressedWrong')) {
            } else {
                document.getElementById(key).className = 'tile pressedWrong';
                settings.wrongCounter += 1;
            }
            if (settings.wrongCounter >= 6) {
                settings.win = false;
                gameOver();
            };
            updateAsciiArt();
            if (!string.includes("_")) {
                settings.win = true;
                gameOver();
            }
            } catch(err) {};
        });


    })
    .catch(() => {
        throw new Error('Something went wrong while fetching API.');
    });

}

function gameOver() {
    hangmanContainer.style.display = 'flex';
    tiles.forEach((x) => {
        x.style.display = 'none';
    });
    endText.style.display = 'block';
    // retryButton.style.display = 'block';

    if (settings.win === true) {
        settings.streak += 1;
        endText.innerHTML = 'You win!';
    } else {
        wordContainer.innerHTML = settings.word;
        settings.streak = 0;
        endText.innerHTML = 'You lose!';
    };
    document.getElementById('streak').innerHTML = settings.streak;
    if (settings.streak >= settings.highscore) {
        settings.highscore = settings.streak;
        document.getElementById('highscore').innerHTML = settings.highscore;
    }
};

// tiles.forEach((x) => {
//     x.addEventListener("click", (event) => {
//         event.target.className = 'tile pressed';
//     });
// })

playButton.addEventListener("click", playGame);
retryButton.addEventListener("click", playGame);