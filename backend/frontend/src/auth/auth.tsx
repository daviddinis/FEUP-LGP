import axios from "axios";

export default class Auth {
  static async logUser(email: string, password: string): Promise<boolean> {
    try {
      if (this.isUserLoggedIn()) return true;

      const user = await axios.post(
        "api/auth/login",
        { email, password },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      this.setLoggedUser(user.data.username, user.data.isAdmin);

      return true;
    } catch (error) {
      return false;
    }
  }

  static async logoutUser(): Promise<boolean> {
    try {
      await axios.post("api/auth/logout");
      this.removeLoggedUser();

      return true;

    } catch (error) {
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

  private static isUserLoggedIn(): boolean {
    console.log(window.localStorage.getItem("KyCON_USER"));
    return window.localStorage.getItem("KyCON_USER") !== null;
  }

  static getLoggedUser(): any {
    const user = window.localStorage.getItem("KyCON_USER");

    if (!user) return null;

    const userParse = JSON.parse(user);

    return { username: userParse.username, isAdmin: userParse.isAdmin };
  }
}
