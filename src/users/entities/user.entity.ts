import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as scheema } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  id: mongoose.Types.ObjectId;
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  lower_username: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: false })
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
