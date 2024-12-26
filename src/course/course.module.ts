import { Global, Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CourseEntity } from 'src/entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from 'src/entities/student.entity';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([CourseEntity, StudentEntity])],
    providers: [CourseService],
    controllers: [CourseController],
})
export class CourseModule {}
