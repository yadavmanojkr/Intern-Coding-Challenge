import api from "./axios";

// Login user (Normal / Admin / Owner)
export const loginUser = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
    }
    return res.data;
};

// Signup (Normal User only)
export const signupUser = async (data) => {
    const res = await api.post("/auth/signup", data);
    return res.data;
};

// Change password
export const changePassword = async (currentPassword, password) => {
    const res = await api.put("/auth/change-password", {
        currentPassword,
        password,
    });
    return res.data;
};

// Logout
export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
};
