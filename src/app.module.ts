import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentController } from './student/student.controller';
import { StudentService } from './student/student.service';
import { ClassModule } from './class/class.module';
import { UtilsService } from './utils/utils.service';
import { UtilsModule } from './utils/utils.module';
import { StudentModule } from './student/student.module';

@Module({
    imports: [ClassModule, UtilsModule, StudentModule],
    controllers: [AppController, StudentController],
    providers: [AppService, StudentService, UtilsService],
})
export class AppModule {}
