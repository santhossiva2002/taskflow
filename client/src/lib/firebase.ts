import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "taskflow-demo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "taskflow-demo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "taskflow-demo.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export interface FirebaseTask {
  id?: string;
  title: string;
  description: string;
  status: 'todo' | 'inprogress' | 'done';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: string;
  dueDate?: Timestamp | null;
  tags?: string[];
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  updatedBy?: string;
}

export interface ActivityItem {
  id?: string;
  type: 'created' | 'updated' | 'completed' | 'assigned' | 'moved';
  taskId: string;
  taskTitle: string;
  user: string;
  timestamp: Timestamp;
  priority?: string;
  fromStatus?: string;
  toStatus?: string;
}

export const tasksCollection = collection(db, 'tasks');
export const activitiesCollection = collection(db, 'activities');

export const firebaseService = {
  // Create a new task
  async createTask(task: Omit<FirebaseTask, 'id' | 'createdAt'>): Promise<string> {
    const docRef = await addDoc(tasksCollection, {
      ...task,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  },

  // Get all tasks
  async getTasks(): Promise<FirebaseTask[]> {
    const q = query(tasksCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as FirebaseTask));
  },

  // Update a task
  async updateTask(id: string, updates: Partial<Omit<FirebaseTask, 'id' | 'createdAt'>>) {
    if (!id) {
      throw new Error('Task ID is required for update');
    }
    const taskRef = doc(db, 'tasks', id);
    await updateDoc(taskRef, updates);
  },

  // Delete a task
  async deleteTask(id: string) {
    const taskRef = doc(db, 'tasks', id);
    await deleteDoc(taskRef);
  },

  // Subscribe to real-time updates
  subscribeToTasks(callback: (tasks: FirebaseTask[]) => void) {
    const q = query(tasksCollection, orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const tasks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as FirebaseTask));
      callback(tasks);
    });
  },

  // Activity management
  async createActivity(activity: Omit<ActivityItem, 'id' | 'timestamp'>) {
    await addDoc(activitiesCollection, {
      ...activity,
      timestamp: Timestamp.now()
    });
  },

  subscribeToActivities(callback: (activities: ActivityItem[]) => void) {
    const q = query(activitiesCollection, orderBy('timestamp', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const activities = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ActivityItem));
      callback(activities.slice(0, 20)); // Show only last 20 activities
    });
  }
};
