# MERN Stack Recipe Application

## **Overview**
 - Recipeze is a full-stack recipe application built using the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to explore, share, and manage recipes.
---

## **Tech Stack**

- **Frontend**: 
  - React (with Ionic for UI components)
  - TailwindCSS for styling
  - Vite for fast development and bundling
- **Backend**: 
  - Node.js with Express.js
- **Database**: 
  - MongoDB
- **Authentication**: 
  - JWT (JSON Web Tokens)
- **API Structure**: 
  - RESTful APIs
---

## Folder Structure

### Backend
```
backend/
├── src/
│   ├── config/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── validation.js
├── .env
├── app.js
└── package.json
```

### Frontend
```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   └── App.jsx
├── .env
├── index.html
└── package.json
```

## **Installation & Setup**

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Steps to Run the Project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/priyanshu-Maxah/Recipeze.git
   cd Recipeze
2. **Install dependencies**:
	* Backend: `cd backend` and `npm install`
	* Frontend: `cd ../frontend` and `npm install`
3. Create a `.env` file in both the backend and frontend directories and configure the necessary environment variables. The following variables are required:
	* **PORT**: The port number for the backend server (e.g. `PORT=7777`)
	* **connectionString**: The MongoDB connection string (e.g. `connectionString=mongodb://localhost:27017/`)
	* **secretJWT**: The secret key for JWT authentication (e.g. `secretJWT=your_secret_key_here`)
	* Example `.env` file contents:
```
PORT=7777
connectionString=mongodb://localhost:27017/
secretJWT=your_secret_key_here
```
4. Run the project:
	* Backend: `cd backend` and `npm start`
	* Frontend: `cd ../frontend` and `npm run dev`   

## **Features**

- **User Authentication**: Secure user registration and login using JWT.
- **Recipe Management**:
  - Create, read, update, and delete recipes.
  - View detailed recipe information.
- **Responsive UI**: Modern and mobile-friendly design powered by TailwindCSS and Ionic.
- **Fast Development**: Optimized build setup using Vite.
---

**Project Built By**

* Priyanshu Chauhan
