<script lang="ts">
  import {
    Package,
    Clock,
    CheckCircle2,
    Truck,
    ChevronRight,
    Search,
    Filter,
    Scissors,
    AlertCircle,
    Calendar,
    MapPin,
  } from "lucide-svelte";
  import { fade, slide } from "svelte/transition";

  // --- DUMMY DATA ---
  const orders = [
    {
      id: "TRX-882910",
      tailor_name: "Aldo Tailor",
      tailor_address: "Adiwerna, Tegal",
      tailor_image:
        "https://images.unsplash.com/photo-1594938298603-c8148c47e356?w=200&q=80",
      service: "Jahit Kemeja Pendek",
      date: "20 Feb 2026",
      price: 75000,
      status: "process",
      status_label: "Sedang Dijahit",
      items: 1,
    },
    {
      id: "TRX-773120",
      tailor_name: "Rumah Jahit Bu Siti",
      tailor_address: "Slawi, Tegal",
      tailor_image:
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200&q=80",
      service: "Permak Celana Jeans",
      date: "18 Feb 2026",
      price: 25000,
      status: "waiting",
      status_label: "Menunggu Konfirmasi",
      items: 2,
    },
    {
      id: "TRX-888730",
      tailor_name: "Aldo Tailor",
      tailor_address: "Adiwerna, Tegal",
      tailor_image:
        "https://images.unsplash.com/photo-1594938298603-c8148c47e356?w=200&q=80",
      service: "Jahit Kemeja Pendek",
      date: "20 Feb 2026",
      price: 75000,
      status: "process",
      status_label: "Sedang Dijahit",
      items: 1,
    },
    {
      id: "TRX-110293",
      tailor_name: "The Suits Maker",
      tailor_address: "Tegal Kota",
      tailor_image:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200&q=80",
      service: "Jas Formal Full Set",
      date: "10 Jan 2026",
      price: 1500000,
      status: "completed",
      status_label: "Selesai",
      items: 1,
    },
  ];

  // --- STATE ---
  let activeTab = $state<"active" | "completed">("active");

  // --- LOGIC ---
  let filteredOrders = $derived(
    orders.filter((o) => {
      if (activeTab === "active")
        return ["waiting", "process", "ready"].includes(o.status);
      return ["completed", "cancelled"].includes(o.status);
    }),
  );

  function getStatusColor(status: string) {
    switch (status) {
      case "waiting":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "process":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "ready":
        return "bg-green-50 text-green-700 border-green-200";
      case "completed":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-red-50 text-red-700 border-red-200";
    }
  }
</script>

<div class="min-h-screen bg-gray-50 py-12 font-sans">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header & Tabs -->
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10"
    >
      <div>
        <h1 class="text-3xl font-black text-gray-900 tracking-tight">
          Pesanan Saya
        </h1>
        <p class="text-gray-500 mt-2 text-lg">
          Pantau progres jahitanmu di sini.
        </p>
      </div>

      <div
        class="bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm flex w-full md:w-auto"
      >
        <button
          onclick={() => (activeTab = "active")}
          class="flex-1 md:flex-none px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2
                    {activeTab === 'active'
            ? 'bg-gray-900 text-white shadow-lg transform scale-105'
            : 'text-gray-500 hover:bg-gray-50'}"
        >
          <Package size={18} />
          <span>Dalam Proses</span>
          {#if orders.filter( (o) => ["waiting", "process", "ready"].includes(o.status), ).length > 0}
            <span
              class="ml-1 px-1.5 py-0.5 bg-white/20 rounded-md text-[10px] backdrop-blur-sm"
            >
              {orders.filter((o) =>
                ["waiting", "process", "ready"].includes(o.status),
              ).length}
            </span>
          {/if}
        </button>
        <button
          onclick={() => (activeTab = "completed")}
          class="flex-1 md:flex-none px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2
                    {activeTab === 'completed'
            ? 'bg-gray-900 text-white shadow-lg transform scale-105'
            : 'text-gray-500 hover:bg-gray-50'}"
        >
          <CheckCircle2 size={18} />
          <span>Selesai</span>
        </button>
      </div>
    </div>

    <!-- Orders Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#if filteredOrders.length > 0}
        {#each filteredOrders as order (order.id)}
          <a
            href="/orders/{order.id}"
            transition:slide|local={{ duration: 300, axis: "y" }}
            class="group bg-white rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full"
          >
            <!-- Card Header -->
            <div class="p-6 pb-4 border-b border-gray-50">
              <div class="flex justify-between items-start mb-4">
                <div
                  class="px-3 py-1.5 rounded-full text-[11px] font-bold border flex items-center gap-1.5 {getStatusColor(
                    order.status,
                  )}"
                >
                  {#if order.status === "process"}
                    <span class="relative flex h-2 w-2">
                      <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"
                      ></span>
                      <span
                        class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"
                      ></span>
                    </span>
                  {/if}
                  {order.status_label}
                </div>
                <span
                  class="text-[10px] font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md"
                  >{order.id}</span
                >
              </div>

              <div class="flex items-center gap-4">
                <img
                  src={order.tailor_image}
                  alt={order.tailor_name}
                  class="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                />
                <div>
                  <h3
                    class="font-bold text-gray-900 text-base leading-tight group-hover:text-t-blue transition-colors"
                  >
                    {order.tailor_name}
                  </h3>
                  <div class="flex items-center gap-1 text-gray-400 mt-1">
                    <MapPin size={10} />
                    <p class="text-[11px]">{order.tailor_address}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card Body -->
            <div class="p-6 flex-1 flex flex-col justify-center bg-gray-50/30">
              <div class="flex items-start gap-4">
                <div
                  class="w-12 h-12 bg-white rounded-2xl border border-gray-100 flex items-center justify-center text-gray-400 shadow-sm flex-shrink-0"
                >
                  <Scissors size={20} />
                </div>
                <div>
                  <h4 class="font-bold text-gray-800 text-sm line-clamp-1">
                    {order.service}
                  </h4>
                  <p class="text-xs text-gray-500 mt-1 flex items-center gap-2">
                    <span
                      class="bg-gray-100 px-1.5 py-0.5 rounded text-[10px] font-medium"
                      >{order.items} Item</span
                    >
                    <span>•</span>
                    <span>Custom Size</span>
                  </p>
                </div>
              </div>
            </div>

            <!-- Card Footer -->
            <div
              class="p-5 border-t border-gray-100 bg-white flex justify-between items-center mt-auto"
            >
              <div>
                <p
                  class="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5"
                >
                  Total Biaya
                </p>
                <p class="text-lg font-black text-gray-900">
                  Rp {order.price.toLocaleString("id-ID")}
                </p>
              </div>
              <div
                class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-gray-900 group-hover:text-white transition-all transform group-hover:rotate-45"
              >
                <ChevronRight size={18} />
              </div>
            </div>
          </a>
        {/each}
      {/if}
    </div>

    {#if filteredOrders.length === 0}
      <div
        in:fade
        class="col-span-full flex flex-col items-center justify-center py-20 px-4 text-center"
      >
        <div
          class="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl shadow-gray-100 border border-gray-50"
        >
          <Package size={40} class="text-gray-300" />
        </div>
        <h3 class="font-bold text-xl text-gray-900 mb-2">
          Belum ada pesanan {activeTab === "active" ? "aktif" : "selesai"}
        </h3>
        <p class="text-gray-500 max-w-md mx-auto mb-8">
          {activeTab === "active"
            ? "Mulai cari penjahit terbaik di sekitarmu dan buat pesanan pertamamu sekarang."
            : "Riwayat pesanan yang telah selesai akan muncul di sini."}
        </p>
        {#if activeTab === "active"}
          <a
            href="/tailors"
            class="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Cari Penjahit
          </a>
        {/if}
      </div>
    {/if}
  </div>
</div>
