import {configureStore} from '@reduxjs/toolkit';
import { loaderSlice } from './loadSlice';
import { userSlice } from './userSlice';
const store= configureStore({
    reducer:
    {
        loaders: loaderSlice.reducer,
        users: userSlice.reducer,
    },
});
export default store;