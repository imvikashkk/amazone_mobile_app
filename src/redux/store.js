import { configureStore} from '@reduxjs/toolkit'
import cartSlice from './cartSlice'

export const store = configureStore({
  reducer: {
    cart: cartSlice
  },
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
    // Disable the ImmutableStateInvariantMiddleware
    immutableCheck: false,
    // Disable the serializableCheck middleware
    serializableCheck: false,
  }),
})