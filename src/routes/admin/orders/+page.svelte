<script lang="ts">
  import { goto } from "$app/navigation"; 
  import {
    Search, Filter, Download, Pencil, Trash2, ChevronLeft, ChevronRight,
    Calendar, CheckCircle, XCircle, Clock, Plus, AlertCircle, History
  } from "lucide-svelte";

  // ... (Data Dummy ActiveOrders & IncomingRequests TETAP SAMA, tidak saya tulis ulang agar hemat tempat) ...
  let activeOrders = [
    { id: "ORD-001", client: "Budi Santoso", phone: "0812...", item: "Kemeja Batik", date: "5 Jan", deadline: "12 Jan", price: "150.000", status: "Dipotong" },
    { id: "ORD-003", client: "Joko Anwar", phone: "0813...", item: "Jas Formal", date: "8 Jan", deadline: "15 Jan", price: "850.000", status: "Dijahit" },
    { id: "ORD-002", client: "Siti Aminah", phone: "0856...", item: "Gamis Syar'i", date: "6 Jan", deadline: "20 Jan", price: "300.000", status: "Menunggu Kain" },
  ];
  let incomingRequests = [
    { id: "REQ-991", client: "Putri Delina", phone: "08123456789", item: "Gaun Pesta", date: "Baru saja", model: "Custom - Lengan Lonceng", note: "Butuh cepat untuk minggu depan", requestedDeadline: "10 Jan 2026" },
    { id: "REQ-992", client: "Raffi Ahmad", phone: "0811223344", item: "Kemeja Slimfit", date: "1 Jam lalu", model: "Standard", note: "Kain bawa sendiri", requestedDeadline: "Flexible" },
  ];

  let activeTab = "Proses";

  const tabs = [
    { id: "Proses", label: "Dalam Pengerjaan", count: 0 },
    { id: "Permintaan Masuk", label: "Permintaan Masuk", count: 2 },
    { id: "Selesai", label: "Riwayat Selesai", count: 0 },
    { id: "Semua", label: "Semua Data", count: 0 },
  ];

  const statusColor = (s: string) => {
    if (s === "Dipotong" || s === "Dijahit") return "bg-purple-100 text-purple-700 border border-purple-200";
    if (s === "Menunggu Kain") return "bg-orange-100 text-orange-700 border border-orange-200";
    return "bg-gray-100 text-gray-700";
  };

  // LOGIKA BARU: Tambahkan parameter editMode
  const goToDetail = (id: string, editMode = false) => {
    const url = `/admin/orders/${id}${editMode ? '?edit=true' : ''}`;
    goto(url);
  };
</script>

<div class="space-y-6">
  <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-t-blue to-t-pink p-8 text-white shadow-xl mb-8">
    <div class="relative z-10">
      <div class="flex flex-col md:flex-row justify-between gap-4 items-center">
        <div class="w-full md:w-auto">
          <h2 class="text-3xl font-bold text-white">Manajemen Pesanan</h2>
          <p class="text-t-gray text-sm mt-1">Pantau status pengerjaan dan kelola pesanan masuk.</p>
        </div>
        <div class="flex gap-3 w-full md:w-auto">
          <button class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-t-dark rounded-xl hover:bg-gray-50 transition shadow-sm text-sm font-medium">
            <Download size={18} /> <span class="hidden sm:inline">Export CSV</span>
          </button>
          <button class="flex items-center gap-2 px-4 py-2 bg-t-yellow text-t-dark rounded-xl hover:bg-yellow-400 transition shadow-md text-sm font-medium">
            <Plus size={18} strokeWidth={2} /> Buat Pesanan
          </button>
        </div>
      </div>
    </div>
    <div class="absolute -right-10 -top-20 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
    <div class="absolute right-20 bottom-[-40px] w-40 h-40 bg-t-yellow opacity-20 rounded-full blur-2xl"></div>
  </div>

  <div class="bg-white px-1 rounded-t-2xl border-b border-gray-200">
    <nav class="flex gap-6 overflow-x-auto" aria-label="Tabs">
      {#each tabs as tab}
        <button onclick={() => (activeTab = tab.id)} class="relative py-4 px-2 text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 {activeTab === tab.id ? 'text-t-blue border-b-2 border-t-blue font-bold' : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'}">
          {#if tab.id === "Selesai"} <History size={16} /> {/if}
          {tab.label}
          {#if tab.count > 0} <span class="ml-1 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm">{tab.count}</span> {/if}
        </button>
      {/each}
    </nav>
  </div>

  {#if activeTab === "Permintaan Masuk"}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {#each incomingRequests as req}
        <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition relative overflow-hidden group">
          <div class="absolute top-0 left-0 w-1 h-full bg-t-yellow"></div>
          <div class="flex justify-between items-start mb-4 pl-2">
            <div><h3 class="font-bold text-gray-800 text-lg">{req.client}</h3><p class="text-xs text-gray-400 font-mono">{req.id} • {req.date}</p></div>
            <div class="p-2 bg-gray-100 text-gray-500 rounded-lg"><AlertCircle size={20} /></div>
          </div>
          <div class="space-y-3 pl-2 mb-6">
            <div><p class="text-xs text-gray-400 font-bold uppercase">Item Pesanan</p><p class="text-gray-700 font-medium">{req.item}</p><p class="text-sm text-gray-500">{req.model}</p></div>
            <div><p class="text-xs text-gray-400 font-bold uppercase">Catatan</p><p class="text-sm text-gray-600 italic">"{req.note}"</p></div>
            <div class="pt-2 border-t border-dashed border-gray-200 flex items-center gap-2"><Calendar size={16} class="text-t-pink" /><div><p class="text-[10px] text-gray-400 font-bold uppercase">Permintaan Selesai</p><p class="text-sm font-bold text-gray-700">{req.requestedDeadline}</p></div></div>
          </div>
          <div class="flex gap-3 pl-2">
            <button class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-medium text-sm transition"><XCircle size={18} /> Tolak</button>
            <button class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-t-blue text-white hover:bg-blue-600 font-bold text-sm shadow-md transition"><CheckCircle size={18} /> Terima & Harga</button>
          </div>
        </div>
      {/each}
      {#if incomingRequests.length === 0}<div class="col-span-full py-12 text-center text-gray-400"><p>Tidak ada permintaan pesanan baru saat ini.</p></div>{/if}
    </div>

  {:else}
    <div class="flex gap-3 mb-4">
      <div class="relative flex-1 max-w-sm">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input type="text" placeholder="Cari pesanan..." class="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-t-blue/20" />
      </div>
      <button class="px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 text-sm font-medium flex items-center gap-2 hover:bg-gray-50"><Filter size={16} /> Filter</button>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-gray-50 text-gray-500 uppercase font-bold text-[11px] border-b border-gray-100 tracking-wider">
            <tr>
              <th class="px-6 py-4">ID</th><th class="px-6 py-4">Pelanggan</th><th class="px-6 py-4">Item & Model</th><th class="px-6 py-4">Deadline</th><th class="px-6 py-4">Status</th><th class="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            {#each activeOrders as order}
              <tr onclick={() => goToDetail(order.id)} class="hover:bg-blue-50/30 transition group cursor-pointer">
                <td class="px-6 py-4 font-mono text-t-blue font-medium">{order.id}</td>
                <td class="px-6 py-4"><div class="font-bold text-gray-800">{order.client}</div><div class="text-xs text-gray-400">{order.phone}</div></td>
                <td class="px-6 py-4 text-gray-600">{order.item}</td>
                <td class="px-6 py-4"><div class="flex items-center gap-2 text-gray-600"><Calendar size={14} class="text-t-pink" /><span class="font-medium">{order.deadline}</span></div></td>
                <td class="px-6 py-4"><span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide {statusColor(order.status)}">{order.status}</span></td>
                <td class="px-6 py-4 text-center">
                  <!-- svelte-ignore a11y_click_events_have_key_events -->
                  <!-- svelte-ignore a11y_no_static_element_interactions -->
                  <div class="flex items-center justify-center gap-2" onclick={(e) => e.stopPropagation()}>
                    
                    <button
                      onclick={() => goToDetail(order.id, true)} 
                      class="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 hover:text-yellow-800 border border-yellow-200 rounded-lg transition text-xs font-bold shadow-sm"
                      title="Edit Pesanan"
                    >
                      <Pencil size={14} /> Edit
                    </button>

                    <button class="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition" title="Hapus"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <div class="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
        <span class="text-xs text-gray-500">Menampilkan 1-3 dari 12 pesanan</span>
        <div class="flex gap-2">
          <button class="p-2 border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50"><ChevronLeft size={16} /></button>
          <button class="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  {/if}
</div>