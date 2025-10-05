import { configureStore } from '@reduxjs/toolkit'
import dashboard, { type DashboardState, initialState as dashboardInitialState } from './dashboard-slice'

export type DashboardPreloadedInput = {
  dashboard?: Partial<DashboardState>
}

export function createDashboardStore(preloadedState?: DashboardPreloadedInput) {
  const state = {
    dashboard: {
      ...dashboardInitialState,
      ...(preloadedState?.dashboard ?? {}),
    },
  }

  return configureStore({
    reducer: {
      dashboard,
    },
    preloadedState: state,
  })
}

export const dashboardStore = createDashboardStore()

export type DashboardRootState = ReturnType<typeof dashboardStore.getState>
export type DashboardDispatch = typeof dashboardStore.dispatch

