import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student/api')
export class StudentController {
    constructor(private readonly studentServices: StudentService) {}

    @Post('create')
    createStudent(@Body() body: any) {
        const student = this.studentServices.createStudent(body);

        return student;
    }

    @Get('get_student/:id')
    getStudentByIdController(@Param('id') id: string): any {
        const studentId = parseInt(id, 10);
        console.log(id, typeof id);
        return this.studentServices.getStudentById(studentId);
    }

    @Get('get_by_name')
    getStudentByName(@Body() body: { name: string }): any {
        return this.studentServices.getStudentByName(body?.name);
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
    updateStudent(@Param('id') id: string, @Body() body: any): any {
        const studentId = parseInt(id, 10);
        return this.studentServices.updateStudent(studentId, body);
    }

    @Post('delete')
    deleteStudent(): any {}
}
