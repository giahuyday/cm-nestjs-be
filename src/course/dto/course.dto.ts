import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CourseDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    private name: string;

    getCourseName() {
        return this.name;
    }
}
