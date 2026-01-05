<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props(); // Syntax baru Svelte 5 untuk mengambil konten halaman
</script>

<svelte:head>
	<link rel="icon" href="{favicon}" />
</svelte:head>

<div class="min-h-screen flex flex-col font-sans text-gray-900 bg-gray-50">
	<nav class="bg-white shadow-sm sticky top-0 z-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between h-16 items-center">
				<div class="flex-shrink-0 flex items-center">
					<span class="text-2xl font-bold text-blue-600">Tailorin🧵</span>
				</div>
				
				<div class="hidden md:flex space-x-8">
					<a href="/" class="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md font-medium">Beranda</a>
					<a href="/layanan" class="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md font-medium">Layanan</a>
					<a href="/portofolio" class="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md font-medium">Portofolio</a>
					<a href="/login" class="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition">Masuk</a>
				</div>
			</div>
		</div>
	</nav>

	<main class="flex-grow">
		{@render children()}
	</main>

	<footer class="bg-gray-900 text-white py-8 mt-auto">
		<div class="max-w-7xl mx-auto px-4 text-center">
			<p>&copy; 2024 Tailorin. Solusi jahit modern.</p>
		</div>
	</footer>
</div>