import { Global, Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { StudentDto } from './dto/student.dto';

@Global()
@Module({
    providers: [StudentService, StudentDto],
    controllers: [StudentController],
})
export class StudentModule {}
