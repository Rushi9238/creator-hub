import { useSelector } from 'react-redux';
import { Clock, Plus, Edit2, Trash2, X } from 'lucide-react';

export default function ActivityLog({ open, onOpenChange }) {
  const activityLog = useSelector((state) => state.creators.activityLogs);
  
  const getActionIcon = (action) => {
    switch (action) {
      case 'create':
        return <Plus className="w-4 h-4 text-green-600" />;
      case 'update':
        return <Edit2 className="w-4 h-4 text-blue-600" />;
      case 'delete':
        return <Trash2 className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getActionLabel = (action) => {
    switch (action) {
      case 'create':
        return 'Created';
      case 'update':
        return 'Edited';
      case 'delete':
        return 'Deleted';
      default:
        return 'Activity';
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'create':
        return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300';
      case 'update':
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300';
      case 'delete':
        return 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}m ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // If not open, don't render anything
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onOpenChange}
      />
      
      {/* Slider Panel */}
      <div className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900 shadow-xl border-l border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Activity Log
            </h2>
          </div>
          <button
            onClick={onOpenChange}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="h-[calc(100vh-80px)] overflow-y-auto p-6">
          <div className="space-y-4">
            {activityLog.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No activities yet</p>
              </div>
            ) : (
              activityLog.map((entry) => (
                <div
                  key={entry._id}
                  className="flex gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${getActionColor(entry.action)}`}>
                    {getActionIcon(entry.action)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {getActionLabel(entry.action)}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 break-words">
                          Performed By: <span className="font-medium">{entry.performedBy?.name}</span>
                        </p>
                         <p className="text-sm text-gray-600 dark:text-gray-400 break-words">
                           <span className="font-medium">{entry.description}</span>
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTime(entry.createdAt)}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {new Date(entry.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}