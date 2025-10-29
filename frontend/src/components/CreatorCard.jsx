import { Link } from 'react-router-dom';
import { Heart, Users, Award } from 'lucide-react';

export default function CreatorCard({ creator, onViewDetails }) {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Cover Image */}
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
        <img
          src={creator.coverImage}
          alt={creator.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=400&fit=crop';
          }}
        />
        {creator.featured && (
          <div className="absolute top-3 right-3 bg-yellow-400 dark:bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Award className="w-3 h-3" />
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-5 py-5">
        {/* Avatar and Name */}
        <div className="flex items-start gap-4 mb-4">
          <img
            src={creator.avatar}
            alt={creator.name}
            className="w-16 h-16 rounded-full object-cover ring-4 ring-white dark:ring-gray-800 mt-0 shadow-md border"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop';
            }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Link to={`/creators/${creator._id}`} onClick={() => onViewDetails(creator)}>
                {creator.name}
              </Link>
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{creator.title}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
              {creator.category}
            </span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
          {creator.bio}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-gray-900 dark:text-white font-bold text-lg">
              <Users className="w-4 h-4 text-blue-600" />
              {(creator.followerCount / 1000).toFixed(1)}K
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Followers</p>
          </div>
          <div className="text-center">
            <div className="text-gray-900 dark:text-white font-bold text-lg">
              {creator.workCount}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Works</p>
          </div>
        </div>

        {/* Skills */}
        {
          creator.skills.length > 0 && <div className="mb-4">
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Skills</p>
          <div className="flex flex-wrap gap-1">
            {creator.skills.slice(0, 3).map((skill, idx) => (
              <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                {skill}
              </span>
            ))}
            {creator.skills.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                +{creator.skills.length - 3}
              </span>
            )}
          </div>
        </div>
        }
        

        {/* Action Button */}
        <Link
          to={`/creators/${creator._id}`}
          onClick={() => onViewDetails(creator)}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:shadow-md hover:bg-blue-700 transition-all duration-200 text-sm"
        >
          <Heart className="w-4 h-4" />
          View Profile
        </Link>
      </div>
    </div>
  );
}
