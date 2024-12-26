import { Global, Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { StudentEntity } from 'src/entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from 'src/entities/course.entity';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([StudentEntity, CourseEntity])],
    providers: [StudentService],
    controllers: [StudentController],
})
export class StudentModule {}
