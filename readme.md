**MERN Stack Recipe Application**

**Overview**
Recipeze is a full-stack recipe application built using the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to explore, share, and manage recipes.

**Tech Stack**

* Frontend: Ionic + React, TailwindCSS, Vite
* Backend: Node.js, Express.js
* Database: MongoDB
* Authentication: JWT (JSON Web Tokens)
* API Structure: RESTful

**Folder Structure**

* Backend:
	+ `config/`
	+ `middlewares/`
	+ `models/`
	+ `routes/`
	+ `utils/`
	+ `validation.js`
	+ `.env`
	+ `app.js`
* Frontend:
	+ `public/`
	+ `src/`
		- `assets/`
		- `components/`
		- `pages/`
		- `App.jsx`
		- `main.js`
		- `index.css`

**Installation & Setup**

1. Clone the repository: `git clone https://github.com/priyanshu-Maxah/Recipeze.git`
2. Install dependencies:
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


**Features**

* User authentication and authorization (JWT)
* Create, read, update, and delete recipes
* Responsive and modern UI built with TailwindCSS
* Fast development setup with Vite

**Project Built By**

* Priyanshu Chauhan
