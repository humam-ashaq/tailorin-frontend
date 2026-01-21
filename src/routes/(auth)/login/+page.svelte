<script lang="ts">
    import logoTailorin from '$lib/assets/tailorin-logo.svg'; // Logo Putih
    import { ArrowRight, Eye, EyeOff } from 'lucide-svelte';

    let showPassword = $state(false);
    let isLoading = $state(false);

    function handleLogin(e: Event) {
        // Validasi HTML5 'required' akan jalan duluan sebelum fungsi ini
        // Jadi kalau fungsi ini jalan, berarti field sudah terisi
        e.preventDefault(); 
        
        isLoading = true;
        
        // Simulasi loading 1.5 detik biar kerasa 'mikir'
        setTimeout(() => {
            isLoading = false;
            // Langsung lempar ke Halaman Utama
            window.location.href = '/'; 
        }, 1500);
    }
</script>

<div class="bg-white rounded-[2.5rem] shadow-2xl flex flex-col lg:flex-row max-w-4xl w-full overflow-hidden h-auto lg:h-[600px] relative z-10">
    
    <div class="w-full lg:w-5/12 bg-t-dark p-12 flex flex-col justify-between text-white relative overflow-hidden">
        
        <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-t-blue to-t-pink opacity-20 rounded-full blur-[60px] -mr-16 -mt-16"></div>
        <div class="absolute bottom-0 left-0 w-40 h-40 bg-t-yellow opacity-10 rounded-full blur-[50px] -ml-10 -mb-10"></div>
        
        <div class="relative z-10">
            <img src={logoTailorin} alt="TailorIn" class="h-10 w-auto mb-8" />
            
            <h2 class="text-3xl font-bold leading-tight">
                Selamat Datang <br/> <span class="text-transparent bg-clip-text bg-gradient-to-r from-t-blue to-t-pink">Kembali.</span>
            </h2>
            <p class="text-gray-400 mt-4 text-sm leading-relaxed">
                Kelola pesanan jahitmu atau temukan penjahit terbaik dengan mudah dalam satu platform.
            </p>
        </div>

        <div class="relative z-10 text-xs text-gray-500 mt-10 lg:mt-0 flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-t-green"></div> System Normal
        </div>
    </div>

    <div class="w-full lg:w-7/12 p-10 lg:p-16 flex flex-col justify-center bg-white">
        
        <div class="mb-10">
            <h3 class="text-2xl font-black text-gray-900 mb-2">Masuk ke Akun</h3>
            <p class="text-sm text-gray-500">Masukkan detail akunmu untuk melanjutkan.</p>
        </div>

        <form onsubmit={handleLogin} class="space-y-6">
            
            <div class="space-y-1.5">
                <label class="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Email</label>
                <input 
                    type="email" 
                    placeholder="nama@email.com" 
                    class="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:bg-white focus:border-t-blue focus:ring-0 outline-none transition font-medium placeholder-gray-400" 
                    required 
                />
            </div>

            <div class="space-y-1.5">
                <div class="flex justify-between items-center ml-1">
                    <label class="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Password</label>
                    <a href="#" class="text-xs font-bold text-t-pink hover:text-pink-600 transition">Lupa?</a>
                </div>
                <div class="relative">
                    <input 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder="********" 
                        class="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:bg-white focus:border-t-blue focus:ring-0 outline-none transition font-medium placeholder-gray-400" 
                        required 
                    />
                    <button type="button" onclick={() => showPassword = !showPassword} class="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {#if showPassword} <EyeOff size={18}/> {:else} <Eye size={18}/> {/if}
                    </button>
                </div>
            </div>

            <div class="pt-4">
                <button 
                    type="submit" 
                    disabled={isLoading}
                    class="w-full py-4 bg-gradient-to-r from-t-blue to-t-pink text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
                >
                    <div class="absolute inset-0 bg-gradient-to-r from-t-blue/20 to-t-pink/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <span class="relative flex items-center gap-2">
                        {#if isLoading}
                            <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        {:else}
                            Masuk Sekarang <ArrowRight size={18}/>
                        {/if}
                    </span>
                </button>
            </div>

        </form>

        <p class="text-center text-xs text-gray-500 mt-10">
            Belum punya akun? <a href="/register" class="font-bold text-t-blue hover:underline">Daftar disini</a>
        </p>

    </div>
</div>