function pickComputerMove() {
    const randNumber = Math.random();
    if (randNumber <= 0.33) return 'Rock';
    if (randNumber <= 0.66) return 'Paper';
    return 'Scissors';
}

let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0 };
updateScore();

let isAutoPlaying=false;
let intervalId;
function autoPlay(){
    if(!isAutoPlaying){
        intervalId = setInterval(function(){
        const playerMove=pickComputerMove();
        playGame(playerMove);
        },1000)
        isAutoPlaying=true;
    }
    
    else{
        clearInterval(intervalId);
        isAutoPlaying=false;
    }
}
function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === computerMove) {
        result = 'Draw!';
        score.ties++;
    } 
    else if(playerMove === 'Rock' && computerMove === 'Paper'){
        result = 'You lost!';
        score.losses++;
    }
    else if(playerMove === 'Rock' && computerMove === 'Scissors'){       
        result = 'You won!';
        score.wins++;
    }
    else if(playerMove === 'Paper' && computerMove === 'Rock'){
        result = 'You won!';
        score.wins++;
    }
    else if(playerMove === 'Paper' && computerMove === 'Scissors'){
        result = 'You lost!';
        score.losses++;
    }
    else if(playerMove === 'Scissors' && computerMove === 'Rock'){
        result = 'You lost!';
        score.losses++;
    }
    else if(playerMove === 'Scissors' && computerMove === 'Paper'){
        result = 'You won!';
        score.wins++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    document.querySelector('.js-result').textContent = result;

    
    document.querySelector('.js-player-move').src = `${playerMove.toLowerCase()}-emoji.png`;
    document.querySelector('.js-computer-move').src = `${computerMove.toLowerCase()}-emoji.png`;

    updateScore();
    }

    function updateScore() {
    document.querySelector('.js-score').innerHTML =
        `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    }