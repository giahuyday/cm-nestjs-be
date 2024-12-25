import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CourseEntity } from './course.entity';

@Entity({ name: 'student' })
export class StudentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, unique: true })
    name: string;

    @ManyToOne(() => CourseEntity)
    @JoinColumn({ name: 'classId' })
    classId: CourseEntity;
}
