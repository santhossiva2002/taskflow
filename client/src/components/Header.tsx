import { User } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, LogOut, Activity } from 'lucide-react';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  onCreateTask: () => void;
}

export const Header = ({ user, onLogout, onCreateTask }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Activity className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">Live</span>
            </div>
            
            <Button onClick={onCreateTask} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Task</span>
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Logged in as:</span>
                <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                  {user.role}
                </Badge>
                <span className="text-sm font-medium text-gray-900">{user.name}</span>
              </div>
              
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
