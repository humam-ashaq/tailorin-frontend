<script lang="ts">
    import { 
        ArrowLeft, MapPin, MessageCircle, Phone, 
        Package, Scissors, Ruler, CheckCircle2, 
        Clock, AlertCircle, Copy, FileText 
    } from 'lucide-svelte';
    import { slide, fade } from 'svelte/transition';

    // --- DUMMY DATA (Detail satu pesanan) ---
    const order = {
        id: 'TRX-882910',
        date: '20 Feb 2026, 14:30',
        status: 'process', // waiting, process, ready, completed
        status_label: 'Sedang Dijahit',
        tailor: {
            name: 'Aldo Tailor',
            phone: '6281234567890', // Format internasional untuk WA
            location: 'Adiwerna, Tegal',
            image: 'https://images.unsplash.com/photo-1594938298603-c8148c47e356?w=200&q=80'
        },
        items: [
            {
                name: 'Jahit Kemeja Pendek',
                price: 75000,
                type: 'Jasa Jahit',
                note: 'Tolong buatkan saku bobok di kiri atas, kerah model shanghai, dan kancing bungkus kain.',
                measurements: 'Profil: Humam Ashaq'
            }
        ],
        timeline: [
            { status: 'Pesanan Dibuat', date: '20 Feb, 14:30', done: true },
            { status: 'Dikonfirmasi Penjahit', date: '20 Feb, 15:00', done: true },
            { status: 'Sedang Dijahit', date: '21 Feb, 09:00', done: true },
            { status: 'Siap Diambil/Dikirim', date: '-', done: false },
            { status: 'Selesai', date: '-', done: false },
        ],
        billing: {
            subtotal: 75000,
            adjustments: 10000, // Biaya tambahan (misal kancing bungkus)
            adjustment_note: 'Tambahan Kancing Bungkus',
            total: 85000
        }
    };

    // --- ACTIONS ---
    function openWhatsApp() {
        const message = `Halo ${order.tailor.name}, saya ingin menanyakan status pesanan saya dengan ID ${order.id} (${order.items[0].name}).`;
        const url = `https://wa.me/${order.tailor.phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

    function copyID() {
        navigator.clipboard.writeText(order.id);
        alert('ID Pesanan disalin!');
    }
</script>

<div class="min-h-screen bg-[#FAFAFA] pb-24">
    
    <div class="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div class="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
            <div class="flex items-center gap-4">
                <a href="/orders" class="p-2 hover:bg-gray-100 rounded-full transition text-gray-600">
                    <ArrowLeft size={20}/>
                </a>
                <div>
                    <h1 class="font-bold text-gray-900 text-sm">Detail Pesanan</h1>
                    <div class="flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 px-1.5 py-0.5 rounded -ml-1.5" onclick={copyID}>
                        <p class="text-xs text-gray-500">ID: {order.id}</p>
                        <Copy size={10} class="text-gray-400"/>
                    </div>
                </div>
            </div>
            
            <div class="px-3 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100 flex items-center gap-1.5">
                <div class="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></div>
                {order.status_label}
            </div>
        </div>
    </div>

    <div class="max-w-3xl mx-auto px-4 py-6 space-y-6">

        <div class="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
            <h3 class="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Clock size={18} class="text-t-blue"/> Status Pengerjaan
            </h3>
            
            <div class="relative pl-2">
                <div class="absolute top-2 left-[7px] bottom-2 w-0.5 bg-gray-100"></div>

                <div class="space-y-6">
                    {#each order.timeline as time, i}
                        <div class="relative flex items-start gap-4 group">
                            <div class="w-4 h-4 rounded-full border-2 z-10 bg-white flex-shrink-0 mt-0.5 transition-colors duration-300
                                {time.done ? 'border-t-blue bg-t-blue shadow-[0_0_0_3px_rgba(59,130,246,0.1)]' : 'border-gray-200'}">
                            </div>
                            
                            <div class="flex-1 -mt-1">
                                <p class="text-sm font-bold transition-colors {time.done ? 'text-gray-900' : 'text-gray-400'}">
                                    {time.status}
                                </p>
                                <p class="text-[10px] text-gray-400 font-medium">{time.date}</p>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>

        <div class="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between gap-4">
            <div class="flex items-center gap-3 overflow-hidden">
                <img src={order.tailor.image} alt="Tailor" class="w-12 h-12 rounded-full object-cover border border-gray-100"/>
                <div class="min-w-0">
                    <h3 class="font-bold text-gray-900 text-sm truncate">{order.tailor.name}</h3>
                    <div class="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin size={10}/> {order.tailor.location}
                    </div>
                </div>
            </div>
            
            <button 
                onclick={openWhatsApp}
                class="flex-shrink-0 px-4 py-2.5 bg-green-50 text-green-600 rounded-xl font-bold text-xs hover:bg-green-100 transition flex items-center gap-2 border border-green-100"
            >
                <MessageCircle size={16}/> Chat
            </button>
        </div>

        <div class="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
            <h3 class="font-bold text-gray-900 flex items-center gap-2 border-b border-gray-50 pb-4">
                <Package size={18} class="text-t-pink"/> Rincian Item
            </h3>

            {#each order.items as item}
                <div class="space-y-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="font-bold text-gray-800">{item.name}</p>
                            <p class="text-xs text-gray-400">{item.type}</p>
                        </div>
                        <p class="font-bold text-gray-900">Rp {item.price.toLocaleString('id-ID')}</p>
                    </div>

                    <div class="bg-gray-50 rounded-xl p-4 space-y-3 text-sm">
                        <div class="flex gap-3">
                            <Ruler size={16} class="text-gray-400 flex-shrink-0 mt-0.5"/>
                            <div>
                                <p class="text-[10px] font-bold text-gray-400 uppercase">Ukuran</p>
                                <p class="text-gray-700 font-medium">{item.measurements}</p>
                            </div>
                        </div>
                        <div class="flex gap-3">
                            <FileText size={16} class="text-gray-400 flex-shrink-0 mt-0.5"/>
                            <div>
                                <p class="text-[10px] font-bold text-gray-400 uppercase">Catatan / Request</p>
                                <p class="text-gray-700 font-medium leading-relaxed italic">"{item.note}"</p>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <div class="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-3">
            <div class="flex justify-between text-sm text-gray-500">
                <span>Subtotal Jasa</span>
                <span>Rp {order.billing.subtotal.toLocaleString('id-ID')}</span>
            </div>
            
            {#if order.billing.adjustments > 0}
                <div class="flex justify-between text-sm text-t-blue bg-blue-50 p-2 rounded-lg">
                    <span class="flex items-center gap-1.5">
                        <AlertCircle size={12}/> {order.billing.adjustment_note}
                    </span>
                    <span class="font-bold">+ Rp {order.billing.adjustments.toLocaleString('id-ID')}</span>
                </div>
            {/if}

            <div class="flex justify-between items-center pt-3 border-t border-gray-100 mt-2">
                <span class="font-bold text-gray-900">Total Biaya</span>
                <span class="text-xl font-black text-gray-900">Rp {order.billing.total.toLocaleString('id-ID')}</span>
            </div>
        </div>

    </div>
</div>