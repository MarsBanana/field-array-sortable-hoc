import React from "react"
import {FieldArray, InjectedFormProps} from "redux-form"
import {ChangelogMessage} from "../../slices"
import {ChangelogFieldArray} from "./ChangelogFieldArray"

export interface ChangelogFormValues {
    editChangelog: Array<ChangelogMessage>
}

export const ChangelogForm: React.FC<InjectedFormProps<ChangelogFormValues>> = (props) => {
    const {handleSubmit} = props

    return (
        <form onSubmit={handleSubmit}>
            <FieldArray name="editChangelog" component={ChangelogFieldArray} />
        </form>
    )
}
