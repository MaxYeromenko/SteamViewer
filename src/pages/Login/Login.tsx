import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Login() {
    const { user } = useContext(UserContext);

    if (user) {
        return (
            <div>
                <img src={user.avatar} alt="avatar" width={40} />
                <span>{user.displayName}</span>
            </div>
        );
    }

    return (
        <div>
            <a href="/api/auth/steam">
                <button>Login with Steam</button>
            </a>
        </div>
    );
}
