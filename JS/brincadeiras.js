class EducationalGames {
    constructor() {
        this.currentGame = null;
        this.gameData = {
            'inertia-drag': {
                dragPosition: { x: 300, y: 300 },
                isDragging: false,
                score: 0
            },
            'balloon-rocket': {
                balloonCount: 0,
                score: 0
            },
            'memory-laws': {
                flippedCards: [],
                matchedPairs: 0,
                moves: 0
            }
        };
        
        this.games = [
            {
                id: "inertia-drag",
                title: "Arraste o Objeto",
                description: "Demonstre a inércia arrastando objetos com diferentes massas",
                law: "1ª Lei - Inércia",
                color: "#3b82f6"
            },
            {
                id: "balloon-rocket",
                title: "Foguete de Balão",
                description: "Simule ação e reação com balões que se movem",
                law: "3ª Lei - Ação e Reação", 
                color: "#ef4444"
            },
            {
                id: "memory-laws",
                title: "Jogo da Memória",
                description: "Encontre os pares relacionados às Leis de Newton",
                law: "Todas as Leis",
                color: "#9333ea"
            }
        ];

        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Game selection
        document.querySelectorAll('.game-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const gameId = card.dataset.game;
                this.startGame(gameId);
            });
        });

        // Game controls
        document.getElementById('back-to-games').addEventListener('click', () => this.backToGames());
        document.getElementById('restart-game').addEventListener('click', () => this.restartGame());
    }

    startGame(gameId) {
        this.currentGame = gameId;
        
        // Hide game selection
        document.getElementById('games-selection').classList.add('hidden');
        
        // Show game container
        const gameContainer = document.getElementById('game-container');
        gameContainer.classList.remove('hidden');
        
        // Update game title
        const game = this.games.find(g => g.id === gameId);
        document.getElementById('game-title').textContent = game.title;
        
        // Render game content
        this.renderGame(gameId);
    }

    backToGames() {
        this.currentGame = null;
        
        // Show game selection
        document.getElementById('games-selection').classList.remove('hidden');
        
        // Hide game container
        document.getElementById('game-container').classList.add('hidden');
    }

    restartGame() {
        if (this.currentGame) {
            this.resetGameData(this.currentGame);
            this.renderGame(this.currentGame);
        }
    }

    resetGameData(gameId) {
        switch(gameId) {
            case 'inertia-drag':
                this.gameData[gameId] = {
                    dragPosition: { x: 300, y: 300 },
                    isDragging: false,
                    score: 0
                };
                break;
            case 'balloon-rocket':
                this.gameData[gameId] = {
                    balloonCount: 0,
                    score: 0
                };
                break;
            case 'memory-laws':
                this.gameData[gameId] = {
                    flippedCards: [],
                    matchedPairs: 0,
                    moves: 0
                };
                break;
        }
    }

    renderGame(gameId) {
        const gameContent = document.getElementById('game-content');
        
        switch(gameId) {
            case 'inertia-drag':
                this.renderInertiaDragGame(gameContent);
                break;
            case 'balloon-rocket':
                this.renderBalloonRocketGame(gameContent);
                break;
            case 'memory-laws':
                this.renderMemoryGame(gameContent);
                break;
        }
    }

    renderInertiaDragGame(container) {
        container.innerHTML = `
            <div class="game-instructions">
                <h3>Como jogar:</h3>
                <p>Arraste o objeto azul pela tela. Observe como ele "resiste" ao movimento inicial (inércia) e como tende a continuar se movendo quando você para de arrastar!</p>
            </div>
            
            <div class="game-area" id="drag-area" style="cursor: crosshair; background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);">
                <div id="draggable-object" class="draggable-object">
                    <div class="object-mass">1.0 kg</div>
                </div>
                <div class="game-instructions-overlay">
                    <div style="text-align: center; color: rgba(255,255,255,0.7);">
                        <i class="fas fa-hand-paper" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                        <p>Clique e arraste o objeto azul!</p>
                    </div>
                </div>
            </div>
            
            <div class="game-score">
                <p>Pontuação: <span id="drag-score">0</span></p>
            </div>
        `;
        
        this.bindDragEvents();
    }

    renderBalloonRocketGame(container) {
        container.innerHTML = `
            <div class="game-instructions">
                <h3>Como jogar:</h3>
                <p>Clique para "soltar" balões que demonstram ação e reação. O ar sai para baixo (ação) e o balão sobe (reação)!</p>
            </div>
            
            <div class="text-center mb-4">
                <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; color: white;">
                    <i class="fas fa-trophy"></i>
                    <span>Pontuação: <span id="balloon-score">0</span></span>
                </div>
            </div>
            
            <div class="game-area" id="balloon-area" style="background: linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%); position: relative;">
                <div id="balloons-container" style="position: absolute; width: 100%; height: 100%; pointer-events: none;"></div>
                
                <div style="position: absolute; bottom: 1rem; left: 50%; transform: translateX(-50%);">
                    <button id="launch-balloon" class="btn" style="background: #ef4444; color: white; font-size: 1.125rem; padding: 1rem 2rem;">
                        🎈 Lançar Balão!
                    </button>
                </div>
            </div>
        `;
        
        this.bindBalloonEvents();
    }

    renderMemoryGame(container) {
        const cards = [
            { id: 1, content: '1ª Lei', match: 'Inércia' },
            { id: 2, content: 'Inércia', match: '1ª Lei' },
            { id: 3, content: '3ª Lei', match: 'Ação/Reação' },
            { id: 4, content: 'Ação/Reação', match: '3ª Lei' },
            { id: 5, content: 'F = ma', match: '2ª Lei' },
            { id: 6, content: '2ª Lei', match: 'F = ma' },
            { id: 7, content: 'Newton', match: 'Físico' },
            { id: 8, content: 'Físico', match: 'Newton' }
        ];
        
        const shuffledCards = this.shuffleArray([...cards]);
        
        container.innerHTML = `
            <div class="game-instructions">
                <h3>Jogo da Memória - Leis de Newton</h3>
                <p>Encontre os pares relacionados às Leis de Newton. Clique em duas cartas para virá-las!</p>
            </div>
            
            <div class="memory-stats">
                <p>Movimentos: <span id="move-counter">0</span> | Pares encontrados: <span id="pairs-found">0</span>/4</p>
            </div>
            
            <div class="memory-grid">
                ${shuffledCards.map((card, index) => `
                    <div class="memory-card" data-id="${card.id}" data-content="${card.content}" data-match="${card.match}" data-index="${index}">
                        <div class="card-front">?</div>
                        <div class="card-back">${card.content}</div>
                    </div>
                `).join('')}
            </div>
        `;
        
        this.bindMemoryEvents();
    }

    bindDragEvents() {
        const dragArea = document.getElementById('drag-area');
        const draggableObject = document.getElementById('draggable-object');
        const data = this.gameData['inertia-drag'];
        
        let isMouseDown = false;
        let startX, startY;
        
        const updatePosition = () => {
            draggableObject.style.left = `${data.dragPosition.x}px`;
            draggableObject.style.top = `${data.dragPosition.y}px`;
        };
        
        updatePosition();
        
        draggableObject.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            data.isDragging = true;
            startX = e.clientX - data.dragPosition.x;
            startY = e.clientY - data.dragPosition.y;
            draggableObject.style.transform = 'scale(1.1)';
            document.querySelector('.game-instructions-overlay').style.display = 'none';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (isMouseDown && data.isDragging) {
                const rect = dragArea.getBoundingClientRect();
                data.dragPosition.x = Math.max(0, Math.min(rect.width - 50, e.clientX - rect.left - startX));
                data.dragPosition.y = Math.max(0, Math.min(rect.height - 50, e.clientY - rect.top - startY));
                updatePosition();
                
                // Update score
                data.score += 1;
                document.getElementById('drag-score').textContent = data.score;
            }
        });
        
        document.addEventListener('mouseup', () => {
            if (isMouseDown) {
                isMouseDown = false;
                data.isDragging = false;
                draggableObject.style.transform = 'scale(1)';
            }
        });
    }

    bindBalloonEvents() {
        const launchButton = document.getElementById('launch-balloon');
        const balloonsContainer = document.getElementById('balloons-container');
        const data = this.gameData['balloon-rocket'];
        
        launchButton.addEventListener('click', () => {
            data.balloonCount++;
            data.score += 10;
            
            // Create balloon element
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.textContent = '🎈';
            balloon.style.cssText = `
                position: absolute;
                left: ${Math.random() * 80 + 10}%;
                bottom: 20px;
                font-size: 2rem;
                animation: balloonFly 2s ease-out forwards;
                pointer-events: none;
            `;
            
            balloonsContainer.appendChild(balloon);
            
            // Update score
            document.getElementById('balloon-score').textContent = data.score;
            
            // Remove balloon after animation
            setTimeout(() => {
                balloon.remove();
                data.balloonCount = Math.max(0, data.balloonCount - 1);
            }, 2000);
        });
    }

    bindMemoryEvents() {
        const cards = document.querySelectorAll('.memory-card');
        const data = this.gameData['memory-laws'];
        
        cards.forEach(card => {
            card.addEventListener('click', () => {
                if (card.classList.contains('flipped') || card.classList.contains('matched') || data.flippedCards.length >= 2) {
                    return;
                }
                
                card.classList.add('flipped');
                data.flippedCards.push(card);
                
                if (data.flippedCards.length === 2) {
                    data.moves++;
                    document.getElementById('move-counter').textContent = data.moves;
                    
                    setTimeout(() => {
                        this.checkMemoryMatch();
                    }, 1000);
                }
            });
        });
    }

    checkMemoryMatch() {
        const data = this.gameData['memory-laws'];
        const [card1, card2] = data.flippedCards;
        
        const content1 = card1.dataset.content;
        const match1 = card1.dataset.match;
        const content2 = card2.dataset.content;
        
        if (match1 === content2) {
            // Match found
            card1.classList.add('matched');
            card2.classList.add('matched');
            data.matchedPairs++;
            document.getElementById('pairs-found').textContent = data.matchedPairs;
            
            if (data.matchedPairs === 4) {
                setTimeout(() => {
                    alert(`Parabéns! Você completou o jogo em ${data.moves} movimentos!`);
                }, 500);
            }
        } else {
            // No match
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }
        
        data.flippedCards = [];
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}

// Add game-specific CSS
const style = document.createElement('style');
style.textContent = `
    .draggable-object {
        position: absolute;
        width: 50px;
        height: 50px;
        background: #3b82f6;
        border-radius: 50%;
        border: 4px solid #dbeafe;
        cursor: grab;
        transition: transform 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 0.75rem;
        font-weight: bold;
    }
    
    .draggable-object:active {
        cursor: grabbing;
    }
    
    .game-instructions-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
    }
    
    .memory-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        max-width: 600px;
        margin: 0 auto;
    }
    
    .memory-card {
        aspect-ratio: 1;
        background: rgba(255, 255, 255, 0.1);
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 0.5rem;
        cursor: pointer;
        position: relative;
        transition: all 0.3s ease;
        perspective: 1000px;
    }
    
    .memory-card:hover {
        transform: translateY(-2px);
        border-color: rgba(255, 255, 255, 0.5);
    }
    
    .card-front, .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        backface-visibility: hidden;
        transition: transform 0.6s ease;
        border-radius: 0.5rem;
        font-weight: bold;
    }
    
    .card-front {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        font-size: 2rem;
    }
    
    .card-back {
        background: rgba(147, 51, 234, 0.8);
        color: white;
        transform: rotateY(180deg);
        font-size: 0.875rem;
        text-align: center;
        padding: 0.5rem;
    }
    
    .memory-card.flipped .card-front {
        transform: rotateY(180deg);
    }
    
    .memory-card.flipped .card-back {
        transform: rotateY(0deg);
    }
    
    .memory-card.matched {
        opacity: 0.6;
        pointer-events: none;
    }
    
    .memory-card.matched .card-back {
        background: rgba(16, 185, 129, 0.8);
    }
    
    .memory-stats {
        text-align: center;
        color: white;
        margin-bottom: 1.5rem;
        font-weight: 500;
    }
    
    .game-score {
        text-align: center;
        color: white;
        margin-top: 1rem;
        font-size: 1.125rem;
        font-weight: 600;
    }
    
    @keyframes balloonFly {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-400px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @media (max-width: 768px) {
        .memory-grid {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .draggable-object {
            width: 40px;
            height: 40px;
            font-size: 0.625rem;
        }
    }
`;
document.head.appendChild(style);

// Initialize the games when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const games = new EducationalGames();
    console.log('Educational Games initialized successfully!');
});
