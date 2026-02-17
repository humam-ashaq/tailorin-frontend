<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation'; // Import goto
    import logoTailorin from '$lib/assets/tailorin-logo.svg';

    import { 
        LayoutDashboard, 
        Scissors, 
        Ruler, 
        Wand2, 
        LogOut,
        Search,
        Bell,
        Plus,
        User,
        ShoppingBag, // Tambah icon ShoppingBag
        AlertCircle  // Tambah icon AlertCircle
    } from 'lucide-svelte';

    let { children } = $props();

    const menus = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Data Pesanan', href: '/admin/orders', icon: Scissors },
        { name: 'Buku Ukuran', href: '/admin/measurements', icon: Ruler },
        { name: 'Rekomendasi Ukuran Kain', href: '/admin/fabric-ai', icon: Wand2 }
    ];

    function closeQuickMenu() {
        isQuickMenuOpen = false;
    }

    function handleQuickAction(href: string) {
        closeQuickMenu();
        goto(href);
    }

    function handleLogout() {
        // Tampilkan dialog konfirmasi bawaan browser
        const isConfirmed = confirm('Apakah Anda yakin ingin keluar dari halaman Admin?');
        
        if (isConfirmed) {
            // Jika user klik OK, arahkan ke halaman utama
            goto('/');
        }
    }

    // --- State untuk Quick Menu (+) ---
    let isQuickMenuOpen = $state(false);

    // --- State untuk Notifikasi (Bell) ---
    let isNotifOpen = $state(false);

    // Data Dummy Notifikasi
    const notifications = [
        { 
            id: 1, 
            title: 'Pesanan Baru Masuk', 
            desc: 'Putri Delina meminta pesanan Gaun Pesta.', 
            time: 'Baru saja', 
            type: 'order', 
            link: '/admin/orders?tab=Permintaan Masuk' // Nanti kita handle supaya otomatis ke tab 'Permintaan Masuk'
        },
    ];

    // Fungsi Toggle Notif
    function toggleNotif(e: Event) {
        e.stopPropagation();
        isNotifOpen = !isNotifOpen;
        if(isNotifOpen) isQuickMenuOpen = false; // Tutup menu lain jika terbuka
    }

    // Fungsi Toggle Quick Menu (Update sedikit biar gantian bukanya)
    function toggleQuickMenu(e: Event) {
        e.stopPropagation();
        isQuickMenuOpen = !isQuickMenuOpen;
        if(isQuickMenuOpen) isNotifOpen = false; // Tutup notif jika terbuka
    }

    function closeAllMenus() {
        isQuickMenuOpen = false;
        isNotifOpen = false;
    }

    // Fungsi Klik Notifikasi
    function handleNotifClick(href: string) {
        closeAllMenus();
        goto(href);
    }
</script>

<svelte:window onclick={closeAllMenus} />

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
            <div class="relative">
                <button 
                    onclick={toggleNotif}
                    class="relative p-2 text-gray-400 hover:text-t-blue transition hover:bg-gray-50 rounded-full"
                >
                    <Bell size={24} />
                    {#if notifications.length > 0}
                        <span class="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    {/if}
                </button>

                {#if isNotifOpen}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div 
                        class="absolute right-[-60px] md:right-0 top-14 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-[60] animate-in fade-in zoom-in-95 duration-200 origin-top-right"
                        onclick={(e) => e.stopPropagation()} 
                    >
                        <div class="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                            <p class="text-xs font-bold text-gray-900 uppercase tracking-wider">Notifikasi</p>
                            <button class="text-[10px] text-t-blue font-bold hover:underline">Tandai Baca</button>
                        </div>
                        
                        <div class="max-h-[300px] overflow-y-auto">
                            {#if notifications.length > 0}
                                {#each notifications as notif}
                                    <button 
                                        onclick={() => handleNotifClick(notif.link)}
                                        class="w-full text-left px-4 py-3 hover:bg-gray-50 transition border-b border-gray-50 last:border-0 flex gap-3 group"
                                    >
                                        <div class="shrink-0 mt-1">
                                            {#if notif.type === 'order'}
                                                <div class="w-8 h-8 rounded-full bg-blue-100 text-t-blue flex items-center justify-center">
                                                    <ShoppingBag size={14} />
                                                </div>
                                            {:else}
                                                <div class="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                                    <AlertCircle size={14} />
                                                </div>
                                            {/if}
                                        </div>
                                        <div>
                                            <p class="text-sm font-bold text-gray-800 group-hover:text-t-blue transition">{notif.title}</p>
                                            <p class="text-xs text-gray-500 line-clamp-2 leading-relaxed">{notif.desc}</p>
                                            <p class="text-[10px] text-gray-400 mt-1 font-medium">{notif.time}</p>
                                        </div>
                                        {#if notif.type === 'order'}
                                            <div class="shrink-0 self-center">
                                                <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                                            </div>
                                        {/if}
                                    </button>
                                {/each}
                            {:else}
                                <div class="p-8 text-center text-gray-400">
                                    <Bell size={24} class="mx-auto mb-2 opacity-50"/>
                                    <p class="text-xs">Tidak ada notifikasi baru</p>
                                </div>
                            {/if}
                        </div>
                        
                        <div class="px-4 py-2 border-t border-gray-100 text-center">
                            <button class="text-xs font-bold text-gray-500 hover:text-gray-800 transition">Lihat Semua</button>
                        </div>
                    </div>
                {/if}
            </div>

            <div class="h-8 w-px bg-gray-200 mx-1"></div>

            <div class="flex items-center gap-3">
                <div class="text-right hidden md:block leading-tight">
                    <p class="text-sm font-bold text-gray-800">SS Tailor</p>
                    <p class="text-[11px] text-t-blue font-bold">Owner</p>
                </div>
                <div class="w-10 h-10 bg-gray-100 rounded-full border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                    <User size={20} class="text-gray-500"/>
                </div>
            </div>

            <div class="relative ml-2">
                <button 
                    onclick={toggleQuickMenu}
                    class="bg-t-yellow hover:bg-yellow-400 text-t-dark p-2.5 rounded-xl shadow-md hover:shadow-lg transition active:scale-95 flex items-center justify-center"
                >
                    <div class="transition-transform duration-300 {isQuickMenuOpen ? 'rotate-45' : ''}">
                        <Plus size={24} strokeWidth={3} />
                    </div>
                </button>

                {#if isQuickMenuOpen}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div 
                        class="absolute right-0 top-14 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-[60] animate-in fade-in zoom-in-95 duration-200 origin-top-right"
                        onclick={(e) => e.stopPropagation()} 
                    >
                        <p class="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Aksi Cepat</p>
                        
                        <button 
                            onclick={() => handleQuickAction('/admin/orders/new')}
                            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 text-gray-700 hover:text-t-blue transition text-left group"
                        >
                            <div class="p-1.5 bg-blue-100 text-t-blue rounded-lg group-hover:bg-t-blue group-hover:text-white transition">
                                <Scissors size={18} />
                            </div>
                            <span class="text-sm font-bold">Buat Pesanan</span>
                        </button>

                        <button 
                            onclick={() => handleQuickAction('/admin/measurements/new')}
                            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-pink-50 text-gray-700 hover:text-t-pink transition text-left group mt-1"
                        >
                            <div class="p-1.5 bg-pink-100 text-t-pink rounded-lg group-hover:bg-t-pink group-hover:text-white transition">
                                <Ruler size={18} />
                            </div>
                            <span class="text-sm font-bold">Tambah Ukuran</span>
                        </button>
                    </div>
                {/if}
            </div>

        </div>
    </header>

    <aside class="fixed left-0 top-20 bottom-0 w-64 bg-gradient-to-b from-t-blue to-t-pink text-white z-40 overflow-y-auto shadow-xl">
        <nav class="p-4 space-y-2">
            <p class="px-4 text-[10px] font-bold text-white/60 uppercase tracking-wider mb-2 mt-4">Main Menu</p>
            {#each menus as menu}
                {@const isActive = 
                    menu.href === '/admin' 
                        ? $page.url.pathname === '/admin' 
                        : $page.url.pathname.startsWith(menu.href)
                }
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
            <button 
                onclick={handleLogout}
                class="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-white/10 text-white/90 transition text-sm font-medium"
            >
                <LogOut size={18} />
                <span>Keluar</span>
            </button>
        </div>
    </aside>

    <main class="pt-24 pl-72 pr-8 pb-8 min-h-screen transition-all">
        {@render children()}
    </main>
</div>