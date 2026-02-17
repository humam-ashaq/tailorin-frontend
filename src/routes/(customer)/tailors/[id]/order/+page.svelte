<script lang="ts">
  import {
    ArrowLeft,
    Ruler,
    Shirt,
    Info,
    CheckCircle2,
    FileText,
    AlertCircle,
    Wallet,
    Scissors,
    ShieldCheck,
    Plus,
    Trash2,
  } from "lucide-svelte";
  import { slide } from "svelte/transition";

  // --- DUMMY DATA ---
  const tailor = {
    name: "Aldo Tailor",
    location: "Adiwerna, Tegal",
    services: [
      { id: 1, name: "Jahit Kemeja Pendek", price: 75000, type: "Atasan" },
      { id: 2, name: "Jahit Kemeja Panjang", price: 85000, type: "Atasan" },
      { id: 3, name: "Jahit Celana Formal", price: 90000, type: "Bawahan" },
      { id: 4, name: "Jahit Jas Full Set", price: 1500000, type: "Setelan" },
    ],
  };

  const userProfile = {
    name: "Humam Ashaq",
    measurements: { ld: 104, pb: 75, pl: 62, lp: 90, pc: 100 }, // LD, P.Baju, P.Lengan, L.Pinggang, P.Celana
  };

  // --- TYPES ---
  type OrderItem = {
    id: string;
    serviceId: number;
    useProfileMeasurement: boolean;
    manualMeasurements: {
      ld: number;
      pb: number;
      pl: number;
      lp: number;
      pc: number;
    };
    customNotes: string;
  };

  // --- STATE ---
  let orderItems = $state<OrderItem[]>([
    {
      id: crypto.randomUUID(),
      serviceId: 1,
      useProfileMeasurement: true,
      manualMeasurements: { ld: 0, pb: 0, pl: 0, lp: 0, pc: 0 },
      customNotes: "",
    },
  ]);

  let isSubmitting = $state(false);

  // --- DERIVED ---
  // Calculate total estimated price
  let totalPrice = $derived(
    orderItems.reduce((total, item) => {
      const service = tailor.services.find((s) => s.id === item.serviceId);
      return total + (service?.price || 0);
    }, 0),
  );

  // --- ACTIONS ---
  function addOrderItem() {
    orderItems.push({
      id: crypto.randomUUID(),
      serviceId: 1,
      useProfileMeasurement: true,
      manualMeasurements: { ld: 0, pb: 0, pl: 0, lp: 0, pc: 0 },
      customNotes: "",
    });
  }

  function removeOrderItem(index: number) {
    if (orderItems.length > 1) {
      orderItems.splice(index, 1);
    }
  }

  function handleSubmit() {
    isSubmitting = true;

    // Simulasi API Call
    setTimeout(() => {
      isSubmitting = false;
      const totalItems = orderItems.length;
      alert(
        `Berhasil Membuat Pesanan!\nTotal Item: ${totalItems}\n\nPenjahit akan mereview request Anda dan memberikan harga fix.`,
      );
      window.location.href = "/"; // Balik ke home (atau nanti ke riwayat transaksi)
    }, 2000);
  }
</script>

<div class="min-h-screen bg-gray-50 pb-20 font-sans text-gray-800">
  <!-- Header Sticky -->
  <div
    class="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 transition-all duration-300"
  >
    <div class="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
      <a
        href="/tailors/1"
        class="p-2 -ml-2 hover:bg-gray-100 rounded-full transition text-gray-500 hover:text-gray-900"
      >
        <ArrowLeft size={20} />
      </a>
      <div>
        <h1 class="font-bold text-gray-900 text-lg leading-tight">
          Buat Pesanan
        </h1>
        <p class="text-xs text-gray-500">
          di <span class="font-semibold text-t-blue">{tailor.name}</span>
        </p>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div
    class="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
  >
    <!-- Left Content (Form) -->
    <div class="lg:col-span-8 space-y-10">
      {#each orderItems as item, index (item.id)}
        <div
          class="relative bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <!-- Item Header -->
          <div
            class="flex justify-between items-center mb-8 border-b border-gray-100 pb-4"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm shadow-md"
              >
                {index + 1}
              </div>
              <h2 class="font-bold text-xl text-gray-900">
                Pesanan #{index + 1}
              </h2>
            </div>
            {#if orderItems.length > 1}
              <button
                onclick={() => removeOrderItem(index)}
                class="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors flex items-center gap-1 text-xs font-bold"
              >
                <Trash2 size={16} /> Hapus
              </button>
            {/if}
          </div>

          <!-- Step 1: Services -->
          <section class="mb-10">
            <div class="flex items-center gap-2 mb-4 text-gray-400">
              <div class="w-2 h-2 rounded-full bg-t-blue"></div>
              <h3 class="text-xs font-bold uppercase tracking-wider">
                Layanan
              </h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              {#each tailor.services as service}
                <button
                  onclick={() => (item.serviceId = service.id)}
                  class="relative flex flex-col items-start p-5 rounded-2xl border-2 transition-all duration-200 group text-left hover:shadow-md
                                    {item.serviceId === service.id
                    ? 'border-t-blue bg-blue-50/30 ring-1 ring-t-blue/20'
                    : 'border-gray-100 bg-white hover:border-blue-100'}"
                >
                  <div class="w-full flex justify-between items-start mb-2">
                    <div
                      class="p-2 rounded-lg {item.serviceId === service.id
                        ? 'bg-blue-100 text-t-blue'
                        : 'bg-gray-50 text-gray-400'} transition-colors"
                    >
                      <Shirt size={20} />
                    </div>
                    {#if item.serviceId === service.id}
                      <div
                        transition:slide={{ axis: "y", duration: 200 }}
                        class="absolute top-5 right-5"
                      >
                        <CheckCircle2
                          size={20}
                          class="text-t-blue fill-blue-50"
                        />
                      </div>
                    {/if}
                  </div>

                  <span class="font-bold text-gray-900 text-base mb-1"
                    >{service.name}</span
                  >
                  <span
                    class="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded text-transform capitalize"
                    >{service.type}</span
                  >

                  <div
                    class="mt-4 w-full pt-4 border-t border-gray-100/50 flex justify-between items-end"
                  >
                    <span class="text-xs text-gray-400">Harga mulai</span>
                    <span class="font-bold text-gray-900 text-lg"
                      >Rp {service.price.toLocaleString("id-ID")}</span
                    >
                  </div>
                </button>
              {/each}
            </div>
          </section>

          <!-- Step 2: Measurements -->
          <section class="mb-10">
            <div class="flex items-center gap-2 mb-4 text-gray-400">
              <div class="w-2 h-2 rounded-full bg-t-pink"></div>
              <h3 class="text-xs font-bold uppercase tracking-wider">
                Data Ukuran
              </h3>
            </div>

            <div
              class="bg-gray-50 p-1 rounded-xl border border-gray-100 inline-flex mb-6"
            >
              <button
                onclick={() => (item.useProfileMeasurement = true)}
                class="px-5 py-2 rounded-lg text-xs font-bold transition-all duration-200 {item.useProfileMeasurement
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'}"
              >
                Pakai Profil Saya
              </button>
              <button
                onclick={() => (item.useProfileMeasurement = false)}
                class="px-5 py-2 rounded-lg text-xs font-bold transition-all duration-200 {!item.useProfileMeasurement
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'}"
              >
                Input Manual
              </button>
            </div>

            <div class="bg-gray-50/50 rounded-2xl border border-gray-100 p-6">
              {#if item.useProfileMeasurement}
                <div class="flex items-center gap-4">
                  <div
                    class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-lg font-bold text-gray-500 border border-gray-100 shadow-sm"
                  >
                    {userProfile.name.charAt(0)}
                  </div>
                  <div>
                    <p class="font-bold text-gray-900 text-sm">
                      {userProfile.name}
                    </p>
                    <div
                      class="flex items-center gap-1 text-xs text-t-blue font-medium mt-0.5"
                    >
                      <CheckCircle2 size={12} /> Data Profil
                    </div>
                  </div>
                </div>
              {:else}
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <div class="space-y-1">
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <label
                      class="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between"
                    >
                      Lingkar Dada
                    </label>
                    <div class="relative group">
                      <input
                        type="number"
                        bind:value={item.manualMeasurements.ld}
                        class="w-full pl-3 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-gray-900 focus:border-t-blue focus:ring-2 focus:ring-t-blue/10 outline-none transition text-sm"
                      />
                      <span
                        class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400"
                        >cm</span
                      >
                    </div>
                  </div>

                  <div class="space-y-1">
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <label
                      class="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between"
                    >
                      Panjang Baju
                    </label>
                    <div class="relative group">
                      <input
                        type="number"
                        bind:value={item.manualMeasurements.pb}
                        class="w-full pl-3 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-gray-900 focus:border-t-blue focus:ring-2 focus:ring-t-blue/10 outline-none transition text-sm"
                      />
                      <span
                        class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400"
                        >cm</span
                      >
                    </div>
                  </div>
                </div>
              {/if}
            </div>
          </section>

          <!-- Step 3: Layout & Notes -->
          <section>
            <div class="flex items-center gap-2 mb-4 text-gray-400">
              <div class="w-2 h-2 rounded-full bg-t-yellow"></div>
              <h3 class="text-xs font-bold uppercase tracking-wider">
                Detail Request
              </h3>
            </div>

            <div class="relative">
              <textarea
                bind:value={item.customNotes}
                rows="3"
                placeholder="Contoh: Saya ingin kerah model shanghai, saku bobok..."
                class="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-gray-900 focus:ring-0 outline-none transition resize-none placeholder-gray-400 leading-relaxed"
              ></textarea>
            </div>
          </section>
        </div>
      {/each}

      <!-- Add Button -->
      <button
        onclick={addOrderItem}
        class="w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 font-bold hover:border-t-blue hover:text-t-blue hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group"
      >
        <div
          class="bg-gray-100 rounded-full p-1 group-hover:bg-blue-100 transition-colors"
        >
          <Plus size={20} />
        </div>
        Tambah Pesanan Lain
      </button>
    </div>

    <!-- Right Content (Sticky Summary) -->
    <div class="lg:col-span-4 sticky top-28 space-y-6">
      <div
        class="bg-white p-6 rounded-3xl border border-gray-200 shadow-xl overflow-hidden relative"
      >
        <!-- Background Decoration -->
        <div
          class="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-t-blue/10 to-t-pink/10 rounded-full blur-3xl"
        ></div>

        <h3 class="font-bold text-lg text-gray-900 mb-6 relative z-10">
          Ringkasan Pesanan
        </h3>

        <div
          class="space-y-4 relative z-10 max-h-[40vh] overflow-y-auto pr-1 custom-scrollbar"
        >
          {#each orderItems as item, index}
            {@const service = tailor.services.find(
              (s) => s.id === item.serviceId,
            )}
            <div class="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div class="flex justify-between items-start mb-1">
                <span class="text-xs font-bold text-gray-400"
                  >Item #{index + 1}</span
                >
                <span class="text-xs font-bold text-gray-900"
                  >Rp {service?.price.toLocaleString("id-ID")}</span
                >
              </div>
              <p class="font-bold text-gray-800 text-sm mb-1">
                {service?.name}
              </p>
              <div class="flex items-center gap-2 text-[10px] text-gray-500">
                <span class="bg-gray-100 px-1.5 py-0.5 rounded"
                  >{service?.type}</span
                >
                <span>•</span>
                <span>{item.useProfileMeasurement ? "Profil" : "Manual"}</span>
              </div>
            </div>
          {/each}
        </div>

        <div
          class="pt-4 border-t-2 border-dashed border-gray-100 relative z-10"
        >
          <div class="py-2 mb-2">
            <p
              class="text-xs text-gray-400 uppercase tracking-widest font-bold mb-2"
            >
              Total Estimasi
            </p>
            <div class="flex items-baseline gap-1">
              <span class="text-base text-gray-500 font-bold">Rp</span>
              <span class="text-4xl font-black text-gray-900"
                >{totalPrice.toLocaleString("id-ID")}</span
              >
            </div>
          </div>

          <div
            class="flex gap-3 bg-yellow-50 p-3 rounded-xl border border-yellow-100 text-yellow-800"
          >
            <AlertCircle size={20} class="flex-shrink-0 mt-0.5" />
            <p class="text-[11px] leading-relaxed font-medium">
              Harga final akan dikonfirmasi penjahit setelah review semua item.
            </p>
          </div>
        </div>

        <div class="mt-6 relative z-10">
          <button
            onclick={handleSubmit}
            disabled={isSubmitting}
            class="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 overflow-hidden relative group"
          >
            <!-- Shine Effect -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
            ></div>

            {#if isSubmitting}
              <div
                class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
              ></div>
              <span>Memproses...</span>
            {:else}
              <Wallet size={18} />
              <span>Buat Pesanan ({orderItems.length})</span>
            {/if}
          </button>
          <p
            class="text-[10px] text-center text-gray-400 mt-4 flex items-center justify-center gap-1"
          >
            <ShieldCheck size={12} /> Pembayaran aman & garansi uang kembali
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Custom Scrollbar for Summary */
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #f1f1f1;
    border-radius: 4px;
  }
  .custom-scrollbar:hover::-webkit-scrollbar-thumb {
    background: #d1d5db;
  }
</style>
