import { Response, NextFunction } from 'express';
import Creator from '../models/Creator.model';
import { AuthRequest } from '../types/express';
import { asyncHandler } from '../utils/asyncHandler';

export const checkCreatorOwnerOrAdmin  = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const creatorId = req.params.id;

    // check creator id comes from req params
    if (!creatorId) {
      return res.status(400).json({
        success: false,
        message: 'Creator ID is required',
        data: null,
      });
    }

    // Check if creator exists
    const creator = await Creator.findById(creatorId).populate('createdBy');
    if (!creator) {
      return res.status(404).json({
        success: false,
        message: 'Creator not found',
        data: null,
      });
    }

    // check if creator role is admin or not
    if (req.user.role === 'admin') {
      return next();
    }

    // check if user is creator owner or not
    if (creator.createdBy && creator.createdBy._id.toString() === req.user._id.toString()) {
      return next();
    }

    // user not authorized for perform this 403
    return res.status(403).json({
      success: false,
      message: 'Access denied. Only creator owner or admin can perform this action',
      data: null,
    });
  },
);
