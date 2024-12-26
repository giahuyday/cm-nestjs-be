import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CourseDto {
    @IsString()
    @IsNotEmpty()
    private name: string;

    // Getter để lấy giá trị của name
    getName(): string {
        return this.name;
    }

    // Setter (nếu cần)
    setName(name: string): void {
        this.name = name;
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
