import { USER_PROFILE_FAIL,USER_PROFILE_SUCCESSFUL,FETCH_USER_PROFILE } from "../Actions/actionTypes"
const initialProfileState={
    user:{},
    inProgress:false,
    success:false
}
export default function profile(state=initialProfileState,action)
{
    switch(action.type)
    {
        case USER_PROFILE_SUCCESSFUL:{
            return {
                ...state,
                success:true,
                inProgress:false,
                user:action.user
            }
        }
        case USER_PROFILE_FAIL:{
            return {
                ...state,
                success:false,
                inProgress:false
            }
        }
        case FETCH_USER_PROFILE:{
            return {
                ...state,
                inProgress:true
            }
        }
        default:
            return {
                ...state
            }
    }
}