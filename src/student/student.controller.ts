import { Controller, Get, Post, Body, Param, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto, CreateStudentDto, StudentByClassDto, UpdateStudentDto, DeleteStudentDto } from './dto/student.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { plainToInstance } from 'class-transformer';

@Controller('student/api')
export class StudentController {
    constructor(private readonly studentServices: StudentService) {}

    @Post('create')
    @Roles('admin', 'teacher')
    createStudent(@Body(ValidationPipe) studentDto: CreateStudentDto): Promise<StudentDto> {
        const student = this.studentServices.createStudent(studentDto);

        return student;
    }

    @Get('get_student/:id')
    @Roles('admin', 'principal')
    getStudentByIdController(@Param('id', ParseIntPipe) id: number): Promise<StudentDto> {
        return this.studentServices.getStudentById(id);
    }

    @Post('get_by_name')
    @Roles('admin', 'principal', 'teacher')
    getStudentByName(@Body(ValidationPipe) student: StudentByClassDto): Promise<StudentDto[]> {
        return this.studentServices.getStudentByName(student?.name);
    }

    @Post('get_by_classname')
    @Roles('admin', 'principal', 'teacher')
    getStudentByClassName(@Body(ValidationPipe) body: StudentByClassDto): Promise<StudentDto[]> {
        return this.studentServices.getStudentByClassName(body?.courseName);
    }

    @Get('get_students')
    @Roles('admin', 'principal', 'teacher')
    getAllStudent(): Promise<StudentDto[]> {
        return this.studentServices.getStudents();
    }

    @Post('update/:id')
    @Roles('admin', 'teacher')
    updateStudent(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) body: UpdateStudentDto,
    ): Promise<StudentDto> {
        return this.studentServices.updateStudent(id, body);
    }

    @Post('delete')
    @Roles('admin', 'teacher')
    deleteStudent(@Body(ValidationPipe) body: DeleteStudentDto): Promise<boolean> {
        const dto = plainToInstance(DeleteStudentDto, body);
        return this.studentServices.deleteStudent(body);
    }
}
