<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { 
        ArrowLeft, Save, User, Phone, FileText, 
        Layers, Ruler, PlusCircle, CheckCircle 
    } from 'lucide-svelte';

    // DATA DUMMY PELANGGAN (Simulasi Database)
    const existingCustomers = [
        { id: 'CUST-01', name: 'Andi Saputra', phone: '0812-3456-7890' },
        { id: 'CUST-02', name: 'Siti Aminah', phone: '0856-7890-1234' },
        { id: 'CUST-03', name: 'Budi Santoso', phone: '0813-4567-8901' },
    ];

    // State Form Pesanan
    let orderForm = $state({
        client: '',
        phone: '',
        item: '',
        model: '',
        fabric: '',
        notes: '',
        status: 'Baru', 
        price: 0,
        deadline: '',
        hasMeasurement: false 
    });

    // State Dropdown & Source
    let measurementSource = $state('existing'); // 'existing' | 'new'
    let selectedCustomerId = $state(''); // ID Pelanggan yang dipilih di dropdown

    // LOGIKA AUTO-FILL SAAT PILIH PELANGGAN
    function handleCustomerSelect() {
        // Cari data pelanggan berdasarkan ID yang dipilih
        const customer = existingCustomers.find(c => c.id === selectedCustomerId);
        
        if (customer) {
            // Isi Form Otomatis
            orderForm.client = customer.name;
            orderForm.phone = customer.phone;
            orderForm.hasMeasurement = true; // Anggap ukurannya sudah ada di DB
        } else {
            // Reset jika pilih "Pilih Data..."
            orderForm.client = '';
            orderForm.phone = '';
            orderForm.hasMeasurement = false;
        }
    }

    // LOGIKA: Cek apakah kembali dari halaman Tambah Ukuran?
    $effect(() => {
        const params = $page.url.searchParams;
        if (params.get('fromMeasurement') === 'true') {
            orderForm.client = params.get('name') || '';
            orderForm.phone = params.get('phone') || '';
            orderForm.hasMeasurement = true; 
            measurementSource = 'new';
        }
    });

    function goToCreateMeasurement() {
        const params = new URLSearchParams();
        params.set('ref', '/admin/orders/new');
        if (orderForm.client) params.set('name', orderForm.client);
        if (orderForm.phone) params.set('phone', orderForm.phone);
        goto(`/admin/measurements/new?${params.toString()}`);
    }

    function handleSave() {
        if (!orderForm.client || !orderForm.item) {
            alert('Nama Pelanggan dan Item wajib diisi!');
            return;
        }
        console.log('Pesanan Dibuat:', orderForm);
        alert('Pesanan berhasil dibuat!');
        goto('/admin/orders');
    }
</script>

<div class="space-y-6 pb-20">
    <div class="flex items-center justify-between sticky top-20 z-40 bg-t-gray/90 backdrop-blur-sm py-2">
        <div class="flex items-center gap-4">
            <a href="/admin/orders" class="p-2 rounded-xl bg-gradient-to-r from-t-blue to-t-pink border border-gray-200 text-white hover:bg-gray-50 hover:text-t-blue transition shadow-sm">
                <ArrowLeft size={20} />
            </a>
            <div>
                <h2 class="text-3xl font-bold text-gray-800">Buat Pesanan</h2>
                <p class="text-gray-500 text-sm">Input data pesanan baru.</p>
            </div>
        </div>

        <button 
            onclick={handleSave}
            class="flex items-center gap-2 px-6 py-3 bg-t-yellow text-t-dark rounded-xl hover:bg-yellow-400 transition shadow-md font-medium"
        >
            <Save size={18} /> Simpan Pesanan
        </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div class="space-y-6">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div class="flex items-center gap-2 mb-6 text-gray-800 font-bold border-b border-gray-100 pb-4">
                    <User size={20} class="text-t-blue" />
                    <h3>Data Pelanggan</h3>
                </div>

                <div class="space-y-4">
                    <div>
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <label class="block text-xs font-bold text-gray-400 uppercase mb-1.5">Nama Pelanggan *</label>
                        <input type="text" bind:value={orderForm.client} placeholder="Nama Pemesan" class="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-gray-800 focus:bg-white focus:ring-2 focus:ring-t-blue/20 transition"/>
                    </div>
                    <div>
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <label class="block text-xs font-bold text-gray-400 uppercase mb-1.5">Nomor HP</label>
                        <input type="tel" bind:value={orderForm.phone} placeholder="08..." class="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-gray-800 focus:bg-white focus:ring-2 focus:ring-t-blue/20 transition"/>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div class="flex items-center gap-2 mb-4 text-gray-800 font-bold">
                    <Ruler size={20} class="text-green-600" />
                    <h3>Data Ukuran</h3>
                </div>
                
                <div class="flex gap-2 p-1 bg-gray-100 rounded-xl mb-4">
                    <button 
                        onclick={() => measurementSource = 'existing'}
                        class="flex-1 py-2 text-sm font-bold rounded-lg transition {measurementSource === 'existing' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}"
                    >
                        Sudah Ada
                    </button>
                    <button 
                        onclick={() => measurementSource = 'new'}
                        class="flex-1 py-2 text-sm font-bold rounded-lg transition {measurementSource === 'new' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}"
                    >
                        Buat Baru
                    </button>
                </div>

                {#if measurementSource === 'existing'}
                    <div class="relative">
                        <select 
                            bind:value={selectedCustomerId}
                            onchange={handleCustomerSelect}
                            class="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-gray-800 appearance-none cursor-pointer focus:ring-2 focus:ring-green-200"
                        >
                            <option value="">Pilih Data Pelanggan...</option>
                            {#each existingCustomers as cust}
                                <option value={cust.id}>{cust.name} ({cust.id})</option>
                            {/each}
                        </select>
                        <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                    </div>
                    
                    {#if selectedCustomerId && orderForm.client}
                        <div class="mt-3 p-3 bg-green-50 text-green-700 rounded-lg text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                            <CheckCircle size={14} />
                            <span>Data <strong>{orderForm.client}</strong> berhasil dimuat.</span>
                        </div>
                    {/if}

                {:else}
                    {#if orderForm.hasMeasurement}
                        <div class="p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3 text-green-700 mb-2">
                            <CheckCircle size={20} />
                            <div>
                                <p class="font-bold text-sm">Ukuran Baru Tersimpan</p>
                                <p class="text-xs">Data ukuran siap digunakan.</p>
                            </div>
                        </div>
                        <button onclick={goToCreateMeasurement} class="text-xs text-t-blue hover:underline font-medium ml-1">
                            Edit ukuran ini lagi
                        </button>
                    {:else}
                        <div class="text-center py-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            <p class="text-sm text-gray-500 mb-3">Belum ada data ukuran untuk pesanan ini.</p>
                            <button 
                                onclick={goToCreateMeasurement}
                                class="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-sm font-bold text-sm mx-auto"
                            >
                                <PlusCircle size={16} /> Input Ukuran Sekarang
                            </button>
                        </div>
                    {/if}
                {/if}
            </div>
        </div>

        <div class="space-y-6">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div class="flex items-center gap-2 mb-6 text-gray-800 font-bold border-b border-gray-100 pb-4">
                    <Layers size={20} class="text-purple-600" />
                    <h3>Detail Item</h3>
                </div>
                <div class="space-y-4">
                    <div>
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <label class="block text-xs font-bold text-gray-400 uppercase mb-1.5">Jenis Pakaian *</label>
                        <input type="text" bind:value={orderForm.item} placeholder="Contoh: Kemeja Batik" class="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-gray-800 focus:bg-white focus:ring-2 focus:ring-purple-200 transition"/>
                    </div>
                    <div>
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <label class="block text-xs font-bold text-gray-400 uppercase mb-1.5">Model / Potongan</label>
                        <input type="text" bind:value={orderForm.model} placeholder="Slim Fit / Reguler..." class="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-gray-800 focus:bg-white focus:ring-2 focus:ring-purple-200 transition"/>
                    </div>
                    <div>
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <label class="block text-xs font-bold text-gray-400 uppercase mb-1.5">Info Kain</label>
                        <input type="text" bind:value={orderForm.fabric} placeholder="Jenis kain / Bawa sendiri" class="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl text-gray-800 focus:bg-white focus:ring-2 focus:ring-purple-200 transition"/>
                    </div>
                </div>
            </div>

            <div class="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <label class="block text-xs font-bold text-blue-400 uppercase mb-1.5">Status Pesanan</label>
                <div class="flex items-center gap-2 font-bold text-t-blue text-lg">
                    <div class="w-3 h-3 rounded-full bg-t-blue animate-pulse"></div>
                    {orderForm.status}
                </div>
                <p class="text-xs text-blue-400 mt-1">Status awal pesanan selalu 'Baru'.</p>
            </div>
        </div>

        <div class="space-y-6">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div class="space-y-4">
                    <div>
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <label class="block text-xs font-bold text-gray-400 uppercase mb-1.5">Deadline Pesanan</label>
                        <input type="date" bind:value={orderForm.deadline} class="w-full px-4 py-3 bg-red-50 border-transparent rounded-xl text-gray-800 font-bold focus:bg-white focus:ring-2 focus:ring-red-200 transition"/>
                    </div>
                    <div>
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <label class="block text-xs font-bold text-gray-400 uppercase mb-1.5">Estimasi Harga (Rp)</label>
                        <input type="number" bind:value={orderForm.price} class="w-full px-4 py-3 bg-green-50 border-transparent rounded-xl text-green-700 font-bold focus:bg-white focus:ring-2 focus:ring-green-200 transition"/>
                    </div>
                    <div>
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <label class="block text-xs font-bold text-gray-400 uppercase mb-1.5">Catatan Khusus</label>
                        <textarea bind:value={orderForm.notes} rows="4" placeholder="Detail model, kancing, dll..." class="w-full px-4 py-3 bg-yellow-50 border-transparent rounded-xl text-gray-800 focus:bg-white focus:ring-2 focus:ring-t-yellow/50 transition resize-none"></textarea>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>