<script lang="ts">
  import {
    Search,
    Plus,
    User,
    Phone,
    Calendar,
    ChevronRight,
    Clock,
    MoreVertical,
  } from "lucide-svelte";

  // Data Dummy (Stats disembunyikan dari view kartu)
  let customers = [
    {
      id: "CUST-01",
      name: "Andi Saputra",
      phone: "0812-3456-7890",
      gender: "Pria",
      lastUpdate: "5 Jan 2026",
    },
    {
      id: "CUST-02",
      name: "Anisa Rahma",
      phone: "0856-7890-1234",
      gender: "Wanita",
      lastUpdate: "20 Des 2025",
    },
    {
      id: "CUST-03",
      name: "Budi Santoso",
      phone: "0813-4567-8901",
      gender: "Pria",
      lastUpdate: "10 Jan 2026",
    },
    {
      id: "CUST-04",
      name: "Citra Kirana",
      phone: "0877-1234-5678",
      gender: "Wanita",
      lastUpdate: "1 Jan 2026",
    },
    {
      id: "CUST-05",
      name: "Dewi Persik",
      phone: "0811-2233-4455",
      gender: "Wanita",
      lastUpdate: "12 Jan 2026",
    },
    {
      id: "CUST-06",
      name: "Doni Salmanan",
      phone: "0812-9988-7766",
      gender: "Pria",
      lastUpdate: "30 Nov 2025",
    },
    {
      id: "CUST-07",
      name: "Eko Patrio",
      phone: "0857-1122-3344",
      gender: "Pria",
      lastUpdate: "8 Jan 2026",
    },
  ];

  let searchQuery = $state("");

  // Logic Grouping A-Z
  let groupedCustomers = $derived.by(() => {
    const filtered = customers.filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery)
    );

    const groups: Record<string, typeof customers> = {};
    filtered.forEach((customer) => {
      const firstLetter = customer.name[0].toUpperCase();
      if (!groups[firstLetter]) groups[firstLetter] = [];
      groups[firstLetter].push(customer);
    });

    return Object.keys(groups)
      .sort()
      .map((letter) => ({
        letter,
        data: groups[letter],
      }));
  });
</script>

<div class="space-y-6 pb-20">
  <div
    class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-t-blue to-t-pink p-8 text-white shadow-xl mb-8"
  >
    <div class="relative z-10">
      <div class="flex flex-col md:flex-row justify-between gap-4 items-center">
        <div>
          <h2 class="text-3xl font-bold text-white">Buku Ukuran</h2>
          <p class="text-t-gray text-sm mt-1">
            Database lengkap ukuran badan pelanggan.
          </p>
        </div>
        <button
          class="flex items-center gap-2 px-4 py-2 bg-t-yellow text-t-dark rounded-xl hover:bg-yellow-400 transition shadow-md text-sm font-medium"
        >
          <Plus size={18} strokeWidth={2} /> Tambah Data Baru
        </button>
      </div>
    </div>
    <div
      class="absolute -right-10 -top-20 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"
    ></div>
    <div
      class="absolute right-20 bottom-[-40px] w-40 h-40 bg-t-yellow opacity-20 rounded-full blur-2xl"
    ></div>
  </div>

  <div class="sticky top-20 z-30 bg-t-gray py-2">
    <div class="relative bg-white rounded-2xl shadow-sm border border-gray-100">
      <Search
        class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        size={20}
      />
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Cari nama pelanggan..."
        class="w-full pl-12 pr-4 py-3 bg-transparent border-none rounded-xl text-gray-700 focus:ring-2 focus:ring-t-blue/30 transition"
      />
    </div>
  </div>

  <div class="space-y-6">
    {#each groupedCustomers as group}
      <div class="relative">
        <div
          class="sticky top-40 z-20 bg-t-gray/95 backdrop-blur-sm py-2 flex items-center gap-4"
        >
          <span class="text-2xl font-black text-t-blue drop-shadow-sm"
            >{group.letter}</span
          >
          <div
            class="h-0.5 flex-1 bg-gradient-to-r from-t-blue/20 to-transparent rounded-full"
          ></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each group.data as customer}
            <div
              class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-t-blue/30 transition group cursor-pointer relative overflow-hidden"
            >
              <div
                class="absolute -right-4 -top-4 w-12 h-12 bg-gray-50 rounded-full group-hover:bg-yellow-50 transition"
              ></div>

              <div class="flex items-center gap-4 relative z-10">
                <div class="flex-1 min-w-0">
                  <h3
                    class="font-bold text-gray-800 text-lg truncate group-hover:text-yellow-400 transition"
                  >
                    {customer.name}
                  </h3>
                  <div
                    class="flex items-center gap-1.5 text-gray-500 text-sm mt-0.5"
                  >
                    <Phone size={14} />
                    <span class="font-mono">{customer.phone}</span>
                  </div>
                </div>

                <button class="text-gray-300 hover:text-gray-600">
                  <MoreVertical size={20} />
                </button>
              </div>

              <div class="h-px w-full bg-gray-50 my-4"></div>

              <div class="flex justify-between items-center relative z-10">
                <div
                  class="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md"
                >
                  <Clock size={12} />
                  <span>Update: {customer.lastUpdate}</span>
                </div>

                <span
                  class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 group-hover:bg-t-yellow group-hover:text-white transition"
                >
                  <ChevronRight size={16} />
                </span>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}

    {#if groupedCustomers.length === 0}
      <div class="text-center py-20 text-gray-400">
        <p class="font-medium">Data tidak ditemukan.</p>
      </div>
    {/if}
  </div>
</div>
