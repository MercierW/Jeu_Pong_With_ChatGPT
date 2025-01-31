// Affichage des éléments
export function draw(ctx, canvas, player1, player2, paddleHeight, paddleWidth, ball, ballSize) {
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