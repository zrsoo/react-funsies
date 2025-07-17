import axios from "axios";

const client = axios.create({
	baseURL: "http://127.0.0.1:5000"
});

export const getUsers = async (userName: string) => {
	const response = await client.get("/search", {params: {name: userName}});
	return response.data;
}