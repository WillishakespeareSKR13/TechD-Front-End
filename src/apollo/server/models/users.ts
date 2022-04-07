import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'company';
  photo: string;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default:
        'https://via.placeholder.com/300/fff?text=No+Photo+Available.png',
    },
    role: {
      type: String,
      enum: ['user', 'company'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.set('toJSON', {
  virtuals: true,
});

export default mongoose.models.User ||
  mongoose.model<IUser>('User', UserSchema);
