// FitQuiz Logic

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const fileInput = document.getElementById('csvFileInput');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const modeSelection = document.querySelector('.mode-selection');
    const setupError = document.getElementById('setupError');

    const setupSection = document.getElementById('setup-section');
    const practiceSection = document.getElementById('practice-section');
    const testSection = document.getElementById('test-section');

    const btnPracticeMode = document.getElementById('btnPracticeMode');
    const btnFullTestMode = document.getElementById('btnFullTestMode');
    const exitBtns = document.querySelectorAll('.btn-exit');

    // State
    let quizData = [];
    let currentPracticeIndex = 0;
    let practiceUnseen = [];

    // --- File Handling ---
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            fileNameDisplay.textContent = file.name;
            parseCSV(file);
        } else {
            fileNameDisplay.textContent = 'No file chosen';
            modeSelection.style.display = 'none';
        }
    });

    function parseCSV(file) {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                if (results.errors.length > 0) {
                    showError("Error parsing CSV. Ensure it is formatted correctly.");
                    console.error(results.errors);
                    return;
                }

                // Validate headers
                const requiredHeaders = ["Question", "Option A", "Option B", "Option C", "Option D", "Answer"];
                const headers = results.meta.fields;

                const isValid = requiredHeaders.every(h => headers.includes(h));
                if (!isValid) {
                    showError("CSV missing required columns. Need: Question, Option A, Option B, Option C, Option D, Answer");
                    return;
                }

                quizData = results.data;
                setupError.style.display = 'none';
                modeSelection.style.display = 'block';
            }
        });
    }

    function showError(msg) {
        setupError.textContent = msg;
        setupError.style.display = 'block';
        modeSelection.style.display = 'none';
    }


    // --- Navigation ---
    btnPracticeMode.addEventListener('click', () => {
        setupSection.style.display = 'none';
        practiceSection.style.display = 'block';
        initPracticeMode();
    });

    btnFullTestMode.addEventListener('click', () => {
        setupSection.style.display = 'none';
        testSection.style.display = 'block';
        initTestMode();
    });

    exitBtns.forEach(btn => btn.addEventListener('click', () => {
        practiceSection.style.display = 'none';
        testSection.style.display = 'none';
        setupSection.style.display = 'block';
    }));


    // --- Practice Mode Logic ---
    const pracQuestionText = document.getElementById('practiceQuestionText');
    const pracOptionsContainer = document.getElementById('practiceOptions');
    const pracFeedback = document.getElementById('practiceFeedback');
    const btnNextQuestion = document.getElementById('btnNextQuestion');
    const pracCurrentNumDisplay = document.getElementById('practiceCurrentNum');

    function initPracticeMode() {
        // Create an array of indices to pull from randomly
        practiceUnseen = Array.from({ length: quizData.length }, (_, i) => i);
        loadNextPracticeQuestion();
    }

    function loadNextPracticeQuestion() {
        if (practiceUnseen.length === 0) {
            // Reset if all seen
            practiceUnseen = Array.from({ length: quizData.length }, (_, i) => i);
        }

        // Pick random
        const r = Math.floor(Math.random() * practiceUnseen.length);
        currentPracticeIndex = practiceUnseen[r];
        practiceUnseen.splice(r, 1); // remove from unseen

        const q = quizData[currentPracticeIndex];

        pracQuestionText.textContent = q.Question;
        pracOptionsContainer.innerHTML = '';
        pracFeedback.textContent = '';
        pracFeedback.className = 'feedback-text';
        btnNextQuestion.style.display = 'none';
        pracCurrentNumDisplay.textContent = (quizData.length - practiceUnseen.length);

        const options = ['A', 'B', 'C', 'D'];
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `<span class="option-label">${opt}</span> <span>${q[`Option ${opt}`]}</span>`;

            btn.addEventListener('click', () => handlePracticeAnswer(opt, q.Answer, btn));
            pracOptionsContainer.appendChild(btn);
        });
    }

    function handlePracticeAnswer(selectedOpt, correctOpt, btnElement) {
        // Disable all buttons
        const allBtns = pracOptionsContainer.querySelectorAll('.option-btn');
        allBtns.forEach(b => b.disabled = true);

        const isCorrect = selectedOpt.trim().toUpperCase() === correctOpt.trim().toUpperCase();

        if (isCorrect) {
            btnElement.classList.add('correct');
            pracFeedback.textContent = 'Correct!';
            pracFeedback.classList.add('correct-text');
        } else {
            btnElement.classList.add('incorrect');
            pracFeedback.textContent = `Incorrect. The correct answer was ${correctOpt}.`;
            pracFeedback.classList.add('incorrect-text');

            // Highlight correct answer
            allBtns.forEach(b => {
                if (b.querySelector('.option-label').textContent === correctOpt.trim().toUpperCase()) {
                    b.classList.add('correct');
                }
            });
        }

        btnNextQuestion.style.display = 'inline-block';
    }

    btnNextQuestion.addEventListener('click', loadNextPracticeQuestion);


    // --- Full Test Mode Logic ---
    const testListContainer = document.getElementById('testQuestionsList');
    const btnSubmitTest = document.getElementById('btnSubmitTest');
    const testScoreDisplay = document.getElementById('testScoreDisplay');
    const finalScoreSpan = document.getElementById('finalScore');
    const totalQuestionsSpan = document.getElementById('totalQuestions');

    function initTestMode() {
        testListContainer.innerHTML = '';
        testScoreDisplay.style.display = 'none';
        btnSubmitTest.style.display = 'inline-block';
        btnSubmitTest.disabled = false;

        quizData.forEach((q, index) => {
            const qDiv = document.createElement('div');
            qDiv.className = 'test-item';
            qDiv.innerHTML = `
                <h3 class="question-text">${index + 1}. ${q.Question}</h3>
                <div class="options-grid" id="test-opts-${index}"></div>
            `;

            testListContainer.appendChild(qDiv);

            const optsContainer = qDiv.querySelector('.options-grid');
            ['A', 'B', 'C', 'D'].forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'option-btn test-opt-btn';
                btn.dataset.questionIndex = index;
                btn.dataset.opt = opt;
                btn.innerHTML = `<span class="option-label">${opt}</span> <span>${q[`Option ${opt}`]}</span>`;

                btn.addEventListener('click', function () {
                    // Deselect others in this question
                    const siblings = optsContainer.querySelectorAll('.option-btn');
                    siblings.forEach(s => s.classList.remove('selected'));
                    // Select this one
                    this.classList.add('selected');
                    // We'll use border color to indicate selection before submission
                    siblings.forEach(s => s.style.borderColor = '');
                    this.style.borderColor = 'var(--primary-color)';
                });

                optsContainer.appendChild(btn);
            });
        });
    }

    btnSubmitTest.addEventListener('click', () => {
        let score = 0;

        quizData.forEach((q, index) => {
            const optsContainer = document.getElementById(`test-opts-${index}`);
            const selectedBtn = optsContainer.querySelector('.option-btn.selected');
            const allBtns = optsContainer.querySelectorAll('.option-btn');

            const correctOpt = q.Answer.trim().toUpperCase();

            allBtns.forEach(b => {
                b.disabled = true; // disable after submit
                b.style.borderColor = ''; // reset inline styles

                const optLetter = b.dataset.opt;
                if (optLetter === correctOpt) {
                    b.classList.add('correct'); // Highlight correct
                }
            });

            if (selectedBtn) {
                const selectedOpt = selectedBtn.dataset.opt;
                if (selectedOpt === correctOpt) {
                    score++;
                } else {
                    selectedBtn.classList.add('incorrect');
                }
            }
        });

        finalScoreSpan.textContent = score;
        totalQuestionsSpan.textContent = quizData.length;
        testScoreDisplay.style.display = 'block';
        btnSubmitTest.style.display = 'none';

        // Scroll to score
        testScoreDisplay.scrollIntoView({ behavior: 'smooth' });
    });
});
