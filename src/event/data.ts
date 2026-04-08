import mitt from "mitt";
import type { EventType } from "./types";

/**
 * 发射器
 */
export const emitter = mitt<EventType.Events>();
