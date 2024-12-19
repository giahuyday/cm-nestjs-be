import { Injectable } from '@nestjs/common';
import { UtilsService } from 'src/utils/utils.service';

export type Student = {
    id: number;
    name: string;
    classId: number;
};

@Injectable()
export class StudentService {
    constructor(private readonly utilService: UtilsService) {}

    public student: Student[] = [
        {
            id: 1,
            name: 'Nguyen Van A',
            classId: 1,
        },
        {
            id: 2,
            name: 'Tran Thi B',
            classId: 1,
        },
        {
            id: 3,
            name: 'Le Van C',
            classId: 1,
        },
    ];

    createStudent = (studentData: any) => {
        const data = this.utilService.readData();
        const maxId = data['students'].reduce((max: number, student: { id: number }) => Math.max(max, student.id), 0);

        if (this.utilService.checkNewStudentClass(studentData, data['students'], data['classes'])) {
            const newStudent = {
                id: maxId + 1,
                name: studentData?.name,
                classId: studentData?.classId,
            };

            data['students'].push(newStudent);
            this.utilService.writeData(data);
            const idx = data['students'].length - 1;

            return data['students'][idx];
        } else {
            return { message: 'Student name existed or class not found' };
        }
    };

    getStudents = () => {
        const students = this.utilService.readData()['students'];

        return students;
    };

    getStudentById = (studentId: number) => {
        const students = this.student;

        return students.find((student) => student.id == studentId);
    };

    getStudentByName = (studentName: string) => {
        const students = this.student;
        const student = students.filter((student) => student?.name.toLowerCase().includes(studentName.toLowerCase()));

        return student;
    };

    getStudentByClassName = (courseName: string) => {
        const data = this.utilService.readData();
        const students = data['students'];
        const courses = data['classes'];

        const course = courses.find(
            (course: { name: string }) => course?.name.toLowerCase() == courseName.toLowerCase(),
        );

        if (course) {
            // Get student who attend to a class match with class name
            const student = students.filter((student: { classId: any }) => student?.classId == course?.id);
            student.map((student: { className: any }) => (student.className = course?.name)); //map className field before response

            return student;
        } else {
            return { status: 'Not found student or class' };
        }
    };

    updateStudent = (id: number, studentData: any) => {
        const students = this.utilService.readData();
        const studentIdx = students['students'].findIndex((student: { id: number }) => student.id == Number(id));

        if (studentIdx !== -1 && !this.utilService.checkStudentName(students['students'], studentData?.name)) {
            students['students'][studentIdx] = { ...students['students'][studentIdx], ...studentData };
            this.utilService.writeData(students);

            return students['students'][studentIdx];
        }
        return { status: 'Student Name is existed or cannot update' };
    };

    deleteStudent = (studentId: number) => {
        const data = this.utilService.readData();
        const studentIdx = data['students'].findIndex((student) => student.id === Number(studentId));

        if (studentIdx !== -1) {
            data['students'].splice(studentIdx, 1);
            this.utilService.writeData(data);

            return { status: 'Student is deleted' };
        }

        return { status: 'Student is deleted' };
    };
}
