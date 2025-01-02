import { InputType, Field, ID } from '@nestjs/graphql';
import { Int } from 'msnodesqlv8';

@InputType()
export class CreateCourseInput {
    @Field()
    name: string;
}

@InputType()
export class UpdateCourseInput {
    @Field({ nullable: true })
    name?: string;
}

@InputType()
export class DeleteCourseInput {
    @Field()
    id: number;
}
