// Quiz Application State
let quizData = [];
let currentTopic = null;
let currentQuestionIndex = 0;
let selectedAnswer = null;
let score = 0;
let topicQuestions = [];
let isAnswered = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadQuizData();
    setupKeyboardNavigation();
});

// Load quiz data from JSON file
async function loadQuizData() {
    try {
        const response = await fetch('./data/questions.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        quizData = await response.json();
        populateTopics();
    } catch (error) {
        console.error('Error loading quiz data:', error);
        alert('Failed to load quiz questions. Please check the data/questions.json file.');
    }
}

// Setup keyboard navigation support
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('quizSection').classList.contains('active')) {
            const options = document.querySelectorAll('.option');
            const currentSelected = Array.from(options).findIndex(opt => opt.classList.contains('selected'));
            
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIndex = (currentSelected + 1) % options.length;
                selectOption(nextIndex);
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = currentSelected === 0 ? options.length - 1 : currentSelected - 1;
                selectOption(prevIndex);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                submitAnswer();
            }
        }
    });
}

// Populate topic selection buttons
function populateTopics() {
    const topicsSet = new Set(quizData.map(q => q.topic));
    const topics = Array.from(topicsSet).sort();

    const topicButtonsContainer = document.getElementById('topicButtons');
    topicButtonsContainer.innerHTML = '';

    topics.forEach(topic => {
        const button = document.createElement('button');
        button.className = 'topic-btn';
        button.textContent = topic;
        button.onclick = () => startQuiz(topic);
        topicButtonsContainer.appendChild(button);
    });
}

// Start quiz for selected topic
function startQuiz(topic) {
    currentTopic = topic;
    topicQuestions = quizData.filter(q => q.topic === topic);

    if (topicQuestions.length === 0) {
        alert('No questions available for this topic.');
        return;
    }

    // Shuffle questions
    topicQuestions = topicQuestions.sort(() => Math.random() - 0.5);

    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    isAnswered = false;

    // Switch to quiz section
    showSection('quizSection');
    displayQuestion();
}

// Display current question
function displayQuestion() {
    if (currentQuestionIndex >= topicQuestions.length) {
        showQuizComplete();
        return;
    }

    const question = topicQuestions[currentQuestionIndex];

    // Update header
    document.getElementById('topicTitle').textContent = currentTopic;
    document.getElementById('questionCounter').textContent = 
        `Question ${currentQuestionIndex + 1} of ${topicQuestions.length}`;

    // Update progress bar
    const progress = ((currentQuestionIndex) / topicQuestions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';

    // Display question
    document.getElementById('questionText').textContent = question.question;

    // Display options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    // Shuffle options
    const shuffledOptions = question.options.map((option, index) => ({
        text: option,
        originalIndex: index
    })).sort(() => Math.random() - 0.5);

    shuffledOptions.forEach((option, index) => {
        const label = document.createElement('label');
        label.className = 'option-label';

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'answer';
        input.value = option.originalIndex;
        input.onchange = () => selectOption(option.originalIndex);

        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.appendChild(input);
        optionDiv.appendChild(document.createTextNode(option.text));

        optionsContainer.appendChild(optionDiv);
    });

    // Reset state
    selectedAnswer = null;
    isAnswered = false;
    document.getElementById('submitBtn').disabled = false;
    document.getElementById('submitBtn').textContent = 'Submit Answer';
}

// Handle option selection
function selectOption(index) {
    if (isAnswered) return;

    selectedAnswer = index;

    // Update UI
    const options = document.querySelectorAll('.option');
    options.forEach((option, idx) => {
        const input = option.querySelector('input');
        if (input.value == index) {
            option.classList.add('selected');
            input.checked = true;
        } else {
            option.classList.remove('selected');
            input.checked = false;
        }
    });
}

// Submit answer
function submitAnswer() {
    if (selectedAnswer === null) {
        alert('Please select an answer before submitting.');
        return;
    }

    isAnswered = true;
    const question = topicQuestions[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.answerIndex;

    if (isCorrect) {
        score++;
    }

    // Disable options
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.style.cursor = 'default';
        option.style.opacity = '0.7';
    });

    document.getElementById('submitBtn').disabled = true;

    // Show feedback
    showFeedback(isCorrect, question);
}

// Show feedback
function showFeedback(isCorrect, question) {
    showSection('feedbackSection');

    const feedbackContainer = document.getElementById('feedbackContainer');
    feedbackContainer.className = 'feedback-container ' + (isCorrect ? 'correct' : 'incorrect');

    const feedbackTitle = isCorrect ? '✓ Correct!' : '✗ Incorrect';
    const selectedOption = question.options[selectedAnswer];
    const correctOption = question.options[question.answerIndex];

    let feedbackHTML = `<div class="feedback-title">${feedbackTitle}</div>`;
    feedbackHTML += `<div class="feedback-text"><strong>Your answer:</strong> ${selectedOption}</div>`;

    if (!isCorrect) {
        feedbackHTML += `<div class="feedback-text"><strong>Correct answer:</strong> ${correctOption}</div>`;
    }

    feedbackHTML += `<div class="feedback-text"><strong>Explanation:</strong> ${question.explanation}</div>`;

    feedbackContainer.innerHTML = feedbackHTML;
}

// Next question
function nextQuestion() {
    currentQuestionIndex++;
    selectedAnswer = null;
    isAnswered = false;

    if (currentQuestionIndex < topicQuestions.length) {
        showSection('quizSection');
        displayQuestion();
    } else {
        showQuizComplete();
    }
}

// Show quiz completion screen
function showQuizComplete() {
    showSection('completeSection');

    const percentage = Math.round((score / topicQuestions.length) * 100);
    const scoreDisplay = document.getElementById('scoreDisplay');

    let message = '';
    if (percentage === 100) {
        message = 'Outstanding! You are a DevOps expert!';
    } else if (percentage >= 80) {
        message = 'Great job! You have strong DevOps knowledge!';
    } else if (percentage >= 60) {
        message = 'Good effort! Keep learning more about DevOps.';
    } else {
        message = 'Keep practicing! Review the DevOps concepts.';
    }

    scoreDisplay.innerHTML = `
        <h3>Your Score</h3>
        <p><strong>${score} out of ${topicQuestions.length}</strong> questions correct</p>
        <p><strong>${percentage}%</strong></p>
        <p style="margin-top: 20px; font-style: italic;">"${message}"</p>
    `;
}

// Back to topics
function backToTopics() {
    currentTopic = null;
    currentQuestionIndex = 0;
    selectedAnswer = null;
    score = 0;
    topicQuestions = [];
    isAnswered = false;

    showSection('topicSelection');
}

// Reset quiz
function resetQuiz() {
    backToTopics();
}

// Show section helper
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}
