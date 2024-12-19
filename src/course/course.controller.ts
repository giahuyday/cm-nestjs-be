import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('class/api')
export class CourseController {
    constructor(private readonly classServices: CourseService) {}

    @Post('create')
    createCourseController(@Body() body: any) {
        const newCourse = this.classServices.createCourse(body);

        return newCourse;
    }

    @Get('get_courses')
    getStudentByName(): any {
        return this.classServices.getCourses();
    }

    @Get('get_course/:id')
    getStudentByIdController(@Param('id') id: string): any {
        const studentId = parseInt(id, 10);

        return this.classServices.getCourseById(studentId);
    }

    @Post('update/:id')
    updateCourseById(@Param() id: string, @Body() body: any) {
        const updatedCourse = this.classServices.updateCourse(parseInt(id, 10), body);
    }
    @Post('delete')
    deleteCourseById(@Body() id: string) {
        return this.classServices.deleteCourse(parseInt(id, 10));
    }
}
