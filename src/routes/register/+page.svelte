<script lang="ts">
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<h1>Register Route</h1>

<form action="/register?/register" method="POST" class="flex flex-col justify-center items-center">
	<div class="flex flex-col w-56 justify-center">
		<label for="username" class="mb-2">Username</label>
		<input id="username" name="username" class="mb-2 p-2 rounded-lg" type="text" required />
		<label for="password" class="mb-2">Password</label>
		<input id="password" name="password" class="mb-2 p-2 rounded-lg" type="password" required />
	</div>

	{#if form?.user}
		<p class="text-red-700">Username is taken</p>
	{/if}
	<button
		class="bg-teal-500 px-4 py-2 rounded-lg border-black border-opacity-70 border-2  hover:bg-teal-600 text-white"
		type="submit">Register</button
	>
</form>
