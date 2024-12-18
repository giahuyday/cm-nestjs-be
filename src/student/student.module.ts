import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { UtilsService } from 'src/utils/utils.service';

@Module({
    providers: [StudentService, UtilsService],
})
export class StudentModule {}
