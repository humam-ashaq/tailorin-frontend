<script lang="ts">
    import { 
        Wand2, User, Ruler, Shirt, 
        Plus, Trash2, Sparkles, RefreshCcw 
    } from 'lucide-svelte';
    import { slide } from 'svelte/transition';

    // --- DATA & LOGIC ---
    const existingCustomers = [
        { id: 'CUST-01', name: 'Andi Saputra (Ayah)', measurements: { ld: 104, pb: 75, pl: 62 } },
        { id: 'CUST-02', name: 'Siti Aminah (Ibu)', measurements: { ld: 98, pb: 138, pl: 56 } },
        { id: 'CUST-03', name: 'Budi Santoso (Anak 1)', measurements: { ld: 110, pb: 74, pl: 63 } },
    ];

    type FabricItem = {
        id: number;
        source: 'database' | 'manual';
        customerId: string;
        nameDisplay: string;
        measurements: { ld: number; pb: number; pl: number };
        clothingType: string;
        model: string;
    };

    let fabricWidth = $state('150');
    let isCalculating = $state(false);
    
    let items = $state<FabricItem[]>([
        { id: 1, source: 'database', customerId: '', nameDisplay: 'Anggota 1', measurements: { ld: 0, pb: 0, pl: 0 }, clothingType: 'Kemeja', model: '' }
    ]);

    let result = $state<{ 
        total: number; 
        breakdown: { name: string, meters: number, details: string }[] 
    } | null>(null);

    let nextId = 2;

    function addPerson() {
        items.push({
            id: nextId++,
            source: 'database',
            customerId: '',
            nameDisplay: `Anggota ${items.length + 1}`,
            measurements: { ld: 0, pb: 0, pl: 0 },
            clothingType: 'Kemeja',
            model: ''
        });
    }

    function removePerson(index: number) {
        if (items.length > 1) {
            items.splice(index, 1);
            items = items;
        }
    }

    function handleCustomerChange(index: number) {
        const item = items[index];
        const customer = existingCustomers.find(c => c.id === item.customerId);
        if (customer) {
            item.measurements = { ...customer.measurements };
            item.nameDisplay = customer.name;
        } else {
            item.measurements = { ld: 0, pb: 0, pl: 0 };
            item.nameDisplay = `Anggota ${index + 1}`;
        }
    }

    function toggleSource(index: number, source: 'database' | 'manual') {
        items[index].source = source;
        items[index].customerId = '';
        items[index].measurements = { ld: 0, pb: 0, pl: 0 };
        items[index].nameDisplay = source === 'manual' ? `Manual (Anggota ${index+1})` : `Anggota ${index+1}`;
    }

    function calculateTotal() {
        for (const item of items) {
            if (item.source === 'database' && !item.customerId) {
                alert('Mohon pilih pelanggan untuk semua data Database.');
                return;
            }
            if (item.measurements.pb === 0) {
                alert(`Panjang baju ${item.nameDisplay} belum diisi.`);
                return;
            }
        }

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
                breakdownList.push({ name: item.nameDisplay, meters: m, details: `${item.clothingType} ${item.model ? `(${item.model})` : ''}` });
            }

            result = { total: grandTotal, breakdown: breakdownList };
            isCalculating = false;
        }, 1000); 
    }

    function resetAll() {
        items = [{ id: 1, source: 'database', customerId: '', nameDisplay: 'Anggota 1', measurements: { ld: 0, pb: 0, pl: 0 }, clothingType: 'Kemeja', model: '' }];
        result = null;
        nextId = 2;
    }
</script>

<div class="space-y-6 pb-32">
    <div
    class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-t-blue to-t-pink p-8 text-white shadow-xl mb-8"
  >
    <div class="relative z-10">
      <div class="flex flex-col md:flex-row justify-between gap-4 items-center">
        <div>
            <h2 class="text-3xl font-bold text-white flex items-center gap-2">
                <Wand2 class="text-white" size={32} /> Kalkulator Kain Keluarga
            </h2>
            <p class="text-t-gray text-sm mt-1">Hitung kebutuhan kain untuk pesanan rombongan/keluarga.</p>
        </div>
        <button onclick={resetAll} class="flex items-center gap-2 px-4 py-2 bg-t-yellow text-t-dark hover:text-gray-800 hover:bg-yellow-400 rounded-xl transition shadow-md font-medium text-sm">
            <RefreshCcw size={16}/> Reset Ulang
        </button>
    </div>
    </div>
    <div
      class="absolute -right-10 -top-20 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"
    ></div>
    <div
      class="absolute right-20 bottom-[-40px] w-40 h-40 bg-t-yellow opacity-20 rounded-full blur-2xl"
    ></div>
  </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        <div class="lg:col-span-2 space-y-6">
            <div class="space-y-6">
                {#each items as item, index (item.id)}
                    <div transition:slide|local class="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 relative group transition-all hover:border-t-blue hover:shadow-md">
                        
                        <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full bg-blue-50 text-t-blue flex items-center justify-center font-bold text-sm">
                                    {index + 1}
                                </div>
                                <h3 class="font-bold text-gray-800">{item.source === 'database' && item.nameDisplay !== `Anggota ${index+1}` ? item.nameDisplay : `Anggota ${index + 1}`}</h3>
                            </div>
                            
                            {#if items.length > 1}
                                <button onclick={() => removePerson(index)} class="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition" title="Hapus">
                                    <Trash2 size={18} />
                                </button>
                            {/if}
                        </div>

                        <div class="flex p-1 bg-gray-100 rounded-xl mb-6 w-full md:w-2/3">
                            <button onclick={() => toggleSource(index, 'database')} class="flex-1 py-1.5 text-xs font-bold rounded-lg transition flex items-center justify-center gap-2 {item.source === 'database' ? 'bg-white shadow text-t-blue' : 'text-gray-500 hover:text-gray-700'}"><User size={14}/> Dari Database</button>
                            <button onclick={() => toggleSource(index, 'manual')} class="flex-1 py-1.5 text-xs font-bold rounded-lg transition flex items-center justify-center gap-2 {item.source === 'manual' ? 'bg-white shadow text-t-pink' : 'text-gray-500 hover:text-gray-700'}"><Ruler size={14}/> Input Manual</button>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-4">
                                {#if item.source === 'database'}
                                    <div>
                                        <!-- svelte-ignore a11y_label_has_associated_control -->
                                        <label class="block text-xs font-bold text-gray-400 uppercase mb-1.5">Pilih Pelanggan</label>
                                        <select bind:value={item.customerId} onchange={() => handleCustomerChange(index)} class="w-full px-3 py-2.5 bg-blue-50/50 border border-transparent rounded-xl text-gray-800 text-sm font-medium focus:ring-2 focus:ring-t-blue/20 outline-none">
                                            <option value="">-- Cari Nama --</option>
                                            {#each existingCustomers as cust}<option value={cust.id}>{cust.name}</option>{/each}
                                        </select>
                                    </div>
                                {/if}
                                <div class="grid grid-cols-3 gap-3">
                                    <!-- svelte-ignore a11y_label_has_associated_control -->
                                    <div><label class="block text-[10px] font-bold text-gray-400 uppercase mb-1 text-center">LD</label><input type="number" bind:value={item.measurements.ld} disabled={item.source === 'database'} class="w-full text-center px-1 py-2 bg-gray-50 rounded-lg text-sm font-bold focus:bg-white focus:ring-2 focus:ring-t-blue/20 disabled:text-gray-500 disabled:cursor-not-allowed" placeholder="0"/></div>
                                    <!-- svelte-ignore a11y_label_has_associated_control -->
                                    <div><label class="block text-[10px] font-bold text-gray-400 uppercase mb-1 text-center">P. Baju</label><input type="number" bind:value={item.measurements.pb} disabled={item.source === 'database'} class="w-full text-center px-1 py-2 bg-gray-50 rounded-lg text-sm font-bold focus:bg-white focus:ring-2 focus:ring-t-blue/20 disabled:text-gray-500 disabled:cursor-not-allowed" placeholder="0"/></div>
                                    <!-- svelte-ignore a11y_label_has_associated_control -->
                                    <div><label class="block text-[10px] font-bold text-gray-400 uppercase mb-1 text-center">P. Lengan</label><input type="number" bind:value={item.measurements.pl} disabled={item.source === 'database'} class="w-full text-center px-1 py-2 bg-gray-50 rounded-lg text-sm font-bold focus:bg-white focus:ring-2 focus:ring-t-blue/20 disabled:text-gray-500 disabled:cursor-not-allowed" placeholder="0"/></div>
                                </div>
                            </div>
                            <div class="space-y-4">
                                <!-- svelte-ignore a11y_label_has_associated_control -->
                                <div><label class="block text-xs font-bold text-gray-400 uppercase mb-1.5">Jenis Pakaian</label><select bind:value={item.clothingType} class="w-full px-3 py-2.5 bg-gray-50 border border-transparent rounded-xl text-gray-800 text-sm font-medium focus:ring-2 focus:ring-purple-200 outline-none"><option>Kemeja</option><option>Gamis</option><option>Celana</option><option>Rok</option></select></div>
                                <!-- svelte-ignore a11y_label_has_associated_control -->
                                <div><label class="block text-xs font-bold text-gray-400 uppercase mb-1.5">Model</label><input type="text" bind:value={item.model} placeholder="Contoh: Slimfit / Rempel" class="w-full px-3 py-2.5 bg-gray-50 border border-transparent rounded-xl text-gray-800 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-purple-200 outline-none"/></div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>

            <button onclick={addPerson} class="w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 hover:border-t-blue hover:text-t-blue hover:bg-blue-50 transition flex items-center justify-center gap-2 font-bold">
                <Plus size={20} /> Tambah Anggota Keluarga Lain
            </button>
        </div>

        <div class="lg:col-span-1 sticky top-28 space-y-6">
            
            <div class="bg-gradient-to-r from-t-blue to-t-pink p-6 rounded-2xl text-white shadow-lg">
                <div class="flex items-center gap-3 mb-4">
                    <Ruler size={24} class="text-white"/>
                    <div>
                        <h3 class="font-bold">Pengaturan Kain</h3>
                        <p class="text-xs text-gray-200">Global setting</p>
                    </div>
                </div>
                <div class="space-y-2">
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <label class="text-xs font-bold uppercase text-white/80">Pilih Lebar Kain</label>
                    <select bind:value={fabricWidth} class="w-full bg-white text-t-dark font-bold rounded-xl px-4 py-3 outline-none cursor-pointer shadow-sm focus:ring-2 focus:ring-t-yellow/50 border-none">
                        <option value="150">150 cm (Besar)</option>
                        <option value="115">115 cm (Kecil)</option>
                    </select>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 class="font-bold text-gray-800 text-lg mb-4">Ringkasan</h3>
                <div class="space-y-3 mb-6">
                    <div class="flex justify-between text-sm text-gray-600">
                        <span>Total Anggota:</span>
                        <span class="font-bold">{items.length} Orang</span>
                    </div>
                </div>
                <button onclick={calculateTotal} disabled={isCalculating} class="w-full py-3 bg-gradient-to-r from-t-blue to-t-pink text-white rounded-xl font-bold shadow-md hover:shadow-lg hover:scale-[1.02] transition active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {#if isCalculating}
                        <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Menghitung...
                    {:else}
                        <Sparkles size={18} class="text-t-yellow" /> Hitung AI
                    {/if}
                </button>
            </div>

            {#if result}
                <div transition:slide class="bg-white border border-gray-200 p-6 rounded-2xl shadow-xl relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-t-blue to-t-pink"></div>
                    <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Total Kebutuhan</p>
                    <div class="flex items-baseline gap-2 mb-6 border-b border-gray-100 pb-6">
                        <span class="text-5xl font-black text-t-blue">{result.total}</span>
                        <span class="text-xl font-bold text-gray-400">Meter</span>
                    </div>
                    <div class="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        <p class="text-xs font-bold text-gray-400 uppercase mb-2">Rincian:</p>
                        {#each result.breakdown as item}
                            <div class="flex justify-between items-start text-sm p-2 hover:bg-gray-50 rounded-lg transition">
                                <div><p class="font-bold text-gray-800">{item.name}</p><p class="text-[10px] text-gray-500">{item.details}</p></div>
                                <span class="font-mono text-t-pink font-bold">{item.meters}m</span>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
        </div>

    </div>
</div>

<style>
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #ddd; border-radius: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #ccc; }
</style>