import axios from "axios";
import Cookies from "js-cookie";

async function ApiCall(url, httpMethod, data) {
    const token = Cookies.get("studentsToken") || Cookies.get("professorsToken");
    console.log("Inside Apicall for ", url);
    try {
        if (httpMethod === "GET") {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: data,
            };
            const response = await axios.get(url, config, data);
            if (
                response.data.message === "Invalid token" ||
                response.data.message === "No token provided" ||
                response.data.message === "You are not a student!" ||
                response.data.message === "You are not a professor!"
            ) {
                Cookies.remove("studentsToken");
                Cookies.remove("professorsToken");
                window.location.href = "/";
            }
            return response;
        } else if (httpMethod === "POST") {
            console.log("Data Being Sent : ", data);
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.post(url, data, config);
            if (response.data.message === "Invalid token" || response.data.message === "No Token Provided") {
                Cookies.remove("studentsToken");
                Cookies.remove("professorsToken");
                window.location.href = "/";
            }
            return response;
        }
    } catch (error) {
        console.error("Error in API call:", error);
        throw error;
    }
}

export default ApiCall;
