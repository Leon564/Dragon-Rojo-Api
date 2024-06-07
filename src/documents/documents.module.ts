import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CertificateDocument,
  CertificateDocumentSchema,
} from './entities/document.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'documents', schema: CertificateDocumentSchema },
    ]),
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService],
})
export class DocumentsModule {}
