import { writable, type Writable } from "svelte/store";

export const showDialog = writable(false);
export const showD = writable(true);
export const dailyTable = writable(false);
export const monthlyTable = writable(false);

export const dailyCash = writable(0);
export const dailyCred = writable(0);
export const currentDate = writable("");

export const waiters: Writable<any[]> = writable();
