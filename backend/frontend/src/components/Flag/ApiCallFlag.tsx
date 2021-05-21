import axios from "axios";

export function updateUserFlag(id : string) : void {
    axios.post("/api/users/" + id + "/flag");
}