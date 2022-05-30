import axios from "axios";


const base_url = process.env.REACT_APP_URL;

export const upload = async (data, options) => {
    try {
        await axios.post(`${base_url}/upload/`, data, options)
    } catch (error) {
        console.error(error);
    }

}
