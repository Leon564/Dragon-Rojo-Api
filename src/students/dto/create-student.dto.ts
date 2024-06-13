import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  dateOfBirth: string;

  @IsNotEmpty()
  @ApiProperty()
  level: string;

  @ApiProperty()
  @IsOptional()
  weight?: string;

  @IsNotEmpty()
  @ApiProperty()
  gender: string;

  @ApiProperty()
  @IsOptional()
  carnet?: string;
}
