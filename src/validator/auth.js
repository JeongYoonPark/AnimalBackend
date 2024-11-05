import userRepository from "../repository/userRepository.js";

export const duplicateEmail = async (email) => {
  const row = await userRepository.duplicateEmail(email);
  return row;
};
export const duplicatePhone = async (phone) => {
  const row = await userRepository.duplicatePhone(phone);
  return row;
};
