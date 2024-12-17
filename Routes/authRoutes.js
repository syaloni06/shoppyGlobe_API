import { registerUser, loginUser } from "../Controller/authController.js";

export const authRoutes = (app) => {
    app.post('/register', registerUser);
    app.post('/login', loginUser);
};

