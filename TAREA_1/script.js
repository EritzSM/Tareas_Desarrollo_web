
let player1Health = 100;
let player2Health = 100;
let currentPlayer = 0;
let gameEnded = false;


const health1Bar = document.getElementById('health1Bar');
const health2Bar = document.getElementById('health2Bar');
const health1Text = document.getElementById('health1Text');
const health2Text = document.getElementById('health2Text');
const attackBtn1 = document.getElementById('attackBtn1');
const attackBtn2 = document.getElementById('attackBtn2');
const turnIndicator = document.getElementById('turnIndicator');
const winnerMessage = document.getElementById('winnerMessage');
const player1Container = document.getElementById('player1');
const player2Container = document.getElementById('player2');


function initGame() {
    
    currentPlayer = Math.random() < 0.5 ? 1 : 2;
    updateTurnIndicator();
    updateHealthBars();
    updateButtons();
    gameEnded = false;
    winnerMessage.innerHTML = '';
}


function updateTurnIndicator() {
    if (gameEnded) return;
    
    turnIndicator.textContent = `Turno del Jugador ${currentPlayer}`;
    
    
    if (currentPlayer === 1) {
        player1Container.classList.add('active');
        player2Container.classList.remove('active');
    } else {
        player2Container.classList.add('active');
        player1Container.classList.remove('active');
    }
}


function updateHealthBars() {
    const health1Percentage = Math.max(0, player1Health);
    const health2Percentage = Math.max(0, player2Health);
    
    health1Bar.style.width = health1Percentage + '%';
    health2Bar.style.width = health2Percentage + '%';
    
    health1Text.textContent = Math.max(0, player1Health);
    health2Text.textContent = Math.max(0, player2Health);
}


function updateButtons() {
    if (gameEnded) {
        attackBtn1.disabled = true;
        attackBtn2.disabled = true;
        return;
    }

    attackBtn1.disabled = currentPlayer !== 1;
    attackBtn2.disabled = currentPlayer !== 2;
}


function attack(attackingPlayer) {
    if (gameEnded || attackingPlayer !== currentPlayer) return;
    
    
    const damage = Math.floor(Math.random() * 16) + 10;
    const targetPlayer = attackingPlayer === 1 ? 2 : 1;
    
    
    if (targetPlayer === 1) {
        player1Health = Math.max(0, player1Health - damage);
    } else {
        player2Health = Math.max(0, player2Health - damage);
    }
    
    
    updateHealthBars();
    
    
    if (player1Health <= 0 || player2Health <= 0) {
        endGame();
        return;
    }
    
    
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updateTurnIndicator();
    updateButtons();
}


function endGame() {
    gameEnded = true;
    const winner = player1Health <= 0 ? 2 : 1;
    
    winnerMessage.innerHTML = `
        <div class="winner-message">
            ¡Jugador ${winner} es el ganador!
        </div>
    `;
    
    turnIndicator.textContent = 'Juego terminado';
    player1Container.classList.remove('active');
    player2Container.classList.remove('active');
    updateButtons();
}


function restartGame() {
    player1Health = 100;
    player2Health = 100;
    initGame();
}


window.addEventListener('load', initGame);