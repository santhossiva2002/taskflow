import { useState } from 'react';
import { FirebaseTask } from '@/lib/firebase';
import { TaskCard } from './TaskCard';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, MoreHorizontal, SortAsc, SortDesc, Archive, Filter } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface KanbanColumnProps {
  title: string;
  status: 'todo' | 'inprogress' | 'done';
  tasks: FirebaseTask[];
  userRole: 'Admin' | 'User';
  onTaskEdit: (task: FirebaseTask) => void;
  onTaskDelete: (taskId: string) => void;
  onTaskDrop: (taskId: string, newStatus: 'todo' | 'inprogress' | 'done') => void;
  onAddTask: (status: 'todo' | 'inprogress' | 'done') => void;
  draggedTask: FirebaseTask | null;
  onDragStart: (e: React.DragEvent, task: FirebaseTask) => void;
  onDragEnd: (e: React.DragEvent) => void;
}

export const KanbanColumn = ({
  title,
  status,
  tasks,
  userRole,
  onTaskEdit,
  onTaskDelete,
  onTaskDrop,
  onAddTask,
  draggedTask,
  onDragStart,
  onDragEnd
}: KanbanColumnProps) => {
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'priority'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const getStatusColor = () => {
    switch (status) {
      case 'todo':
        return 'bg-blue-500';
      case 'inprogress':
        return 'bg-yellow-500';
      case 'done':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getHoverColor = () => {
    switch (status) {
      case 'todo':
        return 'hover:border-blue-300';
      case 'inprogress':
        return 'hover:border-yellow-300';
      case 'done':
        return 'hover:border-green-300';
      default:
        return 'hover:border-gray-300';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== status) {
      onTaskDrop(draggedTask.id!, status);
    }
  };

  const getSortedTasks = () => {
    const sortedTasks = [...tasks];
    
    sortedTasks.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          comparison = (priorityOrder[a.priority || 'medium'] || 2) - (priorityOrder[b.priority || 'medium'] || 2);
          break;
        case 'date':
        default:
          const aDate = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
          const bDate = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
          comparison = aDate.getTime() - bDate.getTime();
          break;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });
    
    return sortedTasks;
  };

  const handleSort = (type: 'date' | 'title' | 'priority') => {
    if (sortBy === type) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(type);
      setSortOrder('asc');
    }
  };

  return (
    <Card className="p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${getStatusColor()}`} />
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <Badge variant="secondary" className="text-xs">
            {tasks.length}
          </Badge>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <MoreHorizontal className="h-4 w-4 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleSort('date')}>
              {sortBy === 'date' && sortOrder === 'desc' ? <SortDesc className="h-4 w-4 mr-2" /> : <SortAsc className="h-4 w-4 mr-2" />}
              Sort by Date {sortBy === 'date' && `(${sortOrder === 'desc' ? 'Newest' : 'Oldest'})`}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort('title')}>
              {sortBy === 'title' && sortOrder === 'desc' ? <SortDesc className="h-4 w-4 mr-2" /> : <SortAsc className="h-4 w-4 mr-2" />}
              Sort by Title {sortBy === 'title' && `(${sortOrder === 'desc' ? 'Z-A' : 'A-Z'})`}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort('priority')}>
              {sortBy === 'priority' && sortOrder === 'desc' ? <SortDesc className="h-4 w-4 mr-2" /> : <SortAsc className="h-4 w-4 mr-2" />}
              Sort by Priority {sortBy === 'priority' && `(${sortOrder === 'desc' ? 'High-Low' : 'Low-High'})`}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Filter className="h-4 w-4 mr-2" />
              Filter Tasks
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div
        className={`min-h-96 space-y-3 border-2 border-dashed border-transparent transition-colors ${getHoverColor()} ${
          draggedTask && draggedTask.status !== status ? 'border-gray-300' : ''
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {getSortedTasks().map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            userRole={userRole}
            onEdit={onTaskEdit}
            onDelete={onTaskDelete}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))}
        
        {tasks.length === 0 && (
          <div className="text-center text-gray-500 text-sm py-8">
            No tasks yet
          </div>
        )}
      </div>
      
      <Button
        variant="ghost"
        onClick={() => onAddTask(status)}
        className={`w-full mt-4 py-3 border-2 border-dashed border-gray-300 text-gray-500 ${getHoverColor()} transition-colors`}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a task
      </Button>
    </Card>
  );
};
