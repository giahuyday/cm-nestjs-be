import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

// Define length and constraints for each column data
export class CourseDto {
    @IsInt()
    @Min(1)
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;
}

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;
}

export class DeleteCourseDto {
    @IsInt()
    @Min(1)
    @IsNotEmpty()
    id: number;
}
