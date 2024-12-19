import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CourseDto {
    @IsString()
    @IsNotEmpty()
    private name: string;

    getCouseName() {
        return this.getCouseName;
    }
}

export class DeleteCourseDto {
    @IsInt()
    @IsNotEmpty()
    private id: number;

    getCourseId() {
        return this.id;
    }
}
