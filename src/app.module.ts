import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentController } from './student/student.controller';
import { StudentService } from './student/student.service';
import { CourseModule } from './course/course.module';
import { UtilsModule } from './utils/utils.module';
import { StudentModule } from './student/student.module';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { StudentGuard } from './guards/student.guards';

@Module({
    imports: [CourseModule, UtilsModule, StudentModule],
    controllers: [AppController, StudentController],
    providers: [
        AppService,
        StudentService,
        Reflector,
        {
            provide: APP_GUARD,
            useClass: StudentGuard,
        },
    ],
})
export class AppModule {}
