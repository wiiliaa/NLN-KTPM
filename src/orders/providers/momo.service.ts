import { Injectable } from '@nestjs/common';
import { DOMAIN } from '@src/common/utils';
import { createQRCode } from '@src/common/utils/qrcode';
import { randomUUID } from 'crypto';
import * as QRCode from 'qrcode';

@Injectable()
export class MomoService {
  constructor() { }

  async createTransaction(orderId: number) {
    const url = this.createUrlPay(orderId);
    const qrcode = await createQRCode(url);
    return {
      orderId,
      message: 'Transaction created',
      qrcode,
    };
  }

  createUrlPay(orderId: number) {
    return `${DOMAIN}/orders/${orderId}/momo?hash=${randomUUID()}`;
  }

  paymentSuccess(orderId: number) {
    const payId = randomUUID();
    return {
      orderId,
      payId,
      message: 'Payment success',
    };
  }
}
