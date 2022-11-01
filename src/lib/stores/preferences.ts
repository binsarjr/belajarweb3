import { writable } from "svelte-local-storage-store";
import type Web3 from "web3";

export let connected = writable('connected', false)