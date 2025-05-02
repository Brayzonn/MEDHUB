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
- MongoDB instance (local or cloud)

### 📥 Installation

```bash
# Clone the repository
git clone https://github.com/Brayzonn/Hospital-Management-Web-App.git
cd Hospital-Management-Web-App

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# In one terminal, run the server
cd server
npm run dev

# In another terminal, run the client
cd client
npm run dev


## 🗂 Project Structure

The project is divided into two main folders:

- `client/` – The frontend built with React, Vite, and TypeScript.
- `server/` – The backend powered by Node.js, Express, and MongoDB.

Below is the high-level folder structure:

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
    ├── nodemon.json
    ├── package-lock.json
    ├── package.json
    ├── public
    ├── src
    ├── test
    └── tsconfig.json              

