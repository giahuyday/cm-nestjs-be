import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDto, CreateCourseDto, DeleteCourseDto } from './dto/course.dto';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('class/api')
export class CourseController {
    constructor(private readonly classServices: CourseService) {}

    @Post('create')
    @Roles('admin', 'principal')
    async createCourseController(@Body() courseDto: CreateCourseDto): Promise<CourseDto> {
        const newCourse = await this.classServices.createCourse(courseDto);

        return newCourse;
    }

    @Get('get_courses')
    @Roles('admin', 'principal')
    getCourses(): any {
        return this.classServices.getCourses();
    }

    @Get('get_course/:id')
    @Roles('admin', 'principal')
    getCourseByIdController(@Param('id', ParseIntPipe) id: number): Promise<CourseDto> {
        return this.classServices.getCourseById(id);
    }

    @Post('update/:id')
    @Roles('admin', 'principal')
    updateCourseById(@Param('id', ParseIntPipe) id: number, @Body() courseDto: CreateCourseDto): Promise<CourseDto> {
        const updatedCourse = this.classServices.updateCourse(id, courseDto);

        return updatedCourse;
    }

    @Post('delete')
    @Roles('admin', 'principal')
    deleteCourseById(@Body() course: DeleteCourseDto): Promise<boolean> {
        return this.classServices.deleteCourse(course);
    }
}
