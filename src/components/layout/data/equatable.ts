// equatable.ts
export type PropType = string | number | boolean | null | undefined | Equatable | PropType[] | Set<PropType> | Map<PropType, PropType>;

export function iterableEquals<T extends PropType>(a: Iterable<T>, b: Iterable<T>): boolean {
  const aArr = Array.from(a);
  const bArr = Array.from(b);
  if (aArr.length !== bArr.length) return false;
  for (let i = 0; i < aArr.length; i++) {
    if (!objectsEquals(aArr[i], bArr[i])) return false;
  }
  return true;
}

export function setEquals(a: Set<PropType>, b: Set<PropType>): boolean {
  if (a.size !== b.size) return false;
  for (const val of a) {
    if (![...b].some(e => objectsEquals(e, val))) return false;
  }
  return true;
}

export function mapEquals(a: Map<PropType, PropType>, b: Map<PropType, PropType>): boolean {
  if (a.size !== b.size) return false;
  for (const key of a.keys()) {
    if (!objectsEquals(a.get(key), b.get(key))) return false;
  }
  return true;
}

export function objectsEquals(a: PropType, b: PropType): boolean {
  if (a === b) return true;

  if (a instanceof Equatable && b instanceof Equatable) return a.equals(b);
  if (Array.isArray(a) && Array.isArray(b)) return iterableEquals(a, b);
  if (a instanceof Set && b instanceof Set) return setEquals(a, b);
  if (a instanceof Map && b instanceof Map) return mapEquals(a, b);

  return false;
}

export function mapPropsToHashCode(props: PropType[] | null | undefined): number {
  return _finish(props == null ? 0 : props.reduce(_combine, 0));
}

function _combine(hash: number, obj: PropType): number {
  if (obj instanceof Equatable) return hash ^ obj.hashCode();
  if (Array.isArray(obj)) {
    for (const val of obj) hash ^= _combine(hash, val);
    return hash ^ obj.length;
  }
  if (obj instanceof Set) {
    return _combine(hash, Array.from(obj).sort());
  }
  if (obj instanceof Map) {
    const sortedKeys = Array.from(obj.keys()).sort();
    for (const key of sortedKeys) {
      hash ^= _combine(hash, [key, obj.get(key)]);
    }
    return hash;
  }

  hash = 0x1fffffff & (hash + (obj?.toString().length ?? 0));
  hash = 0x1fffffff & (hash + ((0x0007ffff & hash) << 10));
  return hash ^ (hash >> 6);
}

function _finish(hash: number): number {
  hash = 0x1fffffff & (hash + ((0x03ffffff & hash) << 3));
  hash ^= hash >> 11;
  return 0x1fffffff & (hash + ((0x00003fff & hash) << 15));
}

export function mapPropsToString(typeName: string, props: PropType[]): string {
  return `${typeName}(${props.map(p => p?.toString()).join(', ')})`;
}

export function equals(objA: { props: PropType[] }, objB: { props: PropType[] }): boolean {
  if (objA === objB) return true;
  if (objA.constructor !== objB.constructor) return false;
  return iterableEquals(objA.props, objB.props);
}

export function hashCode(obj: { props: PropType[] }): number {
  return mapPropsToHashCode(obj.props);
}

export function toString(obj: { props: PropType[] }, typeName?: string): string {
  return mapPropsToString(typeName || "Object", obj.props);
}

export abstract class Equatable {
  abstract get props(): PropType[];

  equals(other: Equatable): boolean {
    if (this === other) return true;
    if (this.constructor !== other.constructor) return false;
    return iterableEquals(this.props, other.props);
  }

  hashCode(): number {
    return mapPropsToHashCode(this.props);
  }

  toString(): string {
    return mapPropsToString(this.constructor.name, this.props);
  }
}