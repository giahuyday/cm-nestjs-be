import { Global, Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CourseDto } from './dto/course.dto';

@Global()
@Module({
    providers: [CourseService, CourseDto],
    controllers: [CourseController],
})
export class CourseModule {}
