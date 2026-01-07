<script lang="ts">
	import { 
		ArrowLeft, Calendar, User, Phone, MapPin, 
		Scissors, Ruler, FileText, Edit, Clock, 
		CheckCircle, AlertCircle, Save, X 
	} from 'lucide-svelte';

	// Data Dummy Detail Pesanan
	let order = $state({
		id: 'ORD-001',
		status: 'Dipotong',
		createdDate: '5 Januari 2026',
		deadline: '12 Januari 2026',
		
		// Detail Pakaian
		clothingType: 'Kemeja Batik',
		model: 'Slim Fit - Lengan Panjang',
		fabric: 'Katun Primisima (Bawa Sendiri)',
		price: '150.000',
		notes: 'Saku bobok di kiri atas. Kerah model Shanghai. Motif parang harus nyambung di kancing depan.',
		
		// Identitas Pemesan
		customer: {
			id: 'CUST-01',
			name: 'Budi Santoso',
			phone: '0812-3456-7890',
			address: 'Jl. Merdeka No. 45, Purwokerto'
		}
	});

	// State untuk Mode Edit
	let isEditing = $state(false);
	// State sementara untuk menampung perubahan sebelum disimpan
	// svelte-ignore state_referenced_locally
		let editForm = $state({ ...order });

	// Helper Warna Status
	const getStatusColor = (s: string) => {
		if (s === 'Baru') return 'bg-blue-100 text-blue-700 border-blue-200';
		if (s === 'Menunggu Kain') return 'bg-orange-100 text-orange-700 border-orange-200';
		if (s === 'Dipotong') return 'bg-purple-100 text-purple-700 border-purple-200';
		if (s === 'Dijahit') return 'bg-indigo-100 text-indigo-700 border-indigo-200';
		if (s === 'Selesai') return 'bg-green-100 text-green-700 border-green-200';
		return 'bg-gray-100 text-gray-700';
	};

	// Helper Icon Status
	const getStatusIcon = (s: string) => {
		if (s === 'Selesai') return CheckCircle;
		if (s === 'Menunggu Kain') return AlertCircle;
		return Clock;
	}

	// Fungsi Toggle Edit
	function startEdit() {
		// Salin data asli ke form sementara
		editForm = JSON.parse(JSON.stringify(order));
		isEditing = true;
	}

	function cancelEdit() {
		isEditing = false;
	}

	function saveChanges() {
		// Simpan perubahan dari form sementara ke data asli
		order = { ...editForm };
		isEditing = false;
		// Di sini nanti bisa tambahkan logika simpan ke database API
		// alert('Perubahan disimpan!');
	}
</script>

<div class="space-y-6 pb-20">
	
	<div class="flex items-center justify-between sticky top-20 z-40 bg-t-gray/90 backdrop-blur-sm py-2">
		<div class="flex items-center gap-4">
			<a href="/admin/orders" class="p-2 rounded-xl bg-gradient-to-r from-t-blue to-t-pink border border-gray-200 text-white hover:bg-gray-50 transition shadow-sm">
				<ArrowLeft size={20} />
			</a>
			<div>
				<div class="flex items-center gap-3">
					<h2 class="text-3xl font-bold text-gray-800">Pesanan {order.id}</h2>
					<span class="px-3 py-1 rounded-full text-sm font-bold border flex items-center gap-1.5 {getStatusColor(order.status)}">
						<!-- svelte-ignore svelte_component_deprecated -->
						<svelte:component this={getStatusIcon(order.status)} size={14} />
						{order.status}
					</span>
				</div>
				<p class="text-gray-500 text-sm mt-1">Detail spesifikasi dan status pengerjaan.</p>
			</div>
		</div>

		<div class="flex gap-2">
			{#if isEditing}
				<button 
					onclick={cancelEdit}
					class="flex items-center gap-2 px-4 py-3 bg-white border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition shadow-sm font-medium"
				>
					<X size={18} /> Batal
				</button>
				<button 
					onclick={saveChanges}
					class="flex items-center gap-2 px-6 py-3 bg-t-yellow text-t-dark border border-transparent rounded-xl hover:bg-yellow-400 transition shadow-sm font-medium animate-in zoom-in duration-200"
				>
					<Save size={18} /> Simpan
				</button>
			{:else}
				<button 
					onclick={startEdit}
					class="flex items-center gap-2 px-6 py-3 bg-t-yellow border border-gray-200 text-t-dark rounded-xl hover:bg-yellow-400 transition shadow-sm font-medium"
				>
					<Edit size={18} /> Edit Pesanan
				</button>
			{/if}
		</div>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
		
		<div class="space-y-6">
			
			<div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
				<div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
					<div class="p-2 bg-blue-50 text-t-blue rounded-lg">
						<User size={20} />
					</div>
					<h3 class="font-bold text-gray-800 text-lg">Identitas Pemesan</h3>
				</div>

				<div class="space-y-4">
					<div>
						<p class="text-xs font-bold text-gray-400 uppercase mb-1">Nama Pelanggan</p>
						<p class="font-bold text-gray-800 text-lg">{order.customer.name}</p>
						<a href="/admin/measurements/{order.customer.id}" class="text-xs text-t-blue hover:underline font-mono">
							ID: {order.customer.id}
						</a>
					</div>
					
					<div class="flex gap-3 items-start">
						<Phone size={16} class="text-gray-400 mt-1" />
						<div>
							<p class="text-xs font-bold text-gray-400 uppercase mb-0.5">Kontak</p>
							<p class="text-gray-700 font-medium">{order.customer.phone}</p>
						</div>
					</div>

					<div class="flex gap-3 items-start">
						<MapPin size={16} class="text-gray-400 mt-1" />
						<div>
							<p class="text-xs font-bold text-gray-400 uppercase mb-0.5">Alamat</p>
							<p class="text-gray-700 text-sm leading-relaxed">{order.customer.address}</p>
						</div>
					</div>
				</div>
			</div>

			<div class="bg-gradient-to-r from-t-blue to-t-pink rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
				<div class="relative z-10">
					<div class="flex items-center gap-3 mb-2">
						<Ruler size={24} class="text-white"/>
						<h3 class="font-bold text-lg">Data Ukuran</h3>
					</div>
					<p class="text-blue-100 text-sm mb-6">Lihat detail ukuran badan pelanggan ini untuk proses pemotongan pola.</p>
					
					<a 
						href="/admin/measurements/{order.customer.id}?ref=/admin/orders/{order.id}" 
						class="flex items-center justify-center gap-2 w-full py-3 bg-white text-t-dark rounded-xl font-bold hover:bg-yellow-50 transition shadow-sm"
					>
						Buka Detail Ukuran <Scissors size={16} />
					</a>
				</div>
				
				<div class="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition duration-500"></div>
			</div>
		</div>

		<div class="lg:col-span-2 space-y-6">
			
			<div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6">
				<div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
					<p class="text-xs text-gray-400 font-bold uppercase mb-2 flex items-center gap-1">
						<Clock size={12}/> Dibuat Tanggal
					</p>
					<p class="font-bold text-gray-700">{order.createdDate}</p>
				</div>

				<div class="bg-red-50 p-4 rounded-xl border border-red-100 relative">
					<p class="text-xs text-red-400 font-bold uppercase mb-2 flex items-center gap-1">
						<Calendar size={12}/> Deadline Pesanan
					</p>
					{#if isEditing}
						<input type="text" bind:value={editForm.deadline} class="w-full bg-white border border-red-200 rounded px-2 py-1 text-red-600 font-bold focus:ring-2 focus:ring-red-200 outline-none" />
					{:else}
						<p class="font-bold text-red-600 text-lg">{order.deadline}</p>
					{/if}
				</div>

				<div class="bg-green-50 p-4 rounded-xl border border-green-100 text-right md:text-left relative">
					<p class="text-xs text-green-600 font-bold uppercase mb-2">Total Biaya</p>
					{#if isEditing}
						<div class="flex items-center">
							<span class="text-green-700 font-bold mr-1">Rp</span>
							<input type="text" bind:value={editForm.price} class="w-full bg-white border border-green-200 rounded px-2 py-1 text-green-700 font-bold focus:ring-2 focus:ring-green-200 outline-none" />
						</div>
					{:else}
						<p class="font-bold text-green-700 text-xl">Rp {order.price}</p>
					{/if}
				</div>
			</div>

			<div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
				<div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
					<div class="p-2 bg-purple-100 text-purple-600 rounded-lg">
						<Scissors size={20} />
					</div>
					<h3 class="font-bold text-gray-800 text-lg">Spesifikasi Pakaian</h3>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
					<div>
						<!-- svelte-ignore a11y_label_has_associated_control -->
						<label class="block text-xs font-bold text-gray-400 uppercase mb-2">Jenis Pakaian</label>
						{#if isEditing}
							<input type="text" bind:value={editForm.clothingType} class="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-800 font-bold focus:ring-2 focus:ring-t-blue/20 outline-none" />
						{:else}
							<p class="text-xl font-bold text-gray-800">{order.clothingType}</p>
						{/if}
					</div>

					<div>
						<!-- svelte-ignore a11y_label_has_associated_control -->
						<label class="block text-xs font-bold text-gray-400 uppercase mb-2">Model / Potongan</label>
						{#if isEditing}
							<input type="text" bind:value={editForm.model} class="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-800 font-bold focus:ring-2 focus:ring-t-blue/20 outline-none" />
						{:else}
							<p class="text-xl font-bold text-gray-800">{order.model}</p>
						{/if}
					</div>

					<div class="md:col-span-2">
						<!-- svelte-ignore a11y_label_has_associated_control -->
						<label class="block text-xs font-bold text-gray-400 uppercase mb-2">Info Kain</label>
						{#if isEditing}
							<input type="text" bind:value={editForm.fabric} class="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-800 font-medium focus:ring-2 focus:ring-t-blue/20 outline-none" />
						{:else}
							<div class="flex items-center gap-2 text-gray-700 font-medium p-3 bg-gray-50 rounded-lg border border-gray-100">
								<div class="w-2 h-2 rounded-full bg-t-blue"></div>
								{order.fabric}
							</div>
						{/if}
					</div>

					<div class="md:col-span-2">
						<label class="block text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-2">
							<FileText size={14}/> Catatan Khusus
						</label>
						{#if isEditing}
							<textarea bind:value={editForm.notes} rows="3" class="w-full bg-yellow-50/50 border border-yellow-200 rounded-lg px-3 py-2 text-gray-700 leading-relaxed focus:ring-2 focus:ring-t-yellow/50 outline-none"></textarea>
						{:else}
							<div class="bg-yellow-50 border border-yellow-100 p-4 rounded-xl text-gray-700 italic leading-relaxed">
								"{order.notes}"
							</div>
						{/if}
					</div>
				</div>
			</div>

		</div>
	</div>
</div>