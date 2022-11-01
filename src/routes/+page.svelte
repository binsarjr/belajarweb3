<script lang="ts">
	import { connected } from '$lib/stores/preferences';
	import { writable } from 'svelte/store';
	import Web3 from 'web3';
	import Tasks from '../lib/abis/Tasks.json';

	let account = writable<string | null>(null);
	let balance = writable('0');
	let todos = writable<string[]>([]);
	let Task = writable<any>(null);
	let todo = '';

	let web3: Web3 | null = null;
	const connectToWallet = async () => {
		if (typeof window.ethereum === 'undefined') {
			console.error('Please Install Metamask');
			return;
		}
		await window.ethereum.request({ method: 'eth_requestAccounts' });

		web3 = new Web3(window.ethereum);
		$connected = true;
		let accounts = await web3.eth.getAccounts();
		$account = accounts[0];
		$balance = await web3.eth.getBalance($account);
	};
	if ($connected) connectToWallet();
	$: if ($connected && web3) {
		web3.eth.net.getId().then(async (networkId: any) => {
			// @ts-ignore
			const network = Tasks.networks[networkId];
			if (web3) {
				$Task = new web3.eth.Contract(Tasks.abi as any, network.address);
				$todos = await $Task.methods.getTasks().call();
			}
		});
	}
	const disconnectWallet = async () => {
		$connected = false;
	};
	async function addTodo() {
		if (todo) {
			const res = await $Task.methods.setTasks(todo).send({ from: $account });
			console.log(res);
			if (res.status) {
				$todos = await $Task.methods.getTasks().call();
			}
		}
		todo = '';
	}
</script>

{#if $connected}
	<button on:click={disconnectWallet}>Disconnect TO Wallet</button>
	<h3>
		Current account <br />
		{$account}
	</h3>
	<form on:submit|preventDefault={addTodo}>
		<input label="Insert Todo" bind:value={todo} class="border" />
		<button type="submit"> ADD </button>
	</form>
	<h3>Todos</h3>
	<ul>
		{#each $todos as todo}
			<li>
				<p>{todo}</p>
			</li>
		{/each}
	</ul>
{:else}
	<button on:click={connectToWallet}>Connect TO Wallet</button>
{/if}
