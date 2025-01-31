export function update(keys, player1, player2, canvas, paddleHeight, paddleWidth, ball, ballSize) {
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
        resetBall(ball, canvas);
    } else if (ball.x >= canvas.width) {
        player1.score++;
        resetBall(ball, canvas);
    }
}

function resetBall(ball, canvas) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx *= -1;
}
