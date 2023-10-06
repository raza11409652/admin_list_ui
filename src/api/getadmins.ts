import axios from "axios";
import { Admin } from "../types/admin";
export const getAdminsApi = async () => {
  const PATH =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
  //   const response = await fetch(
  //     `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
  //   );
  //   console.log(response.json());
  const { data } = await axios.get<Admin[]>(PATH);
//   console.log({ data });
  return data;
};
