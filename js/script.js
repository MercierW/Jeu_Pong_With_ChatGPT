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

// Mise à jour du jeu
function update() {
    // Déplacement des raquettes
    if (keys["z"] && player1.y > 0) player1.y -= 6;
    if (keys["s"] && player1.y < canvas.height - paddleHeight) player1.y += 6;
    if (keys["ArrowUp"] && player2.y > 0) player2.y -= 6;
    if (keys["ArrowDown"] && player2.y < canvas.height - paddleHeight) player2.y += 6;

    // Déplacement de la balle
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Rebond sur les murs haut et bas
    if (ball.y <= 0 || ball.y >= canvas.height - ballSize) ball.dy *= -1;

    // Rebond sur les raquettes
    if (
        (ball.x <= player1.x + paddleWidth && ball.y >= player1.y && ball.y <= player1.y + paddleHeight) ||
        (ball.x >= player2.x - ballSize && ball.y >= player2.y && ball.y <= player2.y + paddleHeight)
    ) {
        ball.dx *= -1;
    }

    // Gestion du score
    if (ball.x <= 0) {
        player2.score++;
        resetBall();
    } else if (ball.x >= canvas.width) {
        player1.score++;
        resetBall();
    }
}

// Réinitialisation de la balle
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx *= -1;
}

// Affichage des éléments
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner les raquettes
    ctx.fillStyle = "black";
    ctx.fillRect(player1.x, player1.y, paddleWidth, paddleHeight);
    ctx.fillRect(player2.x, player2.y, paddleWidth, paddleHeight);

    // Dessiner la balle
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ballSize, 0, Math.PI * 2);
    ctx.fill();

    // Afficher le score
    ctx.font = "20px Arial";
    ctx.fillText(`Joueur 1: ${player1.score}`, 50, 30);
    ctx.fillText(`Joueur 2: ${player2.score}`, canvas.width - 150, 30);
}

// Boucle du jeu
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Lancer le jeu
gameLoop();
