import { configureStore } from '@reduxjs/toolkit'
import dashboard from './dashboard-slice'

export const dashboardStore = configureStore({
  reducer: {
    dashboard,
  },
})

export type DashboardRootState = ReturnType<typeof dashboardStore.getState>
export type DashboardDispatch = typeof dashboardStore.dispatch

