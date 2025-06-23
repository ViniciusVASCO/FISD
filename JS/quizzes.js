// Quiz JavaScript for Newton's Laws

class QuizApp {
    constructor() {
        this.currentQuestion = 0;
        this.selectedAnswer = null;
        this.score = 0;
        this.answers = [];
        this.showResult = false;

        this.questions = [
            {
                question: "O que afirma a 1ª Lei de Newton?",
                options: [
                    "Todo corpo em movimento acelera constantemente",
                    "Um corpo em repouso tende a permanecer em repouso, e um corpo em movimento tende a permanecer em movimento",
                    "A força é igual à massa vezes a aceleração",
                    "Para toda ação há uma reação"
                ],
                correct: 1
            },
            {
                question: "Qual é o nome da 1ª Lei de Newton?",
                options: [
                    "Lei da Força",
                    "Lei da Ação e Reação",
                    "Lei da Inércia",
                    "Lei da Gravidade"
                ],
                correct: 2
            },
            {
                question: "O que afirma a 3ª Lei de Newton?",
                options: [
                    "F = m × a",
                    "Todo corpo atrai outro corpo",
                    "Para toda ação há sempre uma reação oposta e de igual intensidade",
                    "A velocidade é constante"
                ],
                correct: 2
            },
            {
                question: "Quando você empurra uma parede, o que acontece?",
                options: [
                    "A parede não exerce força sobre você",
                    "Você exerce mais força que a parede",
                    "A parede empurra você com a mesma força",
                    "A parede quebra"
                ],
                correct: 2
            },
            {
                question: "Por que você é empurrado para frente quando um carro freia?",
                options: [
                    "Por causa da 3ª Lei de Newton",
                    "Por causa da inércia (1ª Lei de Newton)",
                    "Por causa da gravidade",
                    "Por causa da velocidade"
                ],
                correct: 1
            }
        ];

        this.init();
    }

    init() {
        this.bindEvents();
        this.renderQuestion();
        this.updateProgress();
    }

    bindEvents() {
        document.getElementById('next-question').addEventListener('click', () => this.handleNextQuestion());
        document.getElementById('restart-quiz').addEventListener('click', () => this.resetQuiz());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    renderQuestion() {
        const question = this.questions[this.currentQuestion];
        
        // Update question text
        document.getElementById('question-text').textContent = question.question;
        
        // Update question counter
        document.getElementById('question-counter').textContent = 
            `Pergunta ${this.currentQuestion + 1} de ${this.questions.length}`;
        
        // Render answer options
        const answersContainer = document.getElementById('answers-container');
        answersContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const answerButton = document.createElement('button');
            answerButton.className = 'answer-option';
            answerButton.textContent = option;
            answerButton.addEventListener('click', () => this.selectAnswer(index));
            answersContainer.appendChild(answerButton);
        });
        
        // Reset next button
        document.getElementById('next-question').disabled = true;
        this.selectedAnswer = null;
    }

    selectAnswer(answerIndex) {
        // Remove previous selection
        document.querySelectorAll('.answer-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        // Mark selected answer
        const selectedOption = document.querySelectorAll('.answer-option')[answerIndex];
        selectedOption.classList.add('selected');
        
        this.selectedAnswer = answerIndex;
        document.getElementById('next-question').disabled = false;
    }

    handleNextQuestion() {
        if (this.selectedAnswer === null) return;

        const newAnswers = [...this.answers, this.selectedAnswer];
        this.answers = newAnswers;

        if (this.selectedAnswer === this.questions[this.currentQuestion].correct) {
            this.score++;
        }

        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.renderQuestion();
            this.updateProgress();
        } else {
            this.showResults();
        }
    }

    updateProgress() {
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        
        document.getElementById('score-display').textContent = 
            `Pontuação: ${this.score}/${this.currentQuestion}`;
    }

    showResults() {
        this.showResult = true;
        
        // Hide quiz content
        document.getElementById('quiz-content').classList.add('hidden');
        document.getElementById('quiz-progress').classList.add('hidden');
        
        // Show results
        const resultsContainer = document.getElementById('quiz-results');
        resultsContainer.classList.remove('hidden');
        
        // Update results
        const percentage = (this.score / this.questions.length) * 100;
        
        // Update emoji
        let emoji = '📚';
        if (this.score === this.questions.length) {
            emoji = '🏆';
        } else if (percentage >= 70) {
            emoji = '🎉';
        }
        document.getElementById('results-emoji').textContent = emoji;
        
        // Update score
        const finalScore = document.getElementById('final-score');
        finalScore.textContent = `Sua pontuação: ${this.score}/${this.questions.length}`;
        finalScore.className = `final-score ${this.getScoreColorClass()}`;
        
        // Update message
        let message = 'Continue estudando! Revise o conteúdo e tente novamente.';
        if (this.score === this.questions.length) {
            message = 'Perfeito! Você domina as Leis de Newton!';
        } else if (percentage >= 70) {
            message = 'Muito bem! Você tem um bom conhecimento das Leis de Newton!';
        }
        document.getElementById('results-message').textContent = message;
    }

    getScoreColorClass() {
        const percentage = (this.score / this.questions.length) * 100;
        if (percentage >= 80) return 'score-excellent';
        if (percentage >= 60) return 'score-good';
        return 'score-needs-improvement';
    }

    resetQuiz() {
        this.currentQuestion = 0;
        this.selectedAnswer = null;
        this.score = 0;
        this.answers = [];
        this.showResult = false;
        
        // Show quiz content
        document.getElementById('quiz-content').classList.remove('hidden');
        document.getElementById('quiz-progress').classList.remove('hidden');
        
        // Hide results
        document.getElementById('quiz-results').classList.add('hidden');
        
        // Reset UI
        this.renderQuestion();
        this.updateProgress();
    }

    handleKeydown(e) {
        if (this.showResult) return;
        
        const answerOptions = document.querySelectorAll('.answer-option');
        
        switch(e.key) {
            case '1':
            case '2':
            case '3':
            case '4':
                e.preventDefault();
                const index = parseInt(e.key) - 1;
                if (index < answerOptions.length) {
                    this.selectAnswer(index);
                }
                break;
            case 'Enter':
                e.preventDefault();
                if (!document.getElementById('next-question').disabled) {
                    this.handleNextQuestion();
                }
                break;
        }
    }
}

// Initialize the quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const quiz = new QuizApp();
    console.log('Quiz application initialized successfully!');
});
