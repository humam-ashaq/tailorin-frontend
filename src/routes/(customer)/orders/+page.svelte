<script lang="ts">
    import { 
        Package, Clock, CheckCircle2, Truck, 
        ChevronRight, Search, Filter 
    } from 'lucide-svelte';
    import { fade, slide } from 'svelte/transition';

    // --- DUMMY DATA ---
    // Status: 'waiting', 'process', 'ready', 'completed', 'cancelled'
    const orders = [
        {
            id: 'TRX-882910',
            tailor_name: 'Aldo Tailor',
            tailor_image: 'https://images.unsplash.com/photo-1594938298603-c8148c47e356?w=200&q=80',
            service: 'Jahit Kemeja Pendek',
            date: '20 Feb 2026',
            price: 75000,
            status: 'process',
            status_label: 'Sedang Dijahit',
            items: 1
        },
        {
            id: 'TRX-773120',
            tailor_name: 'Rumah Jahit Bu Siti',
            tailor_image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200&q=80',
            service: 'Permak Celana Jeans',
            date: '18 Feb 2026',
            price: 25000,
            status: 'waiting',
            status_label: 'Menunggu Konfirmasi',
            items: 2
        },
        {
            id: 'TRX-110293',
            tailor_name: 'The Suits Maker',
            tailor_image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200&q=80',
            service: 'Jas Formal Full Set',
            date: '10 Jan 2026',
            price: 1500000,
            status: 'completed',
            status_label: 'Selesai',
            items: 1
        }
    ];

    // --- STATE ---
    let activeTab = $state<'active' | 'completed'>('active');

    // --- LOGIC ---
    let filteredOrders = $derived(
        orders.filter(o => {
            if (activeTab === 'active') return ['waiting', 'process', 'ready'].includes(o.status);
            return ['completed', 'cancelled'].includes(o.status);
        })
    );

    function getStatusColor(status: string) {
        switch(status) {
            case 'waiting': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
            case 'process': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'ready': return 'bg-green-50 text-green-600 border-green-100';
            case 'completed': return 'bg-gray-100 text-gray-600 border-gray-200';
            default: return 'bg-red-50 text-red-600 border-red-100';
        }
    }

    function getStatusIcon(status: string) {
        switch(status) {
            case 'waiting': return Clock;
            case 'process': return ScissorsIcon; // Kita buat ikon custom nanti atau pakai scissors
            case 'ready': return Truck;
            case 'completed': return CheckCircle2;
            default: return AlertCircle;
        }
    }
    
    // Icon alias
    import { Scissors as ScissorsIcon, AlertCircle } from 'lucide-svelte';

</script>

<div class="min-h-screen bg-[#FAFAFA] py-8">
    <div class="max-w-3xl mx-auto px-4 sm:px-6">
        
        <div class="mb-8">
            <h1 class="text-3xl font-black text-gray-900">Pesanan Saya</h1>
            <p class="text-gray-500 mt-1">Pantau status jahitanmu secara real-time.</p>
        </div>

        <div class="bg-white p-1.5 rounded-2xl border border-gray-200 flex mb-8 w-full sm:w-fit">
            <button 
                onclick={() => activeTab = 'active'}
                class="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2
                {activeTab === 'active' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}"
            >
                <Package size={16}/> Dalam Proses
            </button>
            <button 
                onclick={() => activeTab = 'completed'}
                class="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2
                {activeTab === 'completed' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}"
            >
                <CheckCircle2 size={16}/> Selesai
            </button>
        </div>

        <div class="space-y-4">
            {#if filteredOrders.length > 0}
                {#each filteredOrders as order (order.id)}
                    <a 
                        href="/orders/{order.id}"
                        transition:slide|local 
                        class="block bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all group cursor-pointer relative overflow-hidden"
                    >
                        
                        <div class="flex justify-between items-start mb-4 relative z-10">
                            <div class="flex items-center gap-3">
                                <img src={order.tailor_image} alt={order.tailor_name} class="w-10 h-10 rounded-full object-cover border border-gray-100"/>
                                <div>
                                    <h3 class="font-bold text-gray-900 text-sm">{order.tailor_name}</h3>
                                    <p class="text-[10px] text-gray-400">{order.date}</p>
                                </div>
                            </div>
                            <div class="px-3 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1.5 {getStatusColor(order.status)}">
                                {#if order.status === 'process'}
                                    <div class="w-1.5 h-1.5 bg-current rounded-full animate-pulse"></div>
                                {/if}
                                {order.status_label}
                            </div>
                        </div>

                        <div class="flex items-center gap-4 py-4 border-t border-b border-gray-50 relative z-10">
                            <div class="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300">
                                <Package size={24}/>
                            </div>
                            <div class="flex-1">
                                <h4 class="font-bold text-gray-800">{order.service}</h4>
                                <p class="text-xs text-gray-500 mt-0.5">{order.items} Item • Kustomisasi tersedia</p>
                            </div>
                        </div>

                        <div class="flex justify-between items-center mt-4 relative z-10">
                            <div>
                                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Harga</p>
                                <p class="text-lg font-black text-gray-900">Rp {order.price.toLocaleString('id-ID')}</p>
                            </div>
                            
                            {#if order.status === 'process' || order.status === 'waiting'}
                                <span class="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-bold group-hover:bg-gray-900 group-hover:text-white group-hover:border-gray-900 transition shadow-sm">
                                    Lacak Pesanan
                                </span>
                            {:else if order.status === 'completed'}
                                <span class="px-5 py-2.5 bg-t-blue/10 text-t-blue rounded-xl text-xs font-bold group-hover:bg-t-blue group-hover:text-white transition">
                                    Beri Ulasan
                                </span>
                            {/if}
                        </div>

                    </a>
                {/each}
            {:else}
                <div in:fade class="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
                    <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                        <Package size={32}/>
                    </div>
                    <h3 class="font-bold text-gray-900">Belum ada pesanan</h3>
                    <p class="text-sm text-gray-500 mt-2">Yuk, mulai cari penjahit untuk baju impianmu!</p>
                    <a href="/tailors" class="inline-block mt-6 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:shadow-lg transition">
                        Cari Penjahit
                    </a>
                </div>
            {/if}
        </div>

    </div>
</div>