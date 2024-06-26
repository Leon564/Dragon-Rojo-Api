import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('documents')
@ApiBearerAuth('JWT-auth')
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('create')
  async create(
    @Query() query: any,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    try {
      const buffer = await this.documentsService.generateDocument(query);
      const fileName = `${query.name} ${query.last_name}${
        query.pdf ? '.pdf' : '.docx'
      }`;
      const fileType =
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      res.writeHead(200, {
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Type': fileType,
      });

      res.end(buffer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.documentsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentsService.update(+id, updateDocumentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentsService.remove(id);
  }
}
