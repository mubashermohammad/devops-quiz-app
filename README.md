# DevOps Quiz Application

A simple static web application for testing DevOps knowledge across multiple topics. Built as a collaborative project demonstrating Git workflows and incremental development practices.

## Overview

This project is a collaborative effort between two developers using Git and GitHub to demonstrate:
- Distributed Version Control System (DVCS) workflows
- Feature branching and pull request reviews
- Incremental and iterative development
- Merge conflict resolution
- Professional collaboration practices

The application itself is a **static web app** (no backend required) that tests users' knowledge of DevOps concepts through an interactive quiz with immediate feedback.

## Features

- Topic Selection Interface
- 24 Question Database
- Real-Time Feedback System
- Score Calculation
- Progress Tracking
- Mobile Responsive Design
- Zero Backend Requirements

### User Interface
- Topic selection with intuitive button layout
- Interactive quiz display with one question at a time
- Real-time answer feedback and explanations
- Progress tracking with visual progress bar

## Technology Stack

- **HTML5**: Semantic markup and structure for accessibility
- **CSS3**: Modern styling with gradient effects, flexbox, and grid layouts
- **Vanilla JavaScript**: Pure JavaScript (no frameworks) for quiz logic and DOM manipulation
- **JSON**: Human-readable data format for quiz questions

*Note: No frameworks, libraries, databases, or backend services are used - this is intentionally a simple static web application.*

## Project Structure

```
devops-quiz-app/
├── index.html              # Main HTML interface with all sections
├── styles.css              # Complete CSS styling and responsive layout
├── app.js                  # Quiz logic: loading, validation, scoring
├── data/
│   └── questions.json      # Question database (24 DevOps questions)
└── README.md               # This documentation file
```

## Question Bank Format

The `questions.json` file contains all quiz questions in a standardized JSON format. Each question follows this structure:

```json
{
  "id": "Q1",
  "topic": "The DevOps Culture",
  "question": "What is the primary goal of DevOps?",
  "options": [
    "To replace developers with operations staff",
    "To create a culture of collaboration between development and operations teams",
    "To eliminate the need for testing",
    "To automate all manual processes without planning"
  ],
  "answerIndex": 1,
  "explanation": "DevOps promotes collaboration and integration between development and operations teams to deliver software faster and more reliably."
}
```

### Field Descriptions:

- **id**: Unique identifier for the question (format: Q1, Q2, etc.). Used for tracking
- **topic**: The DevOps topic this question addresses (must match one of the main topic areas)
- **question**: The question text displayed to the user
- **options**: Array of exactly 4 answer options (0-3 index)
- **answerIndex**: 0-based index (0-3) pointing to the correct answer in the options array
  - Example: If the correct answer is the 2nd option, use answerIndex: 1
  - Example: If the correct answer is the 4th option, use answerIndex: 3
- **explanation**: Educational explanation of why the answer is correct (appears after user submits)

### Important Validation Rules:

✓ Each question must have exactly 4 options
✓ answerIndex must be 0, 1, 2, or 3
✓ Topics must match the available DevOps topics
✓ Questions and explanations should be clear and educational
✓ JSON must be valid (use JSONLint.com to validate if needed)

## DevOps Topics Covered

The question bank includes questions spanning these DevOps topics (6 total, minimum requirement was 4):

1. **The DevOps Culture** - Collaboration, continuous improvement, shared responsibility, blameless post-mortems
2. **Version Control Systems** - Git, branching, commits, pull requests, distributed version control
3. **Continuous Integration** - Automated building, testing, early issue detection
4. **Continuous Delivery** - Automated deployment preparation, manual release approval
5. **Continuous Deployment** - Automatic production releases, canary deployments
6. **Infrastructure as Code** - Managing infrastructure through code, Terraform, reproducibility

### Question Count by Topic:

- The DevOps Culture: 4 questions
- Version Control Systems: 5 questions
- Continuous Integration: 4 questions
- Continuous Delivery: 3 questions
- Continuous Deployment: 2 questions
- Infrastructure as Code: 3 questions
- **Total: 24 questions** (exceeds minimum of 20)

## Application Features & User Flow

### 1. Topic Selection (Start Screen)
- User sees all available DevOps topics as clickable buttons
- Topics are automatically extracted from the question data
- User clicks a topic to begin the quiz

### 2. Quiz Interaction
- **Single Question Display**: One question shown at a time for focus
- **Multiple Choice Options**: 4 options per question, user selects one
- **Progress Indication**: 
  - Visual progress bar updates as user progresses
  - Question counter shows "Question 3 of 8" format
- **Answer Submission**: Submit button checks the answer

### 3. Feedback Display
- **Correct Answer**: Green feedback box with checkmark
- **Incorrect Answer**: Red feedback box with incorrect indicator and correct answer shown
- **Explanation**: Educational explanation provided regardless of correctness
- **Answer Verification**: User can see their answer vs correct answer

### 4. Score Summary
- Shows total score (e.g., "7 out of 8 correct")
- Shows percentage score (e.g., "87.5%")
- Displays performance-based message:
  - 100%: "Outstanding! You are a DevOps expert!"
  - 80-99%: "Great job! You have strong DevOps knowledge!"
  - 60-79%: "Good effort! Keep learning more about DevOps."
  - Below 60%: "Keep practicing! Review the DevOps concepts."

### 5. Quiz Restart
- User can click "Start Over" to begin a new quiz
- All questions and options are reshuffled for variety
- Previous scores are not accumulated

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server, backend, or framework installation required
- No database or external services needed

### Installation & Running

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/mubashermohammad/devops-quiz-app.git
   cd devops-quiz-app
   ```

2. **Open the application**
   ```bash
   # Simply open index.html in your web browser
   # Windows: start index.html
   # MacOS: open index.html
   # Or drag index.html onto your browser window
   ```

3. **Verify it works**
   - Application loads in browser
   - Topics display correctly
   - Can select a topic and see questions
   - Can answer and get feedback

## How to Use the Quiz

### Quick Start
1. Open `index.html` in any web browser
2. Click on a DevOps topic to start
3. Read the question and select an answer
4. Click "Submit Answer"
5. Review the feedback and explanation
6. Click "Next Question" to continue
7. After all questions, view your final score
8. Click "Start Over" to take another quiz

### Tips for Best Experience
- **Read explanations carefully** - This is the learning opportunity
- **Try different topics** - Each topic has different questions
- **Retake quizzes** - Questions appear in random order, so each quiz is unique
- **Take notes** - Write down concepts you need to study more

## Development Workflow

This project demonstrates professional Git and collaborative development practices:

### Role Division
- **Student A (Question Bank Owner)**: 
  - Owns and maintains `data/questions.json`
  - Ensures question quality and consistency
  - Documents question format
  - Makes feature/question-bank branch

- **Student B (UI & Logic Owner)**:
  - Implements HTML interface
  - Develops quiz logic in JavaScript
  - Styles with CSS
  - Makes feature/quiz-ui branch

### Git Workflow Features Demonstrated
1. **Feature Branches**: Isolated development branches for each feature
2. **Incremental Commits**: Small, meaningful commits with clear messages
3. **Pull Requests**: Code review process before merging
4. **Merge Conflicts**: Intentional conflict creation and resolution
5. **Collaborative Development**: Both students actively participate

### Branch Structure
- `main`: Production-ready, stable code
- `feature/question-bank`: Student A's question database development
- `feature/quiz-ui`: Student B's interface and logic development

## Files and Their Purposes

| File | Size | Purpose | Owner |
|------|------|---------|-------|
| index.html | ~3KB | Page structure with 4 main sections | Student B |
| styles.css | ~10KB | All styling, responsive design, animations | Student B |
| app.js | ~12KB | Quiz logic, state management, event handlers | Student B |
| questions.json | ~15KB | Quiz question database | Student A |
| README.md | ~8KB | Project documentation and specifications | Both |

## Common Questions & Troubleshooting

### Q: The quiz won't load. What's wrong?
**A:** Check that your file structure is correct:
- `index.html` must be in the root folder
- `data/questions.json` must exist in a `data/` subfolder
- `app.js` and `styles.css` must be in the root folder

### Q: No questions appear. Why?
**A:** The browser might be blocking local file access. Solutions:
- Use a simple server: `python -m http.server 8000` (Python 3)
- Use VS Code Live Server extension
- Upload to a web host and access via HTTPS

### Q: My question won't load in the quiz
**A:** Validate your JSON:
- Use [JSONLint.com](https://jsonlint.com) to check syntax
- Ensure answerIndex is between 0-3
- Ensure you have exactly 4 options per question
- Check that topic name matches exactly

### Q: Can I add more questions?
**A:** Yes! Edit `data/questions.json`:
1. Open the file in a text editor
2. Add new question objects following the format
3. Ensure JSON remains valid
4. Refresh the browser to see new questions

### Q: Why no backend?
**A:** This assignment intentionally uses only static HTML/CSS/JavaScript to focus on:
- Frontend fundamentals
- Client-side logic
- Git and version control workflows
- Not on backend complexity

## Assessment Criteria

This assignment is evaluated on:

1. **Incremental Development** (3 points)
   - Multiple commits showing progression
   - Clear, meaningful commit messages
   - Evidence of iterative improvement

2. **Collaboration & Branching** (3 points)
   - Feature branches used correctly
   - Pull requests created and reviewed
   - Merge conflicts handled properly

3. **Functional Application** (2 points)
   - 20+ questions available (have 24 ✓)
   - 4+ topics covered (have 6 ✓)
   - All features working correctly

4. **Documentation** (2 points)
   - Complete README with specifications
   - Clear question format documentation
   - Proper Git history and commit messages

## References & Learning Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [DevOps 101](https://www.ibm.com/topics/devops)
- [Continuous Integration Explained](https://martinfowler.com/articles/continuousIntegration.html)

## Contributors

- **Student A**: Question Bank Owner
  - Designed question structure
  - Created and validated DevOps questions
  - Ensured data quality and consistency

- **Student B**: UI and Logic Owner
  - Implemented user interface
  - Developed quiz interaction logic
  - Applied responsive design

## License

This project is created for educational purposes at [Your Institution].

## Acknowledgments

- Questions created with educational accuracy in mind
- Design inspired by modern quiz applications
- Built to demonstrate DevOps and Git collaboration practices
