# Diagnostic Agent Platform  

This is a **full-stack application** for managing diagnostic prompts, uploading student data, and computing **Student Quality Index (SQI)**.  
It includes:  

- A **React frontend** for authentication, prompt management, data upload, and SQI computation.  
- An **Express.js backend** with authentication, prompt handling, data upload, and SQI endpoints.  

---

## 🚀 Features  

### Frontend (React)  
- **Authentication** (Login/Logout with JWT stored in `localStorage`)  
- **Dashboard** with three tabs:  
  - **Diagnostic Agent Prompt** – Save and fetch latest prompts.  
  - **Upload Data** – Upload student data in JSON or CSV format.  
  - **Compute SQI** – Compute SQI for a student and download the summary payload.  
- **Reusable utilities** for token management and API calls.  
- **Message alerts** and notifications for user feedback.  

### Backend (Express)  
- **Authentication routes** for signup and login.  
- **Prompt routes** to save and fetch diagnostic agent prompts.  
- **Data routes** to upload student attempts (JSON/CSV) and fetch attempts.  
- **SQI routes** to compute SQI and generate summary payloads.  
- Middleware for error handling and route protection with JWT.  

---

## 📂 Project Structure  
frontend/
  ├── src/
  │   ├── App.js
  │   ├── services/api.js
  │   ├── utils/auth.js
  │   ├── pages/Dashboard.js
  │   ├── components/
  │   │   ├── auth/Login.js
  │   │   ├── dashboard/Header.js
  │   │   ├── dashboard/MessageAlert.js
  │   │   ├── tabs/PromptTab.js
  │   │   ├── tabs/UploadTab.js
  │   │   └── tabs/ComputeTab.js

backend/
  ├── server.js
  |__ .env
  |_ models
  |   |__ Attempts.js
  |   |__ Prompts.js
  |   |__ User.js
  ├── config/db.js
  ├── middleware/
  │   ├── Auth.js
  │   └── Error.js
  |   |__ Validate.js
  ├── routes/
  │   ├── Auth.js
  │   ├── Admin.js
  │   ├── Data.js
  │   └── sqi.js
  |__ utils
  |   |__ ScvParser.js
  |   |__ SqiEngine.js
  |
  └── controllers/
      ├── auth.js
      ├── prompt.js
      ├── data.js
      └── sqi.js


---

## 🖥️ Frontend Setup  

1. Navigate to the `client/` folder:  
   ```bash
   cd client
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the developement server:
   ```bash
   npm run dev
   ```


## 🖥️ Backend Setup  

1. Navigate to the `server-side/` folder:  
   ```bash
   cd server-side
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Add .env file with the following
   ```bash
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ALLOWED_ORIGIN=http://localhost:3000

   ```
4. Start the developement server:
   ```bash
   npm start
   ```

### Authenticated Flow
- Login generates a JWT token.

- Token is stored in localStorage (frontend).

- Token is included in Authorization headers for protected API requests.


### API Routes

1. Auth Routes (/api/auth)
- POST /signup -> Register a new user
```json
{ "email": "user@example.com", "password": "yourpassword" }
```
- POST /login -> Authenticate and return JWT
Body
```json
{ "email": "user@example.com", "password": "yourpassword" }
```

Response
```json
{ "token": "jwt_token_here" }
```

2. Admin Routes (/api/admin) (protected)
- POST /prompt -> Save a new diagnostic prompt
```json
{ "text": "Prompt content here"}

```

- POST /generate ->Generate diagnostic response based on prompt
```json
{ "text": "Generate a diagnostic for student X" }
```

3. Data Routes (/api/data) (protected)
- POST (/upload/json) -> Upload student attempts via JSON
```json
{ "student_id": "S001", "attempts": [ { "question": 1, "score": 5 } ] }
```

- POST (/upload/csv) -> Upload student attempts via CSV
Form Data
```ini
file=<csv_file>
student_id=S001
```

4. SQI Routes (/api/sqi) (protected)
- GET (/:student_id/compute) -> Compute SQI for a student
Example - 
```bash
GET /api/sqi/S001/compute
```

- GET (/:student_id/payload) -> Get summary payload (JSON file) for student
Example - 
```bash
GET /api/sqi/S001/payload
```

### Example Flow

1. Login with email and password.
2. Save a diagnostic prompt using /api/admin/prompt.
3. Upload student data (JSON/CSV) via /api/data.
4. Compute SQI using /api/sqi/:student_id/compute.
5. Download summary payload for analysis.


### Tech Stack

- Frontend: React, TailwindCSS, Lucide Icons
- Backend: Node.js, Express.js, MongoDB
- Auth: JWT (JSON Web Tokens)
- File Uploads: Multer

