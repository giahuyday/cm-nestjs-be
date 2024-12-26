import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CourseDto {
    @IsInt()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;
}

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}

export class DeleteCourseDto {
    @IsInt()
    @IsNotEmpty()
    id: number;
}
