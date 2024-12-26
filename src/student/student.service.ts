import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from 'src/entities/student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto, DeleteStudentDto, StudentDto } from './dto/student.dto';
import { CourseEntity } from 'src/entities/course.entity';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(StudentEntity)
        private readonly studentRepository: Repository<StudentEntity>,

        @InjectRepository(CourseEntity)
        private readonly courseRepository: Repository<CourseEntity>,
    ) {}

    async createStudent(studentData: CreateStudentDto): Promise<any> {
        const student = await this.studentRepository.findOne({
            where: {
                name: studentData.name,
            },
        });

        const studentClass = await this.courseRepository.findOne({
            where: {
                id: studentData.classId,
            },
        });

        if (!student && studentClass) {
            const newStudent = this.studentRepository.create({
                name: studentData?.name,
                classId: studentClass,
            });

            return await this.studentRepository.save(newStudent);
        }

        throw new ConflictException();
    }

    async getStudents(): Promise<StudentDto[]> {
        return await this.studentRepository.find();
    }

    async getStudentById(studentData: number): Promise<StudentDto> {
        const student = await this.studentRepository.findOne({ where: { id: studentData } });
        if (!student) throw new NotFoundException();

        return student;
    }

    async getStudentByName(studentName: string): Promise<StudentDto[]> {
        const student = await this.studentRepository
            .createQueryBuilder('student')
            .where('student.name ilike :name', { name: `%${studentName}%` })
            .getMany();

        if (!student) throw new NotFoundException();

        return student;
    }

    async getStudentByClassName(courseName: string): Promise<StudentDto[]> {
        const studentClass = await this.courseRepository.findOne({ where: { name: courseName } });
        if (!studentClass) throw new NotFoundException();

        return await this.studentRepository.find({ where: { classId: studentClass } });
    }

    async updateStudent(id: number, studentData: any): Promise<StudentDto> {
        const student = await this.studentRepository.findOne({ where: { id: id } });

        if (!student) throw new NotFoundException();

        const nameCheck = await this.studentRepository.findOne({ where: { name: studentData.name } });
        if (nameCheck) throw new ConflictException();

        Object.assign(student, studentData);
        return await this.studentRepository.save(student);
    }

    async deleteStudent(studentData: DeleteStudentDto): Promise<boolean> {
        const student = await this.studentRepository.findOne({ where: { id: studentData.id } });

        if (!student) return true;
        await this.studentRepository.remove(student);

        return true;
    }
}
