import React from "react"
import {ChangelogItem} from "../ChangelogItem/ChangelogItem"
import {ChangelogMessage} from "../../../../slices"
import styles from "./changelog-list.module.scss"

export interface ChangelogListProps {
    changelogItems: Array<ChangelogMessage>
}

export const ChangelogList: React.FC<ChangelogListProps> = ({changelogItems}) => {
    return (
        <ul className={styles["changelog-list"]}>
            {changelogItems.map((item, id) => (
                <ChangelogItem
                    name={item.name}
                    text={item.text}
                    key={id}
                />
            ))}
        </ul>
    )
}
