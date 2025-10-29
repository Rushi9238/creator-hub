import { Request, Response } from 'express';
import Creator, { ICreator } from '../../models/Creator.model';
import { asyncHandler } from '../../utils/asyncHandler';
import { isValidURL } from '../../utils/checkValidURL';
import { isValidEmail } from '../../utils/checkEmailValidation';

interface QueryParams {
  page?: string;
  limit?: string;
  search?: string;
  category?: string;
}

export const getCreators = asyncHandler(
  async (req: Request<{}, {}, {}, QueryParams>, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const { search, category } = req.query;

    const filter: any = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
        { bio: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }

    const creators = await Creator.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);

    const total = await Creator.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    const responseData = {
      creators,
      pagination: {
        currentPage: page,
        totalPages,
        totalCreators: total,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };

    return res.status(200).json({
      success: true,
      message: 'Creator list fetched successfully',
      data: responseData,
    });
  },
);

export const createCreator = asyncHandler(async (req: Request, res: Response) => {
  const creatorData: Partial<ICreator> = await req.body;

  // Check if required fields are provided
  const requiredFields: (keyof ICreator)[] = ['name', 'email', 'title', 'category'];
  for (let field of requiredFields) {
    if (!creatorData[field]) {
      return res.status(400).json({ success: false, message: `${field} is required`, data: null });
    }
  }

  // Check if email is in a valid format
  if (creatorData.email && !isValidEmail(creatorData.email)) {
    return res.status(400).json({ success: false, message: 'Invalid email format', data: null });
  }

  // Check if email already exists
  const existingCreator = await Creator.findOne({ email: creatorData.email });
  if (existingCreator) {
    return res
      .status(400)
      .json({ success: false, message: 'Creator with this email already exists', data: null });
  }

  // Check if social links (if provided) are valid URLs
  if (creatorData.socialLinks) {
    const { instagram, dribbble, twitter } = creatorData.socialLinks;
    if (instagram && !isValidURL(instagram)) {
      return res.status(400).json({ success: false, message: 'Invalid Instagram URL', data: null });
    }
    if (dribbble && !isValidURL(dribbble)) {
      return res.status(400).json({ success: false, message: 'Invalid Dribbble URL', data: null });
    }
    if (twitter && !isValidURL(twitter)) {
      return res.status(400).json({ success: false, message: 'Invalid Twitter URL', data: null });
    }
  }

  // Check if skills (if provided) are an array of strings
  if (creatorData.skills && typeof creatorData.skills === 'string') {
    try {
      const parsedSkills: string[] = JSON.parse(creatorData.skills); // Explicitly define type as string[]
      if (Array.isArray(parsedSkills)) {
        creatorData.skills = parsedSkills;
      } else {
        return res
          .status(400)
          .json({ success: false, message: 'Skills must be an array of strings', data: null });
      }
    } catch (e) {
      return res
        .status(400)
        .json({ success: false, message: 'Skills must be a valid JSON array', data: null });
    }
  } 

  // Validate followerCount and workCount are non-negative integers
  if (creatorData.followerCount && creatorData.followerCount < 0) {
    return res
      .status(400)
      .json({ success: false, message: 'Follower count cannot be negative', data: null });
  }
  if (creatorData.workCount && creatorData.workCount < 0) {
    return res
      .status(400)
      .json({ success: false, message: 'Work count cannot be negative', data: null });
  }

  const creator = new Creator(creatorData);
  await creator.save();

  res.status(201).json({
    success: true,
    message: 'Creator create successfully',
    data: creator,
  });
});

export const getCreatorByID = asyncHandler(async (req: Request, res: Response) => {
  const creatorId = req.params.id;

  // Check if creator exists
  const creator = await Creator.findById(creatorId);
  if (!creator) {
    return res.status(404).json({
      success: false,
      message: 'Creator not found',
      data: null,
    });
  }

  // send response
  res.status(200).json({
    success: true,
    message: 'Creator updated successfully',
    data: creator,
  });
});

export const updateCreator = asyncHandler(async (req: Request, res: Response) => {
  const creatorId = req.params.id;

  // Check if creator exists
  const creator = await Creator.findById(creatorId);
  if (!creator) {
    return res.status(404).json({
      success: false,
      message: 'Creator not found',
      data: null,
    });
  }

  const creatorData: Partial<ICreator> = req.body;

  // Check if required fields are provided (for updates, we may not require all of them)
  // But, if provided, we should validate them
  if (creatorData.email && !isValidEmail(creatorData.email)) {
    return res.status(400).json({ success: false, message: 'Invalid email format', data: null });
  }

  // Check if email already exists (for a different creator)
  if (creatorData.email && creatorData.email !== creator.email) {
    const existingCreator = await Creator.findOne({ email: creatorData.email });
    if (existingCreator) {
      return res
        .status(400)
        .json({ success: false, message: 'Creator with this email already exists', data: null });
    }
  }

  // Check if social links (if provided) are valid URLs
  if (creatorData.socialLinks) {
    const { instagram, dribbble, twitter } = creatorData.socialLinks;
    if (instagram && !isValidURL(instagram)) {
      return res.status(400).json({ success: false, message: 'Invalid Instagram URL', data: null });
    }
    if (dribbble && !isValidURL(dribbble)) {
      return res.status(400).json({ success: false, message: 'Invalid Dribbble URL', data: null });
    }
    if (twitter && !isValidURL(twitter)) {
      return res.status(400).json({ success: false, message: 'Invalid Twitter URL', data: null });
    }
  }

   // Check if skills (if provided) are an array of strings
  if (creatorData.skills && typeof creatorData.skills === 'string') {
    try {
      const parsedSkills: string[] = JSON.parse(creatorData.skills); // Explicitly define type as string[]
      if (Array.isArray(parsedSkills)) {
        creatorData.skills = parsedSkills;
      } else {
        return res
          .status(400)
          .json({ success: false, message: 'Skills must be an array of strings', data: null });
      }
    } catch (e) {
      return res
        .status(400)
        .json({ success: false, message: 'Skills must be a valid JSON array', data: null });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: 'Skills must be provided as a JSON string array',
      data: null,
    });
  }

  // Validate followerCount and workCount are non-negative integers
  if (creatorData.followerCount && creatorData.followerCount < 0) {
    return res
      .status(400)
      .json({ success: false, message: 'Follower count cannot be negative', data: null });
  }
  if (creatorData.workCount && creatorData.workCount < 0) {
    return res
      .status(400)
      .json({ success: false, message: 'Work count cannot be negative', data: null });
  }

  // Update the creator document with the new data
  Object.assign(creator, creatorData); // This applies only the fields provided

  // Save the updated creator
  await creator.save();

  res.status(200).json({
    success: true,
    message: 'Creator updated successfully',
    data: creator,
  });
});

export const deleteCreator = asyncHandler(async (req: Request, res: Response) => {
  const creatorId = req.params.id;

  // Use findOneAndDelete to find the creator and delete it in one operation
  const creator = await Creator.findOneAndDelete({ _id: creatorId });

  if (!creator) {
    return res.status(404).json({
      success: false,
      message: 'Creator not found',
      data: null,
    });
  }

  res.status(200).json({
    success: true,
    message: 'Creator deleted successfully',
    data: null,
  });
});
