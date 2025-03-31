import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
  {
    firstName: {type: String, required: [true, 'first name is required']},
    lastName: {type: String, required: [true, 'last name is required']},
    email: {type: String, required: [true, 'email is required']},
    mobile: {type: Number, required: [true, 'mobike is required']},
    password: {type: String, required: [true, 'password is required']},
    referralCode: {type: String, },
  },
  {timestamps: true},
);

const UserModal = mongoose.model('user', userSchema);

export default UserModal;
