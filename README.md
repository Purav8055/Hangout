# Hangout

Hangout is a real-time chat application developed using the MERN stack. The application allows users to register, log in, select an avatar, and communicate with other registered users in real-time. It provides a seamless chatting experience with support for emojis.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Goals](#goals)
3. [Specifications](#specifications)
4. [Design](#design)
5. [Installation](#installation)
6. [Usage](#usage)
7. [Features](#features)
8. [Dependencies](#dependencies)

---

## Introduction

Hangout is a modern chat application designed to provide a seamless user experience. Built using the MERN stack, it incorporates real-time communication capabilities with support for avatars and emojis. 

Key highlights of the project include:
- Real-time messaging with instant delivery.
- User registration and secure authentication with password hashing.
- Avatar customization using the Multiavatar API.
- Deployed on scalable AWS infrastructure for reliability.

---

## Goals

- Create a user-friendly platform for real-time communication.
- Leverage modern web technologies like React.js and Node.js.
- Provide secure and scalable backend and frontend architectures.
- Explore advanced features like avatars and emoji support for better user engagement.

---

## Specifications

- **Frontend**: React.js for user interaction and interface.
- **Backend**: Node.js with Express.js for server-side logic and MongoDB for database management.
- **Real-Time Communication**: Implemented using Socket.IO.
- **Deployment**: Hosted on AWS Elastic Beanstalk (backend) and AWS Amplify (frontend).

---

## Design

### Architecture
Hangout follows a three-tier architecture:
1. **Frontend**: React.js application, handling user interaction and navigation.
2. **Backend**: Node.js server with Express.js, handling API requests and business logic.
3. **Database**: MongoDB stores user and message data.

### Project Structure

#### Backend
```plaintext
server/ 
├── controllers/ 
│   ├── messageController.js 
│   └── userController.js 
├── models/ 
│   ├── messageModel.js 
│   └── userModel.js 
├── routes/ 
│   ├── auth.js 
│   └── messages.js 
├── .env 
└── index.js 
```

#### Frontend
```plaintext
public/ 
├── src/ 
│   ├── assets/ 
│   ├── components/ 
│   ├── pages/ 
│   ├── utils/ 
│   ├── App.js 
│   ├── index.css 
│   └── index.js 
├── .env
```
### Routing
- `/register`: User registration page.
- `/login`: User login page.
- `/setAvatar`: Avatar selection page.
- `/`: Chat interface page.

---

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Purav8055/Hangout.git
2. Navigate to the backend directory and install dependencies:
    ```bash
    cd Hangout/server
    npm install
3. Navigate to the frontend directory and install dependencies:
    ```bash
    cd ../public
    npm install
---
## Usage
To run the project during development:

### Terminal 1: Frontend
```bash
cd public
npm run dev
```
### Terminal 2: Backend
```bash
cd server
node index.js
```

## Features

- **User Authentication**: Secure registration and login with password hashing using bcrypt.
- **Avatar Selection**: Users can choose an avatar using the Multiavatar API.
- **Real-Time Messaging**: Instant delivery of messages between users powered by Socket.IO.
- **Emoji Support**: Enhance chat experience with emoji functionality.

---

## Dependencies

### Frontend
- **React.js**: For building the user interface.
- **Styled Components**: For component-level styling.
- **React Router DOM**: For managing routes in the application.
- **Socket.IO Client**: For real-time communication.

### Backend
- **Node.js**: For server-side development.
- **Express.js**: For creating the REST API.
- **MongoDB**: For storing user and message data.
- **bcrypt**: For secure password hashing.
- **dotenv**: For managing environment variables.

---