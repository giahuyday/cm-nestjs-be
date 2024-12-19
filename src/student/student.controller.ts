import { Controller, Get, Post, Body, Param, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { StudentService, Student } from './student.service';
import { StudentDto } from './dto/student.dto';
import { plainToInstance } from 'class-transformer';

@Controller('student/api')
export class StudentController {
    constructor(
        private readonly studentServices: StudentService,
        private readonly studentDto: StudentDto,
    ) {}

    @Post('create')
    createStudent(@Body(ValidationPipe) studentDto: StudentDto): Promise<Student> {
        const student = this.studentServices.createStudent(studentDto);

        return student;
    }

    @Get('get_student/:id')
    getStudentByIdController(@Param('id', ParseIntPipe) id: number): any {
        return this.studentServices.getStudentById(id);
    }

    @Get('get_by_name')
    getStudentByName(@Body(ValidationPipe) student: { name: string }): any {
        const dto = plainToInstance(StudentDto, student);
        return this.studentServices.getStudentByName(dto?.getCourseName());
    }

    @Get('get_by_classname')
    getStudentByClassName(@Body() body: { courseName: string }): any {
        return this.studentServices.getStudentByClassName(body?.courseName);
    }

    @Get('get_students')
    getAllStudent(): any {
        return this.studentServices.getStudents();
    }

    @Post('update/:id')
    updateStudent(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) body: StudentDto): any {
        return this.studentServices.updateStudent(id, body);
    }

    @Post('delete')
    deleteStudent(@Body() body: any): any {
        return this.studentServices.deleteStudent(body?.id);
    }
}
