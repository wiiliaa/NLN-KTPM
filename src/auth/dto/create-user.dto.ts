import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  fullname: string;

  @ApiProperty()
  birthday: Date;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  province_name: string;

  @ApiProperty()
  district_name: string;

  @ApiProperty()
  ward_name: string;
}
