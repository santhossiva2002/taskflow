import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Activity, Crown, User } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onLogin: (name: string, role: 'Admin' | 'User') => void;
}

export const LoginModal = ({ isOpen, onLogin }: LoginModalProps) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<'Admin' | 'User'>('User');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim(), role);
    }
  };

  const handleQuickLogin = (quickRole: 'Admin' | 'User') => {
    const defaultName = quickRole === 'Admin' ? 'John Smith' : 'Jane Doe';
    onLogin(defaultName, quickRole);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Activity className="h-6 w-6 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl font-bold">Welcome to TaskFlow</DialogTitle>
          <p className="text-center text-gray-600 text-sm">Choose your role to continue</p>
        </DialogHeader>
        
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={(value: 'Admin' | 'User') => setRole(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit" className="w-full" disabled={!name.trim()}>
              Continue
            </Button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or use demo accounts</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => handleQuickLogin('Admin')}
              className="flex items-center space-x-2"
            >
              <Crown className="h-4 w-4" />
              <span>Admin Demo</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => handleQuickLogin('User')}
              className="flex items-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span>User Demo</span>
            </Button>
          </div>
          
          <p className="text-xs text-gray-400 text-center">
            Demo mode - no real authentication required
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
