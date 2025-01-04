import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CourseService } from './course.service';
import { CreateCourseInput, DeleteCourseInput, UpdateCourseInput } from './dto/course.input';
import { CourseEntity } from 'src/entities/course.entity';
import { CreateCourseDto } from './dto/course.dto';
import { Roles } from 'src/common/decorators/roles.decorator';

@Resolver(() => CourseEntity)
export class CourseResolver {
    constructor(private classServices: CourseService) {}

    @Roles('admin', 'principal')
    @Mutation(() => CourseEntity)
    async createCourse(@Args('courseDto') courseDto: CreateCourseInput): Promise<CourseEntity> {
        return await this.classServices.createCourse(courseDto);
    }

    @Roles('admin', 'principal')
    @Query(() => CourseEntity)
    async getCourseById(@Args('id', { type: () => Int }) id: number) {
        return await this.classServices.getCourseById(id);
    }

    @Roles('admin', 'principal')
    @Query(() => [CourseEntity])
    async getCourses(): Promise<CourseEntity[]> {
        return await this.classServices.getCourses();
    }

    @Roles('admin', 'principal')
    @Mutation(() => Boolean)
    async deleteCourseById(@Args('courseDto') courseDto: DeleteCourseInput): Promise<boolean> {
        return this.classServices.deleteCourse(courseDto);
    }
    
    @Roles('admin', 'principal')
    @Mutation(() => CourseEntity)
    async updateCourseById(
        @Args('id') id: number,
        @Args('courseDto') courseDto: CreateCourseDto,
    ): Promise<CourseEntity> {
        return this.classServices.updateCourse(id, courseDto);
    }
}
