import mongoose, { Document, Schema } from 'mongoose';

export interface ISocialLinks {
  instagram: string;
  dribbble: string;
  twitter: string;
}

export interface ICreator extends Document {
  name: string;
  email: string;
  title: string;
  bio: string;
  avatar: string;
  coverImage: string;
  followerCount: number;
  workCount: number;
  category: string;
  website: string;
  socialLinks: ISocialLinks;
  skills: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const socialLinksSchema = new Schema({
  instagram: { type: String, required: false },
  dribbble: { type: String, required: false },
  twitter: { type: String, required: false }
});

const creatorSchema = new Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  title: { 
    type: String, 
    required: [true, 'Title is required'],
    trim: true
  },
  bio: { 
    type: String, 
    required: false,
    trim: true
  },
  avatar: { 
    type: String, 
    required: false
  },
  coverImage: { 
    type: String, 
    required: false
  },
  followerCount: { 
    type: Number, 
    default: 0,
    min: 0
  },
  workCount: { 
    type: Number, 
    default: 0,
    min: 0
  },
  category: { 
    type: String, 
    required: [true, 'Category is required'],
    trim: true
  },
  website: { 
    type: String, 
    required: false,
    trim: true
  },
  socialLinks: socialLinksSchema,
  skills: [{ 
    type: String, 
    trim: true 
  }],
  featured: { 
    type: Boolean, 
    default: false 
  }
}, {
  timestamps: true
});

// Index for search functionality
creatorSchema.index({ 
  name: 'text', 
  category: 'text',
  title: 'text',
  bio: 'text'
});

// Index for category filtering
creatorSchema.index({ category: 1 });

export default mongoose.model<ICreator>('Creator', creatorSchema);