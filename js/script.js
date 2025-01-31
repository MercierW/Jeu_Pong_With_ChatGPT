import { update } from "./update.js";
import { draw } from "./draw.js";

// Sélection du canvas et du contexte de dessin
const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

// Dimensions
canvas.width = 800;
canvas.height = 500;

// Raquettes et balle
const paddleWidth = 10, paddleHeight = 100;
const ballSize = 10;

// Joueurs
const player1 = { x: 10, y: canvas.height / 2 - paddleHeight / 2, score: 0 };
const player2 = { x: canvas.width - 20, y: canvas.height / 2 - paddleHeight / 2, score: 0 };
const ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 4, dy: 4 };

// Contrôles
const keys = {};

// Événements clavier
document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

// Boucle du jeu
function gameLoop() {
    update(keys, player1, player2, canvas, paddleHeight, paddleWidth, ball, ballSize);
    draw(ctx, canvas, player1, player2, paddleHeight, paddleWidth, ball, ballSize);
    requestAnimationFrame(gameLoop);
}

// Lancer le jeu
gameLoop();