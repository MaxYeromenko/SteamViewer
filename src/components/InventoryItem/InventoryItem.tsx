import type { Item } from "../../ts/types";
import classes from "./_InventoryItem.module.scss";

export default function InventoryItem({
    inventoryItem,
}: {
    inventoryItem: Item;
}) {
    const properties = [
        { label: "Commodity", value: inventoryItem.commodity },
        { label: "Tradable", value: inventoryItem.tradable },
        { label: "Marketable", value: inventoryItem.marketable },
    ];

    return (
        <div className={classes.itemContainer}>
            <div className={classes.iconName}>
                <div className={classes.iconContainer}>
                    <img
                        className={classes.icon}
                        src={inventoryItem.iconUrl}
                        alt="icon"
                        width={50}
                        loading="lazy"
                    />
                </div>
                <h3 className={classes.name}>{inventoryItem.name}</h3>
            </div>
            <div className={classes.itemDescriptions}>
                {inventoryItem.extra?.descriptions
                    ?.map((desc: any) => ({
                        ...desc,
                        value: desc.value?.trim(),
                    }))
                    ?.filter((desc: any) => desc.value && desc.value.length > 0)
                    ?.map((desc: any, index: number) => {
                        const color = desc.color ? `#${desc.color}` : undefined;

                        const className =
                            desc.name === "attribute"
                                ? classes.attribute
                                : desc.name?.startsWith("attr:")
                                ? classes.attr
                                : classes.desc;

                        return (
                            <span
                                key={index}
                                className={className}
                                style={{ color }}
                                dangerouslySetInnerHTML={{
                                    __html:
                                        desc.value
                                            .trim()
                                            .replace(/\n/g, "<br />") || "",
                                }}
                            />
                        );
                    })}
            </div>
            <div className={classes.inventoryItemInfo}>
                <span>{inventoryItem.type}</span>
                {properties.map((prop, i) => (
                    <span key={i}>
                        <span>| {prop.label}: </span>
                        <span
                            style={{
                                color: prop.value ? "greenyellow" : "crimson",
                            }}
                        >
                            {prop.value ? "Yes" : "No"}
                        </span>
                    </span>
                ))}
                {inventoryItem.marketUrl && (
                    <span>
                        |{" "}
                        <a
                            className={classes.viewOnMarket}
                            href={inventoryItem.marketUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View on market &#8599;
                        </a>
                    </span>
                )}
            </div>
        </div>
    );
}
