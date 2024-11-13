document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "La campaña de Lubricantes Terpel, Pensado en el bolsillo de los colombianos, está basada en comunicar:",
            answers: [
                "Beneficio Ahorro + RTB (Razones para creer del portafolio)",
                "La mejor relación de precio Vs Calidad",
                "Momentos de Vida + Ahorro + RTB (Razones para creer del portafolio)", // CORRECTA
                "Ahorro en combustible y mantenimiento"
            ],
            correct: 2
        },
        {
            question: "¿Cuántos productos Terpel Ultrek existen actualmente en el portafolio?",
            answers: [
                "5 para motor, 2 para diferenciales y 2 para transmisiones", // CORRECTA
                "9 para motor",
                "5 para motor",
                "7 para motor y 2 para diferenciales"
            ],
            correct: 0
        },
        {
            question: "De acuerdo a los lineamientos de marca de Lubricantes Terpel, ¿cuál debe ser el orden de los logos en una pieza multisegmento?",
            answers: [
                "Terpel Celerity, Terpel Oiltec, Terpel Ultrek",
                "Terpel Ultrek, Terpel Oiltec, Terpel Celerity", // CORRECTA
                "Terpel Oiltec, Terpel Ultrek, Terpel Celerity",
                "Terpel Ultrek, Terpel Celerity, Terpel Oiltec"
            ],
            correct: 1
        },
        {
            question: "¿Cuál es el beneficio principal del Titanio líquido en Lubricantes Terpel?",
            answers: [
                "Ofrecer una capa extra protectora al motor", // CORRECTA
                "Entregar aditivos para mejorar las vibraciones del motor",
                "Mejorar el arranque en frío y ahorro de combustible",
                "Reducir el desgaste del motor en condiciones extremas"
            ],
            correct: 0
        },
        {
            question: "Terpel Ultrek 15W-40 Pro CK-4 brinda:",
            answers: [
                "Mayor protección para mayor rendimiento", // CORRECTA
                "Menos vibraciones",
                "Mejor eficiencia de combustible",
                "Mayor durabilidad del motor"
            ],
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
            <div class="color-line"></div>
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
                if (currentQuestionIndex < selectedQuestions.length) {
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

    function showPopup() {
        questionContainer.classList.add('hidden');
        popup.classList.remove('hidden');
        popup.classList.add('show');
        if (correctAnswers === selectedQuestions.length) {
            popupContent.textContent = '¡Felicidades! Has respondido correctamente todas las preguntas.';
        } else {
            popupContent.textContent = 'Inténtalo de nuevo. No has respondido correctamente todas las preguntas.';
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