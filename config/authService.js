import api from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';

// interceptor
api.interceptors.request.use(async (req) => {
    try {
        const token = await AsyncStorage.getItem("x-token");
        if (token) {
            req.headers.Authorization = token;
        }
    } catch (error) {
        console.log("token error: " + error);
    }
    return req;
});

const AuthService = {
    // student
    async studentLogin(student) {
        const res = api.post("/student/login", student);
        return res;
    },
    async getStudent(id) {
        const res = api.get(`/student/info/${id}`);
        return res;
    },


    // Course
    async getCourse(id) {
        const res = api.get(`/admin/get-course/${id}`);
        return res;
    },
};

export default AuthService;