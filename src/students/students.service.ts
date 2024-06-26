import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './entities/student.entity';
import { Model, Types } from 'mongoose';
import { PaginateModel, PaginateParams } from '@lib/utils/mongodb.utils';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  create(createStudentDto: CreateStudentDto) {
    console.log(createStudentDto);
    return this.studentModel.create(createStudentDto);
  }

  async findAll(query: any) {
    const params: PaginateParams = {
      limit: 30,
      page: 1,
      filter: {},
    };
    if (query.page) params.page = parseInt(query.page);
    if (query.limit) params.limit = parseInt(query.limit);
    if (query.sort) params.sort = query.sort;
    if (query.filter) params.filter = JSON.parse(query.filter);

    console.log(params);
    console.log(await PaginateModel(this.studentModel, params));
    return PaginateModel(this.studentModel, params);
  }

  findOne(id: string) {
    return this.studentModel.findById(new Types.ObjectId(id));
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    return this.studentModel.updateOne(
      { _id: new Types.ObjectId(id) },
      updateStudentDto,
    );
  }

  remove(id: string) {
    return this.studentModel.deleteOne({ _id: new Types.ObjectId(id) });
  }
}
