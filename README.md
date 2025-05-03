# 🏥 MEDHUB

[MEDHUB](https://med-hub-hazel.vercel.app) 🔗 is a web application designed to streamline and enhance the management of healthcare facilities. This application provides a centralized platform for managing data related to doctors, room admissions and patients.

---

## 📚 Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Components](#components)
- [Styles](#styles)
- [API Integration](#api-integration)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js >= 16.x
- npm >= 8.x
- MongoDB instance (cloud)

### 📥 Installation

```bash
# Clone the repository
git clone https://github.com/Brayzonn/Hospital-Management-Web-App.git
cd Hospital-Management-Web-App

# Install server dependencies
cd server
npm install

# Install client dependencies
cd /client
npm install

# In one terminal, run the server
cd server
npm run dev

# In another terminal, run the client
cd client
npm run dev

```

### 🗂 Project Structure

The project is divided into two main folders:

- `client/` – The frontend built with React, Vite, and TypeScript.
- `server/` – The backend powered by Node.js, Express, and MongoDB.

```bash
Hospital-Management-Web-App/
├── README.md
├── client
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   ├── src
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vercel.json
│   └── vite.config.ts
└── server
    ├── src
    ├── .env
    ├── nodemon.json
    ├── package-lock.json
    ├── package.json
    └── tsconfig.json  

```     

## 🛠️ Technologies Used

- **Frontend**: React, Typescript, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js, Typescript
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **File Uploads**: Cloudinary
- **Deployment**: Brimble (backend), Vercel (frontend)


## 🗂 Folder Structure

client/
├── public/ # Static assets (vite svg)
├── src/
│ ├── components/ # Reusable UI components
│ ├── context/ # React context providers 
│ ├── images/ # static images
│ ├── pages/ # Route-based page components
│ ├── routes/ # React Router route definitions
│ ├── style/ # tailwind css config
│ ├── types/ # TypeScript type definitions
│ ├── utils/ # Helper functions 
│ └── App.tsx             # Root React component 
│ └── main.tsx            # Entry point for the React app
│ └── vite-env.d.ts       # Type declarations specific to Vite 
├── .env                  # Environment variables
├── .eslintrc.cjs         # ESLint configuration for linting rules
├── index.html            # HTML entry point for the app 
├── package-lock.json     # Auto-generated dependency tree lock file for reproducible installs
├── package.json          # Project metadata, dependencies, and scripts
├── tsconfig.json         # Main TypeScript configuration for the client app
├── tsconfig.node.json    # TypeScript config for Node-related tooling 
├── vercel.json           # Vercel deployment configuration 
└── vite.config.ts        # Vite bundler configuration 

server/
├── src/
│   ├── config/           # Configuration files 
│   ├── controllers/      # Express route handlers 
│   ├── middleware/       # Custom Express middleware 
│   ├── models/           # Mongoose schema and model definitions
│   ├── routes/           # Express route definitions and grouping
│   ├── utils/            # Utility functions 
│   ├── app.ts            # Sets up Express app
├── .env                  # Server-side environment variables 
├── nodemon.json          # Nodemon config for auto-restarting the server during development
├── package-lock.json     # Lockfile for consistent installs across environments
├── package.json          # Project metadata, dependencies, and scripts for the backend
└── tsconfig.json         # TypeScript configuration for the server



