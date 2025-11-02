import ActivityLog from "../models/ActivityLog.model";

// Log creator creation
export const logCreatorCreation = async (creator: any, user: any) => {
  return await ActivityLog.create({
    action: 'create',
    modelId: creator._id,
    description: `Created creator: ${creator.name}`,
    performedBy: user._id,
    userRole: user.role,
    changes: { after: creator }
  });
};

// Log creator update
export const logCreatorUpdate = async (creatorId: any, before: any, after: any, user: any) => {
  return await ActivityLog.create({
    action: 'update',
    modelId: creatorId,
    description: `Updated creator: ${before.name}`,
    performedBy: user._id,
    userRole: user.role,
    changes: { before, after }
  });
};

// Log creator deletion
export const logCreatorDeletion = async (creator: any, user: any) => {
  return await ActivityLog.create({
    action: 'delete',
    model: 'Creator',
    modelId: creator._id,
    description: `Deleted creator: ${creator.name}`,
    performedBy: user._id,
    userRole: user.role,
    changes: { before: creator }
  });
};

// Get activity logs
export const getActivityLogs = async (page: number = 1, limit: number = 20, userId?: string) => {
  const skip = (page - 1) * limit;
  
  const query = userId ? { performedBy: userId } : {};
  
  const logs = await ActivityLog.find(query)
    .populate('performedBy', 'name email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await ActivityLog.countDocuments(query);

  return {
    logs,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
};