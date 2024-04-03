import { configureStore } from "@reduxjs/toolkit";
import sectionswap from "../reducers/sectionswap";
import academicReducer from "../reducers/academicReducer";
import adminReducers from "../reducers/adminReducers";
import CalculatorSlice from "../reducers/CalculatorSlice";


export const store = configureStore({

    reducer:{
        sectionSwap:sectionswap,
        AcademicSlice:academicReducer,
        adminSlice: adminReducers,
        CalculatorSlice:CalculatorSlice,

    }
})


export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch