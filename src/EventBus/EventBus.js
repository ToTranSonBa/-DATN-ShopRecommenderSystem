// file EventBus.js để quản lý việc phát và lắng nghe sự kiện.
import { EventEmitter } from 'events';
export const EventBus = new EventEmitter();