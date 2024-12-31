import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { StudentEntity } from './student.entity';

@Entity({ name: 'course' })
export class CourseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, unique: true })
    name: string;

    @OneToMany(() => StudentEntity, (student) => student.classId, { cascade: true })
    students: StudentEntity[];
}
