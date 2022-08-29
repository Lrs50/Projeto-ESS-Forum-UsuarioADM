import { createAction, createReducer, on, props } from '@ngrx/store'
import { User } from '../../../common/types'

export interface AppState {
    logged: boolean
    user: User
    newsCount: number
    usersCount: number
}

export const appInitialState: AppState = {
    logged: true,
    user: {
        id: '123',
        name: 'Lucas',
        type: 2,
    },
    newsCount: 0,
    usersCount: 0,
}

export const changeUserLoggedStatus = createAction('[APP] Change login status of the user', props<{ payload: boolean }>())
export const changeUserInfo = createAction('[APP] Change user info', props<{ payload: User }>())
export const incrementNews = createAction('[APP] Add 1 news count')
export const decrementNews = createAction('[APP] Remove 1 news count')
export const setNews = createAction('[APP] Set news count value', props<{ payload: number }>())

export const appReducer = createReducer(
    appInitialState,
    on(changeUserLoggedStatus, (currentState, actions) => {
        currentState = {
            ...currentState,
            logged: actions.payload,
        }

        return currentState
    }),
    on(changeUserInfo, (currentState, actions) => {
        currentState = {
            ...currentState,
            user: actions.payload,
        }

        return currentState
    }),
    on(incrementNews, (currentState) => {
        currentState = {
            ...currentState,
            newsCount: currentState.newsCount + 1,
        }

        return currentState
    }),
    on(setNews, (currentState, actions) => {
        console.log('actions: ' + actions)

        currentState = {
            ...currentState,
            newsCount: actions.payload,
        }

        return currentState
    })
)
