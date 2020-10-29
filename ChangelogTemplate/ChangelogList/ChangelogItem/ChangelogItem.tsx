import React from "react"
import {ChangelogMessage} from "../../../../slices"
import styles from "./changelog-item.module.scss"

export const ChangelogItem: React.FC<ChangelogMessage> = ({name, text}) => (
    <li className={styles["changelog-item"]}>
        <div className={styles["title"]}>{name}</div>
        <div className={styles["text"]}>{text}</div>
    </li>
)
