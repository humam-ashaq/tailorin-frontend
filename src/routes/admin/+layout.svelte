<script lang="ts">
	import { page } from '$app/stores';
	import logoTailorin from '$lib/assets/tailorin-logo.svg';

	import { 
		LayoutDashboard, 
		Scissors, 
		Ruler, 
		History, 
		Wand2, 
		LogOut,
		Search,
		Bell,
		Plus,
		User
	} from 'lucide-svelte';

	let { children } = $props();

	const menus = [
		{ name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
		{ name: 'Daftar Pesanan', href: '/admin/orders', icon: Scissors },
		{ name: 'Daftar Ukuran', href: '/admin/measurements', icon: Ruler },
		{ name: 'Riwayat', href: '/admin/history', icon: History },
		{ name: 'Rekomendasi AI', href: '/admin/fabric-ai', icon: Wand2 }
	];
</script>

<div class="min-h-screen bg-t-gray font-sans">
	
	<header class="fixed top-0 left-0 w-full h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-50 shadow-sm">
		
		<div class="w-64 flex-shrink-0 flex items-center">
			<img 
				src={logoTailorin} 
				alt="TailorIn Logo" 
				class="h-12 w-auto object-contain" 
			/>
		</div>

		<div class="flex-1 max-w-2xl px-8">
			<div class="relative">
				<Search class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
				<input 
					type="text" 
					placeholder="Cari pesanan, nama pelanggan, atau ID..." 
					class="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-12 pr-4 text-gray-600 focus:ring-2 focus:ring-t-blue/50 transition"
				/>
			</div>
		</div>

		<div class="flex items-center gap-5">
			<button class="relative p-2 text-gray-400 hover:text-t-blue transition">
				<Bell size={24} />
				<span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
			</button>

			<div class="h-8 w-px bg-gray-200 mx-1"></div>

			<div class="flex items-center gap-3">
				<div class="text-right hidden md:block leading-tight">
					<p class="text-sm font-bold text-gray-800">Humam Ashaq</p>
					<p class="text-[11px] text-t-blue font-bold">Owner</p>
				</div>
				<div class="w-10 h-10 bg-gray-100 rounded-full border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
					<User size={20} class="text-gray-500"/>
				</div>
			</div>

			<button class="ml-2 bg-t-yellow hover:bg-yellow-400 text-t-dark p-2.5 rounded-xl shadow-md hover:shadow-lg transition active:scale-95">
				<Plus size={24} strokeWidth={3} />
			</button>
		</div>
	</header>

	<aside class="fixed left-0 top-20 bottom-0 w-64 bg-gradient-to-b from-t-blue to-t-pink text-white z-40 overflow-y-auto shadow-xl">
		<nav class="p-4 space-y-2">
			<p class="px-4 text-[10px] font-bold text-white/60 uppercase tracking-wider mb-2 mt-4">Main Menu</p>
			{#each menus as menu}
				{@const isActive = $page.url.pathname === menu.href}
				<a 
					href={menu.href} 
					class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm
					{isActive 
						? 'bg-white text-t-blue shadow-lg font-bold translate-x-1' 
						: 'text-white/90 hover:bg-white/10 hover:translate-x-1'}"
				>
					<menu.icon size={18} class={isActive ? 'text-t-pink' : ''} strokeWidth={isActive ? 2.5 : 2} />
					{menu.name}
				</a>
			{/each}
		</nav>

		<div class="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/10 to-transparent">
			<button class="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-white/10 text-white/90 transition text-sm font-medium">
				<LogOut size={18} />
				<span>Keluar</span>
			</button>
		</div>
	</aside>

	<main class="pt-24 pl-72 pr-8 pb-8 min-h-screen transition-all">
		{@render children()}
	</main>
</div>