document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "¿Cómo se llamada la marca de lubricantes de Terpel dirigida a moteros?",
            answers: [
                "Terpel Ultrek",
                "Terpel Celerity",// CORRECTA
                "Terpel Oiltec", 
                "GT 98"
            ],
            correct: 1
        },
        {
            question: "¿Cuál es unos de los aditivos característicos que tienen los Lubricantes Terpel Celrity y Terpel Oiltec?",
            answers: [
                "Tergas", 
                "Titanio Líquido", // CORRECTA
                "Esteres vegetales",
                "Glicol"
            ],
            correct: 1
        },
        {
            question: "¿Cómo se llama la comunidad digital motera que tiene Terpel Celerity y esta presente en redes sociales?",
            answers: [
                "CelerityMoto",
                "Bufalos Club", 
                "De Moteros", // CORRECTA
                "Club2Ruedas"
            ],
            correct: 2
        },
        {
            question: "¿Cuál es la campaña actual de lubricantes Terpel?",
            answers: [
                "Hombre y Moto son uno", 
                "Escucha tu Motor",
                "Somos de aquí somos de Allá",
                "Pensados en el Bolsillo de los Colombianos" // CORRECTA
            ],
            correct: 3
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
                    button.classList.add('correct');
                    correctAnswers++;
                    currentQuestionIndex++;
                    if (currentQuestionIndex < selectedQuestions.length) {
                        setTimeout(() => showQuestion(selectedQuestions[currentQuestionIndex]), 1000);
                    } else {
                        setTimeout(showPopup, 1000);
                    }
                } else {
                    button.classList.add('incorrect');
                    setTimeout(showPopup, 1000);
                }
                disableAnswers();
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