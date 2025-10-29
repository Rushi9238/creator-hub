
# CreatorHub

A full-stack web application for connecting with talented creators, managing profiles, and discovering amazing work from designers, illustrators, photographers, and more.
## Hosted Link
[Hosted Link](https://creator-hub-i82f.onrender.com/)


## 🛠️ Technology Stack

### Frontend
- **React.js** - UI framework
- **React Router DOM** - Client-side routing
- **Redux Toolkit** - State management
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT ** - Authentication

## 📱 Responsive Design
The application is built with a mobile-first approach using Tailwind CSS, ensuring optimal experience across all devices.

## ✨ Features

### Frontend Features
- **Authentication System**: Secure login/signup with JWT
- **Creator Discovery**: Browse and search creators by name, skills, or bio
- **Category Filtering**: Filter creators by design categories
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Featured Creators**: Mark and display featured creators
- **Advanced Search**: Search by name, skill, or bio content
- **User Profiles**: Detailed creator profiles with stats

### Backend
- **Protected Routes**: JWT-based authentication middleware
- **RESTful API**: Clean API endpoints for CRUD operations
- **Data Validation**: Input validation and error handling
- **MongoDB Integration**: Efficient data storage and retrieval
- **Password Hashing**: Secure user credential storage
- **Pagination Support**: Optimized data fetching

## 📁 Project Structure


```bash
creatorhub/
├── package.json                 # Root package.json with build scripts
├── frontend/                    # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Route pages
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Creators.jsx
│   │   │   ├── CreatorProfile.jsx
│   │   │   └── AddCreator.jsx
│   │   ├── store/               # Redux store configuration
│   │   ├── utils/               # Utility functions
│   │   └── App.jsx
│   ├── tailwind.config.js
│   └── package.json
├── src/                         # Backend source code
│   ├── controllers/             # Route controllers
│   │   └── creatorsController.js
│   ├── models/                  # MongoDB models
│   │   └── Creator.js
│   ├── routes/                  # API routes
│   │   └── creators.js
│   ├── middleware/              # Custom middleware
│   │   └── authMiddleware.js
│   ├── config/                  # Database configuration
│   │   └── db.js
│   └── index.ts                 # Entry point
├── dist/                        # Compiled backend code
└── .env                         # Environment variables
```


## 📋 Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)

## ⚙️ Installation & Setup

### Method 1: Development Mode (Frontend & Backend Separate)

1. **Clone the repository**
```bash
git clone <repository-url>
cd creator-hub
````

2. **Setup Backend**
```bash
# Install backend dependencies
npm install

# Start backend server (runs on port 3044)
npm run dev
````

2. **Setup Frontend (in a new terminal)**
```bash
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install

# Start frontend development server (runs on port 5173)
npm run dev
````

## 🚀 Deployment on Render.com
**Prerequisites**

- Render.com account
- GitHub repository connected

### Deployment Steps
**Prepare your repository**

- Ensure all code is pushed to GitHub
- Verify package.json scripts are configured

**Create a new Web Service on Render**

- Connect your GitHub repository
- Use the following settings:

Build Command: ````npm run install-deps && npm run build````
Start Command: ````npm start````
Environment: Node.js

**Environment Variables (in Render dashboard)**
```bash
env
NODE_ENV=production
PORT=10000
CORS_ORIGIN=https://creator-hub-i82f.onrender.com/
````

## 📚 API Endpoints
Auth

- ```POST /api/login``` - Login User

Creator Management

- ```GET /api/creators``` - Fetch all creators
- ```GET /api/creators/:id``` - Fetch single creator
- ```POST /api/creators``` - Create new creator
- ```PUT /api/creators/:id``` - Update creator
- ```DELETE /api/creators/:id``` - Delete creator


## 🔒 Authentication Flow
- Users must login to access protected routes
- JWT tokens are stored in localStorage/HTTP-only cookies
- Protected routes include: Dashboard, Creator Profiles, Add/Edit Creators
- Automatic token refresh mechanism
- Route guards for unauthorized access prevention

## 🔧 Available Scripts
Backend Scripts
``` npm start ``` - Start production server

``` npm run dev ``` - Start development server with nodemon

``` npm run build ``` - Build frontend for production

Frontend Scripts (from frontend directory)
npm run dev - Start Vite development server

npm run build - Build for production

npm run preview - Preview production build

## 🐛 Troubleshooting
Common Issues
Port already in use

Change PORT in .env file or use different ports

CORS errors

Verify CORS_ORIGIN environment variable

Check frontend API calls are using correct URLs

Build failures

Ensure Node.js version is compatible

Check all dependencies are properly installed

Development Tips
Use browser developer tools for debugging

Check server logs for backend errors

Verify API responses in Network tab

## 🤝 Contributing
Fork the repository

Create a feature branch

Commit your changes

Push to the branch

Create a Pull Request

📄 License
This project is licensed under the MIT License.

👨‍💻 Author
Developed as part of WebWorks Co. Assignment
    
