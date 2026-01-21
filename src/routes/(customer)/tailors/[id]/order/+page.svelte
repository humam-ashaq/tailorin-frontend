<script lang="ts">
    import { 
        ArrowLeft, Ruler, Shirt, Info, 
        CheckCircle2, FileText, AlertCircle, Wallet 
    } from 'lucide-svelte';
    import { slide } from 'svelte/transition';

    // --- DUMMY DATA ---
    const tailor = {
        name: 'Aldo Tailor',
        location: 'Adiwerna, Tegal',
        services: [
            { id: 1, name: 'Jahit Kemeja Pendek', price: 75000, type: 'Atasan' },
            { id: 2, name: 'Jahit Kemeja Panjang', price: 85000, type: 'Atasan' },
            { id: 3, name: 'Jahit Celana Formal', price: 90000, type: 'Bawahan' },
            { id: 4, name: 'Jahit Jas Full Set', price: 1500000, type: 'Setelan' },
        ]
    };

    const userProfile = {
        name: 'Humam Ashaq',
        measurements: { ld: 104, pb: 75, pl: 62, lp: 90, pc: 100 } // LD, P.Baju, P.Lengan, L.Pinggang, P.Celana
    };

    // --- STATE ---
    let selectedServiceId = $state(1);
    let useProfileMeasurement = $state(true);
    let customNotes = $state('');
    let manualMeasurements = $state({ ld: 0, pb: 0, pl: 0, lp: 0, pc: 0 });
    let isSubmitting = $state(false);

    // --- DERIVED ---
    let selectedService = $derived(tailor.services.find(s => s.id === selectedServiceId));
    
    // Logic: Harga Base
    let basePrice = $derived(selectedService?.price || 0);

    // --- ACTIONS ---
    function handleSubmit() {
        isSubmitting = true;
        
        // Simulasi API Call
        setTimeout(() => {
            isSubmitting = false;
            alert(`Pesanan Berhasil Dibuat!\n\nPenjahit akan mereview request "${customNotes}" dan memberikan harga fix.`);
            window.location.href = '/'; // Balik ke home (atau nanti ke riwayat transaksi)
        }, 2000);
    }
</script>

<div class="min-h-screen bg-[#FAFAFA] pb-24">
    
    <div class="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div class="max-w-3xl mx-auto px-4 h-16 flex items-center gap-4">
            <a href="/tailors/1" class="p-2 hover:bg-gray-100 rounded-full transition text-gray-600">
                <ArrowLeft size={20}/>
            </a>
            <div>
                <h1 class="font-bold text-gray-900 text-lg">Buat Pesanan</h1>
                <p class="text-xs text-gray-500">di {tailor.name}</p>
            </div>
        </div>
    </div>

    <div class="max-w-3xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        <div class="md:col-span-2 space-y-8">
            
            <section class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <h2 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div class="w-6 h-6 rounded-full bg-blue-100 text-t-blue flex items-center justify-center text-xs">1</div>
                    Pilih Layanan
                </h2>
                
                <div class="space-y-3">
                    {#each tailor.services as service}
                        <button 
                            onclick={() => selectedServiceId = service.id}
                            class="w-full flex justify-between items-center p-4 rounded-xl border-2 transition-all group text-left
                            {selectedServiceId === service.id 
                                ? 'border-t-blue bg-blue-50/50' 
                                : 'border-gray-100 hover:border-gray-200'}"
                        >
                            <div>
                                <span class="block font-bold text-gray-800 text-sm">{service.name}</span>
                                <span class="text-xs text-gray-400">{service.type}</span>
                            </div>
                            <div class="text-right">
                                <span class="block font-bold text-gray-900 text-sm">Rp {service.price.toLocaleString('id-ID')}</span>
                                {#if selectedServiceId === service.id}
                                    <div transition:slide={{axis:'y'}} class="text-[10px] text-t-blue font-bold">Terpilih</div>
                                {/if}
                            </div>
                        </button>
                    {/each}
                </div>
            </section>

            <section class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <h2 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div class="w-6 h-6 rounded-full bg-pink-100 text-t-pink flex items-center justify-center text-xs">2</div>
                    Data Ukuran
                </h2>

                <div class="bg-gray-100 p-1 rounded-xl flex mb-6">
                    <button 
                        onclick={() => useProfileMeasurement = true}
                        class="flex-1 py-2 rounded-lg text-xs font-bold transition-all {useProfileMeasurement ? 'bg-white shadow text-gray-900' : 'text-gray-500'}"
                    >
                        Pakai Profil Saya
                    </button>
                    <button 
                        onclick={() => useProfileMeasurement = false}
                        class="flex-1 py-2 rounded-lg text-xs font-bold transition-all {!useProfileMeasurement ? 'bg-white shadow text-gray-900' : 'text-gray-500'}"
                    >
                        Input Manual
                    </button>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-1">
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <label class="text-[10px] font-bold text-gray-400 uppercase">Lingkar Dada</label>
                        <div class="relative">
                            <input 
                                type="number" 
                                value={useProfileMeasurement ? userProfile.measurements.ld : manualMeasurements.ld}
                                disabled={useProfileMeasurement}
                                class="w-full pl-3 pr-8 py-2.5 bg-gray-50 border border-transparent rounded-xl text-sm font-bold focus:bg-white focus:border-t-blue outline-none transition disabled:opacity-60 disabled:cursor-not-allowed"
                            />
                            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">cm</span>
                        </div>
                    </div>
                    <div class="space-y-1">
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <label class="text-[10px] font-bold text-gray-400 uppercase">Panjang Baju</label>
                        <div class="relative">
                            <input 
                                type="number" 
                                value={useProfileMeasurement ? userProfile.measurements.pb : manualMeasurements.pb}
                                disabled={useProfileMeasurement}
                                class="w-full pl-3 pr-8 py-2.5 bg-gray-50 border border-transparent rounded-xl text-sm font-bold focus:bg-white focus:border-t-blue outline-none transition disabled:opacity-60 disabled:cursor-not-allowed"
                            />
                            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">cm</span>
                        </div>
                    </div>
                </div>

                {#if useProfileMeasurement}
                    <div class="mt-4 flex items-center gap-2 text-xs text-t-blue bg-blue-50 px-3 py-2 rounded-lg">
                        <CheckCircle2 size={14}/> Menggunakan data: <b>{userProfile.name}</b>
                    </div>
                {/if}
            </section>

            <section class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <h2 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div class="w-6 h-6 rounded-full bg-yellow-100 text-t-yellow flex items-center justify-center text-xs">3</div>
                    Detail & Request Khusus
                </h2>

                <div class="space-y-2">
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <label class="text-xs font-bold text-gray-700">Keterangan Tambahan Model</label>
                    <textarea 
                        bind:value={customNotes}
                        rows="4" 
                        placeholder="Contoh: Tolong buatkan saku bobok di kiri atas, kerah model shanghai, dan kancing bungkus kain." 
                        class="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl text-sm focus:bg-white focus:border-gray-900 outline-none transition resize-none placeholder-gray-400"
                    ></textarea>
                    <p class="text-[10px] text-gray-400 italic text-right">Semakin detail semakin baik.</p>
                </div>
            </section>

        </div>

        <div class="md:col-span-1 sticky top-24 space-y-4">
            
            <div class="bg-white p-6 rounded-3xl border border-gray-200 shadow-lg">
                <h3 class="font-bold text-gray-900 mb-4">Ringkasan Pesanan</h3>
                
                <div class="space-y-3 text-sm pb-4 border-b border-gray-100 mb-4">
                    <div class="flex justify-between">
                        <span class="text-gray-500">Jasa Jahit</span>
                        <span class="font-bold text-gray-900 text-right w-1/2">{selectedService?.name}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-500">Ukuran</span>
                        <span class="font-medium text-gray-900">{useProfileMeasurement ? 'Profil' : 'Manual'}</span>
                    </div>
                </div>

                <div class="bg-gray-50 p-3 rounded-xl mb-4 border border-gray-100">
                    <p class="text-[10px] text-gray-500 mb-1 uppercase font-bold tracking-wider">Estimasi Harga Awal</p>
                    <div class="flex items-end gap-1 text-t-blue">
                        <span class="text-sm font-medium mb-1">Rp</span>
                        <span class="text-3xl font-black">{basePrice.toLocaleString('id-ID')}</span>
                    </div>
                </div>

                <div class="flex gap-3 bg-yellow-50 p-3 rounded-xl border border-yellow-100 text-yellow-800 mb-6">
                    <AlertCircle size={32} class="flex-shrink-0 mt-0.5"/>
                    <p class="text-[10px] leading-relaxed font-medium">
                        Harga di atas adalah <b>estimasi dasar</b>. Penjahit akan mengkonfirmasi harga final (fix) setelah meninjau request detail model Anda.
                    </p>
                </div>

                <button 
                    onclick={handleSubmit}
                    disabled={isSubmitting}
                    class="w-full py-4 bg-gradient-to-r from-t-blue to-t-pink text-white rounded-xl font-bold hover:bg-black transition shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {#if isSubmitting}
                        <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {:else}
                        <Wallet size={18}/> Buat Pesanan
                    {/if}
                </button>
            </div>

            <div class="flex items-center justify-center gap-2 text-gray-400">
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                <span class="text-[10px] font-medium">Transaksi Aman Terlindungi</span>
            </div>

        </div>

    </div>
</div>