import * as QRCode from 'qrcode';

const opts = {
  errorCorrectionLevel: 'H',
  type: 'image/png',
  quality: 0.92,
  margin: 1,
  color: {
    dark: '#000000FF',
    light: '#FFFFFFFF',
  },
};

export const createQRCode = async (url: string) => {
  const qr = await QRCode.toDataURL(url, opts);
  return qr;
};
