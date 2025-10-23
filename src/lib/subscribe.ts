// lib/subscribe.ts
export class Subscribe<T> {
  private subscribers = new Set<(data: T) => void>();

  /**
   * Đăng ký callback và trả về hàm để hủy đăng ký (unsubscribe)
   */
  subscribe(callback: (data: T) => void): () => void {
    this.subscribers.add(callback);
    return () => this.remove(callback);
  }

  /**
   * Gọi tất cả subscriber với dữ liệu truyền vào
   */
  publish(data: T): void {
    this.subscribers.forEach((cb) => cb(data));
  }

  /**
   * Xóa một subscriber cụ thể
   */
  remove(callback: (data: T) => void): void {
    this.subscribers.delete(callback);
  }

  /**
   * Xóa tất cả subscriber
   */
  clear(): void {
    this.subscribers.clear();
  }

  /**
   * Lấy tổng số subscriber hiện có (hữu ích khi debug)
   */
  count(): number {
    return this.subscribers.size;
  }
}