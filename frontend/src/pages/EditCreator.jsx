import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CreatorForm from '../components/CreatorForm';
import { updateCreator } from '../store/slices/creatorsSlice';
import { fetchCreatorById, updateCreatorFun } from '../store/thunks/creatorThunk';
import { useState, useEffect } from 'react';

export default function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [creator, setCreator] = useState(null);
  const user = useSelector((state) => state.auth.user);

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

  // Check if user has authority to update this creator
  const hasEditAuthority = () => {
    if (!user || !creator) return false;
    const role = user?.role || '';
    const userMail = user?.email || "";
    
    return role === "admin" || userMail === creator.createdBy?.email;
  };

  const handleSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("title", data.title);
    formData.append("bio", data.bio);
    formData.append("avatar", data.avatar);
    formData.append("coverImage", data.coverImage);
    formData.append("followerCount", data.followerCount);
    formData.append("workCount", data.workCount);
    formData.append("category", data.category);
    formData.append("socialLinks[instagram]", data.socialLinks.instagram);
    formData.append("socialLinks[dribbble]", data.socialLinks.dribbble);
    formData.append("socialLinks[twitter]", data.socialLinks.twitter);
    formData.append("skills", JSON.stringify(data.skills));
    formData.append("featured", data.featured);

    try {
      const data = await dispatch(updateCreatorFun(id, formData));
      console.log("data", data);
      if (data) {
        navigate(`/creators/${data._id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Show loading state while fetching creator
  if (!creator) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400 text-lg">Loading creator...</p>
      </div>
    );
  }

  // Show unauthorized message if user doesn't have edit authority
  if (!hasEditAuthority()) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-12">
          <div className="bg-red-100 dark:bg-red-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-9V4a1 1 0 00-1-1H8a1 1 0 00-1 1v2m6 0V4a1 1 0 00-1-1H8a1 1 0 00-1 1v2m6 0h4a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h4M9 12h6" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
            You are not authorized to edit this creator profile.
          </p>
          <p className="text-gray-500 dark:text-gray-500 mb-8">
            Only administrators or the original creator can modify this content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/creators" 
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Back to Creators
            </Link>
            <Link 
              to={`/creators/${creator._id}`} 
              className="inline-block px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
            >
              View Creator Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Edit Creator
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Update {creator.name}'s information
        </p>
      </div>

      {/* Form */}
      <CreatorForm initialData={creator} onSubmit={handleSubmit} />
    </div>
  );
}