import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  player1Health: number = 100;
  player2Health: number = 100;
  currentPlayer: 1 | 2 = 1;
  gameEnded: boolean = false;
  winnerMessage: string = '';
  turnMessage: string = '';

  ngOnInit(): void {
    this.initGame();
  }

  initGame(): void {
    this.currentPlayer = Math.random() < 0.5 ? 1 : 2;
    this.updateTurnMessage();
    this.gameEnded = false;
    this.winnerMessage = '';
  }

  updateTurnMessage(): void {
    this.turnMessage = this.gameEnded
      ? 'Juego terminado'
      : `Turno del Jugador ${this.currentPlayer}`;
  }

  attack(attackingPlayer: 1 | 2): void {
    if (this.gameEnded || attackingPlayer !== this.currentPlayer) return;

    const damage: number = Math.floor(Math.random() * 16) + 10;

    if (attackingPlayer === 1) {
      this.player2Health = Math.max(0, this.player2Health - damage);
    } else {
      this.player1Health = Math.max(0, this.player1Health - damage);
    }

    if (this.player1Health <= 0 || this.player2Health <= 0) {
      this.endGame();
      return;
    }

    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    this.updateTurnMessage();
  }

  endGame(): void {
    this.gameEnded = true;
    this.winnerMessage =
      this.player1Health <= 0
        ? '¡Jugador 2 es el ganador!'
        : '¡Jugador 1 es el ganador!';
    this.updateTurnMessage();
  }

  restartGame(): void {
    this.player1Health = 100;
    this.player2Health = 100;
    this.initGame();
  }
}
