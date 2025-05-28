import { useState, useEffect } from 'react';
import { firebaseService, FirebaseTask } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export const useTasks = () => {
  const [tasks, setTasks] = useState<FirebaseTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = firebaseService.subscribeToTasks((updatedTasks) => {
      setTasks(updatedTasks);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const createTask = async (task: Omit<FirebaseTask, 'id' | 'createdAt'>) => {
    try {
      const taskId = await firebaseService.createTask(task);
      
      // Log activity
      if (user && taskId) {
        await firebaseService.createActivity({
          type: 'created',
          taskId,
          taskTitle: task.title,
          user: user.name,
          priority: task.priority
        });
      }
      
      toast({
        title: "Success",
        description: "Task created successfully",
      });
    } catch (error) {
      console.error('Failed to create task:', error);
      toast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        variant: "destructive",
      });
    }
  };

  const updateTask = async (id: string, updates: Partial<Omit<FirebaseTask, 'id' | 'createdAt'>>) => {
    try {
      // Get the current task to track changes
      const currentTask = tasks.find(t => t.id === id);
      
      await firebaseService.updateTask(id, updates);
      
      // Log activity based on what changed
      if (user && currentTask) {
        if (updates.status && updates.status !== currentTask.status) {
          // Status change (moved between columns)
          await firebaseService.createActivity({
            type: 'moved',
            taskId: id,
            taskTitle: currentTask.title,
            user: user.name,
            priority: currentTask.priority,
            fromStatus: currentTask.status,
            toStatus: updates.status
          });
        } else {
          // Regular update
          await firebaseService.createActivity({
            type: 'updated',
            taskId: id,
            taskTitle: currentTask.title,
            user: user.name,
            priority: currentTask.priority
          });
        }
      }
      
      toast({
        title: "Success",
        description: "Task updated successfully",
      });
    } catch (error) {
      console.error('Failed to update task:', error);
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await firebaseService.deleteTask(id);
      toast({
        title: "Success",
        description: "Task deleted successfully",
      });
    } catch (error) {
      console.error('Failed to delete task:', error);
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      });
    }
  };

  const moveTask = async (taskId: string, newStatus: 'todo' | 'inprogress' | 'done') => {
    await updateTask(taskId, { status: newStatus });
  };

  const getTasksByStatus = (status: 'todo' | 'inprogress' | 'done') => {
    return tasks.filter(task => task.status === status);
  };

  return {
    tasks,
    isLoading,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    getTasksByStatus
  };
};
