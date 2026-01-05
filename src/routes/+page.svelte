<script lang="ts">
	// Di Svelte 5, kita pakai $state untuk variabel yang bisa berubah
	let count = $state(0);

	function increment() {
		count += 1;
	}
</script>

<main>
	<h1>Selamat Datang di Tailorin! 🧵</h1>
	<p>Website jasa jahit masa depan.</p>

	<div class="card">
		<button onclick={increment}>
			Pesanan dibuat: {count}
		</button>
	</div>
</main>

<style>
	/* CSS Sederhana */
	main {
		font-family: sans-serif;
		text-align: center;
		padding: 2rem;
	}
	h1 {
		color: #ff3e00;
	}
	button {
		padding: 10px 20px;
		font-size: 1.2rem;
		cursor: pointer;
	}
</style>