import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const userSchema = new Schema<TUser, UserModel>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password: {
    type: String,
    required: true,
    select:0
  },
  needsPasswordChange: {
    type: Boolean,
    default: true,
    
  },
  passwordChangeAt:{
 type:Date,
  },
  role: {
    type: String,
    enum: ['student', 'faculty', 'admin'],
  },
  status: {
    type: String,
    enum: ['in-progress', 'blocked'],
    default: 'in-progress',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.salt_round));
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  
  
return await userModel.findOne({ id }).select('+password');

 
};
// userSchema.statics.isUserDeleted = async function()
userSchema.statics.isDeleted = async function (isDeleted) {
  return await userModel.findOne({ isDeleted });
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChange = function(passwordChagedTimestap:Date,jwtissuedTimeStap:number){
  const passwrodChangedTime = new Date(passwordChagedTimestap).getTime()/1000
  return passwrodChangedTime>jwtissuedTimeStap
}


export const userModel = model<TUser, UserModel>('user', userSchema);
