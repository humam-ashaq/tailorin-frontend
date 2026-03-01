<script lang="ts">
  import {
    Search,
    MapPin,
    Star,
    ArrowRight,
    Scissors,
    Shirt,
    Sparkles,
    Ruler,
    Wand2,
  } from "lucide-svelte";

  /// Data Dummy Kategori (Tambahkan properti 'query')
  const categories = [
    {
      name: "Busana Wanita",
      query: "Wanita", // Keyword filter
      count: "120+ Penjahit",
      icon: "👗",
      color: "bg-pink-100 text-pink-600",
    },
    {
      name: "Pakaian Formal",
      query: "Jas", // Keyword filter (sesuaikan dengan tag yang ada di tailors page)
      count: "85+ Penjahit",
      icon: "👔",
      color: "bg-blue-100 text-blue-600",
    },
    {
      name: "Seragam Dinas",
      query: "Seragam",
      count: "50+ Penjahit",
      icon: "👮",
      color: "bg-orange-100 text-orange-600",
    },
    {
      name: "Busana Kasual",
      query: "Kemeja",
      count: "200+ Penjahit",
      icon: "👕",
      color: "bg-green-100 text-green-600",
    },
  ];

  // Data Dummy Penjahit
  const tailors = [
    {
      id: 1,
      name: "Aldo Tailor",
      location: "Adiwerna, Tegal",
      rating: 4.9,
      reviews: 120,
      image:
        "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3",
      tags: ["Jas", "Kemeja"],
    },
    {
      id: 2,
      name: "SS Tailor",
      location: "Tembok Lor, Tegal",
      rating: 5.0,
      reviews: 85,
      image:
        "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      tags: ["Wanita", "Kebaya"],
    },
    {
      id: 3,
      name: "Swift Tailor",
      location: "Pangkah, Tegal",
      rating: 4.7,
      reviews: 45,
      image:
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      tags: ["Permak", "Kilat"],
    },
    {
      id: 4,
      name: "Mustofa Modiste",
      location: "Tarub, Tegal",
      rating: 4.8,
      reviews: 210,
      image:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      tags: ["Seragam", "Batik"],
    },
  ];

  function scrollToAI() {
    const section = document.getElementById("ai-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }
</script>

<section class="relative pt-8 pb-20 lg:pt-16 lg:pb-32 overflow-hidden">
  <div
    class="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-gradient-to-br from-t-blue/20 to-t-pink/20 rounded-full blur-3xl opacity-50"
  ></div>
  <div
    class="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-t-yellow/10 rounded-full blur-3xl opacity-50"
  ></div>

  <div
    class="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
  >
    <div class="space-y-6 animate-in slide-in-from-bottom-10 duration-700">
      <div
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm text-sm font-medium text-t-blue w-fit"
      >
        <Sparkles size={16} /> Platform Jahit Modern
      </div>

      <h1
        class="text-5xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight"
      >
        Wujudkan <span
          class="text-transparent bg-clip-text bg-gradient-to-r from-t-blue to-t-pink"
          >Gaya Impian</span
        > Tanpa Batas.
      </h1>

      <p class="text-lg text-gray-500 max-w-lg leading-relaxed">
        Temukan penjahit profesional terdekat, konsultasi desain, dan pantau
        pesananmu secara real-time dalam satu aplikasi.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 pt-2">
        <a
          href="/tailors"
          class="px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-gray-800 transition shadow-xl hover:shadow-2xl hover:-translate-y-1 transform flex items-center justify-center gap-2"
        >
          Cari Penjahit <ArrowRight size={20} />
        </a>
        
        <button
          onclick={scrollToAI}
          class="px-8 py-4 bg-white text-gray-800 border border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 transition shadow-sm flex items-center justify-center gap-2"
        >
          <Ruler size={20} class="text-t-pink" /> Cek Ukuran AI
        </button>
      </div>

      <div
        class="pt-6 flex items-center gap-8 border-t border-gray-100 mt-8 w-fit"
      >
        <div class="pt-4">
          <p class="text-3xl font-black text-gray-900">200+</p>
          <p class="text-sm text-gray-500">Penjahit Pro</p>
        </div>
        <div class="w-px h-12 bg-gray-200 mt-4"></div>
        <div class="pt-4">
          <p class="text-3xl font-black text-gray-900">2k+</p>
          <p class="text-sm text-gray-500">Pelanggan Puas</p>
        </div>
      </div>
    </div>

    <div
      class="relative hidden lg:block animate-in fade-in zoom-in-95 duration-1000 delay-200"
    >
      <div
        class="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white rotate-2 hover:rotate-0 transition duration-500 h-[600px]"
      >
        <img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
          alt="Fashion Model"
          class="w-full h-full object-cover object-top"
        />
      </div>

      <div
        class="absolute -z-10 top-6 -right-6 w-full h-full border-2 border-dashed border-t-blue/30 rounded-[3rem]"
      ></div>
    </div>
  </div>
</section>

<section class="py-20 bg-gray-50/50">
  <div class="max-w-7xl mx-auto px-6">
    <div class="flex justify-between items-end mb-12">
      <div>
        <h2 class="text-3xl font-bold text-gray-900">Kategori Populer</h2>
        <p class="text-gray-500 mt-2">
          Cari spesialisasi jahit sesuai kebutuhanmu.
        </p>
      </div>
      <a
        href="/category"
        class="text-t-blue font-bold text-sm hover:underline flex items-center gap-1"
      >
        Lihat Semua <ArrowRight size={16} />
      </a>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each categories as cat}
        <a
          href="/tailors?category={cat.query}"
          class="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-t-blue transition-all cursor-pointer hover:-translate-y-1 block"
        >
          <div
            class="w-14 h-14 {cat.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition"
          >
            {cat.icon}
          </div>
          <h3 class="font-bold text-xl text-gray-800 mb-1">{cat.name}</h3>
          <p class="text-sm text-gray-400">{cat.count}</p>
        </a>
      {/each}
    </div>
  </div>
</section>

<section class="py-20">
    <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
            <span class="text-t-pink font-bold text-sm tracking-widest uppercase">Mitra Pilihan</span>
            <h2 class="text-4xl font-black text-gray-900 mt-2">Penjahit Terlaris Minggu Ini</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {#each tailors as tailor}
                <a 
                    href="/tailors/{tailor.id}"
                    class="block bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition group relative cursor-pointer hover:-translate-y-1"
                >
                    <div class="relative h-64 overflow-hidden">
                        <img src={tailor.image} alt={tailor.name} class="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                        <div class="absolute top-4 right-4 bg-white/95 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
                            <Star size={12} class="text-t-yellow fill-t-yellow" /> {tailor.rating}
                        </div>
                    </div>
                    
                    <div class="p-6">
                        <h3 class="font-bold text-lg text-gray-800 mb-1">{tailor.name}</h3>
                        <div class="flex items-center gap-1 text-gray-400 text-sm mb-4">
                            <MapPin size={14} /> {tailor.location}
                        </div>
                        
                        <div class="flex flex-wrap gap-2 mb-6">
                            {#each tailor.tags as tag}
                                <span class="px-2 py-1 bg-gray-50 text-gray-600 text-[10px] uppercase font-bold rounded-md border border-gray-100">{tag}</span>
                            {/each}
                        </div>

                        <span class="block w-full text-center py-3 rounded-xl border-2 border-gray-100 text-gray-800 font-bold text-sm group-hover:border-gray-900 group-hover:bg-gray-900 group-hover:text-white transition">
                            Lihat Profil
                        </span>
                    </div>
                </a>
            {/each}
        </div>
        
        <div class="text-center mt-12">
            <a 
                href="/tailors"
                class="inline-block px-8 py-3 bg-white border border-gray-300 rounded-full font-bold text-gray-600 hover:bg-gray-50 transition shadow-sm"
            >
                Muat Lebih Banyak
            </a>
        </div>
    </div>
</section>

<section id="ai-section" class="py-20 px-6">
  <div
    class="max-w-7xl mx-auto rounded-[3rem] bg-gray-900 relative overflow-hidden text-white shadow-2xl"
  >
    <div
      class="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-t-blue to-t-pink opacity-30 rounded-full blur-[100px] -mr-20 -mt-20"
    ></div>

    <div
      class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-12 lg:p-24 relative z-10"
    >
      <div class="space-y-6">
        <div
          class="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-xs font-bold uppercase tracking-wider text-t-yellow"
        >
          Teknologi Terbaru
        </div>
        <h2 class="text-4xl lg:text-5xl font-black leading-tight">
          Bingung Butuh Kain Berapa Meter? <br />
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-t-blue to-t-pink"
            >Tanya AI Saja!</span
          >
        </h2>
        <p class="text-gray-300 text-lg leading-relaxed">
          Fitur cerdas kami akan menghitung estimasi kebutuhan kain berdasarkan
          ukuran badan dan model pakaianmu. Akurat dan cepat.
        </p>
        <div class="pt-4">
          <a
            href="/fabric-ai"
            class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-t-blue to-t-pink text-t-white rounded-2xl font-bold hover:brightness-110 transition shadow-lg hover:shadow-t-pink/50"
          >
            <Wand2 size={20} /> Coba Sekarang Gratis
          </a>
        </div>
      </div>

      <div class="relative hidden lg:block">
        <div
          class="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-3xl rotate-3 hover:rotate-0 transition duration-500"
        >
          <div class="bg-gray-800 rounded-2xl p-6 space-y-4">
            <div
              class="flex justify-between text-gray-400 text-xs uppercase font-bold"
            >
              <span>Input</span>
              <span>Model: Gamis</span>
            </div>
            <div class="h-2 bg-gray-700 rounded-full w-3/4 animate-pulse"></div>
            <div
              class="h-2 bg-gray-700 rounded-full w-1/2 animate-pulse delay-75"
            ></div>

            <div class="mt-6 pt-6 border-t border-gray-700">
              <p class="text-t-yellow text-xs font-bold uppercase mb-1">
                Hasil AI
              </p>
              <p class="text-3xl font-bold text-white">3.5 Meter</p>
              <p class="text-xs text-gray-400 mt-1">Lebar kain 150cm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
