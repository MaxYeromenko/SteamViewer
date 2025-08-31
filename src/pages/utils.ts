import { createContext } from "react";
import type { User } from "../ts/types";

export function getUserStatus(status: number) {
    switch (status) {
        case 0:
            return "Offline";
        case 1:
            return "Online";
        case 2:
            return "Busy";
        case 3:
            return "Away";
        case 4:
            return "Snooze";
        case 5:
            return "Looking to trade";
        case 6:
            return "Looking to play";
        default:
            return "Unknown";
    }
}

export function grtFullTimeString(timestamp: number): string {
    if (!timestamp) return "Unknown";

    const now = Date.now();
    const date = timestamp * 1000;
    const diffMs = now - date;

    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    let result = "";

    if (years > 0) {
        result = `${years} year${years > 1 ? "s" : ""} ago`;
    } else if (months > 0) {
        result = `${months} month${months > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
        result = `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
        result = `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
        result = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
        result = "Just now";
    }

    const dateString =
        new Date(date).toLocaleTimeString() +
        ", " +
        new Date(date).toLocaleDateString();

    return `${result} (${dateString})`;
}

export const UserContext = createContext<{
    user: User | null;
    logout: () => void;
}>({
    user: null,
    logout: () => { },
});