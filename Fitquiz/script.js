// FitQuiz Logic

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const modeSelection = document.querySelector('.mode-selection');
    const setupError = document.getElementById('setupError');
    const subtitle = document.querySelector('#setup-section .subtitle');

    const setupSection = document.getElementById('setup-section');
    const practiceSection = document.getElementById('practice-section');
    const testSection = document.getElementById('test-section');

    const btnPracticeMode = document.getElementById('btnPracticeMode');
    const btnFullTestMode = document.getElementById('btnFullTestMode');
    const exitBtns = document.querySelectorAll('.btn-exit');

    // State
    const quizData = [
        { "Question": "Coronal plane cuts the body in:", "Option A": "Top and bottom halves", "Option B": "Front and back halves", "Option C": "Left and right halves", "Option D": "Diagonally", "Answer": "B" },
        { "Question": "Which of the following statements is TRUE?", "Option A": "Pulmonary arteries carry oxygenated blood", "Option B": "Pulmonary veins carry oxygenated blood", "Option C": "Pulmonary veins carry deoxygenated blood", "Option D": "None of the above", "Answer": "B" },
        { "Question": "Which of the following is the smallest blood vessel?", "Option A": "Artery", "Option B": "Capillary", "Option C": "Vein", "Option D": "Aorta", "Answer": "B" },
        { "Question": "Which chamber dispenses blood to the body?", "Option A": "Right atrium", "Option B": "Left atrium", "Option C": "Right ventricle", "Option D": "Left ventricle", "Answer": "D" },
        { "Question": "Which of the following is a component of a long bone?", "Option A": "Epiphysis", "Option B": "Diaphysis", "Option C": "Medullary cavity", "Option D": "All of the above", "Answer": "D" },
        { "Question": "When the angle at a joint decreases it is known as:", "Option A": "Abduction", "Option B": "Rotation", "Option C": "Flexion", "Option D": "Extension", "Answer": "C" },
        { "Question": "Which of the following statements is TRUE?", "Option A": "Cardiac muscles are striated", "Option B": "Cardiac muscles are non-striated", "Option C": "Cardiac muscles are voluntary", "Option D": "Smooth muscles are voluntary", "Answer": "A" },
        { "Question": "Arrangement of effort-fulcrum-load represents which class of a lever?", "Option A": "Class 1", "Option B": "Class 2", "Option C": "Class 3", "Option D": "Class 4", "Answer": "A" },
        { "Question": "Which of the following is a synovial joint?", "Option A": "Shoulder", "Option B": "Hip", "Option C": "Knee", "Option D": "All of the above", "Answer": "D" },
        { "Question": "Rotational movements generally occur in which of the following planes?", "Option A": "Sagittal", "Option B": "Coronal", "Option C": "Transverse", "Option D": "Frontal", "Answer": "C" },
        { "Question": "Study of normal functioning of the body is called:", "Option A": "Pathology", "Option B": "Kinesiology", "Option C": "Physiology", "Option D": "Biology", "Answer": "C" },
        { "Question": "Formula for cardiac output is:", "Option A": "Q = SV - HR", "Option B": "Q = SV + HR", "Option C": "Q = SV x HR", "Option D": "Q = SV + MHR", "Answer": "C" },
        { "Question": "Which of the following is a property of skeletal muscles?", "Option A": "Elasticity", "Option B": "Contractility", "Option C": "Excitability", "Option D": "All of the above", "Answer": "D" },
        { "Question": "Abduction is:", "Option A": "Taking the limb away from the midline of the body", "Option B": "Taking the limb towards the midline of the body", "Option C": "Taking the limb in front of the body", "Option D": "Taking the limb behind the body", "Answer": "A" },
        { "Question": "Which of the following is the smallest component of a muscle?", "Option A": "Fibre", "Option B": "Fascicle", "Option C": "Myofibril", "Option D": "Actin and myosin", "Answer": "D" },
        { "Question": "Which of the following is the function of the anterior deltoid muscle?", "Option A": "Shoulder flexion", "Option B": "Shoulder horizontal adduction", "Option C": "Shoulder vertical abduction", "Option D": "All the above", "Answer": "D" },
        { "Question": "Which one of the following muscles has the function of elbow flexion and forearm supination?", "Option A": "Wrist extensor", "Option B": "Triceps brachii", "Option C": "Biceps brachii", "Option D": "Flexor carpi radialis", "Answer": "C" },
        { "Question": "Trunk flexion is the primary function of which of the following muscles?", "Option A": "Rectus abdominis", "Option B": "Transversus abdominis", "Option C": "Internal oblique", "Option D": "External oblique", "Answer": "A" },
        { "Question": "Which of the following muscles brings the femur closer to the midline?", "Option A": "Adductor magnus", "Option B": "Gluteus maximus", "Option C": "Biceps femoris", "Option D": "Tibialis anterior", "Answer": "A" },
        { "Question": "Which of the following muscles does shoulder horizontal adduction?", "Option A": "Pectoralis minor", "Option B": "Pectoralis major", "Option C": "Anterior deltoid", "Option D": "Both B and C", "Answer": "D" },
        { "Question": "Which of the following muscles does elbow flexion?", "Option A": "Biceps brachii", "Option B": "Triceps brachii", "Option C": "Brachialis", "Option D": "Both A and C", "Answer": "D" },
        { "Question": "Which angle of the bench would be most suited to train the clavicular head of the pectoralis major?", "Option A": "15° decline", "Option B": "Flat", "Option C": "15° incline", "Option D": "30° incline", "Answer": "D" },
        { "Question": "Which of the following is a biarticulate muscle?", "Option A": "Brachialis", "Option B": "Lateral head of triceps brachii", "Option C": "Long head of triceps brachii", "Option D": "None of the above", "Answer": "C" },
        { "Question": "Sam is doing lateral flexion using a high pulley. Which muscle is he training?", "Option A": "Rectus abdominis", "Option B": "Transversus abdominis", "Option C": "Iliacus", "Option D": "External oblique", "Answer": "D" },
        { "Question": "Which function of the gluteus maximus is targeted in hip thrust exercises?", "Option A": "Hip extension", "Option B": "Hip adduction", "Option C": "Hip abduction", "Option D": "All of the above", "Answer": "A" },
        { "Question": "Which of the following is an isolation movement?", "Option A": "Good morning", "Option B": "Shrugs", "Option C": "Dumbbell pullover", "Option D": "All of the above", "Answer": "D" },
        { "Question": "Which of the following muscles are involved in one-arm dumbbell row exercises?", "Option A": "Latissimus dorsi", "Option B": "Biceps brachii", "Option C": "Teres major", "Option D": "All of the above", "Answer": "D" },
        { "Question": "Scapular elevation against resistance can be trained through which exercise?", "Option A": "Prone shrugs", "Option B": "Reverse shrugs", "Option C": "Shrugs", "Option D": "Pullovers", "Answer": "C" },
        { "Question": "Which of the following is the best sequence for a back workout?", "Option A": "Bent over row-Wide grip lt pull down-Shrugs-Prone high row", "Option B": "Wide grip lat pull down-Shrugs-Prone high row-Bent over row", "Option C": "Prone high row-Bent over row-shrugs-Wide grip lat pull down", "Option D": "prone high row-Bent over row-Wide grip lat pull down-Shrugs", "Answer": "A" },
        { "Question": "Shoulder extension is a function of which of the following muscles?", "Option A": "Rhomboids", "Option B": "Teres major", "Option C": "Trapezius", "Option D": "Teres minor", "Answer": "B" },
        { "Question": "Unilateral leg press will train which of the following muscles?", "Option A": "Vastus lateralis", "Option B": "Soleus", "Option C": "Gastrocnemius", "Option D": "Short head of biceps femoris", "Answer": "A" },
        { "Question": "Rotational movements generally occur in which of the following planes?", "Option A": "Sagittal", "Option B": "Coronal", "Option C": "Transverse", "Option D": "Frontal", "Answer": "C" },
        { "Question": "Best exercise for Erector Spinae (resisting trunk flexion) would be:", "Option A": "Bent over row", "Option B": "Good morning", "Option C": "One arm row", "Option D": "Chin-ups", "Answer": "B" },
        { "Question": "Which of the following muscles is responsible to maintain scapular depression in close grip pull-up?", "Option A": "Middle fibers of trapezius", "Option B": "Lower fibers of trapezius", "Option C": "Upper fibers of trapezius", "Option D": "Latissimus dorsi", "Answer": "B" },
        { "Question": "Which of the following will be the optimal movement in order to improve strength?", "Option A": "T-bar rows", "Option B": "Straight arm pull-downs", "Option C": "DB pull-overs", "Option D": "Bent over DB rows", "Answer": "D" },
        { "Question": "Which one of the following muscles maintains lateral pelvic stability?", "Option A": "Gluteus maximus", "Option B": "Gluteus medius", "Option C": "Vastus lateralis", "Option D": "Hip flexors", "Answer": "B" },
        { "Question": "Which of the following covers the surface area in the pectoral group?", "Option A": "Sternocostal head", "Option B": "Clavicular head", "Option C": "Pectoralis minor", "Option D": "None of the above", "Answer": "A" },
        { "Question": "Which of the following movements takes place in the coronal plane?", "Option A": "Narrow grip lat pulldown", "Option B": "Wide grip chin-up", "Option C": "Wide grip bent-over row", "Option D": "One-arm dumbbell row", "Answer": "B" },
        { "Question": "Which of the following muscles can abduct the hip?", "Option A": "Gluteus medius", "Option B": "Gluteus minimus", "Option C": "Vastus medialis", "Option D": "Both A and B", "Answer": "D" },
        { "Question": "How many heads are there in triceps brachii?", "Option A": "1", "Option B": "3", "Option C": "2", "Option D": "4", "Answer": "B" },
        { "Question": "Each of the following muscles does dorsiflexion:", "Option A": "Gastrocnemius", "Option B": "Tibialis anterior", "Option C": "Soleus", "Option D": "Latissimus dorsi", "Answer": "B" },
        { "Question": "If the trunk is rotated towards the left side  which of the following muscles are involved?", "Option A": "External oblique of left side and internal oblique of left side", "Option B": "External oblique of left side only and internal oblique of left side", "Option C": "External oblique of right side and internal oblique of left side", "Option D": "External oblique of right side only  and internal oblique of right side", "Answer": "C" },
        { "Question": "How many muscles are there in the pectoral group?", "Option A": "1", "Option B": "2", "Option C": "3", "Option D": "4", "Answer": "B" },
        { "Question": "Shoulder horizontal abduction function of posterior deltoid is targeted in which of the following exercises?", "Option A": "Reverse pec deck fly", "Option B": "Bent over dumbbell rows", "Option C": "Straight arm pull down", "Option D": "Wide grip lat pull down", "Answer": "A" }
    ];
    let currentPracticeIndex = 0;
    let practiceUnseen = [];

    // --- On Load Init ---
    // Instantly ready to practice with hardcoded data
    subtitle.textContent = "Ready to practice!";
    setupError.style.display = 'none';
    modeSelection.style.display = 'block';


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
