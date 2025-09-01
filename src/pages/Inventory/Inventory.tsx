import classes from "./_Inventory.module.scss";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../pages/utils";
import SelectSingle from "../../components/SelectSingle/SelectSingle";
import type { Item } from "../../ts/types";
import InventoryItem from "../../components/InventoryItem/InventoryItem";
import Button from "../../components/Button/Button";

export default function Inventory() {
    const [currentApp, setCurrentApp] = useState(0);
    const [items, setItems] = useState<Item[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const { user } = useContext(UserContext);

    const games = [
        { appid: 730, name: "CS:GO" },
        { appid: 570, name: "Dota 2" },
        { appid: 440, name: "Team Fortress 2" },
        { appid: 753, name: "Steam Community Items" },
        { appid: 578080, name: "PUBG: BATTLEGROUNDS" },
        { appid: 620, name: "Portal 2" },
        { appid: 252490, name: "Rust" },
    ];

    function getAppName(id: number) {
        const game = games.find((g) => g.appid === id);
        return game ? game.name : "Unknown";
    }

    useEffect(() => {
        if (user && user.inventories) {
            const firstAppId = Number(Object.keys(user.inventories)[0]);
            setCurrentApp(firstAppId);
        }
    }, [user]);

    useEffect(() => {
        if (user && user.inventories) {
            setItems(user.inventories[currentApp] || []);
            setCurrentPage(1);
        }
    }, [currentApp, user]);

    if (!user) {
        return <div>You need to log in firstly!</div>;
    }

    if (Object.keys(user.inventories).length === 0) {
        return <div>You have no items to display!</div>;
    }

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newAppId = Number(event.target.value);
        setCurrentApp(newAppId);
        setItems([]);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    return (
        <section className={classes.inventoryPage}>
            <SelectSingle value={currentApp} onChange={handleChange}>
                {Object.keys(user.inventories).map((appId) => (
                    <option key={appId} value={appId}>
                        {getAppName(Number(appId))}
                    </option>
                ))}
            </SelectSingle>

            {items.length > itemsPerPage && (
                <div className={classes.pagination}>
                    <Button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                    >
                        <i className="fa-solid fa-arrow-left" />
                    </Button>
                    <span>
                        {currentPage} / {totalPages}
                    </span>
                    <Button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                    >
                        <i className="fa-solid fa-arrow-right" />
                    </Button>
                </div>
            )}

            <div className={classes.itemList}>
                {items.length === 0 ? (
                    <span>No items in this inventory!</span>
                ) : (
                    currentItems.map((item: Item) => (
                        <InventoryItem
                            key={item.assetid}
                            inventoryItem={item}
                        />
                    ))
                )}
            </div>
        </section>
    );
}
