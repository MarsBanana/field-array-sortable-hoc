import {useDispatch, useSelector} from "react-redux"
import {APIStatus, changelogListSelectors, changelogListSlice, ChangelogMessage} from "scholastic-client-components"
import {useCallback} from "react"
import {changelogAPI} from "../../api/connectedAPI"

export const useChangelogSaveAPI: (
    onSave?: () => void
) => {
    save: (payload: Array<ChangelogMessage>) => void
    saveStatus: APIStatus
} = (onSave) => {
    const dispatch = useDispatch()

    const handleSuccess = useCallback(() => {
        dispatch(changelogListSlice.actions.successSave())

        if (onSave) {
            onSave()
        }
    }, [dispatch, onSave])

    const save = useCallback(
        (payload: ChangelogMessage[]) => {
            dispatch(changelogListSlice.actions.startSave())
            dispatch(
                changelogAPI.save({
                    payload,
                    onSuccess: handleSuccess,
                    onError: () => dispatch(changelogListSlice.actions.failSave()),
                })
            )
        },
        [dispatch, handleSuccess]
    )

    const saveStatus = useSelector(changelogListSelectors.getSaveAPIStatus())

    return {save, saveStatus}
}
