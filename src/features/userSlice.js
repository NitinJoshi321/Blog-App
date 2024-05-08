import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    userData:[]
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        addUserData : (state,action) =>{
            state.userData = action.payload
        }
        
    }
})

export const {addUserData} = userSlice.actions
export default userSlice.reducer