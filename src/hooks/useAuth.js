import { jwtDecode } from "jwt-decode";

export function useAuth() {
    const token = localStorage.getItem("authToken");
    if (!token) {
        return { isAuthenticated: false, role: null };
    }

    try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;
        const isExpired = decoded.exp && decoded.exp < now;
        
        return {
            isAuthenticated: !isExpired,
            role: decoded.role || null,
        };
    } catch {
        return { isAuthenticated: false, role: null }
    }
}