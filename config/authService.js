import api from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';

// interceptor
api.interceptors.request.use((req) => {
    if (AsyncStorage.getItem("x-token")) {
        req.headers.Authorization = AsyncStorage.getItem("x-token")
    };
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
};

export default AuthService;