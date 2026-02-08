# DevOps Quiz Application

A simple static web application for testing DevOps knowledge across multiple topics.

## Overview

This project is a collaborative effort between two developers to create a DevOps Quiz Application using Git and GitHub for version control. The application demonstrates incremental development, branching strategies, collaborative code review, and conflict resolution.

## Features

- **Topic Selection**: Users can choose from multiple DevOps topics
- **Interactive Questions**: One question displayed at a time with multiple choice answers
- **Immediate Feedback**: Instant feedback on answer selection with explanations
- **Progress Tracking**: Visual progress bar showing quiz completion
- **Score Calculation**: Final score and performance-based messages
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling and responsive layout with gradient backgrounds
- **Vanilla JavaScript**: Quiz logic, data management, and DOM manipulation
- **JSON**: Quiz question data storage

## Project Structure

```
devops-quiz-app/
├── index.html           # Main application HTML
├── styles.css          # Application styling
├── app.js              # Quiz logic and functionality
├── data/
│   └── questions.json  # DevOps Quiz Questions
└── README.md           # Project documentation
```

## Question Bank Format

The `questions.json` file contains quiz questions in the following structure:

```json
{
  "id": "Q1",
  "topic": "Topic Name",
  "question": "What is the question?",
  "options": [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4"
  ],
  "answerIndex": 1,
  "explanation": "Explanation of the correct answer."
}
```

### Field Descriptions:
- **id**: Unique identifier for the question (e.g., "Q1", "Q2")
- **topic**: The DevOps topic this question covers
- **question**: The question text
- **options**: Array of four answer options
- **answerIndex**: 0-based index of the correct answer (0-3)
- **explanation**: Educational explanation for the correct answer

## DevOps Topics Covered

The question bank includes questions across the following DevOps topics:

1. **The DevOps Culture**: Collaboration, continuous improvement, and blameless post-mortems
2. **Version Control Systems**: Git, branching, commits, and pull requests
3. **Continuous Integration**: Automated building and testing
4. **Continuous Delivery**: Preparing for automated production deployment
5. **Continuous Deployment**: Automatic production releases
6. **Infrastructure as Code**: Managing infrastructure through code

## Quiz Features

### Interactive Elements:
- Topic selection from available categories
- Option selection with visual feedback
- Submit answer button
- Progress tracking
- Score calculation

### User Feedback:
- **Correct Answer**: Green feedback box with correct indicator
- **Incorrect Answer**: Red feedback box showing correct answer
- **Explanation**: Educational explanation for every question
- **Final Score**: Summary with performance-based congratulatory message

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or backend required

### Installation

1. Clone the repository:
```bash
git clone https://github.com/<username>/devops-quiz-app.git
cd devops-quiz-app
```

2. Open the application:
```bash
# Simply open index.html in your browser
open index.html
# or
start index.html
```

## How to Use

1. **Start the Quiz**: Open `index.html` in a web browser
2. **Select a Topic**: Click on a DevOps topic to start the quiz
3. **Answer Questions**: Select an answer from the provided options
4. **Submit Answer**: Click "Submit Answer" to check your response
5. **Review Feedback**: Read the explanation for the answer
6. **Continue**: Click "Next Question" to proceed to the next question
7. **Complete Quiz**: After all questions, view your final score
8. **Start Over**: Begin a new quiz at any time

## Development Workflow

This project demonstrates collaborative Git workflow:

### Student A - Question Bank Owner
- Created and maintained `data/questions.json`
- Ensured question quality and consistency
- Made incremental commits with clear messages
- Opened Pull Request for partner review

### Student B - UI and Quiz Logic Owner
- Implemented HTML, CSS, and JavaScript
- Created quiz interaction logic
- Integrated the question database
- Reviewed and merged A's pull request

### Collaboration Practices
- Feature branches for independent work
- Pull Requests for code review
- Merge conflict resolution
- Incremental commits showing progression

## Git Workflow

### Branches Used:
- `main`: Production-ready application
- `feature/question-bank`: Question database development
- `feature/quiz-ui`: User interface and quiz logic development

### Pull Requests:
Each feature branch was reviewed and merged through a Pull Request process ensuring:
- Code quality
- Incremental development
- Documentation updates
- Conflict resolution

## Questions

For issues, questions, or improvements, please open an issue in the GitHub repository.

## License

This project is created for educational purposes.

## Contributors

- Student A: Question Bank Owner
- Student B: UI and Quiz Logic Owner
