import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "./firebaseClient";

// ================= Auth Service ===================
class AuthService {
  static async signUp(email: string, password: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User registered:", userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  }

  static async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Logged in:", userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  static async logout(): Promise<void> {
    try {
      await signOut(auth);
      console.log("Logged out");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }

  static async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent!");
    } catch (error) {
      console.error("Error sending reset email:", error);
      throw error;
    }
  }

  static onAuthChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, (user) => {
      callback(user);
    });
  }

  // Token verification should be done server-side via API routes
  static async verifyToken(token: string): Promise<boolean> {
    try {
      const response = await fetch("/api/verify-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        return false;
      }

      const result = await response.json();
      return result.valid;
    } catch (error) {
      console.error("Token verification failed:", error);
      return false;
    }
  }
}

// ================= Export ===================
export { auth, AuthService };
