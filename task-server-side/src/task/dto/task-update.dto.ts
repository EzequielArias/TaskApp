import { IsNumber, IsString, Length, Max, Min } from "class-validator"


export class TaskUpdateDto {
    @IsNumber()
    @Min(1)
    @Max(5)
    difficulty : number
    
    @IsNumber()
    id : number
    
    @Length(1,50)
    @IsString()
    title : string
}