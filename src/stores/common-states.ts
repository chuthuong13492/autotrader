// Common state interfaces for feature stores
import type { FailureType } from "@/components/layout/data/failure"

export interface BaseState<Type extends string = string> {
  type: Type;
}
export interface ErrorState {
  error: FailureType;
}

export type EmptyState = object

export interface ActionState  {
  callTime: Date
}

export type ResetState = object

