export enum FailureTypeEnum {
  Failure = "Failure",
  Server = "ServerFailure",
  Cache = "CacheFailure",
  Input = "InputFailure",
}

export type FailureType =
  | { type: FailureTypeEnum.Failure; message: string }
  | { type: FailureTypeEnum.Server; message: string }
  | { type: FailureTypeEnum.Cache; message: string }
  | { type: FailureTypeEnum.Input; message: string; fieldKey: string };

export const Failure = (message: string): FailureType => ({
  type: FailureTypeEnum.Failure,
  message,
});

export const ServerFailure = (message: string): FailureType => ({
  type: FailureTypeEnum.Server,
  message,
});

export const CacheFailure = (message: string): FailureType => ({
  type: FailureTypeEnum.Cache,
  message,
});

export const InputFailure = (
  message: string,
  fieldKey: string
): FailureType => ({
  type: FailureTypeEnum.Input,
  message,
  fieldKey,
});