<script lang="ts">
    import { 
        MapPin, Star, ShieldCheck, Heart, Share2, 
        MessageCircle, Calendar, Clock, ChevronRight, 
        CheckCircle2, Scissors 
    } from 'lucide-svelte';
  import { slide } from 'svelte/transition';

    // --- DUMMY DATA (Simulasi database berdasarkan ID) ---
    const tailor = {
        id: 1,
        name: 'Aldo Tailor',
        tagline: 'Spesialis Jas & Kemeja Formal Pria',
        location: 'Adiwerna, Tegal',
        address: 'Jl. Raya Selatan No. 45, Adiwerna, Tegal (Depan Indomaret)',
        rating: 4.9,
        reviews_count: 124,
        verified: true,
        joined: '2023',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        about: 'Saya adalah penjahit profesional dengan pengalaman lebih dari 10 tahun. Mengkhususkan diri pada pembuatan Jas Formal (Bespoke) dan Kemeja Slimfit. Saya menjamin ketepatan ukuran dan kerapian jahitan.',
        specialties: ['Jas Formal', 'Kemeja', 'Celana Bahan', 'Batik Tulis'],
        gallery: [
            // Foto Utama (Besar): Orang mengukur/fitting baju
            'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=800&q=80', 
            
            // Foto Samping 1: Detail tekstur jas/kain
            'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80',
            
            // Foto Samping 2: Mesin jahit/Alat jahit
            'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=400&q=80',
            
            // Foto Samping 3: Rak baju/Display (yang tadi sudah jalan)
            'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80',
            
            // Foto Samping 4: Detail jahitan (yang tadi sudah jalan)
            'https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=400&q=80',
        ],
        services: [
            { id: 1, name: 'Jahit Kemeja Pendek', price: 75000, duration: '3-4 Hari' },
            { id: 2, name: 'Jahit Kemeja Panjang', price: 85000, duration: '3-4 Hari' },
            { id: 3, name: 'Jahit Celana Formal', price: 90000, duration: '4-5 Hari' },
            { id: 4, name: 'Jahit Jas Full Set', price: 1500000, duration: '14 Hari' },
            { id: 5, name: 'Permak Kecil (Potong/Kecilin)', price: 15000, duration: '1 Hari' },
        ],
        reviews: [
            { user: 'Budi Santoso', rating: 5, date: '2 Hari yang lalu', comment: 'Jahitannya rapi banget, pas di badan. Mas Aldo juga enak diajak diskusi model.' },
            { user: 'Siti Aminah', rating: 5, date: '1 Minggu yang lalu', comment: 'Pengerjaan cepat, tepat waktu sesuai janji. Recommended!' },
        ]
    };

    // --- STATE ---
    let selectedService = $state<number | null>(null);

    // --- LOGIC ---
    function selectService(id: number) {
        selectedService = selectedService === id ? null : id;
    }

    // Hitung total estimasi (Simple logic)
    let totalPrice = $derived(
        selectedService 
            ? tailor.services.find(s => s.id === selectedService)?.price 
            : 0
    );
</script>

<div class="min-h-screen bg-[#FAFAFA] pb-20">
    
    <div class="bg-white border-b border-gray-100 sticky top-20 z-30">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            <div class="flex items-center gap-2 text-sm text-gray-500">
                <a href="/" class="hover:text-t-blue">Beranda</a>
                <ChevronRight size={14}/>
                <a href="/tailors" class="hover:text-t-blue">Cari Penjahit</a>
                <ChevronRight size={14}/>
                <span class="text-gray-900 font-bold truncate">{tailor.name}</span>
            </div>
            <div class="flex gap-2">
                <button class="flex items-center gap-2 px-3 py-1.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition">
                    <Share2 size={16}/> <span class="hidden sm:inline">Bagikan</span>
                </button>
                <button class="flex items-center gap-2 px-3 py-1.5 text-sm font-bold text-gray-600 hover:bg-pink-50 hover:text-pink-500 rounded-lg transition">
                    <Heart size={16}/> <span class="hidden sm:inline">Simpan</span>
                </button>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        <div class="mb-8">
            <h1 class="text-3xl md:text-4xl font-black text-gray-900 mb-2">{tailor.name}</h1>
            <div class="flex flex-wrap items-center gap-4 text-sm">
                <div class="flex items-center gap-1 font-bold text-gray-900">
                    <Star size={16} class="fill-t-yellow text-t-yellow"/> {tailor.rating} 
                    <span class="text-gray-500 font-normal">({tailor.reviews_count} ulasan)</span>
                </div>
                <span class="text-gray-300">•</span>
                <div class="flex items-center gap-1 text-gray-600">
                    <MapPin size={16}/> {tailor.location}
                </div>
                <span class="text-gray-300">•</span>
                {#if tailor.verified}
                    <div class="flex items-center gap-1 text-t-blue font-bold bg-blue-50 px-2 py-0.5 rounded">
                        <ShieldCheck size={14}/> Mitra Terverifikasi
                    </div>
                {/if}
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px] md:h-[480px] rounded-3xl overflow-hidden mb-12 relative group">
            <div class="md:col-span-2 md:row-span-2 relative h-full">
                <img src={tailor.gallery[0]} alt="Main" class="w-full h-full object-cover hover:scale-105 transition duration-700"/>
            </div>
            <div class="hidden md:block relative h-full">
                <img src={tailor.gallery[1]} alt="Gallery 1" class="w-full h-full object-cover hover:scale-105 transition duration-700"/>
            </div>
            <div class="hidden md:block relative h-full">
                <img src={tailor.gallery[2]} alt="Gallery 2" class="w-full h-full object-cover hover:scale-105 transition duration-700"/>
            </div>
            <div class="hidden md:block relative h-full">
                <img src={tailor.gallery[3]} alt="Gallery 3" class="w-full h-full object-cover hover:scale-105 transition duration-700"/>
            </div>
            <div class="hidden md:block relative h-full">
                <img src={tailor.gallery[4]} alt="Gallery 4" class="w-full h-full object-cover hover:scale-105 transition duration-700"/>
                <button class="absolute bottom-4 right-4 bg-white text-gray-900 px-4 py-2 rounded-lg text-xs font-bold shadow-lg hover:bg-gray-100 transition">
                    Lihat Semua Foto
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            <div class="lg:col-span-2 space-y-10">
                
                <div class="flex items-start gap-4 pb-8 border-b border-gray-100">
                    <img src={tailor.avatar} alt="Avatar" class="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"/>
                    <div>
                        <h3 class="font-bold text-lg text-gray-900">Dijahit oleh {tailor.name}</h3>
                        <p class="text-gray-500 text-sm mb-2">Bergabung sejak {tailor.joined}</p>
                        <p class="text-gray-600 leading-relaxed">{tailor.about}</p>
                    </div>
                </div>

                <div class="space-y-4">
                    <h3 class="font-bold text-lg text-gray-900">Keahlian Khusus</h3>
                    <div class="flex flex-wrap gap-3">
                        {#each tailor.specialties as tag}
                            <span class="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 flex items-center gap-2">
                                <Scissors size={14} class="text-t-pink"/> {tag}
                            </span>
                        {/each}
                    </div>
                </div>

                <div class="space-y-4">
                    <h3 class="font-bold text-lg text-gray-900">Daftar Layanan & Harga</h3>
                    <div class="bg-white rounded-3xl border border-gray-100 overflow-hidden">
                        {#each tailor.services as service}
                            <!-- svelte-ignore a11y_click_events_have_key_events -->
                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                            <div 
                                class="p-5 border-b border-gray-50 last:border-none hover:bg-gray-50 transition cursor-pointer flex justify-between items-center group"
                                onclick={() => selectService(service.id)}
                            >
                                <div class="flex items-center gap-4">
                                    <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors {selectedService === service.id ? 'border-t-blue bg-t-blue' : 'border-gray-300'}">
                                        {#if selectedService === service.id}
                                            <CheckCircle2 size={14} class="text-white"/>
                                        {/if}
                                    </div>
                                    <div>
                                        <p class="font-bold text-gray-800">{service.name}</p>
                                        <p class="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                            <Clock size={12}/> Estimasi {service.duration}
                                        </p>
                                    </div>
                                </div>
                                <p class="font-bold text-gray-900">
                                    Rp {service.price.toLocaleString('id-ID')}
                                </p>
                            </div>
                        {/each}
                    </div>
                </div>

                <div class="space-y-6 pt-6 border-t border-gray-100">
                    <div class="flex items-center gap-2">
                        <Star size={24} class="fill-t-yellow text-t-yellow"/>
                        <h3 class="font-bold text-2xl text-gray-900">{tailor.rating} <span class="text-lg text-gray-400 font-normal">({tailor.reviews_count} ulasan)</span></h3>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {#each tailor.reviews as review}
                            <div class="bg-white p-6 rounded-2xl border border-gray-100">
                                <div class="flex items-center gap-3 mb-4">
                                    <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                                        {review.user.charAt(0)}
                                    </div>
                                    <div>
                                        <p class="font-bold text-sm text-gray-900">{review.user}</p>
                                        <p class="text-xs text-gray-400">{review.date}</p>
                                    </div>
                                </div>
                                <p class="text-sm text-gray-600 leading-relaxed">"{review.comment}"</p>
                            </div>
                        {/each}
                    </div>
                    <button class="w-full py-3 border border-gray-300 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition text-sm">
                        Lihat semua {tailor.reviews_count} ulasan
                    </button>
                </div>

            </div>

            <div class="lg:col-span-1 relative">
                <div class="sticky top-28 space-y-6">
                    
                    <div class="bg-white p-6 rounded-3xl border border-gray-200 shadow-xl">
                        <div class="flex justify-between items-start mb-6 border-b border-gray-100 pb-6">
                            <div>
                                <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Mulai Dari</p>
                                <p class="text-2xl font-black text-gray-900">Rp 15rb</p>
                            </div>
                            <div class="text-right">
                                <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Rating</p>
                                <div class="flex items-center gap-1 font-bold text-sm">
                                    <Star size={14} class="fill-t-yellow text-t-yellow"/> {tailor.rating}
                                </div>
                            </div>
                        </div>

                        {#if selectedService}
                            <div transition:slide class="bg-blue-50 p-4 rounded-xl mb-6 border border-blue-100">
                                <div class="flex justify-between text-sm mb-2">
                                    <span class="text-gray-600">Layanan:</span>
                                    <span class="font-bold text-gray-900 text-right">{tailor.services.find(s=>s.id===selectedService)?.name}</span>
                                </div>
                                <div class="flex justify-between text-sm pt-2 border-t border-blue-200">
                                    <span class="font-bold text-t-blue">Total Estimasi</span>
                                    <span class="font-black text-t-blue">Rp {totalPrice?.toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        {:else}
                            <div class="bg-gray-50 p-4 rounded-xl mb-6 text-center border border-gray-100 border-dashed">
                                <p class="text-xs text-gray-500">Pilih layanan di sebelah kiri untuk melihat estimasi harga.</p>
                            </div>
                        {/if}

                        <div class="space-y-3">
                            <button class="w-full py-4 bg-gradient-to-r from-t-blue to-t-pink text-white rounded-xl font-bold hover:shadow-lg hover:scale-[1.02] transition active:scale-95 shadow-md">
                                Buat Pesanan
                            </button>
                            <button class="w-full py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:border-gray-900 hover:text-gray-900 transition flex items-center justify-center gap-2">
                                <MessageCircle size={18}/> Chat Penjahit
                            </button>
                        </div>

                        <div class="mt-4 text-center">
                            <p class="text-[10px] text-gray-400">Pembayaran aman lewat TailorIn. Jaminan uang kembali.</p>
                        </div>
                    </div>

                    <div class="bg-gray-100 h-48 rounded-3xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
                        <div class="absolute inset-0 bg-gray-300"></div> <MapPin class="relative z-10 text-red-500 drop-shadow-md" size={32} strokeWidth={2.5}/>
                        <div class="absolute bottom-4 bg-white px-4 py-2 rounded-full text-xs font-bold shadow-md group-hover:scale-105 transition">
                            Lihat di Peta
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</div>