export class AsyncDeduplicator<T> {
  private promise: Promise<T> | null = null;
  private abortController: AbortController | null = null;

  async fetch(fetcher: (signal?: AbortSignal) => Promise<T>): Promise<T> {
    if (this.promise) {
      return this.promise;
    }

    this.abortController = new AbortController();
    this.promise = fetcher(this.abortController.signal);

    try {
      const result = await this.promise;
      return result;
    } finally {
      this.promise = null;
      this.abortController = null;
    }
  }

  invalidate(): void {
    if (this.abortController) {
      this.abortController.abort();
    }
    this.promise = null;
    this.abortController = null;
  }

  cancel(): void {
    this.invalidate();
  }
}

/**
 * Fetch data with deduplication per ID
 * Ensures that multiple concurrent requests for the same ID only run once
 */
export async function deduplicateFetch<T>(
  map: Map<number, AsyncDeduplicator<T>>,
  id: number,
  fetcher: (signal?: AbortSignal) => Promise<T>
): Promise<T> {
  let deduplicator = map.get(id);
  if (!deduplicator) {
    deduplicator = new AsyncDeduplicator<T>();
    map.set(id, deduplicator);
  }

  return deduplicator.fetch(fetcher);
}
