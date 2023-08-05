import { Schema, model } from 'mongoose';

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  image: String,
  role: {
    type: String,
    required: true,
    enum: ['ADMIN', 'USER'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { password, __v, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

export default model('User', UserSchema);
