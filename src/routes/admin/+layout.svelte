<script lang="ts">
	import { page } from '$app/stores';
	import { 
		LayoutDashboard, 
		Scissors, 
		Ruler, 
		History, 
		Wand2, // Ikon untuk AI/Magic
		LogOut,
		Menu
	} from 'lucide-svelte';

	let { children } = $props();

	// Menu Navigasi Sesuai Proposal & Request
	const menus = [
		{ name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
		{ name: 'Daftar Pesanan', href: '/admin/orders', icon: Scissors }, // Manajemen Pesanan [cite: 68]
		{ name: 'Daftar Ukuran', href: '/admin/measurements', icon: Ruler }, // Sentralisasi Data Pelanggan [cite: 154]
		{ name: 'Riwayat Pesanan', href: '/admin/history', icon: History },
		{ name: 'Rekomendasi Kain', href: '/admin/fabric-ai', icon: Wand2 } // Fitur Unggulan AI [cite: 58]
	];
</script>

<div class="flex min-h-screen bg-t-gray text-t-dark font-sans">
	<aside class="w-64 bg-white shadow-xl hidden md:flex flex-col fixed h-full z-10">
		<div class="h-20 flex items-center justify-center bg-gradient-to-r from-t-blue to-t-pink">
			<h1 class="text-white text-2xl font-bold tracking-wider drop-shadow-md">
				TailorIn 🧵
			</h1>
		</div>

		<nav class="flex-1 py-6 px-3 space-y-2">
			<p class="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Menu Utama</p>
			
			{#each menus as menu}
				{@const isActive = $page.url.pathname === menu.href}
				<a 
					href={menu.href} 
					class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium
					{isActive 
						? 'bg-t-yellow text-t-dark shadow-sm translate-x-1' 
						: 'text-gray-500 hover:bg-gray-50 hover:text-t-blue'}"
				>
					<menu.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
					{menu.name}
				</a>
			{/each}
		</nav>

		<div class="p-4 border-t border-gray-100">
			<button class="flex items-center gap-3 px-4 py-3 w-full text-left text-red-500 hover:bg-red-50 rounded-xl transition">
				<LogOut size={20} />
				<span class="font-medium">Keluar</span>
			</button>
		</div>
	</aside>

	<main class="flex-1 md:ml-64 p-8 overflow-y-auto">
		<div class="md:hidden flex items-center justify-between mb-6 bg-white p-4 rounded-xl shadow-sm">
			<span class="font-bold text-t-blue">TailorIn Admin</span>
			<button class="p-2 bg-gray-100 rounded-lg"><Menu size={20}/></button>
		</div>

		{@render children()}
	</main>
</div>