import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: String,
  college: String,
  rollNo: String,
  program: String,
  stream: String,
  enrollmentYear: Number,
  backlogs: Number,
  cgpa: Number,
  email: String,
  phone: String,
  sex: String,
  dob: String,
  nationality: String,
  profilePic: String, // URL or path to the profile picture
});

export default model('User', UserSchema);
