import { useState } from 'react';
import { Header } from '@/components/Header';
import { TaskModal } from '@/components/TaskModal';
import { KanbanColumn } from '@/components/KanbanColumn';
import { ActivityFeed } from '@/components/ActivityFeed';
import { useTasks } from '@/hooks/useTasks';
import { useAuth } from '@/hooks/useAuth';
import { FirebaseTask } from '@/lib/firebase';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ClipboardList, Clock, Loader2, CheckCircle2, TrendingUp } from 'lucide-react';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const { tasks, isLoading, createTask, updateTask, deleteTask, moveTask, getTasksByStatus } = useTasks();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<FirebaseTask | null>(null);
  const [draggedTask, setDraggedTask] = useState<FirebaseTask | null>(null);

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: FirebaseTask) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  const handleSaveTask = async (taskData: Omit<FirebaseTask, 'id' | 'createdAt'>) => {
    if (editingTask) {
      await updateTask(editingTask.id!, taskData);
    } else {
      await createTask(taskData);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
  };

  const handleTaskDrop = async (taskId: string, newStatus: 'todo' | 'inprogress' | 'done') => {
    await moveTask(taskId, newStatus);
  };

  const handleAddTaskToColumn = (status: 'todo' | 'inprogress' | 'done') => {
    setEditingTask(null); // Clear editing task for new task creation
    setIsTaskModalOpen(true);
    // We'll set the status in the modal based on the column
  };

  const handleDragStart = (e: React.DragEvent, task: FirebaseTask) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  if (!user) {
    return null;
  }

  const todoTasks = getTasksByStatus('todo');
  const inProgressTasks = getTasksByStatus('inprogress');
  const doneTasks = getTasksByStatus('done');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={user}
        onLogout={logout}
        onCreateTask={handleCreateTask}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Board Stats */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ClipboardList className="h-6 w-6 text-gray-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                  {isLoading ? (
                    <Skeleton className="h-8 w-8" />
                  ) : (
                    <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
                  )}
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">To Do</p>
                  {isLoading ? (
                    <Skeleton className="h-8 w-8" />
                  ) : (
                    <p className="text-2xl font-bold text-blue-600">{todoTasks.length}</p>
                  )}
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Loader2 className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  {isLoading ? (
                    <Skeleton className="h-8 w-8" />
                  ) : (
                    <p className="text-2xl font-bold text-yellow-600">{inProgressTasks.length}</p>
                  )}
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Done</p>
                  {isLoading ? (
                    <Skeleton className="h-8 w-8" />
                  ) : (
                    <p className="text-2xl font-bold text-green-600">{doneTasks.length}</p>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Kanban Board */}
          <div className="xl:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="p-6">
                    <Skeleton className="h-6 w-32 mb-6" />
                    <div className="space-y-3">
                      {[1, 2, 3].map((j) => (
                        <Skeleton key={j} className="h-32 w-full" />
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <KanbanColumn
                  title="To Do"
                  status="todo"
                  tasks={todoTasks}
                  userRole={user.role}
                  onTaskEdit={handleEditTask}
                  onTaskDelete={handleDeleteTask}
                  onTaskDrop={handleTaskDrop}
                  onAddTask={handleAddTaskToColumn}
                  draggedTask={draggedTask}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                />
                
                <KanbanColumn
                  title="In Progress"
                  status="inprogress"
                  tasks={inProgressTasks}
                  userRole={user.role}
                  onTaskEdit={handleEditTask}
                  onTaskDelete={handleDeleteTask}
                  onTaskDrop={handleTaskDrop}
                  onAddTask={handleAddTaskToColumn}
                  draggedTask={draggedTask}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                />
                
                <KanbanColumn
                  title="Done"
                  status="done"
                  tasks={doneTasks}
                  userRole={user.role}
                  onTaskEdit={handleEditTask}
                  onTaskDelete={handleDeleteTask}
                  onTaskDrop={handleTaskDrop}
                  onAddTask={handleAddTaskToColumn}
                  draggedTask={draggedTask}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                />
              </div>
            )}
          </div>
          
          {/* Activity Feed Sidebar */}
          <div className="xl:col-span-1">
            <ActivityFeed />
          </div>
        </div>
      </main>
      
      <TaskModal
        isOpen={isTaskModalOpen}
        task={editingTask}
        onSave={handleSaveTask}
        onClose={handleCloseModal}
      />
    </div>
  );
};
