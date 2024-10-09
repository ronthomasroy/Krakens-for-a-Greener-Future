// Game variables for SDG 13, 14, and 15
const games = {
    13: { canvas: null, ctx: null, player: null, objects: [], score: 0, gameLoop: null, isGameOver: false },
    14: { canvas: null, ctx: null, player: null, objects: [], score: 0, gameLoop: null, isGameOver: false },
    15: { canvas: null, ctx: null, player: null, items: [], score: 0, timer: 60, gameLoop: null, isGameOver: false }
};

// SDG 15 Recycling Game Setup
const canvas15 = document.getElementById('gameCanvas15');
const ctx15 = canvas15.getContext('2d');
const scoreDisplay15 = document.getElementById('score15');
const timerDisplay15 = document.getElementById('timer15');
let score15 = 0;
let timeLeft15 = 60;
let gameActive15 = true;

class Player15 {
    constructor() {
        this.width = 50;
        this.height = 60;
        this.x = canvas15.width / 2 - this.width / 2;
        this.y = canvas15.height - this.height - 10;
        this.speed = 6;
    }

    draw() {
        // Draw the recycling bin
        // Change player color to visible on light background
        ctx15.fillStyle = '#4CAF50'; // Green bin body
        ctx15.fillRect(this.x, this.y, this.width, this.height);

        ctx15.fillStyle = '#2E7D32'; // Dark green bin lid
        ctx15.fillRect(this.x - 5, this.y - 10, this.width + 10, 10);

        ctx15.fillStyle = '#333'; // Bin wheels
        ctx15.beginPath();
        ctx15.arc(this.x + 10, this.y + this.height + 5, 5, 0, Math.PI * 2);
        ctx15.arc(this.x + this.width - 10, this.y + this.height + 5, 5, 0, Math.PI * 2);
        ctx15.fill();
    }
    }


class Item15 {
    constructor() {
        this.width = 20;
        this.height = 50;
        this.x = Math.random() * (canvas15.width - this.width);
        this.y = 0;
        this.speed = Math.random() * 2 + 1;
        const itemType = Math.random();
        this.type = itemType < 0.33 ? 'plastic' : (itemType < 0.66 ? 'eWaste' : 'paper');
    }

    draw() {
        if (this.type === 'plastic') {
            ctx15.fillStyle = '#2196F3';
            ctx15.fillRect(this.x, this.y, this.width, this.height);
            ctx15.fillStyle = '#FF9800';
            ctx15.fillRect(this.x + (this.width / 4), this.y - 10, this.width / 2, 10);
        } else if (this.type === 'eWaste') {
            ctx15.fillStyle = '#FFEB3B';
            ctx15.fillRect(this.x, this.y, this.width, this.height);
            ctx15.fillStyle = '#FFC107';
            ctx15.fillRect(this.x + 5, this.y + 5, 10, 10);
        } else if (this.type === 'paper') {
            ctx15.fillStyle = '#D9D9D9';
            ctx15.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    update() {
        this.y += this.speed;
        return this.y > canvas15.height;
    }
}

const player15 = new Player15();
let items15 = [];
let keys15 = {};

document.addEventListener('keydown', (e) => keys15[e.key] = true);
document.addEventListener('keyup', (e) => keys15[e.key] = false);

function addNewItem15() {
    if (gameActive15) items15.push(new Item15());
}

function gameLoop15() {
    if (!gameActive15) return;

    ctx15.clearRect(0, 0, canvas15.width, canvas15.height);

    if (keys15['ArrowLeft']) player15.move('left');
    if (keys15['ArrowRight']) player15.move('right');

    player15.draw();

    items15 = items15.filter(item => {
        item.draw();

        // Collision detection
        if (item.y + item.height > player15.y &&
            item.x < player15.x + player15.width &&
            item.x + item.width > player15.x) {
            score15 += item.type === 'plastic' ? 10 : (item.type === 'eWaste' ? 20 : 15);
            scoreDisplay15.textContent = `Score: ${score15}`;
            return false; // Remove item if collected
        }

        return !item.update(); // Remove item if it goes off screen
    });

    requestAnimationFrame(gameLoop15);
}

function updateTimer15() {
    if (!gameActive15) return;

    timeLeft15--;
    timerDisplay15.textContent = `Time: ${timeLeft15}`;

    if (timeLeft15 <= 0) {
        gameActive15 = false;
        alert(`Game Over! Your score: ${score15}`);
    } else {
        setTimeout(updateTimer15, 1000);
    }
}

setInterval(addNewItem15, 1000); // Add a new item every second
updateTimer15();
gameLoop15();

// Ensure SDG 13 and SDG 14 game logic remains the same as before
// (existing game code for SDG 13 and SDG 14 would be above or below this block)
