import { Controller, Get, Post, Body, Param, ParseIntPipe, ValidationPipe, SetMetadata } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDto, DeleteCourseDto } from './dto/course.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { plainToInstance } from 'class-transformer';

@Controller('class/api')
export class CourseController {
    constructor(private readonly classServices: CourseService) {}

    @Post('create')
    @Roles('admin', 'principal')
    createCourseController(@Body(ValidationPipe) courseDto: CourseDto) {
        const dto = plainToInstance(CourseDto, courseDto);
        const newCourse = this.classServices.createCourse(dto.getName());

        return newCourse;
    }

    @Get('get_courses')
    @Roles('admin', 'principal')
    getCourses(): any {
        return this.classServices.getCourses();
    }

    @Get('get_course/:id')
    @Roles('admin', 'principal')
    getCourseByIdController(@Param('id', ParseIntPipe) id: number): any {
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
    deleteCourseById(@Body(ValidationPipe) body: DeleteCourseDto) {
        const dto = plainToInstance(DeleteCourseDto, body);
        return this.classServices.deleteCourse(dto.getCourseId());
    }
}
