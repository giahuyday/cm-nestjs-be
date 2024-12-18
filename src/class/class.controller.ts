import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ClassService } from './class.service';

@Controller('class/api')
export class ClassController {
    constructor(private readonly classServices: ClassService) {}

    @Post('create')
    createCourseController() {}

    @Get('get_courses')
    getStudentByName(): any {
        return this.classServices.getCourses();
    }

    @Get('get_student/:id')
    getStudentByIdController(@Param('id') id: string): any {
        const studentId = parseInt(id, 10);
        console.log(id, typeof id);
        return this.classServices.getCourseById(studentId);
    }
}
