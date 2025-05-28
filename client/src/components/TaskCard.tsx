import { FirebaseTask } from '@/lib/firebase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, GripVertical, Hash } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface TaskCardProps {
  task: FirebaseTask;
  userRole: 'Admin' | 'User';
  onEdit: (task: FirebaseTask) => void;
  onDelete: (taskId: string) => void;
  onDragStart: (e: React.DragEvent, task: FirebaseTask) => void;
  onDragEnd: (e: React.DragEvent) => void;
}

export const TaskCard = ({ task, userRole, onEdit, onDelete, onDragStart, onDragEnd }: TaskCardProps) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(task);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (userRole !== 'Admin') {
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id!);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'border-l-blue-500 bg-blue-50';
      case 'inprogress':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'done':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const formatCreatedAt = (timestamp: any) => {
    try {
      const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return 'Unknown time';
    }
  };

  const getTaskNumber = (taskId: string) => {
    // Generate a short ID from the full task ID for display
    return taskId ? taskId.slice(-6).toUpperCase() : 'NEW';
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-orange-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card
      className={`p-4 cursor-move hover:shadow-md transition-all duration-200 border-l-4 ${getStatusColor(task.status)} group`}
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onDragEnd={onDragEnd}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 pr-2">
          <div className="flex items-center space-x-2 mb-1">
            <Badge variant="outline" className="text-xs font-mono">
              <Hash className="h-3 w-3 mr-1" />
              {getTaskNumber(task.id || '')}
            </Badge>
            {task.priority && (
              <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                {task.priority.toUpperCase()}
              </Badge>
            )}
          </div>
          <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
            {task.title}
          </h3>
        </div>
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="h-4 w-4 text-gray-400" />
        </div>
      </div>
      
      {task.description && (
        <p className="text-gray-600 text-xs mb-3 line-clamp-3">
          {task.description}
        </p>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">
            {formatCreatedAt(task.createdAt)}
          </span>
          {task.assignee && (
            <div className="flex items-center space-x-1">
              <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs text-white font-medium">
                {task.assignee.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs text-gray-600">{task.assignee}</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleEdit}
            className="h-6 w-6 p-0 text-gray-400 hover:text-primary"
          >
            <Edit className="h-3 w-3" />
          </Button>
          {userRole === 'Admin' && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDelete}
              className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
