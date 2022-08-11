import { clone, last } from 'lodash';
import { StackListener } from './StackListener';

export class ListenableStack<T> {
  private data: T[];

  private listeners: Map<number, StackListener>;

  private idTracker: number;

  constructor(oldData?: T[]) {
    this.data = oldData ? clone(oldData) : [];
    this.listeners = new Map<number, StackListener>();
    this.idTracker = 0;
  }

  push(item: T): void {
    this.data.push(item);
    this.listeners.forEach((listener) => {
      listener.onStackChange();
    });
  }

  peek(): T | null {
    return clone(last(this.data)) ?? null;
  }

  pop(): T | null {
    const item = this.data.pop() ?? null;
    if (item) {
      this.listeners.forEach((listener) => {
        listener.onStackChange();
      });
    }
    return item;
  }

  size(): number {
    return this.data.length;
  }

  setListener(listener: StackListener): number {
    const id = this.idTracker + 1;
    this.listeners.set(id, listener);
    return id;
  }

  removeListener(id: number): boolean {
    return this.listeners.delete(id);
  }
}
