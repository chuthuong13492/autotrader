// Either interface
export interface Either<L, R> {
  fold<B>(ifLeft: (l: L) => B, ifRight: (r: R) => B): B;

  readonly isLeft: boolean;
  readonly isRight: boolean;
  readonly leftOrNull: L | null;
  readonly rightOrNull: R | null;

  foldLeft<B>(ifLeft: (l: L) => B): B | null;
  foldRight<B>(ifRight: (r: R) => B): B | null;
}

// Left type
export function Left<L>(value: L): Either<L, never> {
  return {
    fold: (ifLeft) => ifLeft(value),

    get isLeft() {
      return true;
    },

    get isRight() {
      return false;
    },

    get leftOrNull() {
      return value;
    },

    get rightOrNull() {
      return null;
    },

    foldLeft: (ifLeft) => ifLeft(value),
    foldRight: () => null,
  };
}

// Right type
export function Right<R>(value: R): Either<never, R> {
  return {
    fold: (_ifLeft, ifRight) => ifRight(value),

    get isLeft() {
      return false;
    },

    get isRight() {
      return true;
    },

    get leftOrNull() {
      return null;
    },

    get rightOrNull() {
      return value;
    },

    foldLeft: (_) => null,
    foldRight: (ifRight) => ifRight(value),
  };
}
