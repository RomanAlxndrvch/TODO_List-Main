import {Dispatch} from "redux";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {authAPI} from "../../api/todolists-api";
import {FormDataType} from "./Login";

type authReducerStateType = typeof initialState

const initialState = {
    isLoggedIn: false
}

type authReducerActionType = ReturnType<typeof loginInAc> | SetAppStatusActionType | SetAppErrorActionType

export const authReducer = (state: authReducerStateType = initialState, action: authReducerActionType) => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}

        default:
            return state
    }
}

//action
export const loginInAc = (value: boolean) => {
    return {type: 'login/SET-IS-LOGGED-IN', value} as const
}

//thunk
export const loginTC = (data: FormDataType) => async (dispatch: Dispatch<authReducerActionType>) => {
    const loginReturnData = await authAPI.login(data.email, data.password)
    dispatch(setAppStatusAC('loading'))
  
    if (loginReturnData.data.resultCode === 0) {
        console.log(loginReturnData)
        loginInAc(true)
        dispatch(setAppStatusAC('succeeded'))
    }

}


