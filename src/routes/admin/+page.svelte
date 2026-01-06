<script lang="ts">
	import { Calendar, ChevronRight, Clock, MoreHorizontal } from 'lucide-svelte';

	// Data Dummy Pesanan
	let orders = [
		{ id: '#001', client: 'Budi Santoso', item: 'Kemeja Batik', date: '5 Jan', status: 'Dipotong' },
		{ id: '#002', client: 'Siti Aminah', item: 'Gamis Syar\'i', date: '6 Jan', status: 'Menunggu Kain' },
		{ id: '#003', client: 'Joko Anwar', item: 'Jas Formal', date: '8 Jan', status: 'Dijahit' },
		{ id: '#004', client: 'Rina Nose', item: 'Blazer Wanita', date: '10 Jan', status: 'Baru' },
	];

	// Helper warna status
	const statusColor = (s: string) => {
		if (s === 'Baru') return 'bg-blue-100 text-blue-700';
		if (s === 'Menunggu Kain') return 'bg-orange-100 text-orange-700';
		if (s === 'Dipotong') return 'bg-purple-100 text-purple-700';
		return 'bg-green-100 text-green-700';
	};

    // Generate tanggal Kalender
    let today = new Date();
    let dates = Array.from({length: 7}, (_, i) => {
        let d = new Date();
        d.setDate(today.getDate() + i);
        return {
            day: d.toLocaleDateString('id-ID', { weekday: 'short' }),
            date: d.getDate(),
            active: i === 0 
        };
    });
</script>

<div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-t-blue to-t-pink p-8 text-white shadow-xl mb-8">
	<div class="relative z-10">
		<div class="flex items-center gap-3 mb-2">
			<h2 class="text-3xl font-bold">Halo, SS Tailor!</h2>
			<span class="text-3xl">👋</span>
		</div>
		<p class="opacity-90 text-lg">Hari ini ada <span class="font-bold bg-white/20 px-2 py-0.5 rounded text-white">4 pesanan</span> yang perlu perhatianmu.</p>
	</div>
    <div class="absolute -right-10 -top-20 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
    <div class="absolute right-20 bottom-[-40px] w-40 h-40 bg-t-yellow opacity-20 rounded-full blur-2xl"></div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
	
	<div class="lg:col-span-2 space-y-6">
        <div class="grid grid-cols-3 gap-4">
            <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <p class="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Total Order</p>
                <p class="text-3xl font-bold text-gray-800 mt-1">24</p>
            </div>
            <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <p class="text-gray-400 text-[10px] font-bold uppercase tracking-wider">On Progress</p>
                <p class="text-3xl font-bold text-t-blue mt-1">12</p>
            </div>
            <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <p class="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Selesai</p>
                <p class="text-3xl font-bold text-green-500 mt-1">8</p>
            </div>
        </div>

		<div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
			<div class="p-6 border-b border-gray-100 flex justify-between items-center">
				<h3 class="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <Clock size={18} class="text-t-blue"/>
                    Pesanan Terkini
                </h3>
				<a href="/admin/orders" class="text-xs text-t-blue font-bold hover:underline">Lihat Semua</a>
			</div>
			
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead class="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-wider">
                        <tr>
                            <th class="px-6 py-4">Pelanggan</th>
                            <th class="px-6 py-4">Item</th>
                            <th class="px-6 py-4">Deadline</th>
                            <th class="px-6 py-4">Status</th>
                            <th class="px-6 py-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50 text-sm">
                        {#each orders as order}
                        <tr class="hover:bg-gray-50 transition-colors group">
                            <td class="px-6 py-4">
                                <div class="font-bold text-gray-800">{order.client}</div>
                                <div class="text-[10px] text-gray-400 font-mono">{order.id}</div>
                            </td>
                            <td class="px-6 py-4 text-gray-600">{order.item}</td>
                            <td class="px-6 py-4 text-gray-600">{order.date}</td>
                            <td class="px-6 py-4">
                                <span class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide {statusColor(order.status)}">
                                    {order.status}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-center">
                                <button class="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-t-blue transition">
                                    <ChevronRight size={18}/>
                                </button>
                            </td>
                        </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
		</div>
	</div>

	<div class="space-y-6">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div class="flex justify-between items-center mb-6">
                <h3 class="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <Calendar size={18} class="text-t-pink"/>
                    Kalender
                </h3>
                <span class="text-[10px] font-bold text-gray-400">JAN 2026</span>
            </div>

            <div class="flex justify-between items-center mb-8">
                {#each dates as d}
                    <div class="flex flex-col items-center gap-2 cursor-pointer group">
                        <span class="text-[10px] font-bold text-gray-400 group-hover:text-t-blue">{d.day}</span>
                        <div class="w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold transition-all
                            {d.active ? 'bg-t-yellow text-gray-900 shadow-md scale-110' : 'text-gray-600 group-hover:bg-blue-50'}">
                            {d.date}
                        </div>
                    </div>
                {/each}
            </div>

            <h4 class="text-[10px] font-bold text-gray-400 uppercase mb-4 tracking-wider">Deadline Minggu Ini</h4>
            <div class="space-y-3">
                <div class="flex items-center gap-3 p-3 bg-red-50 rounded-xl border-l-4 border-red-400 hover:shadow-sm transition">
                    <div class="bg-white px-2 py-1 rounded-lg text-center min-w-[45px] shadow-sm">
                        <span class="block text-[10px] font-bold text-red-400">JAN</span>
                        <span class="block text-lg font-bold text-gray-800 leading-none">08</span>
                    </div>
                    <div>
                        <p class="font-bold text-gray-800 text-sm">Jas Formal - Joko</p>
                        <p class="text-[11px] text-red-500 font-bold">Tinggal 2 hari lagi!</p>
                    </div>
                </div>
                
                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border-l-4 border-t-blue hover:shadow-sm transition">
                    <div class="bg-white px-2 py-1 rounded-lg text-center min-w-[45px] shadow-sm">
                        <span class="block text-[10px] font-bold text-gray-400">JAN</span>
                        <span class="block text-lg font-bold text-gray-800 leading-none">10</span>
                    </div>
                    <div>
                        <p class="font-bold text-gray-800 text-sm">Blazer - Rina</p>
                        <p class="text-[11px] text-gray-500">Tahap pengukuran</p>
                    </div>
                </div>
            </div>
		</div>
	</div>
</div>