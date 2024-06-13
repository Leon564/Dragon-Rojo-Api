import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema({
  timestamps: true,
})
export class Student {
  _id: mongoose.Types.ObjectId;
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true })
  dateOfBirth: string;
  @Prop({ required: true })
  level: string;
  @Prop({ required: false })
  weight: string;
  @Prop({ required: true })
  gender: string;
  @Prop({ required: false })
  carnet: string;
  @Prop({ default: true })
  active: boolean;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
