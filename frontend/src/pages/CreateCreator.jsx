import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CreatorForm from '../components/CreatorForm';
import { addCreator } from '../store/slices/creatorsSlice';
import { createCreator } from '../store/thunks/creatorThunk';

export default function CreateCreator() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async(data) => {
    // Generate a new ID

    console.log(data)
    const formData= new FormData()
    formData.append("name",data.name)
    formData.append("email",data.email)
    formData.append("title",data.title)
    formData.append("bio",data.bio)
    formData.append("avatar",data.avatar)
    formData.append("coverImage",data.coverImage)
    formData.append("followerCount",data.followerCount)
    formData.append("workCount",data.workCount)
    formData.append("category",data.category)
    formData.append("socialLinks[instagram]",data.socialLinks.instagram)
    formData.append("socialLinks[dribbble]",data.socialLinks.dribbble)
    formData.append("socialLinks[twitter]",data.socialLinks.twitter)
    formData.append("skills",JSON.stringify(data.skills))
    formData.append("featured",data.featured)

    try {
     const data= await dispatch(createCreator(formData))
     console.log("data",data)
     if(data){
       navigate(`/creators/${data._id}`);
     }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Add New Creator
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Fill in the information below to create a new creator profile
        </p>
      </div>

      {/* Form */}
      <CreatorForm onSubmit={handleSubmit} />
    </div>
  );
}
