# SignEduAI: Sign Language Translation Application

## Overview
The project is the practical part of the paper named: "SignEduAI: AN EDUCATIONAL MOBILE APPLICATION FOR SIGN LANGUAGE AND INTERPRETATION USING HAND POSE RECOGNITION". This project aims to develop a sign language translation application that uses the HandLandmarkNet model to recognize hand gestures and convert them into text and speech. The application also includes educational tools to help users learn sign language. The code for this project is available on GitHub: [https://github.com/biancadiaconu0120/BachelorThesis](https://github.com/biancadiaconu0120/BachelorThesis).

## Features

- **Sign Language Interpretation**:
  - Record sign language videos.
  - Gesture recognition.
  - Convert recognized gestures into text.
  - Convert text into speech for enhanced communication.

- **User Authentication**:
  - Register new users.
  - Login and manage user profiles.
  - View blog and logout functionalities.

- **Learning Tools**:
  - Learn ASL alphabet.
  - Learn common ASL words.
  - Take quizzes to test knowledge.

## Installation

### Prerequisites

- **Node.js and npm**: Node.js (version 14.x or later), npm (version 6.x or later)
- **Python**: Python 3.9 or later
- **MongoDB**: MongoDB 4.4 or later
- **Expo CLI**: Expo CLI 0.7.3 or later
- **FastAPI**: FastAPI 0.108 or later
- **Conda**: Anaconda or Miniconda (latest version)

### Prerequisite Installation

1. **Install Node.js and npm**:
    - Download and install from [Node.js official website](https://nodejs.org/).

2. **Install MongoDB**:
    - Download and install from [MongoDB official website](https://www.mongodb.com/try/download/community).

3. **Install Conda**:
    - Download and install from [Conda official website](https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html).

4. **Install Expo CLI**:
    ```sh
    npm install -g expo-cli@latest
    ```

### Project Setup

1. **Clone the repository**:
    ```sh
    git clone https://github.com/biancadiaconu0120/BachelorThesis.git
    cd BachelorThesis
    ```

### Backend Setup

1. Navigate to the backend directory:
    ```sh
    cd backend
    ```

2. Create and activate a Conda environment:
    ```sh
    conda create --name sign-language-translation python=3.8
    conda activate sign-language-translation
    ```

3. Install dependencies:
    ```sh
    pip install -r requirements.txt
    ```

4. Start MongoDB server:
    ```sh
    mongod
    ```

5. Run the FastAPI server:
    ```sh
    uvicorn main:app --reload
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```sh
    cd ../frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the Expo server:
    ```sh
    npm start
    ```

## Usage

To use the application, both the backend and frontend servers must be running:

1. Ensure the FastAPI backend server is running:
    ```sh
    uvicorn main:app --reload
    ```

2. Ensure the Expo frontend server is running:
    ```sh
    npm start
    ```

3. Launch the app on your mobile device using Expo Go.
4. Register a new user or login with existing credentials.
5. Navigate through the app to:
    - **Interpret**: Record and translate sign language gestures.
    - **Learn**: Access educational resources to learn ASL.
    - **Profile**: Manage your profile and view blog posts.

## Project Structure


```
sign-language-translation/
├── backend/
│ ├── api/
│ ├── asl_model/
│ ├── dal/
│ ├── dto/
│ ├── models/
│ ├── services/
│ ├── tests/
│ ├── utils/
│ ├── main.py
│ └── requirements.txt
├── frontend/
│ ├── assets/
│ ├── components/
│ ├── screens/
│ ├── App.js
│ └── package.json
└── README.md
```
## Future Work

- Achieving 100% accuracy for the single-hand model.
- Adapting the model to recognize dynamic words.
- Expanding the application to support Romanian Sign Language.
- Enhancing the reliability of hand pose estimation.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Special thanks to all the testers and users for their valuable feedback.
