import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Activity, Clock, User, CheckCircle, Plus, Edit3, ArrowRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { firebaseService, ActivityItem } from '@/lib/firebase';

export const ActivityFeed = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    // Subscribe to real-time activities
    const unsubscribe = firebaseService.subscribeToActivities((updatedActivities) => {
      setActivities(updatedActivities);
    });

    return () => unsubscribe();
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'created':
        return <Plus className="h-4 w-4 text-blue-500" />;
      case 'updated':
        return <Edit3 className="h-4 w-4 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'assigned':
        return <User className="h-4 w-4 text-purple-500" />;
      case 'moved':
        return <ArrowRight className="h-4 w-4 text-indigo-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityText = (activity: ActivityItem) => {
    const formatStatus = (status: string) => {
      switch (status) {
        case 'todo': return 'To Do';
        case 'inprogress': return 'In Progress';
        case 'done': return 'Done';
        default: return status;
      }
    };

    switch (activity.type) {
      case 'created':
        return `created task "${activity.taskTitle}"`;
      case 'updated':
        return `updated task "${activity.taskTitle}"`;
      case 'completed':
        return `completed task "${activity.taskTitle}"`;
      case 'assigned':
        return `was assigned to "${activity.taskTitle}"`;
      case 'moved':
        return `moved task "${activity.taskTitle}" from ${formatStatus(activity.fromStatus || '')} to ${formatStatus(activity.toStatus || '')}`;
      default:
        return `performed action on "${activity.taskTitle}"`;
    }
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
    <Card className="p-6 h-full">
      <div className="flex items-center space-x-2 mb-4">
        <Activity className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      </div>
      
      <ScrollArea className="h-96">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {activity.user}
                  </span>
                  {activity.priority && (
                    <Badge className={`text-xs ${getPriorityColor(activity.priority)}`}>
                      {activity.priority.toUpperCase()}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {getActivityText(activity)}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <Clock className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-400">
                    {formatDistanceToNow(activity.timestamp.toDate(), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};