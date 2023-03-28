import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  fullname: string;

  @ApiProperty()
  birthday: string;

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
