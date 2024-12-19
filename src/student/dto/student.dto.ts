import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class StudentDto {
    @IsString()
    @IsNotEmpty()
    private name: string;

    @IsInt()
    @IsNotEmpty()
    private classId: number;

    getCourseName() {
        return this.name;
    }

    getClassId() {
        return this.classId;
    }
}
