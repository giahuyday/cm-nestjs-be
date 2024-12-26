import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CourseDto } from 'src/course/dto/course.dto';
import { CourseEntity } from 'src/entities/course.entity';

export class StudentDto {
    @IsInt()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    classId: CourseEntity;
}

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsNotEmpty()
    classId: number;
}

export class StudentByClassDto {
    @IsOptional()
    @IsString()
    courseName: string;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    class: CourseDto;
}

export class UpdateStudentDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsInt()
    classId: number;
}

export class DeleteStudentDto {
    @IsInt()
    @IsNotEmpty()
    id: number;
}
