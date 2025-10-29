import React, { useEffect } from 'react';
import CreatorList from '../components/CreatorList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreatorList } from '../store/thunks/creatorThunk';

const CreatorDashboard = () => {

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-2xl p-8 md:p-12 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Welcome to CreatorHub</h2>
        <p className="text-lg text-blue-100 max-w-2xl">
          Connect with talented creators, manage profiles, and discover amazing work from designers,
          illustrators, photographers, and more.
        </p>
      </div>

      {/* Stats Section */}
      <div className="hidden grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Creators</p>
          <p className="text-4xl font-bold text-gray-900 dark:text-white mt-2">6</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Featured</p>
          <p className="text-4xl font-bold text-yellow-500 mt-2">4</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Works</p>
          <p className="text-4xl font-bold text-gray-900 dark:text-white mt-2">770+</p>
        </div>
      </div>

      {/* Creator List */}
      <CreatorList />
    </div>
  );
};

export default CreatorDashboard;
