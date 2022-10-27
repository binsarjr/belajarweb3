import { writable } from "svelte-local-storage-store";

export let connected = writable('connected', false)