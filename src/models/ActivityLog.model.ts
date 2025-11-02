import mongoose, { Document, Schema } from 'mongoose';

export interface IActivityLog extends Document {
  action: string;
  modelId: mongoose.Types.ObjectId;
  description: string;
  performedBy: mongoose.Types.ObjectId;
  userRole: string;
  changes?: any;
  createdAt: Date;
}

const activityLogSchema = new Schema({
  action: {
    type: String,
    required: true
  },
  modelId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  performedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userRole: {
    type: String,
    required: true
  },
  changes: Schema.Types.Mixed
}, {
  timestamps: true
});

export default mongoose.model<IActivityLog>('ActivityLog', activityLogSchema);