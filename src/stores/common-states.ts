// Common state interfaces for feature stores

import type { Failure } from "@/components/layout/data/failure"

export interface ErrorState {
  error: Failure
}

export type LoadingState = object

export type EmptyState = object

export interface ActionState {
  callTime: Date
}

export type ResetState = object

