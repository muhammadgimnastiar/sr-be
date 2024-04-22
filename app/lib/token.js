import { randomBytes } from 'crypto';

// Membuat secret key sepanjang 32 byte (256 bit)
const generateRandomKey = () => {
  return randomBytes(32).toString('hex');
};

// Gunakan fungsi ini untuk membuat secret key
const accessTokenSecret = generateRandomKey();
const refreshTokenSecret = generateRandomKey();

console.log(accessTokenSecret);
console.log(refreshTokenSecret);
