<script lang="ts">
    import { 
        Shirt, Scissors, Briefcase, GraduationCap, 
        Sparkles, Layers, Palette, Watch, Search, ArrowRight 
    } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    // --- DATA KATEGORI LENGKAP ---
    const allCategories = [
        {
            group: "Populer",
            items: [
                { name: "Pakaian Formal", slug: "Jas", icon: Briefcase, color: "bg-blue-100 text-blue-600", desc: "Jas, Blazer, Tuxedo" },
                { name: "Busana Wanita", slug: "Wanita", icon: Sparkles, color: "bg-pink-100 text-pink-600", desc: "Dress, Gamis, Blouse" },
                { name: "Seragam & Dinas", slug: "Seragam", icon: GraduationCap, color: "bg-orange-100 text-orange-600", desc: "Seragam Sekolah, PNS, Kantor" },
                { name: "Batik & Tradisional", slug: "Batik", icon: Palette, color: "bg-amber-100 text-amber-600", desc: "Kemeja Batik, Kebaya, Sarimbit" },
            ]
        },
        {
            group: "Layanan Khusus",
            items: [
                { name: "Permak & Reparasi", slug: "Permak", icon: Scissors, color: "bg-green-100 text-green-600", desc: "Potong, Kecilin, Tambal" },
                { name: "Kemeja & Kaos", slug: "Kemeja", icon: Shirt, color: "bg-cyan-100 text-cyan-600", desc: "Kemeja Casual, Polo, Kaos" },
                { name: "Jahit Massal", slug: "Konveksi", icon: Layers, color: "bg-purple-100 text-purple-600", desc: "Order Partai Besar/Komunitas" },
                { name: "Aksesoris Kain", slug: "Aksesoris", icon: Watch, color: "bg-gray-100 text-gray-600", desc: "Masker, Dasi, Sapu Tangan" },
            ]
        }
    ];

    let searchQuery = $state('');
</script>

<div class="min-h-screen bg-[#FAFAFA] pb-20">
    
    <div class="bg-gray-900 text-white pt-24 pb-32 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-t-blue/20 rounded-full blur-[100px] -mr-20 -mt-20"></div>
        <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-t-pink/20 rounded-full blur-[100px] -ml-20 -mb-20"></div>

        <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h1 class="text-4xl md:text-6xl font-black mb-6">
                Jelajahi <span class="text-transparent bg-clip-text bg-gradient-to-r from-t-blue to-t-pink">Spesialisasi</span>
            </h1>
            <p class="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
                Temukan penjahit yang tepat untuk setiap kebutuhan fashionmu, mulai dari perbaikan kecil hingga busana pengantin.
            </p>

            <div class="relative max-w-lg mx-auto">
                <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search class="text-gray-400" size={20}/>
                </div>
                <input 
                    type="text" 
                    bind:value={searchQuery}
                    placeholder="Cari kategori (misal: Jas, Kebaya)..." 
                    class="w-full pl-12 pr-6 py-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white placeholder-gray-400 focus:bg-white focus:text-gray-900 focus:ring-4 focus:ring-t-blue/30 transition shadow-xl"
                />
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 -mt-20 relative z-20 space-y-16">
        
        {#each allCategories as section}
            <div in:fade>
                <h3 class="font-bold text-t-pink text-xl mb-6 flex items-center gap-3">
                    <div class="w-2 h-8 bg-t-pink rounded-full"></div>
                    {section.group}
                </h3>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {#each section.items as cat}
                        <a 
                            href="/tailors?category={cat.slug}"
                            class="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                        >
                            <div class="flex justify-between items-start mb-4">
                                <div class="w-14 h-14 {cat.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3">
                                    <cat.icon size={28} />
                                </div>
                                <div class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-gray-900 group-hover:text-white transition">
                                    <ArrowRight size={14}/>
                                </div>
                            </div>
                            
                            <h4 class="font-bold text-lg text-gray-900 mb-1 group-hover:text-t-blue transition">{cat.name}</h4>
                            <p class="text-sm text-gray-500">{cat.desc}</p>

                            <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-t-blue to-t-pink transform scale-x-0 group-hover:scale-x-100 transition duration-500"></div>
                        </a>
                    {/each}
                </div>
            </div>
        {/each}

        <div class="bg-gray-900 rounded-[3rem] p-8 md:p-12 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
            <div class="relative z-10 max-w-xl">
                <h3 class="text-2xl md:text-3xl font-black text-white mb-4">
                    Tidak menemukan kategori yang pas?
                </h3>
                <p class="text-gray-400 leading-relaxed">
                    Jangan khawatir. Kamu bisa mencari penjahit "Custom" terbaik.
                </p>
            </div>
            <div class="relative z-10 flex flex-col sm:flex-row gap-4">
                <a 
                    href="/tailors" 
                    class="px-8 py-4 bg-gradient-to-r from-t-blue to-t-pink text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition shadow-lg"
                >
                    Lihat Semua Penjahit
                </a>
            </div>

            <div class="absolute top-0 right-0 w-64 h-64 bg-t-blue/30 rounded-full blur-[80px] -mr-16 -mt-16"></div>
        </div>

    </div>
</div>