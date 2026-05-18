import axios from "axios";

export const SendPhoneOTP = async (
  otp: number | string,
  number: string,
  user_name?: string,
) => {
  try {

    const response = await axios.get(
      `https://sms.rapidsms.xyz/request.php?user_id=janani&password=Jana@ni45&number=${number}&message=Hii${user_name || "User"},%20%Your%20OTP%20is%20${otp}`
    );
    if (response?.data?.status == "success") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
