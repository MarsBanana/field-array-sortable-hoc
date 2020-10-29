import {reduxForm} from "redux-form"
import {ChangelogForm, ChangelogFormValues} from "scholastic-client-components"
import {FORM} from "../../lib/redux-form"

export const EditChangelogForm = reduxForm<ChangelogFormValues>({
    form: FORM.editChangelog,
    enableReinitialize: true,
})(ChangelogForm)
