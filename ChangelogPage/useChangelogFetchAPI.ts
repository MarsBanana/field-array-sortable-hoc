import {useDispatch, useSelector} from "react-redux"
import {APIStatus, changelogListSelectors, changelogListSlice, ChangelogMessage} from "scholastic-client-components"
import {useCallback} from "react"
import {changelogAPI} from "../../api/connectedAPI"

export const useChangelogFetchAPI: () => {fetch: () => void; fetchStatus: APIStatus} = () => {
    const dispatch = useDispatch()

    const handleSuccess = useCallback(
        (response: Array<ChangelogMessage>) => {
            const successPayload = {
                changelogList: response,
            }
            dispatch(changelogListSlice.actions.successFetchList(successPayload))
        },
        [dispatch]
    )

    const fetch = useCallback(() => {
        dispatch(changelogListSlice.actions.startFetchList())
        dispatch(
            changelogAPI.fetchList({
                onSuccess: handleSuccess,
                onError: () => dispatch(changelogListSlice.actions.failFetchList()),
            })
        )
    }, [dispatch, handleSuccess])

    const fetchStatus = useSelector(changelogListSelectors.getFetchAPIStatus())

    return {fetch, fetchStatus}
}
