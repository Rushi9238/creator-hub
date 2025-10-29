import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Globe,
  Mail,
  Instagram,
  Twitter,
  Award,
  Edit,
  Trash2,
  Star,
  ArrowLeft,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { toggleFeatured } from '../store/slices/creatorsSlice';
import { deleteCreatorFun, fetchCreatorById } from '../store/thunks/creatorThunk';

export default function CreatorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [creator, setCreator] = useState(null);

  // const creator = useSelector((state) =>
  //   state.creators.creators.find((c) => c._id === id)
  // );

  useEffect(() => {
    if (id) {
      fetchSignleCreator();
    }
  }, [id]);

  const fetchSignleCreator = async () => {
    const data = await dispatch(fetchCreatorById(id));
    if (data) {
      setCreator(data);
    }
  };

  if (!creator) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">Creator not found</p>
        <Link
          to="/dashboard"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Creators
        </Link>
      </div>
    );
  }

  const handleDelete = async () => {
    try {
       await dispatch(deleteCreatorFun(id));
      navigate('/dashboard');
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Creators
      </button>

      {/* Cover Section */}
      <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 shadow-lg">
        <img
          src={creator.coverImage}
          alt={creator.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=400&fit=crop';
          }}
        />

        {/* Featured Badge */}
        {creator.featured && (
          <div className="absolute top-4 right-4 bg-yellow-400 dark:bg-yellow-500 text-gray-900 px-4 py-2 rounded-full font-semibold flex items-center gap-2 shadow-lg">
            <Award className="w-5 h-5" />
            Featured Creator
          </div>
        )}

        {/* Actions Overlay */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Link
            to={`/edit/${creator._id}`}
            className="p-3 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-md"
            title="Edit creator"
          >
            <Edit className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </Link>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="p-3 bg-white dark:bg-gray-800 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors shadow-md"
            title="Delete creator"
          >
            <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2">
          {/* Profile Header */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 -mt-20 relative z-10 mb-6">
            <div className="flex flex-col md:flex-row items-start gap-6 md:items-end">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-32 h-32 rounded-xl object-cover ring-4 ring-white dark:ring-gray-800 shadow-lg"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop';
                }}
              />

              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {creator.name}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-3">{creator.title}</p>
                <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium">
                  {creator.category}
                </span>
              </div>

              {/* Toggle Featured */}
              {/* <button
                onClick={() => dispatch(toggleFeatured(creator.id))}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors font-medium"
              >
                <Star
                  className={`w-5 h-5 ${creator.featured ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
                />
                {creator.featured ? 'Unfeature' : 'Feature'}
              </button> */}
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              {creator.bio}
            </p>
          </div>

          {/* Skills */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {creator &&
                creator.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-700 dark:text-blue-300 rounded-lg font-medium border border-blue-200 dark:border-blue-800"
                  >
                    {skill}
                  </span>
                ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contact</h2>
            <div className="space-y-3">
              <a
                href={`mailto:${creator.email}`}
                className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>{creator.email}</span>
              </a>
              {creator.website && (
                <a
                  href={creator.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  <span className="truncate">{creator.website}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Stats */}
        <div className="lg:col-span-1">
          {/* Quick Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-4 mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Statistics</h2>

            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">Followers</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {(creator.followerCount / 1000).toFixed(1)}K
              </p>
            </div>

            <div className="h-px bg-gray-200 dark:bg-gray-700" />

            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
                Total Works
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {creator.workCount}
              </p>
            </div>

            <div className="h-px bg-gray-200 dark:bg-gray-700" />

            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">Skills</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {creator.skills.length}
              </p>
            </div>
          </div>

          {/* Social Links */}
          {creator.socialLinks && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Social Links</h2>
              <div className="space-y-3">
                {creator.socialLinks.instagram && (
                  <a
                    href={creator.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900/30 hover:text-pink-600 dark:hover:text-pink-400 transition-colors font-medium"
                  >
                    <Instagram className="w-5 h-5" />
                    Instagram
                  </a>
                )}
                {creator.socialLinks.twitter && (
                  <a
                    href={creator.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                  >
                    <Twitter className="w-5 h-5" />
                    Twitter
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 rounded-xl">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Delete Creator?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete {creator.name}? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
