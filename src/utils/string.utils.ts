export const generateOtpCode = (digits: number = 4): string => {
  const multiplier = Math.pow(10, digits - 1);
  const otp = Math.floor(
    multiplier + Math.random() * 9 * multiplier,
  ).toString();
  return otp.padStart(digits, '0');
};
