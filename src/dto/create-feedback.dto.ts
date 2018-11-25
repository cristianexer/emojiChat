import { IsString } from 'class-validator';

export class CreateFeedbackDto {

    @IsString() readonly nickname: String;

    @IsString() readonly text: String;

    @IsString() readonly result: String;

    @IsString() readonly feedback:String;

}