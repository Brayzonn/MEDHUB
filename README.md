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
cd client
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

```bash
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

``` 


## 🧱 Components

### 🧩 Input Form Components

This module exports two reusable and dynamic input form components used throughout the application:

- **`DoctorInputForm`**  
  A generic form component tailored for doctor data input. It takes in configuration via `InputFormData` and renders appropriate form fields with built-in support for change handlers and pre-filled values.

- **`PatientInputForm`**  
  A more flexible, generic version using TypeScript generics (`<T>`) to handle various patient data structures. It supports both input fields and textareas dynamically based on the configuration object.

Both components rely on shared type definitions from the `types/DataTypes` file to enforce strong typing and maintain consistency across forms.

#### ✅ Highlights
- Uses `InputFormData[]` to dynamically render fields  
- Strong TypeScript interfaces for type safety  
- Built-in support for pre-populated values and `onChange` callbacks  
- Shared and extendable form structure with flexible styling



### ⚠️ ConfirmationDialog Component

The `ConfirmationDialog` component is a reusable modal used to prompt users before performing a critical or irreversible action (e.g. delete).

#### 📦 Props
```ts
interface ConfirmationDialogProps {
  isOpen: boolean;       // Controls visibility of the dialog
  title: string;         // Header text
  message: string;       // Main body content/message
  onConfirm: () => void; // Called when user confirms the action
  onCancel: () => void;  // Called when user cancels the action
}
```

### 🔽 DropDown Components

Reusable dropdown UI components tailored for dynamic form handling in both doctor and patient registration forms.

---

#### 📘 DoctorDropDownList

`DoctorDropDownList` is a customizable dropdown list component for doctor form fields.

**Props:**

```ts
interface dropdownContainer {
  buttonName: string;      // The label to display on the dropdown button
  buttonId: string;        // The form field key to update
  listOptions: string[];   // Dropdown list items
}

interface DoctordropDownProps {
  allDropDownContainer: dropdownContainer[];             // Array of dropdown configs
  doctorInitialValues?: AddDoctorFormInterface;          // Default values for the form
  setSubmitFormDropdown: React.Dispatch<...>;            // State setter for parent form data
}
```

### 📗 PatientDropDownList

`PatientDropDownList` is a reusable dropdown component designed for use in patient form interfaces. It dynamically renders a list of dropdowns based on configuration, making it easy to manage multiple form fields with selection options.

---

#### 🧩 Props

```ts
interface dropdownContainer {
  buttonName: string;      // Display label for the dropdown button
  buttonId: string;        // Key to update in form state
  listOptions: string[];   // Available options for the dropdown
}

interface dropDownPropsPatient {
  allPatientDropDownContainer: dropdownContainer[];              // Dropdown configurations
  patientInitialValues?: AddPatientFormInterface;                // Initial form values (optional)
  setPatientSubmitFormDropdown: React.Dispatch<...>;             // Form state update function
}

```

## 🖌️ Styles

This project uses **Tailwind CSS** for styling, enhanced with custom configurations and global styles.


## 📡 API Integration

This project integrates with the following APIs:

- **Backend API**: The frontend communicates with a **Node.js** and **Express** backend using RESTful API endpoints. All HTTP requests are handled via **Axios**, and responses are returned in **JSON** format. The backend interacts with a **MongoDB Cloud** database for data storage and retrieval.


### 🔑 Authentication

- **JWT Authentication**: Protected API routes(/user) require a `Bearer` token in the `Authorization` header. Tokens are stored as `userToken` in `sessionStorage`.

---

### 🧭 API Routes

## 👤 User Authentication

### 🔐 POST `/api/signup`  
Registers a new user.

**Body:**
```json
{
  "fullName": "John Doe",
  "email": "johndoe@example.com",
  "password": "StrongPassw0rd"
}
```

**Validation Rules:**
- All fields are required.
- Email must be valid.
- Password must:
  - Be 6–20 characters.
  - Include an uppercase letter.
  - Include a lowercase letter.
  - Include a digit.
  - Include a special character (e.g., `@#$%!&*?`).

**Success Response:**
```json
{
  "payload": "User Registered Successfully"
}
```

**Possible Error Responses:**
```json
{ "payload": "Please enter all fields" }
{ "payload": "Invalid email pattern" }
{ "payload": "Password should contain at least 6 characters. An uppercase letter, lowercase letter, number, and a special character." }
{ "payload": "User with this email already exists." }
```

---

### 🔓 POST `/api/signin`  
Logs in a registered user.

**Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "password"
}
```

**Response:**
```json
{
  "payload": "Sucess/error text",
  "token": "JWT_TOKEN"
}
```
---

### 🔑 POST `/api/google/signin`  
Signs in via Google OAuth. Automatically registers user if new.

**Body:**
```json
{
  "email": "johndoe@example.com",
  "fullName": "John Doe"
}
```

**Response:**
```json
{
  "payload": "Sign in successful",
  "token": "JWT_TOKEN"
}
```

#### 🖥️  Dashboard

- **GET `/api/user/getdashboarddata`**  
  Fetches the list of doctors.  
  **Response:**
  ```bash
  [
    {
      "doctorCount": '',
      "patientCount": '',
      "admissionsCount": ''
    }
  ]
  ```

#### 🩺 Doctors

- **GET `/api/user/getalldoctors`**  
  Fetches the list of doctors.  
  **Response:**
  ```bash
  [
     DoctorProps (DataTypes.tsx)
  ]
  ```

- **POST `/api/user/addnewdoctor`**  
  Creates a new doctor.  
  **Body:**
  ```bash
  multipart/form-data{
    doctorImage : File
    AddDoctorFormInterface
  }
  ```
  **Response:**
  ```bash
  {
    payload: "success/error text"
  }
  ```

  - **POST `/api/user/updatedoctorprofile`**  
  Updates doctor profile.  
  **Body:**
  ```bash
  multipart/form-data{
    doctorImage : File
    AddDoctorFormInterface
  }
  ```
  **Response:**
  ```bash
  {
    payload: "success/error text"
  }
  ```

  - **DELETE `/api/user/deletedoctor`**  
  Deletes doctor profile.  
  **Body:**
  ```bash
  {
    doctorID: 'doctorID'
  }
  ```
  **Response:**
  ```bash
  {
    payload: "success/error text"
  }
  ```

#### 🧑‍⚕️ Patients

- **GET `/api/user/getallpatients`**  
  Fetches a list of patients.  
  **Response:**
  ```bash
  [
    PatientProps (DataTypes.tsx)
  ]
  ```

- **POST `/api/user/addnewpatient`**  
  Adds a patient profile.  
  **Body:**
  ```bash
  multipart/form-data{
    patientImage : File
    AddPatientFormInterface
  }
  ```
  **Response:**
  ```bash
  {
    payload: "success/error text"
  }
  ```

  - **POST `/api/user/updatepatientprofile`**   
  Updates a patient profile.  
  **Body:**
  ```bash
  multipart/form-data{
    patientImage : File
    AddPatientFormInterface
  }
  ```
  **Response:**
  ```bash
  {
    payload: "success/error text"
  }
  ```

  - **DELETE `/api/user/deletepatient`**  
  Deletes patient profile.  
  **Body:**
  ```bash
  {
    patientID: 'patientID'
  }
  ```
  **Response:**
  ```bash
  {
    payload: "success/error text"
  }
  ```

  - **POST `/api/user/createpatientnotes`**   
  Creates a patient note.  
  **Body:**
  ```bash
  {
    patientID : 'patientID'
    PatientNotesProps
  }
  ```
  **Response:**
  ```bash
  {
    payload: "success/error text"
  }
  ```

  - **POST `/api/user/updatepatientnotes`**   
  Updates a patient note.  
  **Body:**
  ```bash
  {
    patientID : 'patientID'
    PatientNotesProps
  }
  ```
  **Response:**
  ```bash
  {
    payload: "success/error text"
  }
  ```

  - **DELETE `/api/user/deletepatientnote`**   
  Deletes a patient note.  
  **Body:**
  ```bash
  {
    patientID : 'patientID'
  }
  ```
  **Response:**
  ```bash
  {
    payload: "success/error text"
  }
  ```

---

### ⚠️ Error Handling

Error responses are handled using `try...catch` blocks across all async API interactions.

- ✅ On **success**:
  - Server responses are validated using `response.status === 200`.
  - A success message is displayed using `toast.success(...)`.
  - UI states like form visibility or loading indicators are updated accordingly.

- ❌ On **failure**:
  - If the server returns an error response in the payload, the app shows a specific error message using `toast.error(...)`.
  - If the error object lacks a specific payload (e.g., network error), a fallback message is shown: `"Something went wrong"` or `"An unexpected error occurred"`.
  - Axios-specific errors are checked using `axios.isAxiosError(error)` to ensure safe access to `error.response`.

- ⏳ UI states:
  - `setButtonLoadingAnimation(true/false)` is used to indicate request progress.
  - In failure cases, loading indicators are cleared and modals/forms are closed as needed using timeouts or toggles like `updateIsAddNoteActive(false)`.

**Example Error Response Handler:**
```ts
if (axios.isAxiosError(error)) {
  if (error.response?.data?.payload) {
    toast.error(`Error: ${error.response.data.payload}`);
  } else {
    toast.error('Something went wrong');
  }
} else {
  toast.error('An unexpected error occurred');
}
```

This pattern ensures a consistent UX and graceful degradation when errors occur.


---

### 📦 Environment Configuration

API base URLs are managed via environment variables:

#### Client-side environment variables

##### Base URL for the API (Backend Server)

The **base URL** for the backend API is dynamically set in the frontend using the environment variable `VITE_SERVER_URL`. If this variable is not defined in the `.env` file, the URL defaults to `http://localhost:3300`. 

You can find the implementation of this logic in the `context.tsx` file, where the `baseURL` is set as follows:

```javascript
const baseURL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3300';
```

##### Google Client ID for metadata handling (Google OAuth)

```bash
VITE_METADATA_GOOGLE_CLIENT_ID=your-google-client-id
```

---

#### Server-side environment variables

##### MongoDB Cloud connection URI, including username and password.
```bash
MONGO_URI=mongodb+srv://your-username:your-password@cluster0.mongodb.net/your-database-name?retryWrites=true&w=majority
```

##### Secret key for signing JWT tokens
```bash
JWT_SECRET=your-jwt-secret-key
```

##### Port for your Express server to listen on.

If this variable is not defined in the `.env` file, the URL defaults to `3300`. 

You can find the implementation of this logic in the `app.ts` file.

```bash
PORT=3300
```

##### CORS settings to specify allowed origins, you can add or remove as necessary
```bash
CORS_ORIGINS="http://localhost:3000, https://your-frontend-url.com"
```

##### 📷 Cloudinary Environment Variables

These variables are required for integrating Cloudinary, which is used to upload, store, and manage images in your application.

```bash
CLOUDINARY_CLOUD_NAME=your-cloud-name          # Found in your Cloudinary dashboard
CLOUDINARY_API_KEY=your-api-key                # Public API key for accessing Cloudinary services
CLOUDINARY_API_SECRET=your-api-secret          # Secret key used for secure API operations
```

## 🤝 Contributing

We welcome contributions from the community!

To contribute:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add your message here'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request

Please ensure your code follows the existing project structure and includes relevant documentation if applicable.

---

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](./LICENSE) file for details.

You are free to use, modify, and distribute this software as permitted under the license terms.




















