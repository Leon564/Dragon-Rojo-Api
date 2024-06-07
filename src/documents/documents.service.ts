import { Injectable } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { wordToPdf } from '@lib/utils/docxToPdf';
import { templates } from '@lib/templates';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import moment from 'moment';
import { InjectModel } from '@nestjs/mongoose';
import { CertificateDocument } from './entities/document.entity';
import { Model } from 'mongoose';
import { PaginateModel, PaginateParams } from '../../libs/utils/mongodb.utils';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel('documents')
    private readonly documentModel: Model<CertificateDocument>,
  ) {}

  async generateDocument(data: any): Promise<Buffer | string> {
    if (
      !data.lvl ||
      !data.name ||
      !data.last_name ||
      !data.date
      // !data.month ||
      // !data.year
    ) {
      throw new Error('error data');
    }
    const month = moment(data.date)
      .locale('ES-SV')
      .format('MMMM')
      .replace(/^\w/, (c) => c.toUpperCase());
    data.month = month;
    data.day = moment(data.date).format('DD');
    data.year = moment(data.date).format('YYYY');

    if (data.name.length + data.last_name.length < 18) {
      data.last_name = '  ' + data.last_name.split(' ').join('  ');
      data.name = '\t' + data.name.split(' ').join('  ');
    }

    const file = templates[data.lvl];
    if (!file) throw new Error('error template');

    const content = fs.readFileSync(path.resolve(file), 'binary');
    const zip = new PizZip(content);

    const doc = new Docxtemplater();
    doc.loadZip(zip);

    doc.setData(data);

    try {
      doc.render();
    } catch (error) {
      const e = {
        message: error.message,
        name: error.name,
        stack: error.stack,
        properties: error.properties,
      };
      console.log(JSON.stringify({ error: e }));
      throw error;
    }

    const buffer = doc.getZip().generate({ type: 'nodebuffer' });

    this.documentModel.create({
      date: data.date,
      name: data.name,
      lastName: data.last_name,
      level: data.lvl,
    });

    if (!data.pdf) {
      console.log('Generating DOCX');
      return buffer;
    }

    console.log('Generating PDF');
    const pdfBuffer: any = await wordToPdf(buffer);

    if (pdfBuffer.error) {
      throw new Error('error converting pdf');
    }

    return pdfBuffer;
  }
  create(createDocumentDto: CreateDocumentDto) {
    return 'This action adds a new document';
  }

  async findAll() {
    const params: PaginateParams = {
      limit: 10,
      page: 1,
      filter: {},
    };
    return await PaginateModel(this.documentModel, params);
  }

  findOne(id: number) {
    return `This action returns a #${id} document`;
  }

  update(id: number, updateDocumentDto: UpdateDocumentDto) {
    return `This action updates a #${id} document`;
  }

  remove(id: number) {
    return `This action removes a #${id} document`;
  }
}
