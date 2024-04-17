import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(2, 100)
  @IsNotEmpty()
  username: string;
}
