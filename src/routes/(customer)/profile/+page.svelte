<script lang="ts">
  import {
    User,
    Phone,
    Mail,
    Edit2,
    LogOut,
    Ruler,
    Plus,
    Trash2,
    ChevronRight,
    FileText,
    Users,
    UserCircle2,
  } from "lucide-svelte";

  // --- DUMMY DATA ---
  let user = $state({
    name: "Humam Ashaq",
    email: "humam@example.com",
    phone: "081234567890",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80",
    joined: "September 2025",
  });

  let isEditing = $state(false);

  let measurements = $state([
    {
      id: 1,
      name: "Saya Sendiri",
      relation: "Pemilik Akun",
      stats: { ld: 100, pj: 70, pl: 60, lb: 45 },
      lastUpdate: "Jan 2026",
    },
    {
      id: 2,
      name: "Istri",
      relation: "Keluarga",
      stats: { ld: 95, pj: 135, pl: 55, lb: 40 },
      lastUpdate: "Des 2025",
    },
  ]);

  // --- ACTIONS ---
  function handleSave() {
    isEditing = false;
    alert("Profil berhasil diperbarui!");
  }

  function handleLogout() {
    if (confirm("Yakin ingin keluar?")) {
      window.location.href = "/login";
    }
  }
</script>

<div class="min-h-screen bg-[#FAFAFA] pb-20">
  <div class="h-48 bg-gray-900 relative overflow-hidden">
    <div
      class="absolute inset-0 bg-gradient-to-r from-t-blue/20 to-t-pink/20 opacity-50"
    ></div>
  </div>

  <div class="max-w-4xl mx-auto px-4 sm:px-6 -mt-20 relative z-10">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-1">
        <div
          class="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 text-center relative overflow-hidden"
        >
          <div
            class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-t-blue to-t-pink"
          ></div>

          <div class="relative inline-block mb-4">
            <img
              src={user.avatar}
              alt={user.name}
              class="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md mx-auto"
            />
            <button
              class="absolute bottom-0 right-0 p-2 bg-gray-900 text-white rounded-full hover:bg-t-blue transition border-2 border-white"
            >
              <Edit2 size={14} />
            </button>
          </div>

          <h2 class="text-xl font-bold text-gray-900">{user.name}</h2>
          <p class="text-sm text-gray-500 mb-6">Member sejak {user.joined}</p>

          <div class="space-y-3">
            <div
              class="flex items-center justify-between p-3 bg-gray-50 rounded-xl text-sm"
            >
              <span class="text-gray-500">Total Pesanan</span>
              <span class="font-bold text-gray-900">12</span>
            </div>
            <div
              class="flex items-center justify-between p-3 bg-gray-50 rounded-xl text-sm"
            >
              <span class="text-gray-500">Voucher</span>
              <span class="font-bold text-gray-900">3</span>
            </div>
          </div>

          <button
            onclick={handleLogout}
            class="w-full mt-6 py-3 border border-red-100 text-red-500 rounded-xl font-bold text-sm hover:bg-red-50 transition flex items-center justify-center gap-2"
          >
            <LogOut size={16} /> Keluar
          </button>
        </div>
      </div>

      <div class="lg:col-span-2 space-y-8">
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div class="flex justify-between items-center mb-6">
            <h3 class="font-bold text-gray-900 text-lg flex items-center gap-2">
              <User size={20} class="text-t-blue" /> Biodata Diri
            </h3>
            {#if !isEditing}
              <button
                onclick={() => (isEditing = true)}
                class="text-sm font-bold text-t-blue hover:underline"
                >Ubah</button
              >
            {:else}
              <div class="flex gap-3">
                <button
                  onclick={() => (isEditing = false)}
                  class="text-sm font-bold text-gray-400 hover:text-gray-600"
                  >Batal</button
                >
                <button
                  onclick={handleSave}
                  class="text-sm font-bold text-green-600 hover:text-green-700"
                  >Simpan</button
                >
              </div>
            {/if}
          </div>

          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-1">
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <label class="text-[10px] font-bold text-gray-400 uppercase"
                  >Nama Lengkap</label
                >
                <div class="relative">
                  <input
                    type="text"
                    bind:value={user.name}
                    disabled={!isEditing}
                    class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl text-sm font-bold focus:bg-white focus:border-t-blue outline-none transition disabled:bg-gray-50/50 disabled:text-gray-600"
                  />
                  <User
                    size={16}
                    class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>
              <div class="space-y-1">
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <label class="text-[10px] font-bold text-gray-400 uppercase"
                  >Email</label
                >
                <div class="relative">
                  <input
                    type="email"
                    bind:value={user.email}
                    disabled={!isEditing}
                    class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl text-sm font-bold focus:bg-white focus:border-t-blue outline-none transition disabled:bg-gray-50/50 disabled:text-gray-600"
                  />
                  <Mail
                    size={16}
                    class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>
              <div class="space-y-1">
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <label class="text-[10px] font-bold text-gray-400 uppercase"
                  >Nomor HP</label
                >
                <div class="relative">
                  <input
                    type="tel"
                    bind:value={user.phone}
                    disabled={!isEditing}
                    class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl text-sm font-bold focus:bg-white focus:border-t-blue outline-none transition disabled:bg-gray-50/50 disabled:text-gray-600"
                  />
                  <Phone
                    size={16}
                    class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Data Ukuran Section -->
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div class="flex justify-between items-center mb-6">
            <h3 class="font-bold text-gray-900 text-lg flex items-center gap-2">
              <Ruler size={20} class="text-t-pink" /> Data Ukuran Badan
            </h3>
            <button
              class="flex items-center gap-1 text-sm font-bold text-gray-900 hover:text-t-pink transition"
            >
              <Plus size={16} /> Tambah
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {#each measurements as person}
              <div
                class="p-5 rounded-2xl border border-gray-100 hover:border-t-blue hover:shadow-md transition-all group relative cursor-pointer bg-white"
              >
                <div class="flex justify-between items-start mb-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-12 h-12 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center border-2 border-white shadow-sm"
                    >
                      <UserCircle2 size={24} />
                    </div>
                    <div>
                      <h4 class="font-bold text-gray-900 text-base">
                        {person.name}
                      </h4>
                      <div class="flex items-center gap-2 mt-0.5">
                        <span
                          class="text-[10px] uppercase font-bold text-t-blue bg-blue-50 px-2 py-0.5 rounded"
                          >{person.relation}</span
                        >
                        <span class="text-[10px] text-gray-400"
                          >Update: {person.lastUpdate}</span
                        >
                      </div>
                    </div>
                  </div>
                  <button
                    class="text-gray-300 hover:text-red-500 transition p-1 opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div
                  class="bg-gray-50 rounded-xl p-3 grid grid-cols-4 gap-2 text-center"
                >
                  <div>
                    <p
                      class="text-[10px] text-gray-400 font-bold uppercase"
                      title="Lingkar Dada"
                    >
                      LD
                    </p>
                    <p class="font-bold text-gray-900">{person.stats.ld}</p>
                  </div>
                  <div>
                    <p
                      class="text-[10px] text-gray-400 font-bold uppercase"
                      title="Panjang Baju/Badan"
                    >
                      PJ
                    </p>
                    <p class="font-bold text-gray-900">{person.stats.pj}</p>
                  </div>
                  <div>
                    <p
                      class="text-[10px] text-gray-400 font-bold uppercase"
                      title="Panjang Lengan"
                    >
                      PL
                    </p>
                    <p class="font-bold text-gray-900">{person.stats.pl}</p>
                  </div>
                  <div>
                    <p
                      class="text-[10px] text-gray-400 font-bold uppercase"
                      title="Lebar Bahu"
                    >
                      LB
                    </p>
                    <p class="font-bold text-gray-900">{person.stats.lb}</p>
                  </div>
                </div>

                <div
                  class="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-white border border-gray-100 shadow-sm rounded-full p-1 opacity-0 group-hover:opacity-100 group-hover:-right-4 transition-all duration-300 z-10"
                >
                  <ChevronRight size={14} class="text-gray-400" />
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
