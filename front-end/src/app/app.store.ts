import { createAction, createReducer, on, props } from '@ngrx/store'
import { User, emptyUser } from '../../../common/types'

export interface AppState {
    logged: boolean
    user: User
    newsCount: number
    usersCount: number
}

export const appInitialState: AppState = {
    logged: false,
    user: emptyUser(''),
    newsCount: 0,
    usersCount: 0,
}

export const changeUserLoggedStatus = createAction('[APP] Change login status of the user', props<{ payload: boolean }>())
export const changeUserInfo = createAction('[APP] Change user info', props<{ payload: User }>())
export const addToNewsCount = createAction('[APP] Set news count value', props<{ payload: number }>())
export const addToUserCount = createAction('[APP] Set news count value', props<{ payload: number }>())

export const appReducer = createReducer(
    appInitialState,
    on(changeUserLoggedStatus, (currentState, actions) => {
        if (actions.payload == false) {
            localStorage.removeItem('userInfo')
        } else {
            localStorage.setItem('userInfo', JSON.stringify(currentState.user))
        }

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
    on(addToNewsCount, (currentState, actions) => {
        currentState = {
            ...currentState,
            newsCount: currentState.newsCount + actions.payload,
        }

        return currentState
    }),
    on(addToUserCount, (currentState, actions) => {
        currentState = {
            ...currentState,
            usersCount: currentState.usersCount + actions.payload,
        }

        return currentState
    })
)
