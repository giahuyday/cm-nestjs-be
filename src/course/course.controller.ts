import { Controller, Get, Post, Body, Param, ParseIntPipe, ValidationPipe, SetMetadata } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDto } from './dto/course.dto';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('class/api')
export class CourseController {
    constructor(private readonly classServices: CourseService) {}

    @Post('create')
    @Roles('admin', 'principal')
    createCourseController(@Body(ValidationPipe) courseDto: CourseDto) {
        const newCourse = this.classServices.createCourse(courseDto);

        return newCourse;
    }

    @Get('get_courses')
    @Roles('admin', 'principal')
    getCourses(): Promise<CourseDto> {
        return this.classServices.getCourses();
    }

    @Get('get_course/:id')
    @Roles('admin', 'principal')
    getCourseByIdController(@Param('id', ParseIntPipe) id: number): Promise<CourseDto> {
        return this.classServices.getCourseById(id);
    }

    @Post('update/:id')
    @Roles('admin', 'principal')
    updateCourseById(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) courseDto: CourseDto) {
        const updatedCourse = this.classServices.updateCourse(id, courseDto);

        return updatedCourse;
    }

    @Post('delete')
    @Roles('admin', 'principal')
    deleteCourseById(@Body() body: any) {
        return this.classServices.deleteCourse(+body.id);
    }
}
