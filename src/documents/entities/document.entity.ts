import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CertificateDocumentDocument = CertificateDocument & Document;

@Schema({ timestamps: true })
export class CertificateDocument extends Document {
  @Prop({ required: true })
  level: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true })
  date: string;
}

export const CertificateDocumentSchema =
  SchemaFactory.createForClass(CertificateDocument);
