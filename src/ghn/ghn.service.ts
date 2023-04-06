import { Injectable } from '@nestjs/common';

@Injectable()
export class GhnService {
  checkCost(address: string) {
    address = address.toLowerCase();
    if (address.includes('hà nội')) {
      return 30000;
    }
    if (address.includes('hồ chí minh')) {
      return 40000;
    }

    if (address.includes('đà nẵng')) {
      return 50000;
    }

    if (address.includes('thanh hóa')) {
      return 60000;
    }

    if (address.includes('nghệ an')) {
      return 70000;
    }

    if (address.includes('hải phòng')) {
      return 80000;
    }

    if (address.includes('cần thơ')) {
      return 90000;
    }

    if (address.includes('an giang')) {
      return 90000;
    }

    if (address.includes('bến tre')) {
      return 90000;
    }

    return 100000;
  }
}
