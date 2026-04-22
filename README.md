# Task Manager - MERN Stack Application

A full-stack task management application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This application allows users to create, read, update, and delete tasks with a modern, responsive UI.

## Features

### Frontend (React.js)
- **Responsive and user-friendly UI** with modern design
- **Add, edit, and delete tasks** with form validation
- **Mark tasks as completed** with visual feedback
- **Filter tasks** by status (All / Completed / Pending)
- **Real-time task counts** for each filter
- **Character limits** with live counters
- **Loading states** and error handling
- **Mobile-responsive design**

### Backend (Node.js + Express.js)
- **RESTful API** with full CRUD operations
- **MongoDB integration** with Mongoose ODM
- **Data validation** and error handling
- **CORS enabled** for frontend communication
- **TypeScript support** for type safety

## Tech Stack

### Frontend
- **React.js** with TypeScript
- **Axios** for HTTP requests
- **CSS3** with modern styling
- **Responsive design** with media queries

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **TypeScript** for type safety
- **CORS** for cross-origin requests
- **dotenv** for environment variables

## Project Structure

```
TaskManager/
├── task-manager-frontend/          # React frontend
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── TaskForm.tsx        # Add/Edit task form
│   │   │   ├── TaskItem.tsx        # Individual task component
│   │   │   └── TaskFilter.tsx      # Filter buttons
│   │   ├── services/                # API service
│   │   │   └── api.ts              # Axios API calls
│   │   ├── types/                   # TypeScript types
│   │   │   └── task.ts             # Task interface
│   │   ├── App.tsx                  # Main app component
│   │   └── App.css                  # App styles
│   └── package.json
├── task-manager-backend/           # Node.js backend
│   ├── src/
│   │   ├── models/                  # Mongoose models
│   │   │   └── Task.ts             # Task schema
│   │   ├── routes/                  # API routes
│   │   │   └── tasks.ts            # Task routes
│   │   └── server.ts                # Express server
│   ├── .env                         # Environment variables
│   ├── tsconfig.json               # TypeScript config
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (installed locally or MongoDB Atlas account)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd TaskManager
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd task-manager-backend

# Install dependencies
npm install

# Create .env file (if not exists)
echo "PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager" > .env

# Start the development server
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd task-manager-frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The frontend will run on `http://localhost:3000`

### 4. MongoDB Setup

#### Option 1: Local MongoDB
Make sure MongoDB is installed and running on your system:
```bash
# Start MongoDB service (varies by OS)
# On Windows: net start MongoDB
# On macOS: brew services start mongodb-community
# On Linux: sudo systemctl start mongod
```

#### Option 2: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update the `.env` file in the backend:
```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/taskmanager?retryWrites=true&w=majority
```

## API Endpoints

### Tasks API (`/api/tasks`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Get all tasks |
| `GET` | `/api/tasks/:id` | Get a specific task |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

### Task Data Structure
```typescript
interface Task {
  _id: string;
  title: string;           // Required, max 100 characters
  description: string;     // Required, max 500 characters
  completed: boolean;      // Default: false
  createdAt: string;
  updatedAt: string;
}
```

## Usage

1. **Add a Task**: Fill in the title and description, then click "Add Task"
2. **Edit a Task**: Click the edit icon (✏️) on any task
3. **Mark Complete**: Click the checkmark (✓) to toggle task completion
4. **Delete a Task**: Click the trash icon (🗑️) to remove a task
5. **Filter Tasks**: Use the filter buttons to view All, Completed, or Pending tasks

## Features in Detail

### Task Management
- **Create tasks** with title and description
- **Edit existing tasks** inline
- **Delete tasks** with confirmation
- **Toggle completion status** with visual feedback

### Filtering & Organization
- **Real-time filtering** by task status
- **Task counts** for each filter category
- **Visual indicators** for completed tasks

### User Experience
- **Responsive design** works on all devices
- **Loading states** for better feedback
- **Error handling** with user-friendly messages
- **Form validation** with character limits
- **Smooth animations** and transitions

## Development Scripts

### Backend
```bash
npm run dev      # Start development server with nodemon
npm run build    # Compile TypeScript to JavaScript
npm start        # Start production server
```

### Frontend
```bash
npm start        # Start React development server
npm run build    # Build for production
npm test         # Run tests
```

## License

This project is open source and available under the [MIT License](LICENSE).


