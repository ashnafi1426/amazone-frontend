import axios from "axios";
const axiosInstance = axios.create({
//  baseURL: "http://localhost:5003", // ✅ local backend", 
 //function to run the backend on firebase
  // baseURL: "http://127.0.0.1:5005/clone-40318/us-central1/api", 
  //deploy the backend with out firebase
  baseURL: "https://amazone-ap-deploy.onrender.com/",
});
export {axiosInstance}