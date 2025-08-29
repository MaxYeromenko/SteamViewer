import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Inventory() {
    const { user } = useContext(UserContext);
    if (!user) {
        return <div>You need to log in firstly!</div>;
    }

    return <div>inventory page</div>;
}
