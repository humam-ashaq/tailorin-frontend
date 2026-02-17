<script lang="ts">
  import logoTailorin from "$lib/assets/tailorin-logo.svg";
  import logoTailorinWhite from "$lib/assets/tailorin-logo-white.svg"; // Import Logo Putih
  import {
    Search,
    ShoppingBag,
    Instagram,
    Facebook,
    Twitter,
    MapPin,
    Star,
  } from "lucide-svelte";
  import { globalStore, type Tailor } from "$lib/store.svelte";
  import { goto } from "$app/navigation";

  let { children } = $props();

  // --- Customer Search State ---
  let searchQuery = $state("");
  let isSearchFocused = $state(false);

  let searchResults = $derived.by(() => {
    if (!searchQuery.trim()) return null;

    const q = searchQuery.toLowerCase();

    // Filter Tailors by Name or Specialties
    const matchingTailors = globalStore.tailors.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.specialties.some((s) => s.toLowerCase().includes(q)),
    );

    if (matchingTailors.length === 0) return null;

    return matchingTailors;
  });

  function handleResultClick(id: string) {
    searchQuery = "";
    isSearchFocused = false;
    goto(`/tailors/${id}`);
  }

  function closeSearch() {
    isSearchFocused = false;
  }
</script>

<svelte:window onclick={closeSearch} />

<div class="min-h-screen bg-white font-sans text-gray-800">
  <nav
    class="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <div class="flex-shrink-0 flex items-center gap-2 cursor-pointer">
          <img src={logoTailorin} alt="TailorIn" class="h-10 w-auto" />
        </div>

        <div class="hidden md:flex items-center space-x-8">
          <a
            href="/"
            class="text-gray-500 hover:text-t-blue font-medium transition"
            >Beranda</a
          >
          <a
            href="/tailors"
            class="text-gray-500 hover:text-t-blue font-medium transition"
            >Cari Penjahit</a
          >
          <a
            href="/fabric-ai"
            class="text-gray-500 hover:text-t-pink font-medium transition flex items-center gap-1"
          >
            AI Rekomendasi Ukuran Kain
          </a>
        </div>

        <div class="flex items-center gap-4">
          <div class="relative hidden sm:block">
            <Search
              class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
              size={18}
            />
            <input
              type="text"
              bind:value={searchQuery}
              onfocus={() => (isSearchFocused = true)}
              onclick={(e) => e.stopPropagation()}
              placeholder="Cari penjahit atau kategori..."
              class="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-full text-sm focus:ring-2 focus:ring-t-blue/30 transition w-48 lg:w-64 relative z-0"
            />

            <!-- Search Suggestions Dropdown -->
            {#if isSearchFocused && searchQuery.trim()}
              <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
              <div
                class="absolute top-full left-0 w-80 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50"
                onclick={(e) => e.stopPropagation()}
              >
                {#if searchResults && searchResults.length > 0}
                  <div class="max-h-[300px] overflow-y-auto">
                    <div
                      class="px-4 py-2 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider sticky top-0"
                    >
                      Penjahit Ditemukan
                    </div>
                    {#each searchResults as tailor}
                      <button
                        onclick={() => handleResultClick(tailor.id)}
                        class="w-full text-left px-4 py-3 hover:bg-blue-50 transition border-b border-gray-50 last:border-0 group"
                      >
                        <div class="flex justify-between items-start">
                          <div>
                            <h4
                              class="text-sm font-bold text-gray-800 group-hover:text-t-blue"
                            >
                              {tailor.name}
                            </h4>
                            <div
                              class="flex items-center gap-1 text-[10px] text-gray-500 mt-0.5"
                            >
                              <MapPin size={10} />
                              {tailor.location}
                            </div>
                            <div class="flex flex-wrap gap-1 mt-2">
                              {#each tailor.specialties as spec}
                                <span
                                  class="text-[10px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-600"
                                  >{spec}</span
                                >
                              {/each}
                            </div>
                          </div>
                          <div
                            class="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded text-t-dark"
                          >
                            <Star size={10} fill="currentColor" />
                            <span class="text-[10px] font-bold"
                              >{tailor.rating}</span
                            >
                          </div>
                        </div>
                      </button>
                    {/each}
                  </div>
                {:else}
                  <div class="p-6 text-center text-gray-400">
                    <p class="text-sm">
                      Tidak ditemukan penjahit dengan kata kunci "{searchQuery}"
                    </p>
                  </div>
                {/if}
              </div>
            {/if}
          </div>
          <a
            href="/orders"
            class="p-2 text-gray-500 hover:text-t-blue transition relative"
          >
            <ShoppingBag size={22} />
            <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
            ></span>
          </a>
          <a
            href="/login"
            class="px-5 py-2 rounded-full bg-gradient-to-r from-t-blue to-t-pink text-white font-bold text-sm hover:bg-gray-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Masuk
          </a>
        </div>
      </div>
    </div>
  </nav>

  <main class="pt-20">
    {@render children()}
  </main>

  <footer class="bg-gray-900 text-white pt-16 pb-8">
    <div
      class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-800 pb-12"
    >
      <div class="col-span-1 md:col-span-1">
        <img
          src={logoTailorinWhite}
          alt="TailorIn White Logo"
          class="h-10 w-auto mb-6 block"
        />
        <p class="text-gray-400 text-sm leading-relaxed">
          Platform penghubung penjahit profesional dengan pelanggan yang
          membutuhkan pakaian impian.
        </p>
      </div>

      <div>
        <h4 class="font-bold mb-4 text-lg">Perusahaan</h4>
        <ul class="space-y-2 text-sm text-gray-400">
          <!-- svelte-ignore a11y_invalid_attribute -->
          <li>
            <a href="#" class="hover:text-white transition">Tentang Kami</a>
          </li>
          <!-- svelte-ignore a11y_invalid_attribute -->
          <li><a href="#" class="hover:text-white transition">Karir</a></li>
          <!-- svelte-ignore a11y_invalid_attribute -->
          <li><a href="#" class="hover:text-white transition">Blog</a></li>
        </ul>
      </div>

      <div>
        <h4 class="font-bold mb-4 text-lg">Layanan</h4>
        <ul class="space-y-2 text-sm text-gray-400">
          <li>
            <a href="/tailors" class="hover:text-white transition"
              >Cari Penjahit</a
            >
          </li>
          <li>
            <a href="/fabric-ai" class="hover:text-white transition"
              >AI Rekomendasi Ukuran Kain</a
            >
          </li>
          <li>
            <a href="/register?role=tailor" class="hover:text-white transition"
              >Daftar sebagai Mitra</a
            >
          </li>
        </ul>
      </div>

      <div>
        <h4 class="font-bold mb-4 text-lg">Ikuti Kami</h4>
        <div class="flex gap-4">
          <!-- svelte-ignore a11y_invalid_attribute -->
          <a
            href="https://www.instagram.com/ashqhumam_/"
            class="p-2 bg-gray-800 rounded-full hover:bg-t-blue transition"
            ><Instagram size={18} /></a
          >
          <!-- svelte-ignore a11y_invalid_attribute -->
          <a
            href="#"
            class="p-2 bg-gray-800 rounded-full hover:bg-t-blue transition"
            ><Facebook size={18} /></a
          >
          <!-- svelte-ignore a11y_invalid_attribute -->
          <a
            href="#"
            class="p-2 bg-gray-800 rounded-full hover:bg-t-blue transition"
            ><Twitter size={18} /></a
          >
        </div>
      </div>
    </div>

    <div class="text-center pt-8 text-xs text-gray-500">
      &copy; 2026 TailorIn Indonesia. All rights reserved.
    </div>
  </footer>
</div>
