import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { CourseDto } from 'src/course/dto/course.dto';
import { CourseEntity } from 'src/entities/course.entity';

export class StudentDto {
    @IsInt()
    @IsNotEmpty()
    @Min(1)
    id: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @IsOptional()
    classId: CourseEntity;
}

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    classId: number;
}

export class StudentByClassDto {
    @IsOptional()
    @IsString()
    @MaxLength(255)
    courseName: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    name: string;

    @IsOptional()
    class: CourseDto;
}

export class UpdateStudentDto {
    @IsOptional()
    @IsString()
    @MaxLength(255)
    name: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    classId: number;
}

export class DeleteStudentDto {
    @IsInt()
    @IsNotEmpty()
    @Min(1)
    id: number;
}
