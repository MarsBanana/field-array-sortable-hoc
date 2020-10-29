import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {APIStatus} from "../types"
import {Pagination} from "./types"

export interface ChangelogMessage {
    name: string
    text: string
    id?: string
}

interface SliceState extends Pagination<ChangelogMessage> {
    saveAPIStatus: APIStatus
    fetchAPIStatus: APIStatus
    changelogList: Array<ChangelogMessage>
}

const initialState = {
    fetchAPIStatus: APIStatus.Initial,
    saveAPIStatus: APIStatus.Initial,
} as SliceState

export const changelogListSlice = createSlice({
    name: "changelogList",
    initialState,
    reducers: {
        startFetchList(state: SliceState) {
            state.fetchAPIStatus = APIStatus.Loading
        },
        failFetchList(state: SliceState) {
            state.fetchAPIStatus = APIStatus.Failure
        },
        successFetchList(state: SliceState, action: PayloadAction<{changelogList: Array<ChangelogMessage>}>) {
            const {changelogList} = action.payload

            state.fetchAPIStatus = APIStatus.Success
            state.changelogList = changelogList
            return state
        },
        successSave(state: SliceState) {
            state.saveAPIStatus = APIStatus.Success
        },
        startSave(state: SliceState) {
            state.saveAPIStatus = APIStatus.Loading
        },
        failSave(state: SliceState) {
            state.saveAPIStatus = APIStatus.Failure
        },
    },
})

export interface ChangelogListStore {
    changelogList: SliceState
}

export const changelogListSelectors = {
    getFetchAPIStatus: () => (store: ChangelogListStore) => store.changelogList.fetchAPIStatus,
    getChangelogList: () => (store: ChangelogListStore) => store.changelogList.changelogList,
    getSaveAPIStatus: () => (store: ChangelogListStore) => store.changelogList.saveAPIStatus,
}
