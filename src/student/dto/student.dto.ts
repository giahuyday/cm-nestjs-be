import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class StudentDto {
    @IsString()
    private name: string;

    @IsInt()
    private classId: number;

    getStudentName() {
        return this.name;
    }

    getClassId() {
        return this.classId;
    }
}

export class CreateStudentDto {
    @IsString()
    private name: string;

    @IsString()
    @IsNotEmpty()
    private classId: number;

    getStudentName() {
        return this.name;
    }

    getClassId() {
        return this.classId;
    }
}

export class StudentByClassDto {
    @IsString()
    @IsNotEmpty()
    courseName: string;
}

export class UpdateStudentDto {
    @IsOptional()
    @IsString()
    private name: string;

    @IsOptional()
    @IsInt()
    private classId: number;

    getStudentName() {
        return this.name;
    }

    getClassId() {
        return this.classId;
    }
}

export class DeleteStudentDto {
    @IsInt()
    @IsNotEmpty()
    private id: number;

    getStudentId() {
        return this.id;
    }
}
