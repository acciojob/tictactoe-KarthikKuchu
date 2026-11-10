//your JS code here. If required.
document.getElementById("submit").addEventListener("click", function() {
    const p1Name = document.getElementById("player-1").value || "Player 1";
    const p2Name = document.getElementById("player-2").value || "Player 2";

    const container = document.getElementById("container");
    
    // Replace setup screen with game board view
    container.innerHTML = `
        <h1>Tic Tac Toe</h1>
        <div class="message">${p1Name}, you're up</div>
        <div class="board" id="board">
            <div class="cell" id="1"></div>
            <div class="cell" id="2"></div>
            <div class="cell" id="3"></div>
            <div class="cell" id="4"></div>
            <div class="cell" id="5"></div>
            <div class="cell" id="6"></div>
            <div class="cell" id="7"></div>
            <div class="cell" id="8"></div>
            <div class="cell" id="9"></div>
        </div>
    `;

    let currentPlayer = 1;
    let boardState = Array(10).fill("");
    let isGameOver = false;

    const winningCombinations = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
        [1, 5, 9], [3, 5, 7]             // diagonals
    ];

    function checkWin() {
        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a];
            }
        }
        return null;
    }

    document.querySelectorAll(".cell").forEach(cell => {
        cell.addEventListener("click", function() {
            const id = parseInt(this.id);
            if (boardState[id] !== "" || isGameOver) return;

            const messageDiv = document.querySelector(".message");

            if (currentPlayer === 1) {
                this.textContent = "x";
                boardState[id] = "x";
                
                let winner = checkWin();
                if (winner) {
                    messageDiv.textContent = `${p1Name} congratulations you won!`;
                    isGameOver = true;
                    return;
                }
                
                currentPlayer = 2;
                messageDiv.textContent = `${p2Name}, you're up`;
            } else {
                this.textContent = "o";
                boardState[id] = "o";

                let winner = checkWin();
                if (winner) {
                    messageDiv.textContent = `${p2Name} congratulations you won!`;
                    isGameOver = true;
                    return;
                }

                currentPlayer = 1;
                messageDiv.textContent = `${p1Name}, you're up`;
            }
        });
    });
});