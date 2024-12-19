import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentController } from './student/student.controller';
import { StudentService } from './student/student.service';
import { CourseModule } from './course/course.module';
import { UtilsService } from './utils/utils.service';
import { UtilsModule } from './utils/utils.module';
import { StudentModule } from './student/student.module';
import { StudentDto } from './student/dto/student.dto';

@Module({
    imports: [CourseModule, UtilsModule, StudentModule],
    controllers: [AppController, StudentController],
    providers: [AppService, StudentService, UtilsService, StudentDto],
})
export class AppModule {}
