import { Controller, Get, Post, Body, Param, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { StudentService, Student } from './student.service';
import { StudentDto, CreateStudentDto, StudentByClassDto, UpdateStudentDto, DeleteStudentDto } from './dto/student.dto';
import { plainToInstance } from 'class-transformer';
import { Roles } from 'src/common/decorators/roles.decorator';
import bodyParser from 'body-parser';

@Controller('student/api')
export class StudentController {
    constructor(private readonly studentServices: StudentService) {}

    @Post('create')
    @Roles('admin', 'teacher')
    createStudent(@Body(ValidationPipe) studentDto: CreateStudentDto): Promise<Student> {
        const student = this.studentServices.createStudent(studentDto);

        return student;
    }

    @Get('get_student/:id')
    @Roles('admin', 'principal')
    getStudentByIdController(@Param('id', ParseIntPipe) id: number): any {
        return this.studentServices.getStudentById(id);
    }

    @Get('get_by_name')
    @Roles('admin', 'principal', 'teacher')
    getStudentByName(@Body(ValidationPipe) student: StudentDto): any {
        const dto = plainToInstance(StudentDto, student);
        return this.studentServices.getStudentByName(dto?.getStudentName());
    }

    @Get('get_by_classname')
    @Roles('admin', 'principal', 'teacher')
    getStudentByClassName(@Body(ValidationPipe) body: StudentByClassDto): Promise<StudentDto> {
        return this.studentServices.getStudentByClassName(body?.courseName);
    }

    @Get('get_students')
    @Roles('admin', 'principal', 'teacher')
    getAllStudent(): any {
        return this.studentServices.getStudents();
    }

    @Post('update/:id')
    @Roles('admin', 'teacher')
    updateStudent(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) body: UpdateStudentDto): any {
        return this.studentServices.updateStudent(id, body);
    }

    @Post('delete')
    @Roles('admin', 'teacher')
    deleteStudent(@Body(ValidationPipe) body: DeleteStudentDto): any {
        const dto = plainToInstance(DeleteStudentDto, body);
        return this.studentServices.deleteStudent(dto.getStudentId());
    }
}
