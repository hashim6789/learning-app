import otpGenerator from "otp-generator";

const generateOtp = (length: number = 6): string => {
  const otp = otpGenerator.generate(length, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
    digits: true,
  });

  return otp;
};

export default generateOtp;
