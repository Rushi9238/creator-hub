import { creatorAPI } from '../../services/creatorAPI';
import { 
  setCreators, 
  setLoading, 
  setError, 
  addCreator, 
  updateCreator,
  setSelectedCreator 
} from '../slices/creatorsSlice';

// Toast notification utility (you can use any toast library)
const showToast = (message, type = 'success') => {
  // Implement your toast notification here
  console[type === 'error' ? 'error' : 'log'](message);
};

export const fetchCreatorList = (params = {}) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    
    const response = await creatorAPI.getCreators(params);
    
    if (response.success) {
      dispatch(setCreators(response.data.creators));
      // You might want to store pagination info in state as well
      return response.data;
    } else {
      throw new Error(response.message || 'Failed to fetch creators');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch creators';
    dispatch(setError(errorMessage));
    showToast(errorMessage, 'error');
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchCreatorById = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await creatorAPI.getCreator(id);
    
    if (response.success) {
      dispatch(setSelectedCreator(response.data));
      return response.data;
    } else {
      throw new Error(response.message || 'Failed to fetch creator');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch creator';
    dispatch(setError(errorMessage));
    showToast(errorMessage, 'error');
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const createCreator = (creatorData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await creatorAPI.createCreator(creatorData);
    
    if (response.success) {
      dispatch(addCreator(response.data));
      showToast('Creator created successfully!');
      return response.data;
    } else {
      throw new Error(response.message || 'Failed to create creator');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to create creator';
    dispatch(setError(errorMessage));
    showToast(errorMessage, 'error');
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateCreatorFun = (creatorId, updates) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await creatorAPI.updateCreatorAPI(creatorId, updates);
    
    if (response.success) {
      dispatch(updateCreator(response.data));
      showToast('Creator updated successfully!');
      return response.data;
    } else {
      throw new Error(response.message || 'Failed to update creator');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to update creator';
    dispatch(setError(errorMessage));
    showToast(errorMessage, 'error');
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteCreatorFun = (creatorId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await creatorAPI.deleteCreator(creatorId);
    
    if (response.success) {
      // You'll need to add deleteCreator reducer
      showToast('Creator deleted successfully!');
      return response.data;
    } else {
      throw new Error(response.message || 'Failed to delete creator');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to delete creator';
    dispatch(setError(errorMessage));
    showToast(errorMessage, 'error');
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};
