import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

const Quizzes = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const questions = [
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

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "text-green-500";
    if (percentage >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="p-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="outline" size="icon" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Quiz - Leis de Newton
            </h1>
            <p className="text-gray-300 mt-2">
              Teste seus conhecimentos sobre as Leis de Newton
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm border-white/20">
          {!showResult ? (
            <>
              <CardHeader>
                <div className="flex justify-between items-center mb-4">
                  <CardTitle className="text-white text-xl">
                    Pergunta {currentQuestion + 1} de {questions.length}
                  </CardTitle>
                  <div className="text-white/70">
                    Pontuação: {score}/{currentQuestion}
                  </div>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="bg-purple-600/20 rounded-lg p-6">
                  <h2 className="text-xl text-white font-medium mb-6">
                    {questions[currentQuestion].question}
                  </h2>
                  
                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                          selectedAnswer === index
                            ? 'border-purple-400 bg-purple-500/30 text-white'
                            : 'border-white/30 bg-white/10 text-white/90 hover:bg-white/20'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleNextQuestion}
                    disabled={selectedAnswer === null}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {currentQuestion < questions.length - 1 ? 'Próxima Pergunta' : 'Finalizar Quiz'}
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="text-center py-8">
              <div className="space-y-6">
                <div className="text-6xl">
                  {score === questions.length ? '🏆' : score >= questions.length * 0.7 ? '🎉' : '📚'}
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Quiz Finalizado!
                  </h2>
                  <p className={`text-2xl font-semibold ${getScoreColor()}`}>
                    Sua pontuação: {score}/{questions.length}
                  </p>
                  <p className="text-white/70 mt-2">
                    {score === questions.length 
                      ? 'Perfeito! Você domina as Leis de Newton!' 
                      : score >= questions.length * 0.7 
                      ? 'Muito bem! Você tem um bom conhecimento das Leis de Newton!'
                      : 'Continue estudando! Revise o conteúdo e tente novamente.'
                    }
                  </p>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={resetQuiz}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Tentar Novamente
                  </Button>
                  <Link to="/">
                    <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                      Voltar ao Início
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Quizzes;
