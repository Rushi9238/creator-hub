import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CreatorForm from '../components/CreatorForm';
import { updateCreator } from '../store/slices/creatorsSlice';
import { fetchCreatorById, updateCreatorFun } from '../store/thunks/creatorThunk';
import { useState,useEffect } from 'react';

export default function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [creator,setCreator]=useState(null)

  useEffect(()=>{
    if(id){
      fetchSignleCreator()
    }
  },[id])

  const fetchSignleCreator=async()=>{
   const data= await dispatch(fetchCreatorById(id))
   if(data){
    setCreator(data)
   }
  }

  if (!creator) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">Creator not found</p>
        <Link to="/dashboard" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Back to Creators
        </Link>
      </div>
    );
  }

  const handleSubmit = async(data) => {
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
        const data= await dispatch(updateCreatorFun(id,formData))
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
