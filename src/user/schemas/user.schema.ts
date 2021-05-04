import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  active: { type: String, default: 'true' },
  password: { type: String, default: '' },
});
