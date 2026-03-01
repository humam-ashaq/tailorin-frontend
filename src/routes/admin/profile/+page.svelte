<script lang="ts">
  import {
    Pencil,
    Save,
    Upload,
    MapPin,
    Phone,
    Clock,
    Image as ImageIcon,
    X,
    Plus,
    Camera,
    Store,
    CheckCircle,
  } from "lucide-svelte";
  import { fade, slide } from "svelte/transition";

  // State
  let isEditing = $state(false);

  // Data Toko (Mock)
  let store = $state({
    name: "SS Tailor",
    category: "Penjahit Umum & Permak",
    bio: "Menerima segala jenis jahitan pria dan wanita. Spesialis kebaya, jas formal, dan seragam dinas. Hasil rapi dan tepat waktu.",
    phone: "081234567890",
    address: "Jl. Merpati No. 45, Kecamatan Lowokwaru, Kota Malang",
    hours: [
      { day: "Senin", isOpen: true, start: "08:00", end: "17:00" },
      { day: "Selasa", isOpen: true, start: "08:00", end: "17:00" },
      { day: "Rabu", isOpen: true, start: "08:00", end: "17:00" },
      { day: "Kamis", isOpen: true, start: "08:00", end: "17:00" },
      { day: "Jumat", isOpen: true, start: "13:00", end: "20:00" },
      { day: "Sabtu", isOpen: true, start: "09:00", end: "15:00" },
      { day: "Minggu", isOpen: false, start: "09:00", end: "15:00" },
    ],
    services: [
      "Jahit Baru",
      "Permak",
      "Seragam Sekolah",
      "Kebaya",
      "Jas",
      "Celana",
    ],
    gallery: [1, 2, 3], // Mock gallery items count
  });

  // Temp State untuk Edit Mode
  // svelte-ignore state_referenced_locally
  let tempStore = $state<any>({ ...store });
  let tempService = $state("");

  function toggleEdit() {
    if (isEditing) {
      // Batal Edit
      // Deep copy reset needs to handle nested arrays/objects properly
      tempStore = JSON.parse(JSON.stringify(store));
      isEditing = false;
    } else {
      // Mulai Edit
      tempStore = JSON.parse(JSON.stringify(store));
      isEditing = true;
    }
  }

  function saveChanges() {
    store = JSON.parse(JSON.stringify(tempStore));
    isEditing = false;
    alert("Profil toko berhasil diperbarui!");
  }

  function addService() {
    if (tempService.trim()) {
      tempStore.services = [...tempStore.services, tempService.trim()];
      tempService = "";
    }
  }

  function removeService(index: number) {
    tempStore.services = tempStore.services.filter(
      (_: any, i: number) => i !== index,
    );
  }
</script>

<div class="space-y-6 pb-20">
  <!-- Header Section -->
  <div
    class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-t-blue to-t-pink p-8 text-white shadow-xl"
  >
    <div
      class="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center"
    >
      <div class="flex items-center gap-6">
        <div class="relative">
          <div
            class="flex h-24 w-24 items-center justify-center rounded-full bg-white text-4xl font-bold text-t-blue shadow-lg md:h-28 md:w-28"
          >
            SS
          </div>
          {#if isEditing}
            <button
              class="absolute bottom-0 right-0 rounded-full bg-t-yellow p-2 text-t-dark shadow-md transition hover:scale-110"
              title="Ganti Foto"
            >
              <Camera size={18} />
            </button>
          {/if}
        </div>
        <div>
          {#if isEditing}
            <input
              type="text"
              bind:value={tempStore.name}
              class="mb-1 w-full rounded-lg bg-white/20 px-3 py-1 text-2xl font-bold text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <input
              type="text"
              bind:value={tempStore.category}
              class="w-full rounded-lg bg-white/20 px-3 py-1 text-sm text-white/90 placeholder-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          {:else}
            <h2 class="text-3xl font-bold">{store.name}</h2>
            <p class="text-white/90">{store.category}</p>
          {/if}
        </div>
      </div>

      <div class="flex w-full gap-3 md:w-auto">
        {#if isEditing}
          <button
            onclick={toggleEdit}
            class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/20 px-6 py-3 font-bold text-white backdrop-blur-sm transition hover:bg-white/30 md:flex-none"
          >
            <X size={18} /> Batal
          </button>
          <button
            onclick={saveChanges}
            class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-t-yellow px-6 py-3 font-bold text-t-dark shadow-lg transition hover:scale-105 hover:bg-yellow-400 md:flex-none"
          >
            <Save size={18} /> Simpan
          </button>
        {:else}
          <button
            onclick={toggleEdit}
            class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-t-yellow px-6 py-3 font-bold text-t-dark shadow-lg transition hover:bg-yellow-400 md:flex-none"
          >
            <Pencil size={18} /> Edit Profil
          </button>
        {/if}
      </div>
    </div>

    <!-- Decorative Elements -->
    <div
      class="absolute -right-10 -top-20 h-64 w-64 rounded-full bg-white blur-3xl opacity-10"
    ></div>
    <div
      class="absolute bottom-[-40px] right-20 h-40 w-40 rounded-full bg-t-yellow blur-2xl opacity-20"
    ></div>
  </div>

  <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
    <!-- Left Column: Store Details -->
    <div class="space-y-6 lg:col-span-2">
      <!-- Bio & Info -->
      <div
        class="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg relative overflow-hidden"
      >
        <div
          class="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-t-blue to-t-pink"
        ></div>
        <h3
          class="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800"
        >
          <Store class="text-t-blue" size={20} /> Informasi Toko
        </h3>

        <div class="space-y-4">
          <div>
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label class="mb-1 block text-xs font-bold uppercase text-gray-400"
              >Deskripsi / Bio</label
            >
            {#if isEditing}
              <textarea
                bind:value={tempStore.bio}
                rows="3"
                class="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-t-blue focus:ring-2 focus:ring-t-blue outline-none"
              ></textarea>
            {:else}
              <p class="text-sm leading-relaxed text-gray-600">{store.bio}</p>
            {/if}
          </div>

          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <!-- Kolom Kiri: Kontak & Alamat -->
            <div class="space-y-4">
              <div>
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <label
                  class="mb-1 block text-xs font-bold uppercase text-gray-400"
                  >Nomor Telepon (WA)</label
                >
                <div class="flex items-center gap-2">
                  <Phone size={16} class="text-t-pink" />
                  {#if isEditing}
                    <input
                      type="text"
                      bind:value={tempStore.phone}
                      class="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-bold text-gray-800 focus:border-t-blue focus:ring-2 focus:ring-t-blue outline-none"
                    />
                  {:else}
                    <span class="font-bold text-gray-800">{store.phone}</span>
                  {/if}
                </div>
              </div>

              <div>
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <label
                  class="mb-1 block text-xs font-bold uppercase text-gray-400"
                  >Alamat Lengkap</label
                >
                <div class="flex items-start gap-2">
                  <MapPin size={16} class="mt-1 shrink-0 text-t-pink" />
                  {#if isEditing}
                    <textarea
                      bind:value={tempStore.address}
                      rows="3"
                      class="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 focus:border-t-blue focus:ring-2 focus:ring-t-blue outline-none"
                    ></textarea>
                  {:else}
                    <span class="text-sm text-gray-600">{store.address}</span>
                  {/if}
                </div>
              </div>
            </div>

            <!-- Kolom Kanan: Jam Operasional -->
            <div class="md:border-l md:border-gray-100 md:pl-6">
              <!-- svelte-ignore a11y_label_has_associated_control -->
              <label
                class="mb-3 text-xs font-bold uppercase text-gray-400 flex items-center gap-2"
                ><Clock size={14} /> Jam Operasional</label
              >

              <div class="space-y-3">
                {#if isEditing}
                  <!-- Edit Mode: WhatsApp Style Toggles -->
                  {#each tempStore.hours as schedule}
                    <div
                      class="flex items-center justify-between pb-2 border-b border-gray-50 last:border-0 last:pb-0"
                    >
                      <div class="flex flex-col">
                        <span class="text-sm font-bold text-gray-700"
                          >{schedule.day}</span
                        >
                        {#if schedule.isOpen}
                          <div class="flex items-center gap-1 mt-1">
                            <input
                              type="time"
                              bind:value={schedule.start}
                              class="bg-gray-50 border border-gray-200 rounded px-1 text-xs text-gray-600 focus:ring-1 focus:ring-t-blue outline-none"
                            />
                            <span class="text-xs text-gray-400">-</span>
                            <input
                              type="time"
                              bind:value={schedule.end}
                              class="bg-gray-50 border border-gray-200 rounded px-1 text-xs text-gray-600 focus:ring-1 focus:ring-t-blue outline-none"
                            />
                          </div>
                        {:else}
                          <span class="text-xs text-red-400 font-medium"
                            >Tutup</span
                          >
                        {/if}
                      </div>

                      <!-- Toggle Switch -->
                      <label
                        class="relative inline-flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          bind:checked={schedule.isOpen}
                          class="sr-only peer"
                        />
                        <div
                          class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"
                        ></div>
                      </label>
                    </div>
                  {/each}
                {:else}
                  <!-- View Mode: Read Only List -->
                  {#each store.hours as schedule}
                    <div
                      class="flex justify-between items-center text-sm py-1 border-b border-gray-50 last:border-0"
                    >
                      <span class="text-gray-600 w-20">{schedule.day}</span>
                      {#if schedule.isOpen}
                        <span class="font-bold text-gray-800"
                          >{schedule.start} - {schedule.end}</span
                        >
                      {:else}
                        <span
                          class="text-red-400 text-xs font-bold bg-red-50 px-2 py-0.5 rounded"
                          >Tutup</span
                        >
                      {/if}
                    </div>
                  {/each}
                {/if}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Services -->
      <div
        class="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg relative overflow-hidden"
      >
        <div
          class="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-t-blue to-t-pink"
        ></div>
        <h3
          class="mb-4 flex items-center gap-2 text-lg font-bold text-gray-800"
        >
          <CheckCircle class="text-t-blue" size={20} /> Layanan Kami
        </h3>

        {#if isEditing}
          <div class="mb-4 flex gap-2">
            <input
              type="text"
              bind:value={tempService}
              placeholder="Tambah layanan baru..."
              class="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:border-t-blue focus:ring-2 focus:ring-t-blue outline-none"
              onkeydown={(e) => e.key === "Enter" && addService()}
            />
            <button
              onclick={addService}
              class="rounded-xl bg-t-blue px-4 py-2 text-white hover:bg-blue-600"
            >
              <Plus size={20} />
            </button>
          </div>
        {/if}

        <div class="flex flex-wrap gap-2">
          {#each isEditing ? tempStore.services : store.services as service, i}
            <div
              class="flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-t-blue transition hover:bg-blue-100"
            >
              {service}
              {#if isEditing}
                <button
                  onclick={() => removeService(i)}
                  class="ml-1 rounded-full bg-blue-200 p-0.5 text-blue-700 hover:bg-red-100 hover:text-red-500"
                >
                  <X size={14} />
                </button>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Right Column: Gallery -->
    <div class="space-y-6 lg:col-span-1">
      <div
        class="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg relative overflow-hidden"
      >
        <div
          class="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-t-blue to-t-pink"
        ></div>
        <div class="mb-4 flex items-center justify-between">
          <h3 class="flex items-center gap-2 text-lg font-bold text-gray-800">
            <ImageIcon class="text-t-blue" size={20} /> Galeri
          </h3>
          {#if isEditing}
            <button
              class="rounded-lg bg-gray-100 p-2 text-gray-600 transition hover:bg-t-blue hover:text-white"
            >
              <Plus size={18} />
            </button>
          {/if}
        </div>

        <div class="grid grid-cols-2 gap-3">
          {#each store.gallery as item}
            <!-- Mock Image -->
            <div
              class="aspect-square w-full overflow-hidden rounded-xl bg-gray-200 relative group"
            >
              <div
                class="flex h-full w-full items-center justify-center bg-gray-100 text-gray-300 font-bold text-xs"
              >
                IMG-{item}
              </div>
              {#if isEditing}
                <button
                  class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition shadow-sm"
                >
                  <X size={12} />
                </button>
              {/if}
            </div>
          {/each}
          {#if isEditing}
            <button
              class="aspect-square flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-gray-400 transition hover:border-t-blue hover:text-t-blue hover:bg-blue-50"
            >
              <Upload size={24} />
              <span class="mt-1 text-[10px] font-bold uppercase">Upload</span>
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
