import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from 'src/entities/course.entity';
import { Repository } from 'typeorm';
import { CourseDto, CreateCourseDto, DeleteCourseDto } from './dto/course.dto';
import { StudentEntity } from 'src/entities/student.entity';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(CourseEntity)
        private readonly courseRepository: Repository<CourseEntity>,

        @InjectRepository(StudentEntity)
        private readonly studentRepository: Repository<StudentEntity>,
    ) {}

    async createCourse(courseData: CreateCourseDto): Promise<CourseDto> {
        const course = await this.courseRepository.findOne({ where: { name: courseData?.name } });

        if (course) throw new ConflictException();
        const newCourse = this.courseRepository.create(courseData);

        return await this.courseRepository.save(newCourse);
    }

    async getCourses(): Promise<CourseDto[]> {
        return this.courseRepository.find();
    }

    async getCourseById(courseData: number): Promise<CourseDto> {
        const course = await this.courseRepository.findOne({ where: { id: courseData } });

        if (course) return course;
        throw new NotFoundException();
    }

    async updateCourse(id: number, courseData: CreateCourseDto): Promise<CourseDto> {
        const course = await this.courseRepository.findOne({ where: { id: id } });

        if (!course) {
            throw new NotFoundException();
        }

        if (courseData.name) {
            const existingCourse = await this.courseRepository.findOne({
                where: { name: courseData.name },
            });

            if (existingCourse && existingCourse.id !== id) {
                throw new ConflictException();
            }
        }

        Object.assign(course, courseData);
        return await this.courseRepository.save(course);
    }

    async deleteCourse(courseData: DeleteCourseDto): Promise<boolean> {
        const course = await this.courseRepository.findOne({ where: { id: courseData.id } });
        if (!course) {
            return true;
        }

        const studentExist = await this.studentRepository.findOne({
            where: {
                classId: courseData,
            },
        });

        if (studentExist) {
            throw new BadRequestException();
        }

        await this.courseRepository.remove(course);
        return true;
    }
}
