import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './entities/student.entity';
import { Model, Types } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { PaginateModel, PaginateParams } from '@lib/utils/mongodb.utils';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private userModel: Model<UserDocument>,
  ) {}

  create(createStudentDto: CreateStudentDto) {
    console.log(createStudentDto);
    return this.userModel.create(createStudentDto);
  }

  findAll(query: any) {
    const params: PaginateParams = {
      limit: 30,
      page: 1,
      filter: {},
      ...query,
    };
    return PaginateModel(this.userModel, params);
  }

  findOne(id: string) {
    return this.userModel.findById(new Types.ObjectId(id));
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    return this.userModel.updateOne(
      { _id: new Types.ObjectId(id) },
      updateStudentDto,
    );
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: new Types.ObjectId(id) });
  }
}
