import { useContext } from "react";
import { UserContext } from "../../pages/utils";

export default function Home() {
    const { user } = useContext(UserContext);
    if (!user) {
        return <div>You need to log in firstly!</div>;
    }
    return <div>home page</div>;
}
