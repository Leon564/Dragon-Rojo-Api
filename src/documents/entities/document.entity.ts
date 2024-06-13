import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CertificateDocumentDocument = CertificateDocument & Document;

@Schema({ timestamps: true })
export class CertificateDocument extends Document {
  @Prop({ required: true })
  level: string;
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true })
  fullName: string;
  @Prop({ required: true })
  date: string;
  @Prop({ default: true })
  active: boolean;
}

export const CertificateDocumentSchema =
  SchemaFactory.createForClass(CertificateDocument);
