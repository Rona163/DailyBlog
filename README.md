# DailyBlog

A full-stack blogging application that allows users to create, manage, and interact with blog posts. I built this project to gain hands-on experience with modern web technologies and to understand how frontend applications, backend services, authentication systems, and databases work and integrated together.

## Features

* Secure user authentication using JWT
* Role-based access control with Admin and User roles
* Create, edit, and delete blog posts
* Like and comment on blog posts
* Personalized profile page displaying respective user's posts
* Dashboard for browsing and interacting with posts
* Administrative controls for monitoring content

## Tech Stack

### Frontend

* React

### Backend

* Node.js
* Express.js
* REST APIs
* JSON Web Tokens (JWT)

### Database

* MongoDB

### Tools

* Git
* Docker
* GitHub Actions
## Screenshots
Home page 

<img width="1617" height="841" alt="image" src="https://github.com/user-attachments/assets/c2bb8534-4578-4d2e-bdc2-9d0a90c9d1af" />

Dashboard

<img width="1622" height="842" alt="image" src="https://github.com/user-attachments/assets/eb39a951-5c0c-4e4b-9399-ddecf169b87c" />

Like and Comment post

<img width="1616" height="832" alt="image" src="https://github.com/user-attachments/assets/e6f39c9a-adea-44d9-a5da-8fbdfa05ba56" />

Create Post

<img width="1620" height="830" alt="image" src="https://github.com/user-attachments/assets/4f593933-b5d5-42a5-b390-f2363d6f5529" />

Profile Page

<img width="1632" height="812" alt="image" src="https://github.com/user-attachments/assets/4880b310-746b-437d-a63f-d9546e58d286" />
  
## Installation

### Prerequisites

Install the following:

* Node.js (v18 or later)
* MongoDB
* Git
* Docker (optional)

### Clone the Repository

```bash
git clone https://github.com/Rona163/DailyBlog.git
cd DailyBlog
```

### Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the backend directory and add the following variables:

```env
PORT=8000
URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173

MONGO_URI=mongodb://mongodb:27017/dailyblog

JWT_SECRET=your_jwt_secret
REFRESH_SECRET=your_refresh_secret

ADMIN_USER=admin
ADMIN_EMAILID=admin@example.com
ADMIN_PASSWORD=your_admin_password
```
After starting MongoDB, create the administrator account:

```bash
npm run create-admin
```
Start the backend server:

```bash
npm run dev
```

### Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

### Access the Application

Frontend:

```text
http://localhost:5173
```

Backend API:

```text
http://localhost:8000
```

## Running with Docker

Build and start the application:

```bash
docker compose up --build -d
```

Stop the containers:

```bash
docker compose down
```

## Future Improvements
* Image upload support
* Search and filtering functionality
* Email verification and password reset
* Real-time notifications for comments and likes
