<script lang="ts">
  import {
    ArrowLeft,
    MapPin,
    Phone,
    Package,
    Scissors,
    Ruler,
    CheckCircle2,
    Clock,
    AlertCircle,
    Copy,
    FileText,
    ChevronRight,
    ShieldCheck,
    Truck,
  } from "lucide-svelte";
  import { slide, fade } from "svelte/transition";

  // --- DUMMY DATA (Detail satu pesanan) ---
  const order = {
    id: "TRX-882910",
    date: "20 Feb 2026, 14:30",
    status: "process", // waiting, process, ready, completed
    status_label: "Sedang Dijahit",
    tailor: {
      name: "Aldo Tailor",
      phone: "6281234567890", // Format internasional untuk WA
      location: "Adiwerna, Tegal",
      image:
        "https://images.unsplash.com/photo-1594938298603-c8148c47e356?w=200&q=80",
      verified: true,
    },
    items: [
      {
        name: "Jahit Kemeja Pendek",
        price: 75000,
        type: "Jasa Jahit",
        note: "Tolong buatkan saku bobok di kiri atas, kerah model shanghai, dan kancing bungkus kain.",
        measurements: "Profil: Humam Ashaq",
        image: null,
      },
      {
        name: "Jahit Celana Chino",
        price: 125000,
        type: "Jasa Jahit",
        note: "Potongan slim fit, panjang mata kaki.",
        measurements: "Manual: LP 80, PC 95",
        image: null,
      },
    ],
    timeline: [
      {
        status: "Pesanan Dibuat",
        date: "20 Feb, 14:30",
        done: true,
        description:
          "Pesanan berhasil dibuat dan menunggu konfirmasi penjahit.",
      },
      {
        status: "Dikonfirmasi Penjahit",
        date: "20 Feb, 15:00",
        done: true,
        description: "Penjahit menyetujui pesanan dan harga.",
      },
      {
        status: "Sedang Dijahit",
        date: "21 Feb, 09:00",
        done: true,
        description: "Penjahit mulai mengerjakan pesanan Anda.",
      },
      {
        status: "Siap Diambil/Dikirim",
        date: "-",
        done: false,
        description: "Pesanan selesai dan siap untuk diambil atau dikirim.",
      },
      {
        status: "Selesai",
        date: "-",
        done: false,
        description: "Pesanan telah diterima pelanggan.",
      },
    ],
    billing: {
      subtotal: 200000,
      adjustments: 10000, // Biaya tambahan (misal kancing bungkus)
      adjustment_note: "Tambahan Kancing Bungkus",
      total: 210000,
    },
  };

  // --- ACTIONS ---
  function openWhatsApp() {
    const message = `Halo ${order.tailor.name}, saya ingin menanyakan status pesanan saya dengan ID ${order.id}.`;
    const url = `https://wa.me/${order.tailor.phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }

  function copyID() {
    navigator.clipboard.writeText(order.id);
    alert("ID Pesanan disalin!");
  }
</script>

<div class="min-h-screen bg-gray-50 pb-24 font-sans text-gray-800">
  <!-- Background Decoration -->
  <div class="fixed inset-0 pointer-events-none overflow-hidden">
    <div
      class="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-3xl opacity-50"
    ></div>
    <div
      class="absolute top-[20%] -left-[10%] w-[30%] h-[30%] bg-pink-100/40 rounded-full blur-3xl opacity-50"
    ></div>
  </div>

  <!-- Header Sticky -->
  <div
    class="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 transition-all duration-300"
  >
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
    >
      <div class="flex items-center gap-4">
        <a
          href="/orders"
          class="p-2 -ml-2 hover:bg-gray-100 rounded-full transition text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
        </a>
        <div>
          <h1 class="font-bold text-gray-900 text-base leading-none">
            Detail Pesanan
          </h1>
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div
            class="flex items-center gap-1.5 cursor-pointer hover:bg-gray-100 px-1.5 py-0.5 rounded -ml-1.5 mt-0.5 transition"
            onclick={copyID}
          >
            <p class="text-xs text-gray-500 font-medium">#{order.id}</p>
            <Copy size={10} class="text-gray-400" />
          </div>
        </div>
      </div>

      <div
        class="px-3 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100 flex items-center gap-1.5 shadow-sm"
      >
        <div class="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></div>
        {order.status_label}
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- LEFT COLUMN (Status & Tailor Info) -->
      <div class="lg:col-span-8 space-y-8">
        <!-- Status Timeline -->
        <div
          class="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <h3
            class="font-bold text-lg text-gray-900 mb-8 flex items-center gap-2"
          >
            <Clock size={20} class="text-t-blue" /> Status Pengerjaan
          </h3>

          <div class="relative pl-1">
            <!-- Vertical Line -->
            <div
              class="absolute top-3 left-[9px] bottom-3 w-0.5 bg-gray-100 rounded-full"
            ></div>

            <div class="space-y-8">
              {#each order.timeline as time, i}
                <div class="relative flex gap-6 group">
                  <!-- Dot Indicator -->
                  <div class="flex-shrink-0 z-10">
                    {#if time.done}
                      <div
                        class="w-5 h-5 rounded-full bg-t-blue border-4 border-blue-100 shadow-sm flex items-center justify-center"
                      >
                        <CheckCircle2 size={10} class="text-white" />
                      </div>
                    {:else}
                      <div
                        class="w-5 h-5 rounded-full bg-white border-2 border-gray-200"
                      ></div>
                    {/if}
                  </div>

                  <!-- Content -->
                  <div
                    class="flex-1 -mt-1 pb-4 border-b border-gray-50 last:border-0 last:pb-0"
                  >
                    <div
                      class="flex flex-wrap justify-between items-start gap-2 mb-1"
                    >
                      <p
                        class="text-base font-bold transition-colors {time.done
                          ? 'text-gray-900'
                          : 'text-gray-400'}"
                      >
                        {time.status}
                      </p>
                      <span
                        class="text-xs font-medium bg-gray-50 px-2 py-0.5 rounded text-gray-500"
                      >
                        {time.date}
                      </span>
                    </div>
                    <p class="text-xs text-gray-500 leading-relaxed max-w-lg">
                      {time.description}
                    </p>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>

        <!-- Tailor Info Card -->
        <div
          class="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100"
        >
          <div
            class="flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            <div class="flex items-center gap-4">
              <div class="relative">
                <img
                  src={order.tailor.image}
                  alt="Tailor"
                  class="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                />
                {#if order.tailor.verified}
                  <div
                    class="absolute -bottom-1 -right-1 bg-blue-500 text-white p-0.5 rounded-full border-2 border-white"
                    title="Terverifikasi"
                  >
                    <ShieldCheck size={12} strokeWidth={3} />
                  </div>
                {/if}
              </div>
              <div>
                <h3 class="font-bold text-gray-900 text-lg">
                  {order.tailor.name}
                </h3>
                <div
                  class="flex items-center gap-1.5 text-sm text-gray-500 mt-1"
                >
                  <MapPin size={14} />
                  {order.tailor.location}
                </div>
              </div>
            </div>

            <div class="flex gap-3 w-full sm:w-auto">
              <!-- Helper button (Phone) -->
              <button
                class="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200 transition-colors"
              >
                <Phone size={20} />
              </button>

              <!-- WhatsApp Button -->
              <button
                onclick={openWhatsApp}
                class="flex-1 sm:flex-none px-6 h-12 bg-[#25D366]/10 text-[#128C7E] rounded-xl font-bold text-sm hover:bg-[#25D366] hover:text-white transition-all flex items-center justify-center gap-2 border border-[#25D366]/20 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="transition-colors group-hover:text-white"
                >
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                  />
                </svg>
                Chat Penjahit
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN (Items & Sticky Summary) -->
      <div class="lg:col-span-4 space-y-8 sticky top-24">
        <!-- Rincian Item Card -->
        <div
          class="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200"
        >
          <h3 class="font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Package size={20} class="text-t-pink" /> Rincian Item
          </h3>

          <div class="space-y-8">
            {#each order.items as item, idx}
              <div
                class="relative {idx !== order.items.length - 1
                  ? 'pb-8 border-b border-dashed border-gray-200'
                  : ''}"
              >
                <!-- Header Item -->
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <p class="font-bold text-gray-800 text-sm">{item.name}</p>
                    <p
                      class="text-[10px] text-gray-400 font-bold bg-gray-50 px-2 py-0.5 rounded-md inline-block mt-1"
                    >
                      {item.type}
                    </p>
                  </div>
                  <p class="font-bold text-gray-900 text-sm">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>

                <!-- Detail Box -->
                <div class="bg-gray-50 rounded-2xl p-4 text-xs space-y-3">
                  <!-- Measurements -->
                  <div class="flex gap-3">
                    <div
                      class="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-gray-400 flex-shrink-0 shadow-sm"
                    >
                      <Ruler size={12} />
                    </div>
                    <div>
                      <p
                        class="font-bold text-gray-400 text-[10px] uppercase tracking-wider mb-0.5"
                      >
                        Ukuran
                      </p>
                      <p class="text-gray-700 font-medium">
                        {item.measurements}
                      </p>
                    </div>
                  </div>

                  <!-- Note -->
                  {#if item.note}
                    <div class="flex gap-3">
                      <div
                        class="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-gray-400 flex-shrink-0 shadow-sm"
                      >
                        <FileText size={12} />
                      </div>
                      <div>
                        <p
                          class="font-bold text-gray-400 text-[10px] uppercase tracking-wider mb-0.5"
                        >
                          Catatan
                        </p>
                        <p class="text-gray-600 italic leading-relaxed">
                          "{item.note}"
                        </p>
                      </div>
                    </div>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Payment Summary Card -->
        <div
          class="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300"
        >
          <div class="space-y-3">
            <div class="flex justify-between text-sm text-gray-500">
              <span>Subtotal Jasa</span>
              <span class="font-medium text-gray-900"
                >Rp {order.billing.subtotal.toLocaleString("id-ID")}</span
              >
            </div>

            {#if order.billing.adjustments > 0}
              <div
                class="flex justify-between text-sm text-t-blue bg-blue-50 p-3 rounded-xl border border-blue-100/50"
              >
                <span class="flex items-center gap-2">
                  <AlertCircle size={14} />
                  {order.billing.adjustment_note}
                </span>
                <span class="font-bold"
                  >+ Rp {order.billing.adjustments.toLocaleString(
                    "id-ID",
                  )}</span
                >
              </div>
            {/if}
          </div>

          <div class="pt-6 border-t border-dashed border-gray-200 mt-6">
            <div class="flex justify-between items-end">
              <div>
                <p
                  class="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1"
                >
                  Total Biaya
                </p>
              </div>
              <span class="text-2xl font-black text-gray-900"
                >Rp {order.billing.total.toLocaleString("id-ID")}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
