<script lang="ts">
    import { 
        Search, MapPin, Star, Filter, 
        ChevronDown, Heart, ShieldCheck, SlidersHorizontal 
    } from 'lucide-svelte';
    import { fade, slide } from 'svelte/transition';

    // --- DUMMY DATA ---
    const locations = ['Adiwerna', 'Slawi', 'Tarub', 'Tegal Kota', 'Dukuhturi', 'Margasari'];
    const categories = ['Kemeja', 'Gamis', 'Seragam', 'Jas', 'Kebaya', 'Permak'];

    const allTailors = [
        { id: 1, name: 'Aldo Tailor', location: 'Adiwerna', rating: 4.9, reviews: 124, price: '$$', specialty: ['Jas', 'Kemeja'], verified: true, image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=800&q=80' },
        { id: 2, name: 'Rumah Jahit Bu Siti', location: 'Slawi', rating: 4.5, reviews: 45, price: '$', specialty: ['Gamis', 'Permak'], verified: true, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&q=80' },
        { id: 3, name: 'Executive Modiste', location: 'Tegal Kota', rating: 5.0, reviews: 89, price: '$$$', specialty: ['Kebaya', 'Gaun'], verified: true, image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=500&q=80' },
        { id: 4, name: 'Permak Kilat Mas Budi', location: 'Tarub', rating: 4.2, reviews: 210, price: '$', specialty: ['Permak', 'Celana'], verified: false, image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=500&q=80' },
        { id: 5, name: 'Seragam Sekolah Jaya', location: 'Dukuhturi', rating: 4.7, reviews: 312, price: '$', specialty: ['Seragam'], verified: true, image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&q=80' },
        { id: 6, name: 'The Suits Maker', location: 'Tegal Kota', rating: 4.9, reviews: 56, price: '$$$', specialty: ['Jas', 'Tuxedo'], verified: true, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80' },
    ];

    // --- STATE ---
    let searchQuery = $state('');
    let selectedLocations = $state<string[]>([]);
    let selectedCategories = $state<string[]>([]);
    let minRating = $state(0);
    
    // --- DERIVED STATE (FILTERING LOGIC) ---
    // Logika filter otomatis jalan setiap kali state di atas berubah
    let filteredTailors = $derived(
        allTailors.filter(tailor => {
            const matchSearch = tailor.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchLoc = selectedLocations.length === 0 || selectedLocations.includes(tailor.location);
            const matchCat = selectedCategories.length === 0 || tailor.specialty.some(s => selectedCategories.includes(s));
            const matchRating = tailor.rating >= minRating;

            return matchSearch && matchLoc && matchCat && matchRating;
        })
    );

    // --- HANDLERS ---
    function toggleLocation(loc: string) {
        if (selectedLocations.includes(loc)) {
            selectedLocations = selectedLocations.filter(l => l !== loc);
        } else {
            selectedLocations.push(loc);
        }
    }

    function toggleCategory(cat: string) {
        if (selectedCategories.includes(cat)) {
            selectedCategories = selectedCategories.filter(c => c !== cat);
        } else {
            selectedCategories.push(cat);
        }
    }
</script>

<div class="min-h-screen bg-[#FAFAFA] py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="mb-8">
            <h1 class="text-3xl font-black text-gray-900">Temukan Penjahit</h1>
            <p class="text-gray-500 mt-1">Menampilkan {filteredTailors.length} penjahit profesional di sekitarmu.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            
            <div class="hidden lg:block lg:col-span-1 space-y-6 sticky top-24">
                
                <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-8">
                    
                    <div class="flex items-center justify-between">
                        <h3 class="font-bold text-gray-800 flex items-center gap-2">
                            <SlidersHorizontal size={18}/> Filter
                        </h3>
                        <button 
                            onclick={() => { selectedLocations = []; selectedCategories = []; minRating = 0; }}
                            class="text-xs font-bold text-t-blue hover:underline"
                        >
                            Reset
                        </button>
                    </div>

                    <div class="space-y-3">
                        <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Lokasi / Kecamatan</p>
                        <div class="space-y-2">
                            {#each locations as loc}
                                <label class="flex items-center gap-3 cursor-pointer group">
                                    <div class="relative flex items-center">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedLocations.includes(loc)}
                                            onchange={() => toggleLocation(loc)}
                                            class="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-t-blue checked:border-t-blue transition"
                                        />
                                        <svg class="absolute w-3 h-3 text-white left-1 pointer-events-none opacity-0 peer-checked:opacity-100 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </div>
                                    <span class="text-sm text-gray-600 group-hover:text-t-blue transition">{loc}</span>
                                </label>
                            {/each}
                        </div>
                    </div>

                    <hr class="border-gray-100"/>

                    <div class="space-y-3">
                        <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Spesialisasi</p>
                        <div class="flex flex-wrap gap-2">
                            {#each categories as cat}
                                <button 
                                    onclick={() => toggleCategory(cat)}
                                    class="px-3 py-1.5 text-xs font-bold rounded-lg border transition-all 
                                    {selectedCategories.includes(cat) 
                                        ? 'bg-t-blue text-white border-t-blue' 
                                        : 'bg-white text-gray-500 border-gray-200 hover:border-t-blue hover:text-t-blue'}"
                                >
                                    {cat}
                                </button>
                            {/each}
                        </div>
                    </div>

                    <hr class="border-gray-100"/>

                    <div class="space-y-3">
                        <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Rating Minimal</p>
                        <div class="flex gap-2">
                            {#each [4, 4.5, 4.8] as rate}
                                <button 
                                    onclick={() => minRating = minRating === rate ? 0 : rate}
                                    class="flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-bold transition
                                    {minRating === rate 
                                        ? 'bg-t-yellow/10 border-t-yellow text-t-yellow' 
                                        : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}"
                                >
                                    <Star size={12} class="fill-current"/> {rate}+
                                </button>
                            {/each}
                        </div>
                    </div>

                </div>
            </div>

            <div class="col-span-1 lg:col-span-3 space-y-6">
                
                <div class="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-2">
                    <div class="pl-4 text-gray-400">
                        <Search size={20} />
                    </div>
                    <input 
                        type="text" 
                        bind:value={searchQuery}
                        placeholder="Cari nama penjahit (contoh: Aldo)..." 
                        class="w-full py-3 px-2 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 font-medium"
                    />
                    <button class="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition">
                        Cari
                    </button>
                </div>

                {#if selectedLocations.length > 0 || selectedCategories.length > 0}
                    <div class="flex flex-wrap gap-2 animate-in slide-in-from-left-2">
                        {#each selectedLocations as loc}
                            <div class="px-3 py-1 bg-blue-50 text-t-blue text-xs font-bold rounded-full flex items-center gap-1 border border-blue-100">
                                <span>{loc}</span>
                                <button onclick={() => toggleLocation(loc)} class="hover:text-red-500">×</button>
                            </div>
                        {/each}
                        {#each selectedCategories as cat}
                            <div class="px-3 py-1 bg-pink-50 text-t-pink text-xs font-bold rounded-full flex items-center gap-1 border border-pink-100">
                                <span>{cat}</span>
                                <button onclick={() => toggleCategory(cat)} class="hover:text-red-500">×</button>
                            </div>
                        {/each}
                        <button onclick={() => {selectedLocations=[]; selectedCategories=[]}} class="text-xs font-bold text-gray-400 hover:text-gray-600 underline px-2">Hapus Semua</button>
                    </div>
                {/if}

                {#if filteredTailors.length > 0}
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {#each filteredTailors as tailor (tailor.id)}
                            <a 
                                href="/tailors/{tailor.id}" 
                                transition:fade|local={{duration:200}} 
                                class="block group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
                            >
                                
                                <div class="relative h-48 overflow-hidden">
                                    <img src={tailor.image} alt={tailor.name} class="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                                    
                                    <div class="absolute top-4 left-4 flex flex-col gap-2">
                                        {#if tailor.verified}
                                            <span class="bg-blue-500/90 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 w-fit shadow-sm">
                                                <ShieldCheck size={12}/> Verified
                                            </span>
                                        {/if}
                                    </div>

                                    <button 
                                        onclick={(e) => { e.preventDefault(); }}
                                        class="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white hover:text-pink-500 transition z-10"
                                    >
                                        <Heart size={16} />
                                    </button>
                                </div>

                                <div class="p-5">
                                    <div class="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 class="font-bold text-gray-900 group-hover:text-t-blue transition">{tailor.name}</h3>
                                            <div class="flex items-center gap-1 text-gray-400 text-xs mt-1">
                                                <MapPin size={12} /> {tailor.location}
                                            </div>
                                        </div>
                                        <div class="flex items-center gap-1 bg-yellow-50 text-t-yellow px-2 py-1 rounded-lg text-xs font-bold">
                                            <Star size={10} class="fill-current" /> {tailor.rating}
                                        </div>
                                    </div>

                                    <div class="flex flex-wrap gap-2 mb-4">
                                        {#each tailor.specialty as tag}
                                            <span class="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold rounded-md border border-gray-100">{tag}</span>
                                        {/each}
                                    </div>

                                    <div class="flex items-center justify-between pt-4 border-t border-gray-50">
                                        <div class="text-xs font-medium text-gray-400">
                                            Harga mulai <br>
                                            <span class="text-gray-900 font-bold text-sm">
                                                {tailor.price === '$' ? 'Rp 25rb+' : tailor.price === '$$' ? 'Rp 50rb+' : 'Rp 100rb+'}
                                            </span>
                                        </div>
                                        <span class="px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl group-hover:bg-t-blue transition">
                                            Lihat
                                        </span>
                                    </div>
                                </div>
                            </a>
                        {/each}
                    </div>
                {:else}
                    <div class="bg-white rounded-3xl border border-gray-100 p-12 text-center">
                        <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                            <Search size={32} />
                        </div>
                        <h3 class="font-bold text-gray-800 text-lg">Penjahit Tidak Ditemukan</h3>
                        <p class="text-gray-500 text-sm mt-2 max-w-xs mx-auto">Coba kurangi filter atau gunakan kata kunci pencarian yang lain.</p>
                        <button 
                            onclick={() => { selectedLocations = []; selectedCategories = []; searchQuery = ''; }}
                            class="mt-6 px-6 py-2 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition text-sm"
                        >
                            Reset Filter
                        </button>
                    </div>
                {/if}

            </div>
        </div>
    </div>
</div>