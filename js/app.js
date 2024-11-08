document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "¿Cuál es la capital de Francia?",
            answers: ["París", "Londres", "Madrid", "Berlín"],
            correct: 0
        },
        {
            question: "¿Cuál es el río más largo del mundo?",
            answers: ["Nilo", "Amazonas", "Yangtsé", "Misisipi"],
            correct: 1
        },
        {
            question: "¿Quién pintó la Mona Lisa?",
            answers: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Claude Monet"],
            correct: 0
        },
        {
            question: "¿Cuál es el planeta más grande del sistema solar?",
            answers: ["Júpiter", "Saturno", "Urano", "Neptuno"],
            correct: 0
        },
        {
            question: "¿En qué año llegó el hombre a la luna?",
            answers: ["1969", "1959", "1979", "1989"],
            correct: 0
        },
        {
            question: "¿Cuál es el océano más grande?",
            answers: ["Pacífico", "Atlántico", "Índico", "Ártico"],
            correct: 0
        }
    ];

    const questionContainer = document.getElementById('question-container');
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-content');
    const popupButton = document.getElementById('popup-button');

    let currentQuestionIndex = 0;
    let correctAnswers = 0;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function showQuestion(index) {
        const question = questions[index];
        const answers = question.answers.map((answer, i) => ({ answer, index: i }));
        shuffleArray(answers);

        questionContainer.innerHTML = `
            <div class="question">${question.question}</div>
            <div class="answers">
                ${answers.map(({ answer, index }) => `
                    <button class="answer" data-index="${index}">${answer}</button>
                `).join('')}
            </div>
        `;

        document.querySelectorAll('.answer').forEach(button => {
            button.addEventListener('click', (e) => {
                const selectedAnswer = parseInt(e.target.getAttribute('data-index'));
                if (selectedAnswer === question.correct) {
                    correctAnswers++;
                }
                disableAnswers();
                currentQuestionIndex++;
                if (currentQuestionIndex < 2) {
                    setTimeout(() => showQuestion(selectedQuestions[currentQuestionIndex]), 1000);
                } else {
                    setTimeout(showPopup, 1000);
                }
            });
        });
    }

    function disableAnswers() {
        document.querySelectorAll('.answer').forEach(button => {
            button.disabled = true;
        });
    }

    function enableAnswers() {
        document.querySelectorAll('.answer').forEach(button => {
            button.disabled = false;
        });
    }

    function showPopup() {
        questionContainer.classList.add('hidden');
        popup.classList.remove('hidden');
        popup.classList.add('show');
        if (correctAnswers === 2) {
            popupContent.textContent = '¡Felicidades! Has respondido correctamente las dos preguntas.';
        } else {
            popupContent.textContent = 'Inténtalo de nuevo. No has respondido correctamente las dos preguntas.';
        }
    }

    popupButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Selecciona aleatoriamente dos preguntas
    const selectedQuestions = [];
    while (selectedQuestions.length < 2) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        if (!selectedQuestions.includes(randomIndex)) {
            selectedQuestions.push(randomIndex);
        }
    }

    // Muestra la primera pregunta
    showQuestion(selectedQuestions[0]);
});