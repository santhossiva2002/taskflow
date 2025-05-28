# 🚀 TaskFlow - Advanced Project Management Platform

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white" alt="Firebase" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
</div>

<div align="center">
  <h3>🎯 A modern, feature-rich Kanban board with real-time collaboration and advanced project analytics</h3>
  <p>Built with React, Firebase Firestore, and Express.js - designed for professional teams and solo developers</p>
</div>

---

## ✨ Key Features

### 🎨 **Professional Interface**
- **Modern Kanban Board** - Clean, intuitive three-column layout (To Do, In Progress, Done)
- **Drag & Drop** - Smooth task movement between columns with visual feedback
- **Responsive Design** - Perfect experience on desktop, tablet, and mobile devices
- **Dark/Light Mode** - Beautiful UI that adapts to user preferences

### 🔥 **Advanced Task Management**
- **Smart Task IDs** - Unique identifiers (e.g., #A1B2C3) for easy reference
- **Priority Levels** - Color-coded badges (Low, Medium, High, Urgent)
- **Team Collaboration** - Assignee tracking with avatar initials
- **Rich Task Details** - Title, description, status, priority, and assignee fields

### ⚡ **Real-time Features**
- **Live Sync** - Instant updates across all connected users using Firebase Firestore
- **Activity Feed** - Real-time activity tracking with user actions and timestamps
- **Online Status** - Live indicator showing connection status

### 🛡️ **Security & Permissions**
- **Role-based Access** - Admin and User roles with different permissions
- **Secure Authentication** - Demo login system with role selection
- **Data Protection** - Firebase security rules and data validation

### 📊 **Productivity Tools**
- **Smart Sorting** - Sort tasks by date, title, or priority with one click
- **Task Analytics** - Visual insights into task distribution and progress
- **Quick Actions** - Fast task creation from any column
- **Bulk Operations** - Manage multiple tasks efficiently

### 🔧 **Developer Experience**
- **TypeScript** - Full type safety across frontend and backend
- **Modern Architecture** - Clean, maintainable code structure
- **API Routes** - RESTful backend with Express.js
- **Real-time Database** - Firebase Firestore integration

## 🚀 Tech Stack

### Frontend Powerhouse
- **React 18** - Latest features with concurrent rendering
- **TypeScript** - Type-safe development experience
- **Tailwind CSS** - Utility-first styling with custom design system
- **shadcn/ui** - Premium component library
- **Framer Motion** - Smooth animations and transitions
- **TanStack Query** - Advanced data fetching and caching
- **Wouter** - Lightweight, fast routing
- **date-fns** - Modern date manipulation
- **Lucide React** - Beautiful, consistent icons

### Backend Infrastructure  
- **Express.js** - Fast, minimalist web framework
- **Firebase Firestore** - Scalable NoSQL database
- **TypeScript** - Server-side type safety
- **Zod** - Runtime type validation
- **CORS** - Cross-origin resource sharing

### Development Tools
- **Vite** - Lightning-fast build tool and dev server
- **ESLint** - Code quality and consistency
- **PostCSS** - Advanced CSS processing
- **Hot Module Replacement** - Instant development feedback

## 🎯 What Makes TaskFlow Special

### 🏆 **Professional Grade**
- Enterprise-level architecture suitable for real-world applications
- Scalable design that grows with your team
- Production-ready code with proper error handling

### 🎨 **Superior UX/UI**
- Carefully crafted interface with attention to detail
- Smooth animations and micro-interactions
- Accessibility-first design principles

### ⚡ **Performance Optimized**
- Real-time updates without page refreshes
- Optimistic UI updates for instant feedback
- Efficient data loading and caching strategies

### 🔄 **Real-time Collaboration**
- Multiple users can work simultaneously
- Instant visibility of changes across all sessions
- Conflict-free collaborative editing

## 🛠️ Quick Start

### Prerequisites
- **Node.js 18+** (Latest LTS recommended)
- **npm or yarn** for package management
- **Firebase Project** with Firestore enabled

### 🚀 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/taskflow.git
cd taskflow
```

2. **Install dependencies**
```bash
npm install
```

3. **Firebase Setup**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Get your Firebase config from Project Settings → General → Your apps
   - Set up environment variables (see Environment Setup below)

4. **Environment Setup**
Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

5. **Configure Firestore Rules**
In Firebase Console → Firestore Database → Rules, use these rules for development:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

6. **Start the development server**
```bash
npm run dev
```

7. **Open your browser**
Navigate to `http://localhost:5000` and start managing your tasks!

## 🎮 Usage Guide

### 🚪 **Getting Started**
1. **Login** - Choose between Admin or User demo accounts
2. **Create Tasks** - Click "Add Task" or use the "+" button in any column
3. **Manage Tasks** - Edit, delete, or move tasks between columns
4. **Collaborate** - Multiple users can work simultaneously with real-time updates

### 👨‍💼 **User Roles**
- **Admin** - Full access: create, edit, delete, and manage all tasks
- **User** - Limited access: create and edit tasks, but cannot delete

### 📱 **Task Management**
- **Create**: Fill in title, description, priority, and assignee
- **Edit**: Click the edit icon on any task card
- **Move**: Drag tasks between columns or use the status dropdown
- **Sort**: Use the three-dot menu to sort by date, title, or priority
- **Delete**: Admin users can delete tasks using the trash icon

### 🔄 **Real-time Features**
- **Live Updates** - See changes instantly as team members work
- **Activity Feed** - Track all task activities in the right sidebar
- **Online Status** - Green indicator shows live connection

## 🏗️ Project Structure

```
taskflow/
├── client/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/        # shadcn/ui components
│   │   │   ├── Header.tsx
│   │   │   ├── TaskCard.tsx
│   │   │   ├── TaskModal.tsx
│   │   │   ├── KanbanColumn.tsx
│   │   │   └── ActivityFeed.tsx
│   │   ├── hooks/         # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   └── useTasks.ts
│   │   ├── lib/           # Utilities and configurations
│   │   │   ├── firebase.ts
│   │   │   ├── queryClient.ts
│   │   │   └── utils.ts
│   │   ├── pages/         # Page components
│   │   │   └── Dashboard.tsx
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # Entry point
├── server/
│   ├── index.ts          # Express server setup
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data layer
│   └── vite.ts           # Vite integration
├── shared/
│   └── schema.ts         # Shared TypeScript types
└── README.md
```

## 🎨 Design System

### 🎯 **Color Palette**
- **Primary**: Modern blue (#3B82F6)
- **Success**: Green (#10B981) 
- **Warning**: Yellow (#F59E0B)
- **Danger**: Red (#EF4444)
- **Priority Colors**:
  - 🔴 Urgent: Red
  - 🟠 High: Orange  
  - 🟡 Medium: Yellow
  - 🟢 Low: Green

### 📐 **Typography**
- **Headings**: Inter font family
- **Body**: System font stack
- **Code**: Monospace

## 🚀 Advanced Features

### 📊 **Smart Analytics**
- Task distribution across columns
- Priority-based insights
- Team productivity metrics
- Activity timeline tracking

### ⚡ **Performance Features**
- Optimistic UI updates
- Real-time synchronization
- Efficient data caching
- Smooth animations

### 🛡️ **Security Features**
- Firebase security rules
- Role-based permissions
- Input validation
- XSS protection

## 🔧 API Documentation

### 📡 **Endpoints**

#### Tasks
- `GET /api/tasks` - Retrieve all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task (Admin only)

#### Task Schema
```typescript
interface FirebaseTask {
  id?: string;
  title: string;
  description: string;
  status: 'todo' | 'inprogress' | 'done';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: string;
  createdAt: Timestamp;
}
```




## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### 📋 **Development Guidelines**
- Follow TypeScript best practices
- Use meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Firebase Team** - For the real-time database
- **shadcn** - For the beautiful UI components
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide** - For the beautiful icons

## 📞 Support

Need help? Here's how to get support:

- 📧 **Email**: support@taskflow.com
- 💬 **Discord**: Join our community
- 📖 **Documentation**: Check our detailed guides
- 🐛 **Issues**: Report bugs on GitHub

---

<div align="center">
  <p>Made with ❤️ by developers, for developers</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
