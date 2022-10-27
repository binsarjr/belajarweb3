<script lang="ts">
	import { connected } from '$lib/stores/preferences';
	import { onMount } from 'svelte';
	// import Web3 from 'web3';
	// const web3 = new Web3('http://127.0.0.1:8545');

	// let Accounts: string[] = [];
	// let Account = '';
	// let balance: string;
	// onMount(async () => {
	// 	Accounts = await web3.eth.getAccounts();
	// 	Account = Accounts[0];

	// 	let rawBalance = await web3.eth.getBalance(Account);

	// 	balance = web3.utils.fromWei(web3.utils.toBN(rawBalance), 'ether');
	// });
	// function onClick() {}
	let version = '0200000';
	let prevBlock = '45678';
	let nonce = '3456789';
	let newBlock = 'asd';
</script>

<!-- 
<button on:click={onClick}>Connect Wallet</button>
<h1>asd</h1>
{#if $connected}
	<p>{Account}: {balance}</p>
{/if} -->

<table>
	<tr>
		<th>Version</th>
		<td>{version}</td>
	</tr>
	<tr>
		<th>Previous Block</th>
		<td>{prevBlock}</td>
	</tr>
	<tr>
		<th>Nonce</th><th /><td>{nonce}</td>
	</tr>
	<tr>
		<th> New Block </th>
		<td>{newBlock}</td>
	</tr>
</table>
