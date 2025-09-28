/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DinoIcon,
  Grid,
  MoonStar,
  PersonStanding,
  SpiderMan,
  WormIcon,
} from "../assets/icons/icons";

export const snakeGame: any = [
  {
    id: "snake-game",
    name: "Snake Game",
    isFree: false,
    price: 299,
    description:
      "Classic Snake game with smooth animations, growing mechanics, and mobile-like controls",
    category: "games" as const,
    icon: WormIcon,
    code: `// Snake Game with Smooth Animations
function createSnakeGame() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 600;
  canvas.height = 600;
  canvas.style.border = '2px solid #333';
  canvas.style.background = '#1a1a1a';
  
  // Game constants
  const GRID_SIZE = 20;
  const GRID_WIDTH = canvas.width / GRID_SIZE;
  const GRID_HEIGHT = canvas.height / GRID_SIZE;
  
  // Game state
  const game = {
    snake: [
      { x: 15, y: 15, targetX: 15, targetY: 15 },
      { x: 14, y: 15, targetX: 14, targetY: 15 },
      { x: 13, y: 15, targetX: 13, targetY: 15 }
    ],
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    food: { x: 10, y: 10 },
    score: 0,
    gameRunning: true,
    gameStarted: false,
    speed: 150,
    lastMoveTime: 0,
    animationProgress: 0,
    particles: [],
    trail: [],
    gameOver: false,
    highScore: parseInt(localStorage.getItem('snakeHighScore') || '0')
  };
  
  // Initialize food position
  spawnFood();
  
  // Event listeners
  document.addEventListener('keydown', handleKeyPress);
  
  // Touch controls for mobile-like experience
  let touchStartX = 0;
  let touchStartY = 0;
  
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  });
  
  canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    if (!touchStartX || !touchStartY) return;
    
    const touch = e.changedTouches[0];
    const touchEndX = touch.clientX;
    const touchEndY = touch.clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (deltaX > 30 && game.direction.x !== -1) {
        game.nextDirection = { x: 1, y: 0 };
      } else if (deltaX < -30 && game.direction.x !== 1) {
        game.nextDirection = { x: -1, y: 0 };
      }
    } else {
      // Vertical swipe
      if (deltaY > 30 && game.direction.y !== -1) {
        game.nextDirection = { x: 0, y: 1 };
      } else if (deltaY < -30 && game.direction.y !== 1) {
        game.nextDirection = { x: 0, y: -1 };
      }
    }
    
    if (!game.gameStarted) {
      startGame();
    }
    
    touchStartX = 0;
    touchStartY = 0;
  });
  
  function handleKeyPress(e) {
    if (!game.gameStarted && (e.key === ' ' || e.key === 'Enter')) {
      startGame();
      return;
    }
    
    if (game.gameOver && (e.key === ' ' || e.key === 'Enter' || e.key === 'r' || e.key === 'R')) {
      restartGame();
      return;
    }
    
    if (!game.gameRunning) return;
    
    switch(e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        if (game.direction.y !== 1) {
          game.nextDirection = { x: 0, y: -1 };
        }
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        if (game.direction.y !== -1) {
          game.nextDirection = { x: 0, y: 1 };
        }
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        if (game.direction.x !== 1) {
          game.nextDirection = { x: -1, y: 0 };
        }
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        if (game.direction.x !== -1) {
          game.nextDirection = { x: 1, y: 0 };
        }
        break;
    }
  }
  
  function startGame() {
    game.gameStarted = true;
    game.gameRunning = true;
    game.lastMoveTime = Date.now();
  }
  
  function spawnFood() {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_WIDTH),
        y: Math.floor(Math.random() * GRID_HEIGHT)
      };
    } while (game.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    game.food = newFood;
    
    // Create spawn particles
    createParticles(newFood.x * GRID_SIZE + GRID_SIZE/2, newFood.y * GRID_SIZE + GRID_SIZE/2, '#FFD700', 8);
  }
  
  function createParticles(x, y, color, count) {
    for (let i = 0; i < count; i++) {
      game.particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        color: color,
        life: 30,
        maxLife: 30,
        size: Math.random() * 3 + 1
      });
    }
  }
  
  function updateGame(currentTime) {
    if (!game.gameStarted || !game.gameRunning) return;
    
    // Update animation progress
    const timeSinceLastMove = currentTime - game.lastMoveTime;
    game.animationProgress = Math.min(timeSinceLastMove / game.speed, 1);
    
    // Move snake when it's time
    if (timeSinceLastMove >= game.speed) {
      moveSnake();
      game.lastMoveTime = currentTime;
      game.animationProgress = 0;
    }
    
    // Update particles
    game.particles = game.particles.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= 0.98;
      particle.vy *= 0.98;
      particle.life--;
      return particle.life > 0;
    });
    
    // Update trail
    game.trail = game.trail.filter(trail => {
      trail.life--;
      return trail.life > 0;
    });
  }
  
  function moveSnake() {
    // Update direction
    game.direction = { ...game.nextDirection };
    
    // Calculate new head position
    const head = game.snake[0];
    const newHead = {
      x: head.x + game.direction.x,
      y: head.y + game.direction.y,
      targetX: head.x + game.direction.x,
      targetY: head.y + game.direction.y
    };
    
    // Check wall collision
    if (newHead.x < 0 || newHead.x >= GRID_WIDTH || 
        newHead.y < 0 || newHead.y >= GRID_HEIGHT) {
      gameOver();
      return;
    }
    
    // Check self collision
    if (game.snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
      gameOver();
      return;
    }
    
    // Add new head
    game.snake.unshift(newHead);
    
    // Update target positions for smooth animation
    for (let i = 1; i < game.snake.length; i++) {
      game.snake[i].targetX = game.snake[i-1].x;
      game.snake[i].targetY = game.snake[i-1].y;
    }
    
    // Check food collision
    if (newHead.x === game.food.x && newHead.y === game.food.y) {
      // Eat food
      game.score += 10;
      
      // Create eating particles
      createParticles(
        game.food.x * GRID_SIZE + GRID_SIZE/2, 
        game.food.y * GRID_SIZE + GRID_SIZE/2, 
        '#00FF00', 
        12
      );
      
      // Increase speed slightly
      game.speed = Math.max(80, game.speed - 2);
      
      // Spawn new food
      spawnFood();
    } else {
      // Remove tail if no food eaten
      const tail = game.snake.pop();
      
      // Add trail effect
      game.trail.push({
        x: tail.x * GRID_SIZE,
        y: tail.y * GRID_SIZE,
        life: 10,
        maxLife: 10
      });
    }
  }
  
  function gameOver() {
    game.gameRunning = false;
    game.gameOver = true;
    
    // Update high score
    if (game.score > game.highScore) {
      game.highScore = game.score;
      localStorage.setItem('snakeHighScore', game.score.toString());
    }
    
    // Create explosion particles
    const head = game.snake[0];
    createParticles(
      head.x * GRID_SIZE + GRID_SIZE/2, 
      head.y * GRID_SIZE + GRID_SIZE/2, 
      '#FF0000', 
      20
    );
  }
  
  function restartGame() {
    game.snake = [
      { x: 15, y: 15, targetX: 15, targetY: 15 },
      { x: 14, y: 15, targetX: 14, targetY: 15 },
      { x: 13, y: 15, targetX: 13, targetY: 15 }
    ];
    game.direction = { x: 1, y: 0 };
    game.nextDirection = { x: 1, y: 0 };
    game.score = 0;
    game.speed = 150;
    game.gameRunning = true;
    game.gameStarted = true;
    game.gameOver = false;
    game.animationProgress = 0;
    game.particles = [];
    game.trail = [];
    game.lastMoveTime = Date.now();
    spawnFood();
  }
  
  function drawGrid() {
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    
    for (let x = 0; x <= GRID_WIDTH; x++) {
      ctx.beginPath();
      ctx.moveTo(x * GRID_SIZE, 0);
      ctx.lineTo(x * GRID_SIZE, canvas.height);
      ctx.stroke();
    }
    
    for (let y = 0; y <= GRID_HEIGHT; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * GRID_SIZE);
      ctx.lineTo(canvas.width, y * GRID_SIZE);
      ctx.stroke();
    }
  }
  
  function drawSnake() {
    game.snake.forEach((segment, index) => {
      // Calculate smooth position
      let drawX, drawY;
      
      if (index === 0) {
        // Head - smooth movement
        const prevX = index < game.snake.length - 1 ? game.snake[index + 1].x : segment.x;
        const prevY = index < game.snake.length - 1 ? game.snake[index + 1].y : segment.y;
        
        drawX = (prevX + (segment.x - prevX) * game.animationProgress) * GRID_SIZE;
        drawY = (prevY + (segment.y - prevY) * game.animationProgress) * GRID_SIZE;
      } else {
        // Body - follow the segment in front
        const targetX = game.snake[index - 1].x;
        const targetY = game.snake[index - 1].y;
        
        drawX = (segment.x + (targetX - segment.x) * game.animationProgress) * GRID_SIZE;
        drawY = (segment.y + (targetY - segment.y) * game.animationProgress) * GRID_SIZE;
      }
      
      // Draw segment with gradient
      const gradient = ctx.createRadialGradient(
        drawX + GRID_SIZE/2, drawY + GRID_SIZE/2, 0,
        drawX + GRID_SIZE/2, drawY + GRID_SIZE/2, GRID_SIZE/2
      );
      
      if (index === 0) {
        // Head
        gradient.addColorStop(0, '#00FF00');
        gradient.addColorStop(1, '#00AA00');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(drawX + 1, drawY + 1, GRID_SIZE - 2, GRID_SIZE - 2);
        
        // Eyes
        ctx.fillStyle = '#FFF';
        const eyeSize = 3;
        const eyeOffset = 5;
        
        if (game.direction.x === 1) { // Right
          ctx.fillRect(drawX + GRID_SIZE - eyeOffset, drawY + 4, eyeSize, eyeSize);
          ctx.fillRect(drawX + GRID_SIZE - eyeOffset, drawY + GRID_SIZE - 7, eyeSize, eyeSize);
        } else if (game.direction.x === -1) { // Left
          ctx.fillRect(drawX + 2, drawY + 4, eyeSize, eyeSize);
          ctx.fillRect(drawX + 2, drawY + GRID_SIZE - 7, eyeSize, eyeSize);
        } else if (game.direction.y === -1) { // Up
          ctx.fillRect(drawX + 4, drawY + 2, eyeSize, eyeSize);
          ctx.fillRect(drawX + GRID_SIZE - 7, drawY + 2, eyeSize, eyeSize);
        } else { // Down
          ctx.fillRect(drawX + 4, drawY + GRID_SIZE - eyeOffset, eyeSize, eyeSize);
          ctx.fillRect(drawX + GRID_SIZE - 7, drawY + GRID_SIZE - eyeOffset, eyeSize, eyeSize);
        }
      } else {
        // Body
        const intensity = 1 - (index / game.snake.length) * 0.5;
        gradient.addColorStop(0, \`rgba(0, \${Math.floor(255 * intensity)}, 0, 1)\`);
        gradient.addColorStop(1, \`rgba(0, \${Math.floor(170 * intensity)}, 0, 1)\`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(drawX + 2, drawY + 2, GRID_SIZE - 4, GRID_SIZE - 4);
      }
    });
  }
  
  function drawFood() {
    const time = Date.now() * 0.005;
    const pulse = Math.sin(time) * 0.1 + 0.9;
    const size = GRID_SIZE * pulse;
    const offset = (GRID_SIZE - size) / 2;
    
    // Food glow effect
    const gradient = ctx.createRadialGradient(
      game.food.x * GRID_SIZE + GRID_SIZE/2, 
      game.food.y * GRID_SIZE + GRID_SIZE/2, 0,
      game.food.x * GRID_SIZE + GRID_SIZE/2, 
      game.food.y * GRID_SIZE + GRID_SIZE/2, size/2
    );
    gradient.addColorStop(0, '#FFD700');
    gradient.addColorStop(0.7, '#FFA500');
    gradient.addColorStop(1, '#FF6B00');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(
      game.food.x * GRID_SIZE + offset, 
      game.food.y * GRID_SIZE + offset, 
      size, 
      size
    );
    
    // Food sparkle
    ctx.fillStyle = '#FFF';
    const sparkleSize = 2;
    ctx.fillRect(
      game.food.x * GRID_SIZE + GRID_SIZE/2 - sparkleSize/2 + Math.sin(time * 2) * 2,
      game.food.y * GRID_SIZE + GRID_SIZE/2 - sparkleSize/2 + Math.cos(time * 2) * 2,
      sparkleSize,
      sparkleSize
    );
  }
  
  function drawParticles() {
    game.particles.forEach(particle => {
      const alpha = particle.life / particle.maxLife;
      ctx.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  
  function drawTrail() {
    game.trail.forEach(trail => {
      const alpha = trail.life / trail.maxLife * 0.3;
      ctx.fillStyle = \`rgba(0, 255, 0, \${alpha})\`;
      ctx.fillRect(trail.x + 4, trail.y + 4, GRID_SIZE - 8, GRID_SIZE - 8);
    });
  }
  
  function drawUI() {
    // Score
    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(\`Score: \${game.score}\`, 20, 40);
    
    // High Score
    ctx.font = '16px Arial';
    ctx.fillText(\`High Score: \${game.highScore}\`, 20, 65);
    
    // Speed indicator
    const speedPercent = Math.floor((150 - game.speed) / 70 * 100);
    ctx.fillText(\`Speed: \${speedPercent}%\`, 20, 85);
    
    if (!game.gameStarted) {
      // Start screen
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#FFF';
      ctx.font = 'bold 36px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('SNAKE GAME', canvas.width/2, canvas.height/2 - 80);
      
      ctx.font = '18px Arial';
      ctx.fillText('Use WASD or Arrow Keys to move', canvas.width/2, canvas.height/2 - 20);
      ctx.fillText('Swipe on mobile devices', canvas.width/2, canvas.height/2);
      ctx.fillText('Press SPACE or ENTER to start', canvas.width/2, canvas.height/2 + 40);
      
      // Snake preview
      ctx.fillStyle = '#00FF00';
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(canvas.width/2 - 60 + i * 25, canvas.height/2 + 80, 20, 20);
      }
    }
    
    if (game.gameOver) {
      // Game over screen
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#FF0000';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2 - 60);
      
      ctx.fillStyle = '#FFF';
      ctx.font = '24px Arial';
      ctx.fillText(\`Final Score: \${game.score}\`, canvas.width/2, canvas.height/2 - 10);
      
      if (game.score === game.highScore && game.score > 0) {
        ctx.fillStyle = '#FFD700';
        ctx.font = '20px Arial';
        ctx.fillText('NEW HIGH SCORE!', canvas.width/2, canvas.height/2 + 20);
      }
      
      ctx.fillStyle = '#FFF';
      ctx.font = '18px Arial';
      ctx.fillText('Press SPACE, ENTER, or R to restart', canvas.width/2, canvas.height/2 + 60);
    }
    
    ctx.textAlign = 'left';
  }
  
  function gameLoop() {
    const currentTime = Date.now();
    
    // Clear canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    drawGrid();
    
    // Draw trail
    drawTrail();
    
    // Draw food
    drawFood();
    
    // Draw snake
    drawSnake();
    
    // Draw particles
    drawParticles();
    
    // Update game
    updateGame(currentTime);
    
    // Draw UI
    drawUI();
    
    requestAnimationFrame(gameLoop);
  }
  
  // Start game loop
  document.body.appendChild(canvas);
  gameLoop();
  
  return {
    canvas,
    restart: restartGame,
    start: startGame
  };
}

const snakeGameInstance = createSnakeGame();
console.log('Snake Game loaded! Use WASD/Arrow keys to move, swipe on mobile');`,
  },
];

export const games = [
  {
    id: "tic-tac-toe-game",
    name: "Tic Tac Toe - AI",
    description:
      "Classic Tic Tac Toe game with AI opponent and smooth animations",
    category: "games" as const,
    icon: Grid,
    isFree: false,
    price: 299,
    code: `// Tic Tac Toe Game
function createTicTacToeGame() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 500;
  canvas.style.border = '2px solid #333';
  canvas.style.background = '#f0f0f0';
  
  // Game state
  const game = {
    board: Array(9).fill(''),
    currentPlayer: 'X',
    gameOver: false,
    winner: null,
    scores: { X: 0, O: 0, draws: 0 },
    aiMode: true,
    hoveredCell: -1,
    animatingCells: new Set(),
    lastMove: -1
  };
  
  const CELL_SIZE = 120;
  const BOARD_OFFSET_X = 20;
  const BOARD_OFFSET_Y = 80;
  
  // Event listeners
  canvas.addEventListener('click', handleClick);
  canvas.addEventListener('mousemove', handleMouseMove);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R') {
      resetGame();
    }
    if (e.key === 'a' || e.key === 'A') {
      game.aiMode = !game.aiMode;
      resetGame();
    }
  });
  
  function handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const col = Math.floor((x - BOARD_OFFSET_X) / CELL_SIZE);
    const row = Math.floor((y - BOARD_OFFSET_Y) / CELL_SIZE);
    
    if (row >= 0 && row < 3 && col >= 0 && col < 3) {
      const cellIndex = row * 3 + col;
      game.hoveredCell = game.board[cellIndex] === '' ? cellIndex : -1;
    } else {
      game.hoveredCell = -1;
    }
  }
  
  function handleClick(e) {
    if (game.gameOver) {
      resetGame();
      return;
    }
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const col = Math.floor((x - BOARD_OFFSET_X) / CELL_SIZE);
    const row = Math.floor((y - BOARD_OFFSET_Y) / CELL_SIZE);
    
    if (row >= 0 && row < 3 && col >= 0 && col < 3) {
      const cellIndex = row * 3 + col;
      makeMove(cellIndex);
    }
  }
  
  function makeMove(cellIndex) {
    if (game.board[cellIndex] !== '' || game.gameOver) return;
    
    game.board[cellIndex] = game.currentPlayer;
    game.lastMove = cellIndex;
    game.animatingCells.add(cellIndex);
    
    // Remove animation after delay
    setTimeout(() => {
      game.animatingCells.delete(cellIndex);
    }, 300);
    
    if (checkWinner()) {
      game.gameOver = true;
      game.winner = game.currentPlayer;
      game.scores[game.currentPlayer]++;
    } else if (game.board.every(cell => cell !== '')) {
      game.gameOver = true;
      game.winner = 'draw';
      game.scores.draws++;
    } else {
      game.currentPlayer = game.currentPlayer === 'X' ? 'O' : 'X';
      
      // AI move
      if (game.aiMode && game.currentPlayer === 'O' && !game.gameOver) {
        setTimeout(() => {
          makeAIMove();
        }, 500);
      }
    }
  }
  
  function makeAIMove() {
    const bestMove = getBestMove();
    if (bestMove !== -1) {
      makeMove(bestMove);
    }
  }
  
  function getBestMove() {
    // Try to win
    for (let i = 0; i < 9; i++) {
      if (game.board[i] === '') {
        game.board[i] = 'O';
        if (checkWinner() === 'O') {
          game.board[i] = '';
          return i;
        }
        game.board[i] = '';
      }
    }
    
    // Block player from winning
    for (let i = 0; i < 9; i++) {
      if (game.board[i] === '') {
        game.board[i] = 'X';
        if (checkWinner() === 'X') {
          game.board[i] = '';
          return i;
        }
        game.board[i] = '';
      }
    }
    
    // Take center if available
    if (game.board[4] === '') return 4;
    
    // Take corners
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => game.board[i] === '');
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    
    // Take any available space
    const available = game.board.map((cell, i) => cell === '' ? i : -1).filter(i => i !== -1);
    return available.length > 0 ? available[Math.floor(Math.random() * available.length)] : -1;
  }
  
  function checkWinner() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];
    
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (game.board[a] && game.board[a] === game.board[b] && game.board[a] === game.board[c]) {
        return game.board[a];
      }
    }
    return null;
  }
  
  function resetGame() {
    game.board = Array(9).fill('');
    game.currentPlayer = 'X';
    game.gameOver = false;
    game.winner = null;
    game.hoveredCell = -1;
    game.animatingCells.clear();
    game.lastMove = -1;
  }
  
  function drawBoard() {
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 4;
    
    // Draw grid lines
    for (let i = 1; i < 3; i++) {
      // Vertical lines
      ctx.beginPath();
      ctx.moveTo(BOARD_OFFSET_X + i * CELL_SIZE, BOARD_OFFSET_Y);
      ctx.lineTo(BOARD_OFFSET_X + i * CELL_SIZE, BOARD_OFFSET_Y + 3 * CELL_SIZE);
      ctx.stroke();
      
      // Horizontal lines
      ctx.beginPath();
      ctx.moveTo(BOARD_OFFSET_X, BOARD_OFFSET_Y + i * CELL_SIZE);
      ctx.lineTo(BOARD_OFFSET_X + 3 * CELL_SIZE, BOARD_OFFSET_Y + i * CELL_SIZE);
      ctx.stroke();
    }
  }
  
  function drawCells() {
    for (let i = 0; i < 9; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      const x = BOARD_OFFSET_X + col * CELL_SIZE;
      const y = BOARD_OFFSET_Y + row * CELL_SIZE;
      
      // Highlight hovered cell
      if (game.hoveredCell === i) {
        ctx.fillStyle = 'rgba(0, 150, 255, 0.1)';
        ctx.fillRect(x + 2, y + 2, CELL_SIZE - 4, CELL_SIZE - 4);
      }
      
      // Highlight last move
      if (game.lastMove === i) {
        ctx.fillStyle = 'rgba(255, 215, 0, 0.2)';
        ctx.fillRect(x + 2, y + 2, CELL_SIZE - 4, CELL_SIZE - 4);
      }
      
      if (game.board[i] !== '') {
        const centerX = x + CELL_SIZE / 2;
        const centerY = y + CELL_SIZE / 2;
        
        // Animation scale
        const scale = game.animatingCells.has(i) ? 0.8 : 1;
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.scale(scale, scale);
        
        if (game.board[i] === 'X') {
          drawX(0, 0, 40);
        } else {
          drawO(0, 0, 35);
        }
        
        ctx.restore();
      }
    }
  }
  
  function drawX(x, y, size) {
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    
    ctx.beginPath();
    ctx.moveTo(x - size, y - size);
    ctx.lineTo(x + size, y + size);
    ctx.moveTo(x + size, y - size);
    ctx.lineTo(x - size, y + size);
    ctx.stroke();
  }
  
  function drawO(x, y, radius) {
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
  }
  
  function drawUI() {
    // Title
    ctx.fillStyle = '#333';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Tic Tac Toe', canvas.width / 2, 30);
    
    // Current player or game status
    ctx.font = '18px Arial';
    if (game.gameOver) {
      if (game.winner === 'draw') {
        ctx.fillStyle = '#f39c12';
        ctx.fillText("It's a Draw!", canvas.width / 2, 55);
      } else {
        ctx.fillStyle = game.winner === 'X' ? '#e74c3c' : '#3498db';
        ctx.fillText(\`Player \${game.winner} Wins!\`, canvas.width / 2, 55);
      }
    } else {
      ctx.fillStyle = game.currentPlayer === 'X' ? '#e74c3c' : '#3498db';
      const playerText = game.aiMode && game.currentPlayer === 'O' ? 'AI Turn (O)' : \`Player \${game.currentPlayer}'s Turn\`;
      ctx.fillText(playerText, canvas.width / 2, 55);
    }
    
    // Scores
    ctx.font = '16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#333';
    ctx.fillText(\`Player X: \${game.scores.X}\`, 20, canvas.height - 60);
    ctx.fillText(\`Player O: \${game.scores.O}\`, 20, canvas.height - 40);
    ctx.fillText(\`Draws: \${game.scores.draws}\`, 20, canvas.height - 20);
    
    // Controls
    ctx.textAlign = 'right';
    ctx.fillStyle = '#666';
    ctx.font = '14px Arial';
    ctx.fillText('R - Reset Game', canvas.width - 20, canvas.height - 40);
    ctx.fillText(\`A - \${game.aiMode ? 'Disable' : 'Enable'} AI\`, canvas.width - 20, canvas.height - 20);
    
    if (game.gameOver) {
      ctx.textAlign = 'center';
      ctx.fillStyle = '#333';
      ctx.font = '16px Arial';
      ctx.fillText('Click to play again', canvas.width / 2, canvas.height - 10);
    }
  }
  
  function gameLoop() {
    // Clear canvas
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawBoard();
    drawCells();
    drawUI();
    
    requestAnimationFrame(gameLoop);
  }
  
  // Start game
  document.body.appendChild(canvas);
  gameLoop();
  
  return {
    canvas,
    reset: resetGame,
    toggleAI: () => {
      game.aiMode = !game.aiMode;
      resetGame();
    }
  };
}

const ticTacToeGame = createTicTacToeGame();
console.log('Tic Tac Toe loaded! Click to play, R to reset, A to toggle AI');`,
    inputs: [],
  },

  {
    id: "web-swinger-game",
    name: "Spider-Man Web Swinger",
    description:
      "Amazing Spider-Man web swinging game with realistic physics, dynamic city, and smooth swinging mechanics",
    category: "games" as const,
    icon: SpiderMan,
    isFree: false,
    price: 299,
    code: `// Spider-Man Web Swinger Game
function createWebSwingerGame() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 1000;
  canvas.height = 600;
  canvas.style.border = '2px solid #333';
  canvas.style.background = 'linear-gradient(180deg, #87CEEB 0%, #4682B4 50%, #2F4F4F 100%)';
  
  // Game state
  const game = {
    player: {
      x: 100,
      y: 300,
      vx: 0,
      vy: 0,
      width: 20,
      height: 30,
      onGround: false,
      swinging: false,
      webLength: 0,
      webAnchor: { x: 0, y: 0 },
      angle: 0,
      swingAngle: 0,
      webShootCooldown: 0,
      lastWebX: 0,
      lastWebY: 0
    },
    camera: { x: 0, y: 0 },
    buildings: [],
    webParticles: [],
    keys: {},
    score: 0,
    distance: 0,
    gameRunning: true,
    time: 0,
    maxWebLength: 250,
    webShootRange: 300
  };
  
  // Physics constants
  const GRAVITY = 0.5;
  const AIR_RESISTANCE = 0.999;
  const SWING_DAMPING = 0.995;
  const SWING_FORCE = 0.4;
  const JUMP_FORCE = -15;
  const GROUND_Y = canvas.height - 60;
  
  // Generate procedural city
  function generateBuildings() {
    game.buildings = [];
    for (let i = 0; i < 50; i++) {
      const building = {
        x: i * 120 + Math.random() * 50,
        y: GROUND_Y - (150 + Math.random() * 300),
        width: 80 + Math.random() * 60,
        height: 150 + Math.random() * 300,
        color: \`hsl(\${200 + Math.random() * 60}, 30%, \${20 + Math.random() * 30}%)\`,
        windows: []
      };
      
      // Generate windows
      for (let wx = 0; wx < Math.floor(building.width / 15); wx++) {
        for (let wy = 0; wy < Math.floor(building.height / 20); wy++) {
          if (Math.random() > 0.3) {
            building.windows.push({
              x: wx * 15 + 5,
              y: wy * 20 + 10,
              lit: Math.random() > 0.6
            });
          }
        }
      }
      
      game.buildings.push(building);
    }
  }
  
  generateBuildings();
  
  // Event listeners
  document.addEventListener('keydown', (e) => {
    game.keys[e.key.toLowerCase()] = true;
    
    if (e.key === ' ' && game.player.webShootCooldown <= 0) {
      shootWeb();
    }
    
    if (e.key === 'r' && !game.gameRunning) {
      restartGame();
    }
  });
  
  document.addEventListener('keyup', (e) => {
    game.keys[e.key.toLowerCase()] = false;
    
    if (e.key === ' ') {
      releaseWeb();
    }
  });
  
  function shootWeb() {
    const player = game.player;
    
    // Find best building to attach to
    let bestBuilding = null;
    let bestDistance = Infinity;
    let bestAttachPoint = null;
    
    game.buildings.forEach(building => {
      for (let i = 0; i <= 4; i++) {
        const attachX = building.x + (building.width / 4) * i;
        const attachY = building.y;
        
        const distance = Math.sqrt(
          Math.pow(attachX - player.x, 2) + 
          Math.pow(attachY - player.y, 2)
        );
        
        const directionBonus = (player.vx > 0 && attachX > player.x) || 
                             (player.vx < 0 && attachX < player.x) ? 0.7 : 1.2;
        const adjustedDistance = distance * directionBonus;
        
        if (adjustedDistance < bestDistance && 
            distance < game.webShootRange && 
            attachY < player.y - 20) {
          bestDistance = adjustedDistance;
          bestBuilding = building;
          bestAttachPoint = { x: attachX, y: attachY };
        }
      }
    });
    
    if (bestBuilding && bestAttachPoint) {
      const webDistance = Math.sqrt(
        Math.pow(bestAttachPoint.x - player.x, 2) + 
        Math.pow(bestAttachPoint.y - player.y, 2)
      );
      
      player.swinging = true;
      player.webAnchor.x = bestAttachPoint.x;
      player.webAnchor.y = bestAttachPoint.y;
      player.webLength = Math.min(webDistance, game.maxWebLength);
      player.webShootCooldown = 10;
      
      const dx = player.x - player.webAnchor.x;
      const dy = player.y - player.webAnchor.y;
      player.swingAngle = Math.atan2(dy, dx);
      
      createWebParticles(player.x, player.y, bestAttachPoint.x, bestAttachPoint.y);
    }
  }
  
  function releaseWeb() {
    const player = game.player;
    if (player.swinging) {
      const speed = Math.sqrt(player.vx * player.vx + player.vy * player.vy);
      if (speed > 3) {
        player.vx *= 1.2;
        player.vy *= 1.1;
      }
      player.swinging = false;
    }
  }
  
  function createWebParticles(x1, y1, x2, y2) {
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const particles = Math.floor(distance / 20);
    
    for (let i = 0; i < particles; i++) {
      const t = i / particles;
      game.webParticles.push({
        x: x1 + (x2 - x1) * t,
        y: y1 + (y2 - y1) * t,
        life: 30 + Math.random() * 20,
        maxLife: 50,
        size: 1 + Math.random() * 2
      });
    }
  }
  
  function updateGame() {
    if (!game.gameRunning) return;
    
    game.time++;
    const player = game.player;
    
    if (player.webShootCooldown > 0) player.webShootCooldown--;
    
    // Handle swinging physics
    if (player.swinging) {
      const dx = player.x - player.webAnchor.x;
      const dy = player.y - player.webAnchor.y;
      const currentDistance = Math.sqrt(dx * dx + dy * dy);
      
      if (currentDistance > player.webLength) {
        const angle = Math.atan2(dy, dx);
        player.x = player.webAnchor.x + Math.cos(angle) * player.webLength;
        player.y = player.webAnchor.y + Math.sin(angle) * player.webLength;
        
        const gravity = GRAVITY;
        const tangentialAccel = -gravity * Math.sin(angle);
        
        const tangentX = -Math.sin(angle);
        const tangentY = Math.cos(angle);
        
        const currentTangentialVel = player.vx * tangentX + player.vy * tangentY;
        const newTangentialVel = (currentTangentialVel + tangentialAccel) * SWING_DAMPING;
        
        player.vx = newTangentialVel * tangentX;
        player.vy = newTangentialVel * tangentY;
        
        if (game.keys['a'] || game.keys['arrowleft']) {
          player.vx -= SWING_FORCE * Math.cos(angle + Math.PI/2);
          player.vy -= SWING_FORCE * Math.sin(angle + Math.PI/2);
        }
        if (game.keys['d'] || game.keys['arrowright']) {
          player.vx += SWING_FORCE * Math.cos(angle + Math.PI/2);
          player.vy += SWING_FORCE * Math.sin(angle + Math.PI/2);
        }
      }
    } else {
      player.vy += GRAVITY;
      
      if (game.keys['a'] || game.keys['arrowleft']) {
        player.vx -= 0.3;
      }
      if (game.keys['d'] || game.keys['arrowright']) {
        player.vx += 0.3;
      }
      
      if ((game.keys['w'] || game.keys['arrowup']) && player.onGround) {
        player.vy = JUMP_FORCE;
        player.onGround = false;
      }
    }
    
    player.vx *= AIR_RESISTANCE;
    player.vy *= AIR_RESISTANCE;
    
    player.x += player.vx;
    player.y += player.vy;
    
    // Ground collision
    player.onGround = false;
    if (player.y + player.height > GROUND_Y) {
      player.y = GROUND_Y - player.height;
      player.vy = Math.max(player.vy * -0.3, 0);
      player.onGround = true;
      if (player.swinging) {
        player.swinging = false;
      }
    }
    
    // Building collisions
    game.buildings.forEach(building => {
      if (player.x + player.width > building.x &&
          player.x < building.x + building.width &&
          player.y + player.height > building.y &&
          player.y < building.y + building.height) {
        
        if (player.vy > 0 && player.y < building.y + 10) {
          player.y = building.y - player.height;
          player.vy = 0;
          player.onGround = true;
          if (player.swinging) {
            player.swinging = false;
          }
        }
      }
    });
    
    // Update camera
    game.camera.x = player.x - canvas.width / 2;
    game.camera.y = player.y - canvas.height / 2;
    
    game.camera.x = Math.max(0, game.camera.x);
    game.camera.y = Math.max(-200, Math.min(100, game.camera.y));
    
    game.distance = Math.max(game.distance, player.x);
    game.score = Math.floor(game.distance / 10) + Math.floor(game.time / 60);
    
    game.webParticles = game.webParticles.filter(particle => {
      particle.life--;
      return particle.life > 0;
    });
    
    // Generate more buildings
    const lastBuilding = game.buildings[game.buildings.length - 1];
    if (lastBuilding && player.x > lastBuilding.x - 1000) {
      const newBuilding = {
        x: lastBuilding.x + 120 + Math.random() * 100,
        y: GROUND_Y - (150 + Math.random() * 300),
        width: 80 + Math.random() * 60,
        height: 150 + Math.random() * 300,
        color: \`hsl(\${200 + Math.random() * 60}, 30%, \${20 + Math.random() * 30}%)\`,
        windows: []
      };
      
      for (let wx = 0; wx < Math.floor(newBuilding.width / 15); wx++) {
        for (let wy = 0; wy < Math.floor(newBuilding.height / 20); wy++) {
          if (Math.random() > 0.3) {
            newBuilding.windows.push({
              x: wx * 15 + 5,
              y: wy * 20 + 10,
              lit: Math.random() > 0.6
            });
          }
        }
      }
      
      game.buildings.push(newBuilding);
    }
    
    if (player.y > canvas.height + 200) {
      game.gameRunning = false;
    }
  }
  
  function drawSpiderMan(x, y) {
    ctx.save();
    ctx.translate(x, y);
    
    const facingRight = game.player.vx >= 0;
    if (!facingRight) ctx.scale(-1, 1);
    
    ctx.fillStyle = '#DC143C';
    ctx.fillRect(-8, -15, 16, 25);
    ctx.fillRect(-6, -25, 12, 15);
    
    ctx.fillStyle = '#000';
    ctx.fillRect(-2, -10, 4, 8);
    ctx.fillRect(-4, -8, 8, 2);
    
    ctx.fillStyle = '#FFF';
    ctx.fillRect(-5, -22, 3, 4);
    ctx.fillRect(2, -22, 3, 4);
    
    ctx.fillStyle = '#DC143C';
    ctx.fillRect(-12, -8, 8, 4);
    ctx.fillRect(4, -8, 8, 4);
    ctx.fillRect(-6, 5, 4, 10);
    ctx.fillRect(2, 5, 4, 10);
    
    ctx.restore();
  }
  
  function drawGame() {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(0.5, '#4682B4');
    gradient.addColorStop(1, '#2F4F4F');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.save();
    ctx.translate(-game.camera.x, -game.camera.y);
    
    // Draw buildings
    game.buildings.forEach(building => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(building.x + 5, building.y + 5, building.width, building.height);
      
      ctx.fillStyle = building.color;
      ctx.fillRect(building.x, building.y, building.width, building.height);
      
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = 2;
      ctx.strokeRect(building.x, building.y, building.width, building.height);
      
      building.windows.forEach(window => {
        ctx.fillStyle = window.lit ? '#FFD700' : '#444';
        ctx.fillRect(
          building.x + window.x,
          building.y + window.y,
          8, 12
        );
      });
    });
    
    // Draw web line
    if (game.player.swinging) {
      const midX = (game.player.x + game.player.webAnchor.x) / 2;
      const midY = (game.player.y + game.player.webAnchor.y) / 2 + 20;
      
      ctx.strokeStyle = '#C0C0C0';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(game.player.x, game.player.y - 10);
      ctx.quadraticCurveTo(midX, midY, game.player.webAnchor.x, game.player.webAnchor.y);
      ctx.stroke();
      
      ctx.fillStyle = '#FFF';
      ctx.beginPath();
      ctx.arc(game.player.webAnchor.x, game.player.webAnchor.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw web particles
    game.webParticles.forEach(particle => {
      const alpha = particle.life / particle.maxLife;
      ctx.fillStyle = \`rgba(192, 192, 192, \${alpha})\`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });
    
    drawSpiderMan(game.player.x, game.player.y);
    
    // Ground
    ctx.fillStyle = '#2F4F4F';
    ctx.fillRect(game.camera.x - 100, GROUND_Y, canvas.width + 200, canvas.height - GROUND_Y);
    
    ctx.fillStyle = '#1C1C1C';
    for (let i = 0; i < canvas.width + 200; i += 50) {
      ctx.fillRect(game.camera.x - 100 + i, GROUND_Y + 10, 20, 5);
    }
    
    ctx.restore();
    
    // UI
    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 24px Arial';
    ctx.fillText(\`Distance: \${Math.floor(game.distance)}m\`, 20, 40);
    ctx.fillText(\`Score: \${game.score}\`, 20, 70);
    
    if (game.player.webShootCooldown > 0) {
      ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
      ctx.fillRect(20, 90, game.player.webShootCooldown * 10, 10);
    }
    
    const speed = Math.sqrt(game.player.vx ** 2 + game.player.vy ** 2);
    ctx.fillStyle = speed > 10 ? '#00FF00' : speed > 5 ? '#FFFF00' : '#FFF';
    ctx.font = '16px Arial';
    ctx.fillText(\`Speed: \${speed.toFixed(1)}\`, 20, 120);
    
    ctx.font = '14px Arial';
    ctx.fillText('Controls: WASD/Arrows to move, SPACE to swing', 20, canvas.height - 30);
    
    if (!game.gameRunning) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#FFF';
      ctx.font = '48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2 - 50);
      ctx.font = '24px Arial';
      ctx.fillText(\`Final Score: \${game.score}\`, canvas.width/2, canvas.height/2);
      ctx.fillText('Press R to Restart', canvas.width/2, canvas.height/2 + 40);
      ctx.textAlign = 'left';
    }
  }
  
  function gameLoop() {
    updateGame();
    drawGame();
    requestAnimationFrame(gameLoop);
  }
  
  function restartGame() {
    game.player = {
      x: 100, y: 300, vx: 0, vy: 0, width: 20, height: 30,
      onGround: false, swinging: false, webLength: 0,
      webAnchor: { x: 0, y: 0 }, angle: 0, swingAngle: 0,
      webShootCooldown: 0, lastWebX: 0, lastWebY: 0
    };
    game.camera = { x: 0, y: 0 };
    game.buildings = [];
    game.webParticles = [];
    game.score = 0;
    game.distance = 0;
    game.gameRunning = true;
    game.time = 0;
    generateBuildings();
  }
  
  document.body.appendChild(canvas);
  gameLoop();
  
  return {
    canvas,
    restart: restartGame
  };
}

const webSwingerGame = createWebSwingerGame();
console.log('Spider-Man Web Swinger loaded! Use WASD to move, SPACE to swing');`,
    inputs: [],
  },

  {
    id: "asteroid-shooter-game",
    name: "Asteroid Shooter",
    description:
      "Classic space shooter with rotating ship, asteroids, and power-ups",
    category: "games" as const,
    icon: MoonStar,
    isFree: true,
    price: 0,
    code: `// Asteroid Shooter Game
function createAsteroidShooter() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 600;
  canvas.style.border = '2px solid #333';
  canvas.style.background = '#000';
  
  // Game state
  const game = {
    ship: {
      x: canvas.width / 2,
      y: canvas.height / 2,
      angle: 0,
      vx: 0,
      vy: 0,
      radius: 8,
      health: 100
    },
    bullets: [],
    asteroids: [],
    particles: [],
    powerUps: [],
    keys: {},
    score: 0,
    gameRunning: true,
    lastAsteroidSpawn: 0
  };
  
  // Constants
  const SHIP_THRUST = 0.3;
  const SHIP_ROTATION = 0.1;
  const BULLET_SPEED = 8;
  const MAX_BULLETS = 10;
  const FRICTION = 0.98;
  
  // Event listeners
  document.addEventListener('keydown', (e) => {
    game.keys[e.key.toLowerCase()] = true;
    
    if (e.key === ' ') {
      shootBullet();
    }
  });
  
  document.addEventListener('keyup', (e) => {
    game.keys[e.key.toLowerCase()] = false;
  });
  
  function shootBullet() {
    if (game.bullets.length < MAX_BULLETS) {
      game.bullets.push({
        x: game.ship.x + Math.cos(game.ship.angle) * 15,
        y: game.ship.y + Math.sin(game.ship.angle) * 15,
        vx: Math.cos(game.ship.angle) * BULLET_SPEED,
        vy: Math.sin(game.ship.angle) * BULLET_SPEED,
        life: 60
      });
    }
  }
  
  function spawnAsteroid() {
    const side = Math.floor(Math.random() * 4);
    let x, y, vx, vy;
    
    switch(side) {
      case 0: // Top
        x = Math.random() * canvas.width;
        y = -30;
        break;
      case 1: // Right
        x = canvas.width + 30;
        y = Math.random() * canvas.height;
        break;
      case 2: // Bottom
        x = Math.random() * canvas.width;
        y = canvas.height + 30;
        break;
      case 3: // Left
        x = -30;
        y = Math.random() * canvas.height;
        break;
    }
    
    // Aim towards center
    const angle = Math.atan2(canvas.height/2 - y, canvas.width/2 - x);
    const speed = 1 + Math.random() * 2;
    vx = Math.cos(angle) * speed;
    vy = Math.sin(angle) * speed;
    
    game.asteroids.push({
      x, y, vx, vy,
      radius: 15 + Math.random() * 25,
      rotation: 0,
      rotationSpeed: (Math.random() - 0.5) * 0.1,
      health: 3
    });
  }
  
  function createParticles(x, y, color, count = 5) {
    for (let i = 0; i < count; i++) {
      game.particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        color,
        life: 30,
        maxLife: 30
      });
    }
  }
  
  function updateGame() {
    if (!game.gameRunning) return;
    
    // Ship controls
    if (game.keys['a'] || game.keys['arrowleft']) {
      game.ship.angle -= SHIP_ROTATION;
    }
    if (game.keys['d'] || game.keys['arrowright']) {
      game.ship.angle += SHIP_ROTATION;
    }
    if (game.keys['w'] || game.keys['arrowup']) {
      game.ship.vx += Math.cos(game.ship.angle) * SHIP_THRUST;
      game.ship.vy += Math.sin(game.ship.angle) * SHIP_THRUST;
      
      // Thrust particles
      createParticles(
        game.ship.x - Math.cos(game.ship.angle) * 15,
        game.ship.y - Math.sin(game.ship.angle) * 15,
        '#FFA500', 2
      );
    }
    
    // Apply friction and update ship position
    game.ship.vx *= FRICTION;
    game.ship.vy *= FRICTION;
    game.ship.x += game.ship.vx;
    game.ship.y += game.ship.vy;
    
    // Wrap ship around screen
    if (game.ship.x < 0) game.ship.x = canvas.width;
    if (game.ship.x > canvas.width) game.ship.x = 0;
    if (game.ship.y < 0) game.ship.y = canvas.height;
    if (game.ship.y > canvas.height) game.ship.y = 0;
    
    // Update bullets
    game.bullets = game.bullets.filter(bullet => {
      bullet.x += bullet.vx;
      bullet.y += bullet.vy;
      bullet.life--;
      
      // Wrap bullets
      if (bullet.x < 0) bullet.x = canvas.width;
      if (bullet.x > canvas.width) bullet.x = 0;
      if (bullet.y < 0) bullet.y = canvas.height;
      if (bullet.y > canvas.height) bullet.y = 0;
      
      return bullet.life > 0;
    });
    
    // Update asteroids
    game.asteroids.forEach(asteroid => {
      asteroid.x += asteroid.vx;
      asteroid.y += asteroid.vy;
      asteroid.rotation += asteroid.rotationSpeed;
      
      // Wrap asteroids
      if (asteroid.x < -50) asteroid.x = canvas.width + 50;
      if (asteroid.x > canvas.width + 50) asteroid.x = -50;
      if (asteroid.y < -50) asteroid.y = canvas.height + 50;
      if (asteroid.y > canvas.height + 50) asteroid.y = -50;
    });
    
    // Bullet-asteroid collisions
    game.bullets.forEach((bullet, bulletIndex) => {
      game.asteroids.forEach((asteroid, asteroidIndex) => {
        const dx = bullet.x - asteroid.x;
        const dy = bullet.y - asteroid.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < asteroid.radius) {
          // Remove bullet
          game.bullets.splice(bulletIndex, 1);
          
          // Damage asteroid
          asteroid.health--;
          createParticles(asteroid.x, asteroid.y, '#FFF', 3);
          
          if (asteroid.health <= 0) {
            // Destroy asteroid
            createParticles(asteroid.x, asteroid.y, '#FF6B6B', 8);
            game.asteroids.splice(asteroidIndex, 1);
            game.score += 100;
            
            // Split asteroid if large enough
            if (asteroid.radius > 20) {
              for (let i = 0; i < 2; i++) {
                game.asteroids.push({
                  x: asteroid.x + (Math.random() - 0.5) * 20,
                  y: asteroid.y + (Math.random() - 0.5) * 20,
                  vx: asteroid.vx + (Math.random() - 0.5) * 2,
                  vy: asteroid.vy + (Math.random() - 0.5) * 2,
                  radius: asteroid.radius * 0.6,
                  rotation: 0,
                  rotationSpeed: (Math.random() - 0.5) * 0.1,
                  health: 2
                });
              }
            }
          }
        }
      });
    });
    
    // Ship-asteroid collisions
    game.asteroids.forEach(asteroid => {
      const dx = game.ship.x - asteroid.x;
      const dy = game.ship.y - asteroid.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < asteroid.radius + game.ship.radius) {
        game.ship.health -= 2;
        createParticles(game.ship.x, game.ship.y, '#FF0000', 5);
        
        if (game.ship.health <= 0) {
          game.gameRunning = false;
        }
      }
    });
    
    // Update particles
    game.particles = game.particles.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= 0.98;
      particle.vy *= 0.98;
      particle.life--;
      return particle.life > 0;
    });
    
    // Spawn asteroids
    if (Date.now() - game.lastAsteroidSpawn > 2000) {
      spawnAsteroid();
      game.lastAsteroidSpawn = Date.now();
    }
    
    game.score += 1;
  }
  
  function drawGame() {
    // Clear canvas with stars
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw stars
    ctx.fillStyle = '#FFF';
    for (let i = 0; i < 50; i++) {
      const x = (i * 137) % canvas.width;
      const y = (i * 219) % canvas.height;
      ctx.fillRect(x, y, 1, 1);
    }
    
    // Draw ship
    ctx.save();
    ctx.translate(game.ship.x, game.ship.y);
    ctx.rotate(game.ship.angle);
    ctx.fillStyle = '#00FF00';
    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(-8, -6);
    ctx.lineTo(-4, 0);
    ctx.lineTo(-8, 6);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    
    // Draw bullets
    ctx.fillStyle = '#FFFF00';
    game.bullets.forEach(bullet => {
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, 2, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Draw asteroids
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 2;
    game.asteroids.forEach(asteroid => {
      ctx.save();
      ctx.translate(asteroid.x, asteroid.y);
      ctx.rotate(asteroid.rotation);
      ctx.beginPath();
      
      // Draw jagged asteroid shape
      const points = 8;
      for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const variance = 0.7 + Math.sin(i) * 0.3;
        const x = Math.cos(angle) * asteroid.radius * variance;
        const y = Math.sin(angle) * asteroid.radius * variance;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    });
    
    // Draw particles
    game.particles.forEach(particle => {
      const alpha = particle.life / particle.maxLife;
      ctx.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Draw UI
    ctx.fillStyle = '#FFF';
    ctx.font = '20px Arial';
    ctx.fillText(\`Score: \${game.score}\`, 10, 30);
    
    // Health bar
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(10, 50, 200, 10);
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(10, 50, (game.ship.health / 100) * 200, 10);
    
    ctx.font = '14px Arial';
    ctx.fillText('Controls: WASD/Arrows, SPACE to shoot', 10, canvas.height - 10);
    
    if (!game.gameRunning) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#FFF';
      ctx.font = '48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2);
      ctx.font = '24px Arial';
      ctx.fillText(\`Final Score: \${game.score}\`, canvas.width/2, canvas.height/2 + 50);
      ctx.textAlign = 'left';
    }
  }
  
  function gameLoop() {
    updateGame();
    drawGame();
    requestAnimationFrame(gameLoop);
  }
  
  // Start game
  document.body.appendChild(canvas);
  gameLoop();
  
  return {
    canvas,
    restart: () => {
      game.ship = { x: canvas.width/2, y: canvas.height/2, angle: 0, vx: 0, vy: 0, radius: 8, health: 100 };
      game.bullets = [];
      game.asteroids = [];
      game.particles = [];
      game.score = 0;
      game.gameRunning = true;
    }
  };
}

const asteroidGame = createAsteroidShooter();
console.log('Asteroid Shooter loaded! Use WASD to move and rotate, SPACE to shoot');`,
    inputs: [],
  },

  {
    id: "platform-runner-game",
    name: "Endless Platform Runner",
    description:
      "Side-scrolling platformer with procedurally generated obstacles and power-ups",
    category: "games" as const,
    icon: PersonStanding,
    isFree: false,
    price: 199,
    code: `// Endless Platform Runner Game
function createPlatformRunner() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 400;
  canvas.style.border = '2px solid #333';
  canvas.style.background = 'linear-gradient(180deg, #87CEEB 0%, #98FB98 100%)';
  
  // Game state
  const game = {
    player: {
      x: 100,
      y: 200,
      width: 20,
      height: 30,
      vx: 0,
      vy: 0,
      onGround: false,
      color: '#FF6B6B'
    },
    camera: { x: 0 },
    platforms: [],
    obstacles: [],
    coins: [],
    particles: [],
    keys: {},
    score: 0,
    speed: 2,
    gameRunning: true,
    lastPlatformX: 0
  };
  
  // Constants
  const GRAVITY = 0.5;
  const JUMP_FORCE = -12;
  const PLAYER_SPEED = 3;
  const GROUND_Y = canvas.height - 50;
  
  // Initialize starting platforms
  for (let i = 0; i < 20; i++) {
    generatePlatform(i * 150);
  }
  
  // Event listeners
  document.addEventListener('keydown', (e) => {
    game.keys[e.key.toLowerCase()] = true;
  });
  
  document.addEventListener('keyup', (e) => {
    game.keys[e.key.toLowerCase()] = false;
  });
  
  function generatePlatform(x) {
    const platformTypes = [
      { width: 120, height: 20, hasObstacle: false },
      { width: 80, height: 20, hasObstacle: true },
      { width: 200, height: 20, hasObstacle: false }
    ];
    
    const type = platformTypes[Math.floor(Math.random() * platformTypes.length)];
    const y = GROUND_Y - 50 - Math.random() * 150;
    
    const platform = {
      x: x,
      y: y,
      width: type.width,
      height: type.height,
      color: '#8B4513'
    };
    
    game.platforms.push(platform);
    
    // Add obstacle
    if (type.hasObstacle && Math.random() < 0.6) {
      game.obstacles.push({
        x: x + type.width/2 - 10,
        y: y - 30,
        width: 20,
        height: 30,
        color: '#FF0000',
        type: 'spike'
      });
    }
    
    // Add coins
    if (Math.random() < 0.7) {
      game.coins.push({
        x: x + type.width/2,
        y: y - 40,
        radius: 8,
        collected: false,
        bobOffset: Math.random() * Math.PI * 2
      });
    }
    
    game.lastPlatformX = Math.max(game.lastPlatformX, x);
  }
  
  function createParticles(x, y, color, count = 3) {
    for (let i = 0; i < count; i++) {
      game.particles.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * -3 - 1,
        color: color,
        life: 30,
        maxLife: 30
      });
    }
  }
  
  function updateGame() {
    if (!game.gameRunning) return;
    
    const player = game.player;
    
    // Player controls
    if (game.keys['a'] || game.keys['arrowleft']) {
      player.vx = -PLAYER_SPEED;
    } else if (game.keys['d'] || game.keys['arrowright']) {
      player.vx = PLAYER_SPEED;
    } else {
      player.vx *= 0.8;
    }
    
    if ((game.keys['w'] || game.keys['arrowup'] || game.keys[' ']) && player.onGround) {
      player.vy = JUMP_FORCE;
      player.onGround = false;
      createParticles(player.x, player.y + player.height, '#FFF', 5);
    }
    
    // Apply gravity
    player.vy += GRAVITY;
    
    // Update position
    player.x += player.vx;
    player.y += player.vy;
    
    // Auto-scroll
    player.x += game.speed;
    game.camera.x = player.x - 200;
    
    // Platform collisions
    player.onGround = false;
    
    // Ground collision
    if (player.y + player.height > GROUND_Y) {
      player.y = GROUND_Y - player.height;
      player.vy = 0;
      player.onGround = true;
    }
    
    // Platform collisions
    game.platforms.forEach(platform => {
      if (player.x < platform.x + platform.width &&
          player.x + player.width > platform.x &&
          player.y + player.height > platform.y &&
          player.y + player.height < platform.y + platform.height + 10 &&
          player.vy >= 0) {
        player.y = platform.y - player.height;
        player.vy = 0;
        player.onGround = true;
      }
    });
    
    // Obstacle collisions
    game.obstacles.forEach(obstacle => {
      if (player.x < obstacle.x + obstacle.width &&
          player.x + player.width > obstacle.x &&
          player.y < obstacle.y + obstacle.height &&
          player.y + player.height > obstacle.y) {
        game.gameRunning = false;
      }
    });
    
    // Coin collection
    game.coins.forEach(coin => {
      if (!coin.collected) {
        const dx = player.x + player.width/2 - coin.x;
        const dy = player.y + player.height/2 - coin.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < coin.radius + 15) {
          coin.collected = true;
          game.score += 100;
          createParticles(coin.x, coin.y, '#FFD700', 8);
        }
      }
    });
    
    // Update particles
    game.particles = game.particles.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.1;
      particle.life--;
      return particle.life > 0;
    });
    
    // Generate new platforms
    while (game.lastPlatformX < game.camera.x + canvas.width + 300) {
      generatePlatform(game.lastPlatformX + 120 + Math.random() * 100);
    }
    
    // Clean up old objects
    const cleanupX = game.camera.x - 200;
    game.platforms = game.platforms.filter(p => p.x > cleanupX);
    game.obstacles = game.obstacles.filter(o => o.x > cleanupX);
    game.coins = game.coins.filter(c => c.x > cleanupX);
    
    // Increase difficulty
    game.speed = Math.min(game.speed + 0.001, 5);
    game.score += 1;
    
    // Game over if player falls
    if (player.y > canvas.height + 100) {
      game.gameRunning = false;
    }
  }
  
  function drawGame() {
    // Clear canvas
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#98FB98');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Save context for camera
    ctx.save();
    ctx.translate(-game.camera.x, 0);
    
    // Draw clouds (parallax background)
    ctx.fillStyle = '#FFF';
    for (let i = 0; i < 10; i++) {
      const x = i * 200 + game.camera.x * 0.3;
      const y = 50 + Math.sin(i) * 30;
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.arc(x + 25, y, 25, 0, Math.PI * 2);
      ctx.arc(x + 50, y, 20, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw ground
    ctx.fillStyle = '#228B22';
    ctx.fillRect(game.camera.x - 100, GROUND_Y, canvas.width + 200, canvas.height - GROUND_Y);
    
    // Draw platforms
    game.platforms.forEach(platform => {
      ctx.fillStyle = platform.color;
      ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
      
      // Platform grass
      ctx.fillStyle = '#90EE90';
      ctx.fillRect(platform.x, platform.y - 5, platform.width, 5);
    });
    
    // Draw obstacles
    game.obstacles.forEach(obstacle => {
      if (obstacle.type === 'spike') {
        ctx.fillStyle = obstacle.color;
        ctx.beginPath();
        ctx.moveTo(obstacle.x, obstacle.y + obstacle.height);
        ctx.lineTo(obstacle.x + obstacle.width/2, obstacle.y);
        ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + obstacle.height);
        ctx.closePath();
        ctx.fill();
      }
    });
    
    // Draw coins
    const time = Date.now() * 0.003;
    game.coins.forEach(coin => {
      if (!coin.collected) {
        ctx.fillStyle = '#FFD700';
        ctx.strokeStyle = '#FFA500';
        ctx.lineWidth = 2;
        
        const bobY = coin.y + Math.sin(time + coin.bobOffset) * 5;
        ctx.beginPath();
        ctx.arc(coin.x, bobY, coin.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Coin shine
        ctx.fillStyle = '#FFFF00';
        ctx.beginPath();
        ctx.arc(coin.x - 2, bobY - 2, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    
    // Draw particles
    game.particles.forEach(particle => {
      const alpha = particle.life / particle.maxLife;
      ctx.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Draw player
    ctx.fillStyle = game.player.color;
    ctx.fillRect(game.player.x, game.player.y, game.player.width, game.player.height);
    
    // Player face
    ctx.fillStyle = '#FFF';
    ctx.fillRect(game.player.x + 3, game.player.y + 5, 3, 3);
    ctx.fillRect(game.player.x + 14, game.player.y + 5, 3, 3);
    ctx.fillRect(game.player.x + 7, game.player.y + 15, 6, 2);
    
    // Restore context
    ctx.restore();
    
    // Draw UI
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText(\`Score: \${game.score}\`, 10, 30);
    ctx.fillText(\`Speed: \${game.speed.toFixed(1)}\`, 10, 60);
    
    ctx.font = '14px Arial';
    ctx.fillText('Controls: WASD/Arrow Keys to move and jump', 10, canvas.height - 10);
    
    if (!game.gameRunning) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#FFF';
      ctx.font = '48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2 - 50);
      ctx.font = '24px Arial';
      ctx.fillText(\`Final Score: \${game.score}\`, canvas.width/2, canvas.height/2);
      ctx.fillText('Press R to Restart', canvas.width/2, canvas.height/2 + 40);
      ctx.textAlign = 'left';
    }
  }
  
  function gameLoop() {
    updateGame();
    drawGame();
    requestAnimationFrame(gameLoop);
  }
  
  // Restart functionality
  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'r' && !game.gameRunning) {
      restartGame();
    }
  });
  
  function restartGame() {
    game.player = { x: 100, y: 200, width: 20, height: 30, vx: 0, vy: 0, onGround: false, color: '#FF6B6B' };
    game.camera = { x: 0 };
    game.platforms = [];
    game.obstacles = [];
    game.coins = [];
    game.particles = [];
    game.score = 0;
    game.speed = 2;
    game.gameRunning = true;
    game.lastPlatformX = 0;
    
    // Regenerate starting platforms
    for (let i = 0; i < 20; i++) {
      generatePlatform(i * 150);
    }
  }
  
  // Start game
  document.body.appendChild(canvas);
  gameLoop();
  
  return {
    canvas,
    restart: restartGame
  };
}

const platformGame = createPlatformRunner();
console.log('Platform Runner loaded! Use WASD/Arrow keys to move, R to restart');`,
    inputs: [],
  },

  {
    id: "chrome-dino-game",
    name: "Chrome Dinosaur Game",
    description:
      "Classic Chrome offline dinosaur runner with jumping mechanics and obstacle avoidance",
    category: "games" as const,
    icon: DinoIcon,
    isFree: false,
    price: 199,
    code: `// Chrome Dinosaur Game
function createChromeDinoGame() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 200;
  canvas.style.border = '2px solid #333';
  canvas.style.background = '#f7f7f7';
  
  // Game state
  const game = {
    dino: {
      x: 50,
      y: 150,
      width: 40,
      height: 40,
      vy: 0,
      onGround: true,
      ducking: false
    },
    obstacles: [],
    clouds: [],
    ground: {
      x: 0,
      speed: 4
    },
    score: 0,
    gameSpeed: 4,
    gameRunning: true,
    gameStarted: false,
    lastObstacleSpawn: 0,
    keys: {}
  };
  
  // Constants
  const GRAVITY = 0.6;
  const JUMP_FORCE = -12;
  const GROUND_Y = 150;
  const DUCK_HEIGHT = 25;
  
  // Initialize clouds
  for (let i = 0; i < 5; i++) {
    game.clouds.push({
      x: Math.random() * canvas.width,
      y: 20 + Math.random() * 50,
      width: 40 + Math.random() * 20,
      height: 20 + Math.random() * 10
    });
  }
  
  // Event listeners
  document.addEventListener('keydown', (e) => {
    game.keys[e.key.toLowerCase()] = true;
    
    if (!game.gameStarted && (e.key === ' ' || e.key === 'ArrowUp')) {
      game.gameStarted = true;
      game.gameRunning = true;
    }
    
    if (game.gameRunning) {
      if ((e.key === ' ' || e.key === 'ArrowUp') && game.dino.onGround) {
        jump();
      }
      if (e.key === 'ArrowDown') {
        duck();
      }
    }
    
    if (!game.gameRunning && e.key === ' ') {
      restartGame();
    }
  });
  
  document.addEventListener('keyup', (e) => {
    game.keys[e.key.toLowerCase()] = false;
    
    if (e.key === 'ArrowDown') {
      game.dino.ducking = false;
      game.dino.height = 40;
    }
  });
  
  function jump() {
    if (game.dino.onGround) {
      game.dino.vy = JUMP_FORCE;
      game.dino.onGround = false;
    }
  }
  
  function duck() {
    if (game.dino.onGround) {
      game.dino.ducking = true;
      game.dino.height = DUCK_HEIGHT;
    }
  }
  
  function spawnObstacle() {
    const obstacleTypes = [
      { width: 20, height: 40, type: 'cactus' },
      { width: 15, height: 35, type: 'cactus' },
      { width: 60, height: 25, type: 'bird', y: GROUND_Y - 50 }
    ];
    
    const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
    
    game.obstacles.push({
      x: canvas.width,
      y: type.y || GROUND_Y,
      width: type.width,
      height: type.height,
      type: type.type
    });
  }
  
  function updateGame() {
    if (!game.gameStarted || !game.gameRunning) return;
    
    // Update dinosaur physics
    if (!game.dino.onGround) {
      game.dino.vy += GRAVITY;
    }
    
    game.dino.y += game.dino.vy;
    
    // Ground collision
    if (game.dino.y >= GROUND_Y) {
      game.dino.y = GROUND_Y;
      game.dino.vy = 0;
      game.dino.onGround = true;
    }
    
    // Update ground
    game.ground.x -= game.gameSpeed;
    if (game.ground.x <= -20) {
      game.ground.x = 0;
    }
    
    // Update obstacles
    game.obstacles = game.obstacles.filter(obstacle => {
      obstacle.x -= game.gameSpeed;
      return obstacle.x > -obstacle.width;
    });
    
    // Update clouds
    game.clouds.forEach(cloud => {
      cloud.x -= game.gameSpeed * 0.3;
      if (cloud.x < -cloud.width) {
        cloud.x = canvas.width + Math.random() * 100;
        cloud.y = 20 + Math.random() * 50;
      }
    });
    
    // Spawn obstacles
    if (Date.now() - game.lastObstacleSpawn > 1500 + Math.random() * 1000) {
      spawnObstacle();
      game.lastObstacleSpawn = Date.now();
    }
    
    // Collision detection
    game.obstacles.forEach(obstacle => {
      if (game.dino.x < obstacle.x + obstacle.width &&
          game.dino.x + game.dino.width > obstacle.x &&
          game.dino.y < obstacle.y + obstacle.height &&
          game.dino.y + game.dino.height > obstacle.y) {
        game.gameRunning = false;
      }
    });
    
    // Update score and speed
    game.score += 1;
    if (game.score % 100 === 0) {
      game.gameSpeed += 0.2;
    }
  }
  
  function drawDinosaur() {
    ctx.fillStyle = '#535353';
    
    if (game.dino.ducking) {
      // Draw ducking dinosaur (simplified rectangle)
      ctx.fillRect(game.dino.x, game.dino.y + 15, game.dino.width, game.dino.height);
      
      // Head
      ctx.fillRect(game.dino.x + 25, game.dino.y + 10, 15, 15);
      
      // Eye
      ctx.fillStyle = '#fff';
      ctx.fillRect(game.dino.x + 32, game.dino.y + 13, 3, 3);
      ctx.fillStyle = '#535353';
    } else {
      // Draw standing/jumping dinosaur
      // Body
      ctx.fillRect(game.dino.x + 10, game.dino.y + 15, 20, 25);
      
      // Head
      ctx.fillRect(game.dino.x + 20, game.dino.y, 20, 20);
      
      // Eye
      ctx.fillStyle = '#fff';
      ctx.fillRect(game.dino.x + 30, game.dino.y + 5, 4, 4);
      ctx.fillStyle = '#535353';
      
      // Legs (animated based on score for running effect)
      const legOffset = Math.floor(game.score / 5) % 2 === 0 ? 0 : 2;
      if (game.dino.onGround) {
        ctx.fillRect(game.dino.x + 15, game.dino.y + 35, 4, 8);
        ctx.fillRect(game.dino.x + 25 + legOffset, game.dino.y + 35, 4, 8);
      }
      
      // Tail
      ctx.fillRect(game.dino.x, game.dino.y + 20, 15, 8);
      
      // Arms
      ctx.fillRect(game.dino.x + 8, game.dino.y + 18, 8, 4);
    }
  }
  
  function drawObstacles() {
    game.obstacles.forEach(obstacle => {
      ctx.fillStyle = '#535353';
      
      if (obstacle.type === 'cactus') {
        // Draw cactus
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        
        // Cactus arms
        if (obstacle.width > 15) {
          ctx.fillRect(obstacle.x - 5, obstacle.y + 10, 8, 15);
          ctx.fillRect(obstacle.x + obstacle.width - 3, obstacle.y + 15, 8, 10);
        }
      } else if (obstacle.type === 'bird') {
        // Draw pterodactyl/bird
        const wingFlap = Math.floor(Date.now() / 200) % 2;
        
        // Body
        ctx.fillRect(obstacle.x + 20, obstacle.y + 10, 20, 8);
        
        // Head
        ctx.fillRect(obstacle.x + 35, obstacle.y + 8, 15, 12);
        
        // Beak
        ctx.fillRect(obstacle.x + 45, obstacle.y + 12, 8, 4);
        
        // Wings
        if (wingFlap === 0) {
          ctx.fillRect(obstacle.x + 10, obstacle.y + 5, 25, 6);
          ctx.fillRect(obstacle.x + 15, obstacle.y + 18, 20, 6);
        } else {
          ctx.fillRect(obstacle.x + 15, obstacle.y, 20, 8);
          ctx.fillRect(obstacle.x + 20, obstacle.y + 20, 15, 8);
        }
      }
    });
  }
  
  function drawGround() {
    ctx.strokeStyle = '#535353';
    ctx.lineWidth = 2;
    
    // Ground line
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y + 40);
    ctx.lineTo(canvas.width, GROUND_Y + 40);
    ctx.stroke();
    
    // Ground texture (dashes)
    for (let i = game.ground.x; i < canvas.width + 20; i += 20) {
      ctx.fillStyle = '#535353';
      ctx.fillRect(i, GROUND_Y + 42, 10, 2);
    }
  }
  
  function drawClouds() {
    ctx.fillStyle = '#c4c4c4';
    game.clouds.forEach(cloud => {
      // Simple cloud shape
      ctx.beginPath();
      ctx.arc(cloud.x, cloud.y, cloud.height/2, 0, Math.PI * 2);
      ctx.arc(cloud.x + cloud.width/3, cloud.y, cloud.height/2, 0, Math.PI * 2);
      ctx.arc(cloud.x + 2*cloud.width/3, cloud.y, cloud.height/2, 0, Math.PI * 2);
      ctx.arc(cloud.x + cloud.width, cloud.y, cloud.height/2, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  
  function drawGame() {
    // Clear canvas
    ctx.fillStyle = '#f7f7f7';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw clouds
    drawClouds();
    
    // Draw ground
    drawGround();
    
    // Draw obstacles
    drawObstacles();
    
    // Draw dinosaur
    drawDinosaur();
    
    // Draw score
    ctx.fillStyle = '#535353';
    ctx.font = '16px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(\`HI \${String(Math.max(game.score, parseInt(localStorage.getItem('dinoHighScore') || '0'))).padStart(5, '0')}\`, canvas.width - 20, 30);
    ctx.fillText(\`\${String(game.score).padStart(5, '0')}\`, canvas.width - 20, 50);
    
    // Draw start message
    if (!game.gameStarted) {
      ctx.textAlign = 'center';
      ctx.font = '14px monospace';
      ctx.fillText('Press SPACE or ↑ to start', canvas.width/2, canvas.height/2);
      ctx.fillText('↑ to jump, ↓ to duck', canvas.width/2, canvas.height/2 + 20);
    }
    
    // Game over screen
    if (!game.gameRunning && game.gameStarted) {
      ctx.textAlign = 'center';
      ctx.font = '20px monospace';
      ctx.fillText('G A M E  O V E R', canvas.width/2, canvas.height/2 - 20);
      ctx.font = '14px monospace';
      ctx.fillText('Press SPACE to restart', canvas.width/2, canvas.height/2 + 10);
      
      // Save high score
      const currentHigh = parseInt(localStorage.getItem('dinoHighScore') || '0');
      if (game.score > currentHigh) {
        localStorage.setItem('dinoHighScore', game.score.toString());
      }
    }
    
    ctx.textAlign = 'left';
  }
  
  function gameLoop() {
    updateGame();
    drawGame();
    requestAnimationFrame(gameLoop);
  }
  
  function restartGame() {
    game.dino = {
      x: 50, y: 150, width: 40, height: 40,
      vy: 0, onGround: true, ducking: false
    };
    game.obstacles = [];
    game.score = 0;
    game.gameSpeed = 4;
    game.gameRunning = true;
    game.gameStarted = true;
    game.lastObstacleSpawn = Date.now();
  }
  
  // Start game
  document.body.appendChild(canvas);
  gameLoop();
  
  return {
    canvas,
    restart: restartGame
  };
}

const chromeDinoGame = createChromeDinoGame();
console.log('Chrome Dinosaur Game loaded! Press SPACE or ↑ to start, ↑ to jump, ↓ to duck');`,
    inputs: [],
  },
  ...snakeGame,
];
