import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  creators: [],
  selectedCreator: null,
  loading: false,
  error: null,
  activityLogs:[],
  loadingActivityLogs:false
};

const creatorsSlice = createSlice({
  name: 'creators',
  initialState,
  reducers: {
    setCreators:(state,action)=>{
 state.creators = action.payload;
    },
    setSelectedCreator: (state, action) => {
      state.selectedCreator = action.payload;
    },
    addCreator: (state, action) => {
      state.creators.push(action.payload);
    },
    updateCreator: (state, action) => {
      const index = state.creators.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.creators[index] = action.payload;
      }
      if (state.selectedCreator?.id === action.payload.id) {
        state.selectedCreator = action.payload;
      }
    },
    deleteCreator: (state, action) => {
      state.creators = state.creators.filter((c) => c.id !== action.payload);
      if (state.selectedCreator?.id === action.payload) {
        state.selectedCreator = null;
      }
    },
    toggleFeatured: (state, action) => {
      const creator = state.creators.find((c) => c.id === action.payload);
      if (creator) {
        creator.featured = !creator.featured;
      }
      if (state.selectedCreator?.id === action.payload) {
        state.selectedCreator.featured = !state.selectedCreator.featured;
      }
    },
      setLoading: (state, action) => {
        
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setActivtyLogs:(state,action)=>{
      state.activityLogs=action.payload
    },
    setLoadingActivityLogs:(state,action)=>{
      state.loadingActivityLogs=action.payload
    }
  },
});

export const { setCreators, setSelectedCreator, addCreator, updateCreator, deleteCreator, toggleFeatured,setLoading,setError,setActivtyLogs,setLoadingActivityLogs } =
  creatorsSlice.actions;
export default creatorsSlice.reducer;
