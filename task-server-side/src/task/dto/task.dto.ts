import { IsNumber, IsString, Min, Max } from 'class-validator'

export class TaskDto {

    @IsString()
    title : string

    @IsNumber()
    @Min(1)
    @Max(5)
    difficulty : number
}