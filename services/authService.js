import { userService } from "./userService.js";

class AuthService {
  login(userData) {
    try {
      const user = userService.search(userData);
      if (!user) {
        const error = new Error("User not found")
        error.code = "404"
        throw error;
    } 
    return user;
  } catch (err) {
    const error = new Error("User not found")
    error.code = "404"
    throw error;
    }
  }
}

const authService = new AuthService();

export { authService };
