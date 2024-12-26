import { Global, Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CourseDto } from './dto/course.dto';
import { CourseEntity } from 'src/entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
    @Module({
    imports: [TypeOrmModule.forFeature([CourseEntity])],
    providers: [CourseService],
    controllers: [CourseController],
})
export class CourseModule {}
