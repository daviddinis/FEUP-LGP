import axios from "axios";
import User from "models/User";

export default class Auth {
  static async registerUser(username: string, email: string, password: string) : Promise<any> {
    try {
      const res = await axios.post(
          "/api/auth/register",
          {username, email, password},
          {
            headers: {
              "content-type": "application/json",
            },
          }
      );



      return res.data;
    } catch (error) {
      console.error(error)
      return false;
    }
  }

  static async logUser(email: string, password: string): Promise<any> {
    try {
      const res = await axios.post(
        "/api/auth/login",
        { email, password },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      return res.data;
    } catch (error) {
      console.error(error)
      return false;
    }
  }

  static async logoutUser(): Promise<boolean> {
    try {
      await axios.post("/api/auth/logout");

      return true;
    } catch (error) {
      return false;
    }
  }

  static getLoggedUser(): User | null {
    const user = window.localStorage.getItem("KyCON_USER");

    if (!user) return null;

    const userParse = JSON.parse(user);

    return { username: userParse.username, isAdmin: userParse.isAdmin };
  }

  static async isUserLogged(): Promise<boolean> {
    const user = await axios.get("/api/auth/check");

    if (!user || user.status !== 200) {
      this.removeLoggedUser();
      return false;
    }

    this.setLoggedUser(user.data.username, user.data.isAdmin);
    return true;
  }

  static async isUserAdmin(): Promise<boolean> {
    const user = await axios.get("api/auth/check");
    if(this.isUserLogged()){
      return user.data.isAdmin;
    }else{
      return false;
    }
  }

  private static setLoggedUser(username: string, isAdmin: boolean): void {
    window.localStorage.setItem(
      "KyCON_USER",
      JSON.stringify({ username, isAdmin })
    );
  }

  private static removeLoggedUser(): void {
    window.localStorage.removeItem(
      "KyCON_USER");
  }
}
