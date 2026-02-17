<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    Search,
    Filter,
    Download,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Calendar,
    CheckCircle,
    XCircle,
    Clock,
    Plus,
    AlertCircle,
    History,
    X,
    Wallet,
  } from "lucide-svelte";
  import { fade, scale } from "svelte/transition";
  import { onMount } from "svelte";

  import { globalStore } from "$lib/store.svelte";

  const statusOptions = [
    "Baru",
    "Menunggu Kain",
    "Dipotong",
    "Dijahit",
    "Selesai",
  ];

  // Gunakan Global Store
  let activeOrders = $derived(globalStore.orders);
  let incomingRequests = $derived(globalStore.requests);

  let activeTab = $state("Proses");

  // --- STATE MODAL KONFIRMASI ---
  let showModal = $state(false);
  let modalData = $state<any>(null); // Data pesanan yang sedang diproses
  let modalType = $state<"accept" | "reject">("accept"); // Tipe aksi

  // Input Form Penjahit
  let priceInput = $state("");
  let notesInput = $state("");

  const tabs = [
    { id: "Proses", label: "Dalam Pengerjaan", count: 0 },
    { id: "Permintaan Masuk", label: "Permintaan Masuk", count: 2 }, // Statis dulu count-nya
    { id: "Selesai", label: "Riwayat Selesai", count: 0 },
    { id: "Semua", label: "Semua Data", count: 0 },
  ];

  const statusColor = (s: string) => {
    if (s === "Dipotong" || s === "Dijahit")
      return "bg-purple-100 text-purple-700 border border-purple-200";
    if (s === "Menunggu Kain")
      return "bg-orange-100 text-orange-700 border border-orange-200";
    return "bg-gray-100 text-gray-700";
  };

  const goToDetail = (id: string, editMode = false) => {
    const url = `/admin/orders/${id}${editMode ? "?edit=true" : ""}`;
    goto(url);
  };

  function handleStatusChange(orderIndex: number, e: Event) {
    const target = e.target as HTMLSelectElement;
    const newStatus = target.value;
    const currentStatus = activeOrders[orderIndex].status;

    if (newStatus === "Selesai") {
      const confirm = window.confirm(
        `Konfirmasi: Tandai pesanan ${activeOrders[orderIndex].id} sebagai SELESAI?\n\nStatus akan dikunci setelah ini.`,
      );

      if (confirm) {
        // Update via Global Store logic directly (reactive)
        globalStore.orders[orderIndex].status = "Selesai";
      } else {
        target.value = currentStatus;
      }
    } else {
      globalStore.orders[orderIndex].status = newStatus;
    }
  }

  function handleAddNew() {
    goto("/admin/orders/new");
  }

  // --- FUNGSI MODAL ---
  function openActionModal(req: any, type: "accept" | "reject") {
    modalData = req;
    modalType = type;
    priceInput = "";
    notesInput = "";
    showModal = true;
  }

  function closeModal() {
    showModal = false;
    modalData = null;
  }

  function submitAction() {
    if (!modalData) return;

    if (modalType === "reject") {
      // Hapus dari daftar permintaan global
      globalStore.requests = globalStore.requests.filter(
        (r) => r.id !== modalData.id,
      );
      alert(`Pesanan dari ${modalData.client} telah DITOLAK.`);
    } else {
      // TERIMA: Pindahkan ke Active Orders Global
      const newOrder = {
        id: modalData.id.replace("REQ", "ORD"), // Generate ID Baru
        client: modalData.client,
        phone: modalData.phone,
        item: modalData.item,
        date: new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
        }),
        deadline:
          modalData.requestedDeadline === "Flexible"
            ? "-"
            : modalData.requestedDeadline,
        price: priceInput || "0", // Pakai input harga
        status: "Baru", // Status awal
      };

      // Tambah ke array Active Orders Global
      globalStore.orders = [newOrder, ...globalStore.orders];

      // Hapus dari Incoming Global
      globalStore.requests = globalStore.requests.filter(
        (r) => r.id !== modalData.id,
      );

      alert(
        `Pesanan ${modalData.client} DITERIMA dengan harga Rp ${priceInput}. Masuk ke tab 'Proses'.`,
      );
    }
    closeModal();
  }

  onMount(() => {
    // Cek apakah user datang dari notifikasi order baru
    // (Logic sederhana: kalau incomingRequests ada isinya, kita prioritaskan tab itu biar user notice)
    if (incomingRequests.length > 0) {
      // Opsional: Bisa dibuat lebih spesifik pakai query param ?tab=requests
      // activeTab = "Permintaan Masuk";
    }
  });
</script>

<div class="space-y-6 relative">
  <div
    class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-t-blue to-t-pink p-8 text-white shadow-xl mb-8"
  >
    <div class="relative z-10">
      <div class="flex flex-col md:flex-row justify-between gap-4 items-center">
        <div class="w-full md:w-auto">
          <h2 class="text-3xl font-bold text-white">Manajemen Pesanan</h2>
          <p class="text-t-gray text-sm mt-1">
            Pantau status pengerjaan dan kelola pesanan masuk.
          </p>
        </div>
        <div class="flex gap-3 w-full md:w-auto">
          <button
            class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-t-dark rounded-xl hover:bg-gray-50 transition shadow-sm text-sm font-medium"
          >
            <Download size={18} />
            <span class="hidden sm:inline">Export CSV</span>
          </button>
          <button
            class="flex items-center gap-2 px-4 py-2 bg-t-yellow text-t-dark rounded-xl hover:bg-yellow-400 transition shadow-md text-sm font-medium"
            onclick={handleAddNew}
          >
            <Plus size={18} strokeWidth={2} /> Buat Pesanan
          </button>
        </div>
      </div>
    </div>
    <div
      class="absolute -right-10 -top-20 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"
    ></div>
    <div
      class="absolute right-20 bottom-[-40px] w-40 h-40 bg-t-yellow opacity-20 rounded-full blur-2xl"
    ></div>
  </div>

  <div class="bg-white px-1 rounded-t-2xl border-b border-gray-200">
    <nav class="flex gap-6 overflow-x-auto" aria-label="Tabs">
      {#each tabs as tab}
        <button
          onclick={() => (activeTab = tab.id)}
          class="relative py-4 px-2 text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 {activeTab ===
          tab.id
            ? 'text-t-blue border-b-2 border-t-blue font-bold'
            : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'}"
        >
          {#if tab.id === "Selesai"}
            <History size={16} />
          {/if}
          {tab.label}
          {#if tab.count > 0}
            <span
              class="ml-1 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm"
              >{tab.count}</span
            >
          {/if}
        </button>
      {/each}
    </nav>
  </div>

  {#if activeTab === "Permintaan Masuk"}
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      {#each incomingRequests as req}
        <div
          class="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition relative overflow-hidden group"
        >
          <div class="absolute top-0 left-0 w-1 h-full bg-t-yellow"></div>
          <div class="flex justify-between items-start mb-4 pl-2">
            <div>
              <h3 class="font-bold text-gray-800 text-lg">{req.client}</h3>
              <p class="text-xs text-gray-400 font-mono">
                {req.id} • {req.date}
              </p>
            </div>
            <div class="p-2 bg-gray-100 text-gray-500 rounded-lg">
              <AlertCircle size={20} />
            </div>
          </div>
          <div class="space-y-3 pl-2 mb-6">
            <div>
              <p class="text-xs text-gray-400 font-bold uppercase">
                Item Pesanan
              </p>
              <p class="text-gray-700 font-medium">{req.item}</p>
              <p class="text-sm text-gray-500">{req.model}</p>
            </div>
            <div>
              <p class="text-xs text-gray-400 font-bold uppercase">Catatan</p>
              <p class="text-sm text-gray-600 italic">"{req.note}"</p>
            </div>
            <div
              class="pt-2 border-t border-dashed border-gray-200 flex items-center gap-2"
            >
              <Calendar size={16} class="text-t-pink" />
              <div>
                <p class="text-[10px] text-gray-400 font-bold uppercase">
                  Permintaan Selesai
                </p>
                <p class="text-sm font-bold text-gray-700">
                  {req.requestedDeadline}
                </p>
              </div>
            </div>
          </div>
          <div class="flex gap-3 pl-2">
            <button
              onclick={() => openActionModal(req, "reject")}
              class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-medium text-sm transition"
            >
              <XCircle size={18} /> Tolak
            </button>

            <button
              onclick={() => openActionModal(req, "accept")}
              class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-t-blue text-white hover:bg-blue-600 font-bold text-sm shadow-md transition"
            >
              <CheckCircle size={18} /> Terima & Harga
            </button>
          </div>
        </div>
      {/each}
      {#if incomingRequests.length === 0}<div
          class="col-span-full py-12 text-center text-gray-400"
        >
          <p>Tidak ada permintaan pesanan baru saat ini.</p>
        </div>{/if}
    </div>
  {:else}
    <div class="flex gap-3 mb-4">
      <div class="relative flex-1 max-w-sm">
        <Search
          class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Cari pesanan..."
          class="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-t-blue/20"
        />
      </div>
      <button
        class="px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 text-sm font-medium flex items-center gap-2 hover:bg-gray-50"
        ><Filter size={16} /> Filter</button
      >
    </div>

    <div
      class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead
            class="bg-gray-50 text-gray-500 uppercase font-bold text-[11px] border-b border-gray-100 tracking-wider"
          >
            <tr>
              <th class="px-6 py-4">ID</th><th class="px-6 py-4">Pelanggan</th
              ><th class="px-6 py-4">Item & Model</th><th class="px-6 py-4"
                >Deadline</th
              ><th class="px-6 py-4">Status</th><th
                class="px-6 py-4 text-center">Aksi</th
              >
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            {#each activeOrders as order, i}
              <tr
                onclick={() => goToDetail(order.id)}
                class="hover:bg-blue-50/30 transition group cursor-pointer"
              >
                <td class="px-6 py-4 font-mono text-t-blue font-medium"
                  >{order.id}</td
                >
                <td class="px-6 py-4"
                  ><div class="font-bold text-gray-800">{order.client}</div>
                  <div class="text-xs text-gray-400">{order.phone}</div></td
                >
                <td class="px-6 py-4 text-gray-600">{order.item}</td>
                <td class="px-6 py-4"
                  ><div class="flex items-center gap-2 text-gray-600">
                    <Calendar size={14} class="text-t-pink" /><span
                      class="font-medium">{order.deadline}</span
                    >
                  </div></td
                >

                <td class="px-6 py-4" onclick={(e) => e.stopPropagation()}>
                  <select
                    value={order.status}
                    onchange={(e) => handleStatusChange(i, e)}
                    disabled={order.status === "Selesai"}
                    class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border outline-none {statusColor(
                      order.status,
                    )} 
                        {order.status === 'Selesai'
                      ? 'cursor-not-allowed opacity-80'
                      : 'cursor-pointer'}"
                  >
                    {#each statusOptions as status}
                      <option value={status}>{status}</option>
                    {/each}
                  </select>
                </td>

                <td class="px-6 py-4 text-center">
                  <!-- svelte-ignore a11y_click_events_have_key_events -->
                  <!-- svelte-ignore a11y_no_static_element_interactions -->
                  <div
                    class="flex items-center justify-center gap-2"
                    onclick={(e) => e.stopPropagation()}
                  >
                    {#if order.status !== "Selesai"}
                      <button
                        onclick={() => goToDetail(order.id, true)}
                        class="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 hover:text-yellow-800 border border-yellow-200 rounded-lg transition text-xs font-bold shadow-sm"
                        title="Edit Pesanan"
                      >
                        <Pencil size={14} /> Edit
                      </button>
                    {:else}
                      <span class="text-gray-400 text-xs italic px-3 py-1.5"
                        >Locked</span
                      >
                    {/if}
                    <button
                      class="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                      title="Hapus"><Trash2 size={18} /></button
                    >
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <div
        class="px-6 py-4 border-t border-gray-100 flex items-center justify-between"
      >
        <span class="text-xs text-gray-500"
          >Menampilkan 1-{activeOrders.length} dari {activeOrders.length} pesanan</span
        >
        <div class="flex gap-2">
          <button
            class="p-2 border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50"
            ><ChevronLeft size={16} /></button
          >
          <button class="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            ><ChevronRight size={16} /></button
          >
        </div>
      </div>
    </div>
  {/if}
</div>

{#if showModal}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    transition:fade
  >
    <div
      class="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 relative overflow-hidden"
      transition:scale
    >
      <div class="flex justify-between items-center mb-6">
        <h3
          class="text-xl font-bold {modalType === 'accept'
            ? 'text-t-blue'
            : 'text-red-600'}"
        >
          {modalType === "accept" ? "Terima Pesanan" : "Tolak Pesanan"}
        </h3>
        <button
          onclick={closeModal}
          class="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
          ><X size={20} /></button
        >
      </div>

      {#if modalType === "accept"}
        <div class="space-y-4">
          <div
            class="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-gray-700 mb-4"
          >
            Anda akan menerima pesanan dari <b>{modalData?.client}</b> untuk
            item <b>{modalData?.item}</b>. Silakan tentukan harga final.
          </div>

          <div>
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label class="block text-sm font-bold text-gray-700 mb-1"
              >Harga Kesepakatan (Rp) <span class="text-red-500">*</span></label
            >
            <div class="relative">
              <Wallet
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                bind:value={priceInput}
                placeholder="Contoh: 150.000"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-t-blue focus:border-t-blue outline-none font-bold text-gray-800"
              />
            </div>
          </div>

          <div>
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label class="block text-sm font-bold text-gray-700 mb-1"
              >Catatan Tambahan (Opsional)</label
            >
            <textarea
              bind:value={notesInput}
              rows="3"
              placeholder="Misal: Harga termasuk furing, estimasi selesai tgl 25..."
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-t-blue focus:border-t-blue outline-none text-sm"
            ></textarea>
          </div>
        </div>
      {:else}
        <div class="space-y-4">
          <div
            class="bg-red-50 p-4 rounded-xl border border-red-100 text-sm text-red-700 mb-4 flex gap-3"
          >
            <AlertCircle size={24} class="shrink-0" />
            <p>
              Apakah Anda yakin menolak pesanan dari <b>{modalData?.client}</b>?
              Tindakan ini tidak dapat dibatalkan.
            </p>
          </div>
          <div>
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label class="block text-sm font-bold text-gray-700 mb-1"
              >Alasan Penolakan (Opsional)</label
            >
            <textarea
              bind:value={notesInput}
              rows="3"
              placeholder="Misal: Kuota penuh, bahan tidak tersedia..."
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-sm"
            ></textarea>
          </div>
        </div>
      {/if}

      <div class="flex gap-3 mt-8 pt-4 border-t border-gray-100">
        <button
          onclick={closeModal}
          class="flex-1 py-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition"
          >Batal</button
        >
        <button
          onclick={submitAction}
          class="flex-1 py-3 rounded-xl font-bold text-white shadow-lg transition
                {modalType === 'accept'
            ? 'bg-t-blue hover:bg-blue-700'
            : 'bg-red-600 hover:bg-red-700'}"
        >
          {modalType === "accept" ? "Konfirmasi Terima" : "Konfirmasi Tolak"}
        </button>
      </div>
    </div>
  </div>
{/if}
