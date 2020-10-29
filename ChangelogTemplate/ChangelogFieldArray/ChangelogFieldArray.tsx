import React, {ReactNode} from "react"
import {SortableContainer, SortableElement, SortableHandle} from "react-sortable-hoc"
import {Button, DragIcon} from "../../../ui"
import {ChangelogMessage} from "../../../slices"
import {WrappedFieldArrayProps} from "redux-form"
import styles from "./changelog-field-array.module.scss"
import {uuid} from "uuidv4"
import {InputField} from "../../ReduxForm"
import {TextAreaField} from "../../ReduxForm/TextAreaField"

const Handle = SortableHandle(() => <DragIcon />)

interface SortableItemProps {
    item: string
    onRemove: () => void
}

const required = (value: string) => {
    return value ? undefined : "Required"
}

const SortableItem = SortableElement((props: SortableItemProps) => {
    const {item, onRemove} = props

    return (
        <div className={styles["changelog-field-form-item"]}>
            <div className={styles["top-line"]}>
                <Handle />
                <InputField label="Title" name={`${item}.name`} validate={[required]} />
                <Button onClick={onRemove} iconType="delete">
                    Remove
                </Button>
            </div>
            <div className={styles["bottom-line"]}>
                <TextAreaField label="Description" name={`${item}.text`} validate={[required]} />
            </div>
        </div>
    )
})

interface SortableListProps {
    children: ReactNode
}

const SortableList = SortableContainer((props: SortableListProps) => {
    const {children} = props

    return <div className={styles["changelog-field-array"]}>{children}</div>
})

export const ChangelogFieldArray: React.FC<WrappedFieldArrayProps<ChangelogMessage>> = (props) => {
    const {fields} = props

    return (
        <>
            <Button primary onClick={() => fields.unshift({name: "", text: "", id: uuid()})}>
                Add note
            </Button>
            <div>
                <SortableList
                    lockAxis={"y"}
                    lockOffset={"0%"}
                    lockToContainerEdges
                    useDragHandle
                    onSortEnd={({oldIndex, newIndex}) => fields.move(oldIndex, newIndex)}
                >
                    {fields.map((item, index) => (
                        <SortableItem
                            key={fields.get(index).id}
                            item={item}
                            index={index}
                            onRemove={() => fields.remove(index)}
                        />
                    ))}
                </SortableList>
            </div>
        </>
    )
}
