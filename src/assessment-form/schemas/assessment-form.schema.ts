import { Schema } from 'mongoose';

export const AssessmentFormSchema = new Schema(
  {
    userId: { type: String },
    draft: { type: Boolean },
    any: Schema.Types.Mixed,
    date: {type:Date,default:new Date()}
  },
  { strict: false },
  
);

// {
//   timestamps: true,
// }
