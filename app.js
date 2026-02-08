/**
 * DevOps Quiz Application - Main Logic Module
 * 
 * This module handles all quiz functionality including:
 * - Loading questions from JSON data file
 * - Managing quiz state and user progress
 * - Displaying questions and handling answers
 * - Calculating scores and providing feedback
 */

// ========== APPLICATION STATE ==========
// These variables track the current state of the quiz application
let quizData = [];              // All questions loaded from questions.json
let currentTopic = null;        // Currently selected DevOps topic
let currentQuestionIndex = 0;   // Index of the current question being displayed
let selectedAnswer = null;      // 0-based index of the answer selected by user
let score = 0;                  // Number of correct answers
let topicQuestions = [];        // Filter of questions for the current topic
let isAnswered = false;         // Boolean flag: has user submitted their answer?

/**
 * Initialize the application when DOM is fully loaded
 * This runs automatically when the page loads
 */
document.addEventListener('DOMContentLoaded', () => {
    loadQuizData();
    setupKeyboardNavigation();
});
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

/**
 * Extract unique topics from quiz data and create clickable buttons for each
 *
 * Process:
 * 1. Get all unique topics from the question data
 * 2. Sort topics alphabetically for consistent display
 * 3. Create a button for each topic
 * 4. Attach click handler to start quiz for that topic
 */
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
=======
/**
 * Extract unique topics from quiz data and create clickable buttons for each
 * 
 * Process:
 * 1. Get all unique topics from the question data
 * 2. Sort topics alphabetically for consistent display
 * 3. Create a button for each topic
 * 4. Attach click handler to start quiz for that topic
 */
>>>>>>> 1d52d762954e8dfef60ec044b75bc5237f2975af
function populateTopics() {
    // Extract all unique topics using Set to eliminate duplicates
    const topicsSet = new Set(quizData.map(q => q.topic));
    
    // Convert Set to Array and sort alphabetically
    const topics = Array.from(topicsSet).sort();

    // Get the container element where buttons will be inserted
    const topicButtonsContainer = document.getElementById('topicButtons');
    topicButtonsContainer.innerHTML = ''; // Clear existing content

    // Create a button for each topic
    topics.forEach(topic => {
        const button = document.createElement('button');
        button.className = 'topic-btn';
        button.textContent = topic;
        button.onclick = () => startQuiz(topic); // Start quiz when clicked
        topicButtonsContainer.appendChild(button);
    });
}

/**
 * Initialize and start a quiz for the selected DevOps topic
 * 
 * @param {string} topic - The DevOps topic selected by the user
 * 
 * Process:
 * 1. Filter all questions to only those matching the selected topic
 * 2. Shuffle questions to randomize order (for variety)
 * 3. Reset quiz state (score, answer index, etc)
 * 4. Switch UI to display the first question
 */
function startQuiz(topic) {
    // Set the current topic
    currentTopic = topic;
    
    // Filter questions to only those in the selected topic
    topicQuestions = quizData.filter(q => q.topic === topic);

    // Validate that questions exist for this topic
    if (topicQuestions.length === 0) {
        alert('No questions available for this topic.');
        return;
    }

    // Randomize question order to improve quiz variety
    // Math.random() - 0.5 creates a random sort comparable
    topicQuestions = topicQuestions.sort(() => Math.random() - 0.5);

    // Reset quiz state variables for fresh quiz
    currentQuestionIndex = 0;  // Start with first question
    score = 0;                 // No correct answers yet
    selectedAnswer = null;     // No answer selected
    isAnswered = false;        // User hasn't submitted yet

    // Display the quiz interface and load first question
    showSection('quizSection');
    displayQuestion();
}

/**
 * Display the current question with all its answer options
 * 
 * Process:
 * 1. Check if quiz is complete (all questions answered)
 * 2. Update progress bar and question counter
 * 3. Display question text
 * 4. Generate and display answer options (shuffled)
 * 5. Allow user to select an answer
 */
function displayQuestion() {
    // Check if all questions have been answered
    if (currentQuestionIndex >= topicQuestions.length) {
        showQuizComplete();
        return;
    }

    // Get the current question object from the filtered list
    const question = topicQuestions[currentQuestionIndex];

    // Update the topic title at top of quiz
    document.getElementById('topicTitle').textContent = currentTopic;
    
    // Display progress: "Question 3 of 8"
    document.getElementById('questionCounter').textContent = 
        `Question ${currentQuestionIndex + 1} of ${topicQuestions.length}`;

    // Update progress bar width based on completion percentage
    const progress = ((currentQuestionIndex) / topicQuestions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';

    // Display the question text
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
