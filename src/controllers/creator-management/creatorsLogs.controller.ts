import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { getActivityLogs } from '../../services/activityLog.service';

interface AuthRequest extends Request {
  user?: any;
}

export const getAllActivityLogs = asyncHandler(async (req: AuthRequest, res: Response) => {

    const userId = await req.user._id;
    const userRole = await req.user.role;

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  const result = await getActivityLogs(page, limit, userRole === 'admin' ? undefined : userId);

  res.status(200).json({
    success: true,
    message:"Activity logs fetched successfully",
    data: result,
  });
});

export const userActivityLogs = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = await req.user._id;

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  const result = await getActivityLogs(page, limit, userId);

  res.status(200).json({
    success: true,
    message:"User activity logs fetched successfully",
    data: result,
  });
});
