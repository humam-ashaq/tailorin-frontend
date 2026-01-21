<script lang="ts">
    import { page } from '$app/stores';
    import logoTailorin from '$lib/assets/tailorin-logo.svg';
    import { ArrowRight, User, Scissors, CheckCircle2, Eye, EyeOff } from 'lucide-svelte';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    let role = $state<'customer' | 'tailor'>('customer');
    let showPassword = $state(false);
    let isLoading = $state(false);

    function handleRegister(e: Event) {
        e.preventDefault();
        
        isLoading = true;
        
        // Simulasi register sukses
        setTimeout(() => {
            isLoading = false;
            // Langsung lempar ke Halaman Utama (Bukan Login)
            // Anggapannya user habis daftar langsung auto-login
            window.location.href = '/'; 
        }, 1500);
    }

    onMount(() => {
        const roleParam = $page.url.searchParams.get('role');
        if (roleParam === 'tailor') {
            role = 'tailor';
        }
    });
</script>

<div class="bg-white rounded-[2.5rem] shadow-2xl flex flex-col lg:flex-row max-w-5xl w-full relative z-10 overflow-hidden">
    
    <div class="w-full lg:w-5/12 bg-t-dark p-10 flex flex-col justify-between text-white relative">
        
        <div class="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-t-pink to-transparent opacity-20 rounded-full blur-[80px] -ml-20 -mb-20"></div>
        <div class="absolute top-0 right-0 w-40 h-40 bg-t-blue opacity-10 rounded-full blur-[50px] -mr-10 -mt-10"></div>
        
        <div class="relative z-10">
            <img src={logoTailorin} alt="TailorIn" class="h-8 w-auto mb-6" />

            <h2 class="text-3xl font-bold leading-tight mt-4">
                Mulai Perjalanan <br/> <span class="text-transparent bg-clip-text bg-gradient-to-r from-t-blue to-t-pink">Fashion Anda.</span>
            </h2>
            <p class="text-gray-400 mt-3 text-sm leading-relaxed">
                Bergabunglah dengan komunitas fashion terbesar. Temukan penjahit impian atau kembangkan bisnis jahit Anda.
            </p>
            
            <div class="mt-8 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 hidden lg:block">
                <div class="flex gap-1 mb-2">
                    {#each Array(5) as _}<div class="w-2.5 h-2.5 bg-t-yellow rounded-full"></div>{/each}
                </div>
                <p class="text-xs text-gray-300 italic leading-relaxed">"Sistemnya sangat membantu saya mendapatkan pelanggan baru."</p>
                <div class="flex items-center gap-3 mt-3">
                    <div class="w-8 h-8 rounded-full bg-t-pink flex items-center justify-center text-[10px] font-bold">AT</div>
                    <div>
                        <p class="text-xs font-bold text-white">Aldo Tailor</p>
                        <p class="text-[10px] text-gray-500">Mitra sejak 2023</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="relative z-10 text-[10px] text-gray-500 mt-8 lg:mt-0">
            &copy; 2026 TailorIn Indonesia.
        </div>
    </div>

    <div class="w-full lg:w-7/12 p-8 lg:p-10 flex flex-col justify-center bg-white">
        
        <div class="mb-6 text-center lg:text-left">
            <h3 class="text-2xl font-black text-gray-900">Buat Akun Baru</h3>
            <p class="text-sm text-gray-500">Pilih peran dan lengkapi data diri.</p>
        </div>

        <div class="grid grid-cols-2 gap-3 mb-6">
            <button 
                onclick={() => role = 'customer'}
                class="relative p-3 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-3
                {role === 'customer' 
                    ? 'border-t-blue bg-blue-50/40 ring-1 ring-t-blue/20' 
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'}"
            >
                <div class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center {role === 'customer' ? 'bg-t-blue text-white' : 'bg-gray-100 text-gray-400'}">
                    <User size={18} />
                </div>
                <div class="flex-1 min-w-0">
                    <span class="block text-xs font-bold text-gray-900">Pelanggan</span>
                    <span class="block text-[10px] text-gray-500 truncate">Cari Jasa</span>
                </div>
                {#if role === 'customer'}
                    <div transition:fade class="absolute top-2 right-2 text-t-blue"><CheckCircle2 size={14} class="fill-white"/></div>
                {/if}
            </button>

            <button 
                onclick={() => role = 'tailor'}
                class="relative p-3 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-3
                {role === 'tailor' 
                    ? 'border-t-pink bg-pink-50/40 ring-1 ring-t-pink/20' 
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'}"
            >
                <div class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center {role === 'tailor' ? 'bg-t-pink text-white' : 'bg-gray-100 text-gray-400'}">
                    <Scissors size={18} />
                </div>
                <div class="flex-1 min-w-0">
                    <span class="block text-xs font-bold text-gray-900">Mitra</span>
                    <span class="block text-[10px] text-gray-500 truncate">Buka Jasa</span>
                </div>
                {#if role === 'tailor'}
                    <div transition:fade class="absolute top-2 right-2 text-t-pink"><CheckCircle2 size={14} class="fill-white"/></div>
                {/if}
            </button>
        </div>

        <form onsubmit={handleRegister} class="space-y-4">
            
            <div class="space-y-1">
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <label class="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Nama Lengkap</label>
                <input type="text" placeholder="John Doe" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:bg-white focus:border-gray-400 focus:ring-0 outline-none transition font-medium placeholder-gray-400" required />
            </div>

            <div class="space-y-1">
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <label class="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Email</label>
                <input type="email" placeholder="nama@email.com" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:bg-white focus:border-gray-400 focus:ring-0 outline-none transition font-medium placeholder-gray-400" required />
            </div>

            <div class="space-y-1">
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <label class="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Password</label>
                <div class="relative">
                    <input 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder="Min. 8 karakter" 
                        class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:bg-white focus:border-gray-400 focus:ring-0 outline-none transition font-medium placeholder-gray-400" 
                        required 
                    />
                    <button type="button" onclick={() => showPassword = !showPassword} class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {#if showPassword} <EyeOff size={16}/> {:else} <Eye size={16}/> {/if}
                    </button>
                </div>
            </div>

            <div class="pt-2">
                <button 
                    type="submit" 
                    disabled={isLoading}
                    class="w-full py-3.5 rounded-xl font-bold text-sm text-white shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2
                    {role === 'customer' ? 'bg-t-blue hover:bg-blue-600' : 'bg-t-pink hover:bg-pink-600'}"
                >
                    {#if isLoading}
                        <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {:else}
                        Daftar sebagai {role === 'customer' ? 'Pelanggan' : 'Mitra'}
                    {/if}
                </button>
            </div>

        </form>

        <p class="text-center text-xs text-gray-500 mt-6">
            Sudah punya akun? <a href="/login" class="font-bold text-gray-900 hover:underline">Masuk</a>
        </p>

    </div>
</div>