import { Injectable } from '@nestjs/common';
import { UtilsService } from 'src/utils/utils.service';

type Class = {
    id: number;
    name: string;
};

@Injectable()
export class ClassService {
    constructor(private readonly utilService: UtilsService) {}

    public class: Class[] = [
        {
            id: 1,
            name: 'Computer Science 101',
        },
        {
            id: 2,
            name: 'Mathematics 102',
        },
        {
            id: 3,
            name: 'OOP',
        },
    ];

    createCourse = (courseData: any) => {
        try {
            const courses = this.utilService.readData();
            const coursesLen = courses['classes'].length > 0 ? courses['classes'].length - 1 : 0;

            // get id of last element +1 to ensure that next id is increase in case some courses was deleted
            const newId = coursesLen > 0 ? courses['classes'][coursesLen].id : 1;
            const newCourse = {
                id: newId,
                name: courseData?.name,
            }; //check lại 1 case id

            courses['classes'].push(newCourse);
            this.utilService.writeData(courses); // Lưu dữ liệu vào file JSON
            const idx = courses['classes'].length - 1;

            return courses['classes'][idx];
        } catch (error) {
            console.log(error);
        }
    };

    getCourses = () => {
        const courses = this.utilService.readData()['classes'];

        return courses;
    };

    getCourseById = (courseId: number) => {
        try {
            const courses = this.utilService.readData()['classes'];
            const course = courses.filter((course) => course.id == courseId);

            if (course.length > 0) {
                return course;
            } else {
                return { status: 'NOT FOUND' };
            }
        } catch (error) {
            console.log(error);
        }
    };

    updateCourse = (id: number, courseData: any) => {
        try {
            const courses = this.utilService.readData();
            const courseIdx = courses['classes'].findIndex((course) => course.id === Number(id));

            if (courseIdx !== -1 && !this.utilService.checkCourseName(courses['classes'], courseData?.name)) {
                courses['classes'][courseIdx] = { ...courses['classes'][courseIdx], ...courseData };
                this.utilService.writeData(courses);

                return courses['classes'][courseIdx];
            } else {
                return { status: 'Class name is existed or cannot update' };
            }
        } catch (error) {
            console.log(error);
        }
    };

    deleteCourse = (courseId: any) => {
        try {
            const courses = this.utilService.readData();
            const courseIdx = courses['classes'].findIndex((course: { id: number }) => course.id === Number(courseId));
            const checkEnrolledStudent = this.utilService.checkEnrolledStudents(courses['students'], Number(courseId));

            if (courseIdx !== -1) {
                if (!checkEnrolledStudent) {
                    courses['classes'].splice(courseIdx, 1);
                    this.utilService.writeData(courses);

                    return { message: 'Course is deleted' };
                } else {
                    return { message: 'Exists student in course' };
                }
            }

            return { message: 'Courses is deleted' };
        } catch (error) {
            console.log(error);
        }
    };
}
