// Common state interfaces for feature stores

export interface Failure {
  message: string
  code?: string | number
  cause?: unknown
}

export interface ErrorState {
  error: Failure
}

export type LoadingState = object

export type EmptyState = object

export interface ActionState {
  callTime: Date
}

export type ResetState = object

