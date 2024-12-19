import { IsNotEmpty, IsString } from 'class-validator';

export class CourseDto {
    @IsString()
    @IsNotEmpty()
    private name: string;

    getCourseName() {
        return this.name;
    }
}
