import { Controller, Get, Post, Body, Param, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { CourseService, Course } from './course.service';
import { CourseDto } from './dto/course.dto';

@Controller('class/api')
export class CourseController {
    constructor(
        private readonly classServices: CourseService,
        private readonly courseDto: CourseDto,
    ) {}

    @Post('create')
    createCourseController(@Body(ValidationPipe) courseDto: CourseDto) {
        const newCourse = this.classServices.createCourse(courseDto);

        return newCourse;
    }

    @Get('get_courses')
    getStudentByName(): Promise<Course[]> {
        return this.classServices.getCourses();
    }

    @Get('get_course/:id')
    getStudentByIdController(@Param('id', ParseIntPipe) id: number): any {
        return this.classServices.getCourseById(id);
    }

    @Post('update/:id')
    updateCourseById(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) courseDto: CourseDto) {
        const updatedCourse = this.classServices.updateCourse(id, courseDto);

        return updatedCourse;
    }

    @Post('delete')
    deleteCourseById(@Body() body: any) {
        return this.classServices.deleteCourse(+body.id);
    }
}
