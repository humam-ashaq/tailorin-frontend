<script lang="ts">
    import { 
        Wand2, Ruler, Shirt, Plus, Trash2, 
        Sparkles, User, RefreshCcw, Info, Check, Scissors 
    } from 'lucide-svelte';
    import { slide } from 'svelte/transition';

    // --- DATA ---
    const userProfile = {
        name: 'Humam Ashaq',
        measurements: { ld: 104, pb: 75, pl: 62 }
    };

    // --- STATE ---
    let fabricWidth = $state('150');
    let isCalculating = $state(false);
    
    let items = $state([
        { 
            id: 1, 
            useProfile: true, 
            name: 'Pakaian Saya',
            measurements: { ...userProfile.measurements },
            clothingType: 'Kemeja',
            model: ''
        }
    ]);

    let result = $state<{ 
        total: number; 
        breakdown: { name: string, meters: number, details: string }[] 
    } | null>(null);

    let nextId = 2;

    // --- LOGIC ---
    function addItem() {
        items.push({
            id: nextId++,
            useProfile: false,
            name: `Pakaian Tambahan`,
            measurements: { ld: 0, pb: 0, pl: 0 },
            clothingType: 'Gamis',
            model: ''
        });
    }

    function removeItem(index: number) {
        if (items.length > 1) {
            items.splice(index, 1);
            items = items;
        }
    }

    function toggleSource(index: number, useProfile: boolean) {
        items[index].useProfile = useProfile;
        if (useProfile) {
            items[index].measurements = { ...userProfile.measurements };
            items[index].name = 'Pakaian Saya';
        } else {
            items[index].measurements = { ld: 0, pb: 0, pl: 0 };
            items[index].name = `Pakaian Tambahan`;
        }
    }

    function calculate() {
        isCalculating = true;
        result = null;

        setTimeout(() => {
            let grandTotal = 0;
            let breakdownList = [];
            const width = parseInt(fabricWidth);

            for (const item of items) {
                let m = 0;
                const { pb, pl, ld } = item.measurements;

                if (item.clothingType === 'Kemeja') {
                    m = (pb + pl + 15) / 100;
                    if (ld > 115) m += 0.25;
                } else if (item.clothingType === 'Gamis') {
                    if (width === 150) { m = (pb + pl + 30) / 100; } else { m = (2 * pb + pl) / 100; }
                } else if (item.clothingType === 'Celana') {
                    m = (pb + 20) / 100;
                    if (width === 115 && ld > 100) m *= 2;
                } else {
                    m = (pb + 20) / 100;
                }
                
                m = Math.ceil(m * 4) / 4;
                grandTotal += m;
                
                breakdownList.push({
                    name: item.useProfile ? 'Punya Saya' : item.name,
                    meters: m,
                    details: `${item.clothingType} ${item.model ? `(${item.model})` : ''}`
                });
            }

            result = { total: grandTotal, breakdown: breakdownList };
            isCalculating = false;
        }, 800); 
    }

    function reset() {
        items = [{ id: 1, useProfile: true, name: 'Pakaian Saya', measurements: { ...userProfile.measurements }, clothingType: 'Kemeja', model: '' }];
        result = null;
        nextId = 2;
    }
</script>

<div class="min-h-screen bg-[#FAFAFA] py-12">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center mb-16 space-y-4">
            <h1 class="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                Kalkulator <span class="text-transparent bg-clip-text bg-gradient-to-r from-t-blue to-t-pink">Kain Cerdas</span>
            </h1>
            <p class="text-gray-500 max-w-xl mx-auto text-lg">
                Estimasi kebutuhan kain dengan akurasi tinggi menggunakan algoritma penjahit profesional.
            </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div class="lg:col-span-8 space-y-8">
                
                {#each items as item, index (item.id)}
                    <div transition:slide|local class="group bg-white rounded-[2.5rem] p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-t-blue/30 transition-all duration-300 relative">
                        
                        <div class="flex justify-between items-start mb-8">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 font-bold text-xl group-hover:bg-t-blue group-hover:text-white transition-colors duration-300">
                                    {index + 1}
                                </div>
                                <div>
                                    <h3 class="font-bold text-xl text-gray-800">Detail Ukuran</h3>
                                    <p class="text-sm text-gray-400">Masukkan ukuran dan model</p>
                                </div>
                            </div>
                            
                            {#if items.length > 1}
                                <button onclick={() => removeItem(index)} class="text-gray-300 hover:text-red-500 transition p-2">
                                    <Trash2 size={20} />
                                </button>
                            {/if}
                        </div>

                        <div class="bg-gray-100 p-1.5 rounded-2xl flex relative mb-10 w-full sm:w-fit">
                            <button 
                                onclick={() => toggleSource(index, true)}
                                class="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 relative z-10 {item.useProfile ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}"
                            >
                                <User size={16}/> Ukuran Saya
                            </button>
                            <button 
                                onclick={() => toggleSource(index, false)}
                                class="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 relative z-10 {!item.useProfile ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}"
                            >
                                <Ruler size={16}/> Input Manual
                            </button>
                        </div>

                        <div class="grid grid-cols-1 xl:grid-cols-2 gap-y-10 gap-x-24">
                            
                            <div class="space-y-5">
                                <label class="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                    <Ruler size={14}/> Dimensi Badan (cm)
                                </label>
                                
                                <div class="grid grid-cols-3 gap-4">
                                    {#each [
                                        { label: 'Lingkar Dada', key: 'ld' }, 
                                        { label: 'Panjang Baju', key: 'pb' }, 
                                        { label: 'Panjang Lengan', key: 'pl' }
                                    ] as field}
                                        <div class="space-y-2">
                                            <input 
                                                type="number" 
                                                bind:value={item.measurements[field.key as keyof typeof item.measurements]} 
                                                disabled={item.useProfile} 
                                                class="w-full text-center text-xl font-bold py-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-800 focus:bg-white focus:border-t-blue focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all outline-none placeholder-gray-300" 
                                                placeholder="0"
                                            />
                                            <span class="block text-[10px] font-bold text-gray-400 text-center uppercase tracking-wide">{field.label}</span>
                                        </div>
                                    {/each}
                                </div>
                                
                                {#if item.useProfile}
                                    <div class="flex items-center gap-2 text-xs text-t-blue bg-blue-50 px-4 py-2 rounded-xl w-fit">
                                        <Check size={14} strokeWidth={3}/> Data profil: <b>{userProfile.name}</b>
                                    </div>
                                {/if}
                            </div>

                            <div class="space-y-5">
                                <label class="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                    <Scissors size={14}/> Model & Gaya
                                </label>
                                
                                <div class="space-y-4">
                                    <div class="relative">
                                        <select bind:value={item.clothingType} class="w-full appearance-none px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl font-bold text-gray-800 focus:bg-white focus:border-t-pink focus:ring-0 outline-none transition-all cursor-pointer">
                                            <option>Kemeja</option>
                                            <option>Gamis</option>
                                            <option>Celana</option>
                                            <option>Rok</option>
                                            <option>Blouse</option>
                                        </select>
                                        <div class="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                            <Shirt size={20}/>
                                        </div>
                                    </div>
                                    <input 
                                        type="text" 
                                        bind:value={item.model} 
                                        placeholder="Detail Model (Opsional)" 
                                        class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl font-medium text-gray-800 focus:bg-white focus:border-t-pink focus:ring-0 outline-none transition-all"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                {/each}

                <button 
                    onclick={addItem}
                    class="w-full py-4 border-2 border-dashed border-gray-200 rounded-[2rem] text-gray-400 font-bold hover:border-t-blue hover:text-t-blue hover:bg-blue-50/50 transition-all flex flex-row items-center justify-center gap-3 group"
                >
                    <div class="bg-gray-100 text-gray-400 rounded-full p-1.5 group-hover:bg-t-blue group-hover:text-white transition-colors">
                        <Plus size={20} />
                    </div>
                    <span>Tambah Ukuran Lain</span>
                </button>

            </div>

            <div class="lg:col-span-4 sticky top-28 space-y-6">
                
                <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="font-bold text-gray-800">Lebar Kain</h3>
                        <div class="p-2 bg-t-yellow/20 text-t-yellow rounded-full">
                            <Ruler size={18}/>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <button 
                            onclick={() => fabricWidth = '150'}
                            class="py-3 px-4 text-sm font-bold rounded-2xl border-2 transition-all {fabricWidth === '150' ? 'border-t-blue bg-blue-50 text-t-blue' : 'border-gray-100 text-gray-400 hover:border-gray-200'}"
                        >
                            150 cm
                            <span class="block text-[10px] font-normal opacity-70">Bidang Besar</span>
                        </button>
                        <button 
                            onclick={() => fabricWidth = '115'}
                            class="py-3 px-4 text-sm font-bold rounded-2xl border-2 transition-all {fabricWidth === '115' ? 'border-t-blue bg-blue-50 text-t-blue' : 'border-gray-100 text-gray-400 hover:border-gray-200'}"
                        >
                            115 cm
                            <span class="block text-[10px] font-normal opacity-70">Bidang Kecil</span>
                        </button>
                    </div>
                </div>

                <div class="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                    <div class="absolute top-0 right-0 w-40 h-40 bg-t-blue rounded-full blur-[80px] opacity-20 group-hover:opacity-30 transition duration-700"></div>
                    <div class="absolute bottom-0 left-0 w-32 h-32 bg-t-pink rounded-full blur-[60px] opacity-20 group-hover:opacity-30 transition duration-700"></div>

                    <div class="relative z-10">
                        <div class="flex justify-between items-end mb-8">
                            <div>
                                <p class="text-gray-400 text-sm font-medium mb-1">Total Item</p>
                                <p class="text-3xl font-black">{items.length} <span class="text-lg font-medium text-gray-500">Pcs</span></p>
                            </div>
                            {#if result}
                                <div class="text-right">
                                    <p class="text-gray-400 text-sm font-medium mb-1">Estimasi</p>
                                    <p class="text-4xl font-black text-t-yellow leading-none">{result.total}</p>
                                    <p class="text-xs text-gray-500">Meter Kain</p>
                                </div>
                            {/if}
                        </div>

                        {#if result}
                            <div transition:slide class="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-6 border border-white/5">
                                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Rincian Per Item</p>
                                <div class="space-y-3 max-h-40 overflow-y-auto custom-scrollbar pr-2">
                                    {#each result.breakdown as item}
                                        <div class="flex justify-between text-sm">
                                            <span class="text-gray-300">{item.name}</span>
                                            <span class="font-mono font-bold text-white">{item.meters}m</span>
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        {/if}

                        <button 
                            onclick={calculate}
                            disabled={isCalculating}
                            class="w-full py-4 bg-gradient-to-r from-t-blue to-t-pink text-gray-900 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {#if isCalculating}
                                <div class="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                            {:else}
                                <Sparkles size={20} class="text-t-purple"/> {result ? 'Hitung Ulang' : 'Hitung Sekarang'}
                            {/if}
                        </button>

                        {#if result}
                            <button onclick={reset} class="w-full mt-4 text-xs font-bold text-gray-500 hover:text-white transition flex items-center justify-center gap-1">
                                <RefreshCcw size={12}/> Reset Data
                            </button>
                        {/if}
                    </div>
                </div>

            </div>

        </div>
    </div>
</div>

<style>
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }
</style>