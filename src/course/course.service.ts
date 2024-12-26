import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from 'src/entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(CourseEntity)
        private readonly courseRepository: Repository<CourseEntity>,
    ) {}

    async createCourse(courseData: string) {
        const course = this.courseRepository.create({ name: courseData });

        return await this.courseRepository.save(course);
    }

    async getCourses() {
        return this.courseRepository.find();
    }

    getCourseById = (courseId: number) => {
        return this.courseRepository.findOne({ where: { id: courseId } });
    };

    async updateCourse(id: number, courseData: any) {
        const course = await this.courseRepository.findOne({ where: { id } });
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

    async deleteCourse(courseId: number) {
        const course = await this.courseRepository.findOne({ where: { id: courseId } });
        if (!course) {
            return true;
        }
        await this.courseRepository.remove(course);
        return true;
    }
}
