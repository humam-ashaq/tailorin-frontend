<script lang="ts">
    import { page } from '$app/stores'; // Import page store untuk baca URL
    import { 
        ArrowLeft, Save, User, Phone, MapPin, 
        Ruler, Scissors, FileText, Pencil, X 
    } from 'lucide-svelte';

    // State untuk Mode Edit
    let isEditing = $state(false);

    // LOGIKA BACK BUTTON (SVELTE 5)
    // Cek apakah ada parameter 'ref' di URL. Jika ada pakai itu, jika tidak kembali ke default list.
    let backUrl = $derived($page.url.searchParams.get('ref') || '/admin/measurements');

    // Data Dummy
    let customer = $state({
        id: 'CUST-01',
        name: 'Andi Saputra',
        phone: '0812-3456-7890',
        address: 'Jl. Merdeka No. 45, Purwokerto',
        notes: 'Bahu kanan agak turun sedikit. Suka model slim fit tapi tidak ketat di ketiak.',
        measurements: {
            upperBody: {
                lingkarLeher: 42,
                lingkarDada: 100,
                lingkarPinggang: 92,
                lebarBahu: 46,
                panjangPunggung: 40,
                lebarPunggung: 44,
                lebarDada: 42
            },
            arm: {
                panjangLengan: 60,
                lingkarKerungLengan: 48,
                lingkarPangkalLengan: 38,
                lingkarSiku: 32,
                lingkarPergelangan: 26
            },
            lowerBody: {
                lingkarPinggul: 105,
                tinggiDuduk: 28,
                panjangCelana: 102,
                lingkarPaha: 64,
                lingkarLutut: 44,
                lingkarKakiBawah: 38
            }
        }
    });

    // Helper Label
    const formatLabel = (key: string) => {
        return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    };

    // Fungsi Aksi
    function toggleEdit() {
        isEditing = true;
    }

    function cancelEdit() {
        isEditing = false;
    }

    function saveChanges() {
        alert('Data berhasil disimpan!');
        isEditing = false;
    }
</script>

<div class="space-y-6 pb-20">
    
    <div class="flex items-center justify-between sticky top-20 z-40 bg-t-gray/90 backdrop-blur-sm py-2">
        <div class="flex items-center gap-4">
            <a href={backUrl} class="p-2 rounded-xl bg-gradient-to-r from-t-blue to-t-pink border border-gray-200 text-white hover:bg-gray-50 hover:text-t-blue transition shadow-sm group">
                <ArrowLeft size={20} class="group-hover:-translate-x-1 transition-transform"/>
            </a>
            <div>
                <h2 class="text-3xl font-bold text-gray-800">Detail Ukuran</h2>
                <p class="text-gray-500 text-sm flex items-center gap-2">
                    <span class="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs">{customer.id}</span>
                    {#if isEditing}
                        <span class="text-t-yellow font-bold animate-pulse">• Mode Edit Aktif</span>
                    {:else}
                        <span>• Last update: 5 Jan 2026</span>
                    {/if}
                </p>
            </div>
        </div>

        <div class="flex items-center gap-3">
            {#if isEditing}
                <button 
                    onclick={cancelEdit}
                    class="flex items-center gap-2 px-4 py-3 bg-white border border-pink-200 text-red-500 rounded-xl hover:bg-red-50 transition font-medium"
                >
                    <X size={18} /> Batal
                </button>
                <button 
                    onclick={saveChanges}
                    class="flex items-center gap-2 px-6 py-3 bg-t-yellow text-t-dark rounded-xl hover:bg-yellow-400 transition shadow-md font-medium animate-in fade-in zoom-in duration-200"
                >
                    <Save size={18} /> Simpan
                </button>
            {:else}
                <button 
                    onclick={toggleEdit}
                    class="flex items-center gap-2 px-6 py-3 bg-t-yellow text-t-dark rounded-xl hover:bg-yellow-400 transition shadow-md font-medium"
                >
                    <Pencil size={18} /> Edit Ukuran
                </button>
            {/if}
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div class="space-y-6">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div class="flex flex-col items-center text-center mb-6">
                    <h3 class="text-2xl font-bold text-gray-800">{customer.name}</h3>
                </div>

                <div class="space-y-4">
                    <div class="flex gap-3 items-start p-3 bg-gray-50 rounded-xl">
                        <Phone size={18} class="text-gray-400 mt-0.5" />
                        <div>
                            <p class="text-xs font-bold text-gray-400 uppercase">WhatsApp / HP</p>
                            <p class="font-mono text-gray-700 font-medium">{customer.phone}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div class="flex items-center gap-2 mb-4 text-gray-800 font-bold">
                    <FileText size={18} class="text-t-yellow" />
                    <h3>Catatan Tambahan</h3>
                </div>
                <textarea 
                    disabled={!isEditing}
                    bind:value={customer.notes}
                    class="w-full rounded-xl p-4 text-sm text-gray-700 min-h-[150px] transition-all duration-300
                    {isEditing 
                        ? 'bg-yellow-50/50 border border-yellow-100 focus:ring-2 focus:ring-t-yellow/50' 
                        : 'bg-gray-50 border-transparent resize-none cursor-default'}"
                    placeholder="Belum ada catatan."
                ></textarea>
            </div>
        </div>

        <div class="lg:col-span-2 space-y-6">
            
            {#each [
                { title: 'Ukuran Badan Atas', icon: Ruler, color: 'text-t-blue', bg: 'bg-blue-100', data: customer.measurements.upperBody, ring: 'focus:ring-t-blue/20' },
                { title: 'Ukuran Lengan', icon: Scissors, color: 'text-purple-600', bg: 'bg-purple-100', data: customer.measurements.arm, ring: 'focus:ring-purple-200' },
                { title: 'Ukuran Badan Bawah', icon: Ruler, color: 'text-green-600', bg: 'bg-green-100', data: customer.measurements.lowerBody, ring: 'focus:ring-green-200' }
            ] as section}
            
                <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 {isEditing ? 'ring-1 ring-gray-200' : ''}">
                    <div class="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                        <div class="p-2 {section.bg} {section.color} rounded-lg">
                            <section.icon size={20} class={section.title.includes('Bawah') ? 'rotate-90' : ''}/>
                        </div>
                        <h3 class="font-bold text-gray-800">{section.title}</h3>
                    </div>
                    
                    <div class="p-6 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6">
                        {#each Object.entries(section.data) as [key, value]}
                            <div class="relative">
                                <!-- svelte-ignore a11y_label_has_associated_control -->
                                <label class="block text-xs font-bold text-gray-400 uppercase mb-1.5 transition-colors {isEditing ? 'text-t-blue' : ''}">
                                    {formatLabel(key)}
                                </label>
                                <div class="relative">
                                    <input 
                                        type="number" 
                                        disabled={!isEditing}
                                        bind:value={section.data[key as keyof typeof section.data]}
                                        class="w-full pl-4 pr-10 py-2.5 rounded-xl font-bold text-gray-800 transition-all duration-200
                                        {isEditing 
                                            ? `bg-white border border-gray-200 focus:bg-white focus:ring-2 ${section.ring}` 
                                            : 'bg-gray-50/50 border-transparent cursor-default'}"
                                    />
                                    <span class="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">cm</span>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}

        </div>
    </div>
</div>