import React, {useEffect, useState} from "react"
import {
    authSelectors,
    ChangelogFormValues,
    changelogListSelectors,
    ChangelogPageTemplate,
    Role,
} from "scholastic-client-components"
import {useDispatch, useSelector} from "react-redux"
import {createSelector} from "@reduxjs/toolkit"
import {useChangelogFetchAPI} from "./useChangelogFetchAPI"
import {EditChangelogForm} from "./EditChangelogForm"
import {uuid} from "uuidv4"
import {getPortalToggleData} from "../../lib/routing"
import {useChangelogSaveAPI} from "./useChangelogSaveAPI"
import {submit} from "redux-form"

const selectAuth = createSelector(authSelectors.getUserHasRoles([Role.Admin]), (showEdit) => ({showEdit}))

const selectChangelogListData = createSelector(changelogListSelectors.getChangelogList(), (data) => ({
    data: data?.map((item) => ({...item, id: uuid()})),
}))

const ChangelogPage: React.FC = () => {
    const {selectedPortalType} = getPortalToggleData()
    const dispatch = useDispatch()

    const [editMode, setEditMode] = useState(false)

    const {data} = useSelector(selectChangelogListData)
    const {showEdit} = useSelector(selectAuth)

    const {fetch, fetchStatus} = useChangelogFetchAPI()

    useEffect(() => fetch(), [fetch])

    const handleSave = () => {
        setEditMode(false)
        fetch()
    }

    const {save, saveStatus} = useChangelogSaveAPI(handleSave)

    const handleSubmit = (payload: ChangelogFormValues) => {
        save(payload.editChangelog)
    }

    const titlePrefix = () => {
        switch (selectedPortalType) {
            case "MENU":
                return "Menu "
            case "SCHOLASTIC":
                return "Scholastic "
            default:
                return ""
        }
    }

    return (
        <ChangelogPageTemplate
            showEdit={showEdit}
            editMode={editMode}
            openEditMode={() => setEditMode(true)}
            closeEditMode={() => setEditMode(false)}
            saveStatus={saveStatus}
            data={data}
            fetchStatus={fetchStatus}
            onSubmit={() => dispatch(submit("editChangelog"))}
        >
            {{
                title: `${titlePrefix()}Changelog`,
                EditChangelogForm: (
                    <EditChangelogForm
                        initialValues={{editChangelog: data}}
                        onSubmit={handleSubmit}
                    />
                ),
            }}
        </ChangelogPageTemplate>
    )
}

export default ChangelogPage
