<script lang="ts">
	import { goto } from '$app/navigation';
	import { 
		ArrowLeft, Save, User, Phone, MapPin, 
		Ruler, Scissors, FileText, UserPlus 
	} from 'lucide-svelte';

	// State Data Kosong untuk Pelanggan Baru
	let newCustomer = $state({
		name: '',
		phone: '',
		gender: 'Wanita', // Default
		address: '',
		notes: '',
		measurements: {
			upperBody: {
				lingkarLeher: 0, lingkarDada: 0, lingkarPinggang: 0,
				lebarBahu: 0, panjangPunggung: 0, lebarPunggung: 0, lebarDada: 0
			},
			arm: {
				panjangLengan: 0, lingkarKerungLengan: 0,
				lingkarPangkalLengan: 0, lingkarSiku: 0, lingkarPergelangan: 0
			},
			lowerBody: {
				lingkarPinggul: 0, tinggiDuduk: 0, panjangCelana: 0,
				lingkarPaha: 0, lingkarLutut: 0, lingkarKakiBawah: 0
			}
		}
	});

	// Helper Label
	const formatLabel = (key: string) => {
		return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
	};

	// Fungsi Simpan
	function handleSave() {
		// Validasi Sederhana
		if (!newCustomer.name || !newCustomer.phone) {
			alert('Nama dan Nomor HP wajib diisi!');
			return;
		}

		// Simulasi Simpan ke Database
		console.log('Data Disimpan:', newCustomer);
		alert('Pelanggan berhasil ditambahkan!');
		
		// Redirect kembali ke halaman daftar
		goto('/admin/measurements');
	}
</script>

<div class="space-y-6 pb-20">
	
	<div class="flex items-center justify-between sticky top-20 z-40 bg-t-gray/90 backdrop-blur-sm py-2">
		<div class="flex items-center gap-4">
			<a href="/admin/measurements" class="p-2 rounded-xl bg-gradient-to-r from-t-blue to-t-pink border border-gray-200 text-white hover:bg-gray-50 transition shadow-sm">
				<ArrowLeft size={20} />
			</a>
			<div>
				<h2 class="text-3xl font-bold text-gray-800">Tambah Data Ukuran</h2>
				<p class="text-gray-500 text-sm">Input data identitas dan ukuran baru.</p>
			</div>
		</div>

		<button 
			onclick={handleSave}
			class="flex items-center gap-2 px-6 py-3 bg-t-yellow text-t-dark rounded-xl hover:bg-yellow-400 transition shadow-md font-medium"
		>
			<Save size={18} /> Simpan Data
		</button>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
		
		<div class="space-y-6">
			<div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
				<div class="flex items-center gap-2 mb-6 text-gray-800 font-bold border-b border-gray-100 pb-4">
					<UserPlus size={20} class="text-t-blue" />
					<h3>Identitas Pelanggan</h3>
				</div>

				<div class="space-y-4">
					<div>
						<!-- svelte-ignore a11y_label_has_associated_control -->
						<label class="block text-xs font-bold text-gray-400 uppercase mb-1.5">Nama Lengkap *</label>
						<div class="relative">
							<User size={18} class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
							<input 
								type="text" 
								bind:value={newCustomer.name}
								placeholder="Contoh: Siti Aminah"
								class="w-full pl-10 pr-4 py-3 bg-gray-50 border-transparent rounded-xl text-gray-800 focus:bg-white focus:ring-2 focus:ring-t-blue/20 transition"
							/>
						</div>
					</div>

					<div>
						<!-- svelte-ignore a11y_label_has_associated_control -->
						<label class="block text-xs font-bold text-gray-400 uppercase mb-1.5">Nomor WhatsApp *</label>
						<div class="relative">
							<Phone size={18} class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
							<input 
								type="tel" 
								bind:value={newCustomer.phone}
								placeholder="08xxxxxxxxxx"
								class="w-full pl-10 pr-4 py-3 bg-gray-50 border-transparent rounded-xl text-gray-800 focus:bg-white focus:ring-2 focus:ring-t-blue/20 transition"
							/>
						</div>
					</div>

					<div>
						<!-- svelte-ignore a11y_label_has_associated_control -->
						<label class="block text-xs font-bold text-gray-400 uppercase mb-1.5">Jenis Kelamin</label>
						<div class="grid grid-cols-2 gap-3">
							<button 
								onclick={() => newCustomer.gender = 'Pria'}
								class="py-2.5 rounded-xl text-sm font-bold border transition-all
								{newCustomer.gender === 'Pria' ? 'bg-blue-50 border-t-blue text-t-blue' : 'bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100'}"
							>
								Pria
							</button>
							<button 
								onclick={() => newCustomer.gender = 'Wanita'}
								class="py-2.5 rounded-xl text-sm font-bold border transition-all
								{newCustomer.gender === 'Wanita' ? 'bg-pink-50 border-t-pink text-pink-500' : 'bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100'}"
							>
								Wanita
							</button>
						</div>
					</div>

					<div>
						<!-- svelte-ignore a11y_label_has_associated_control -->
						<label class="block text-xs font-bold text-gray-400 uppercase mb-1.5">Alamat</label>
						<div class="relative">
							<MapPin size={18} class="absolute left-4 top-4 text-gray-400"/>
							<textarea 
								bind:value={newCustomer.address}
								placeholder="Alamat lengkap..."
								class="w-full pl-10 pr-4 py-3 bg-gray-50 border-transparent rounded-xl text-gray-800 focus:bg-white focus:ring-2 focus:ring-t-blue/20 transition min-h-[80px] resize-none"
							></textarea>
						</div>
					</div>
				</div>
			</div>

			<div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
				<div class="flex items-center gap-2 mb-4 text-gray-800 font-bold">
					<FileText size={18} class="text-t-yellow" />
					<h3>Catatan Fit / Body</h3>
				</div>
				<textarea 
					bind:value={newCustomer.notes}
					class="w-full bg-yellow-50/50 border border-yellow-100 rounded-xl p-4 text-sm text-gray-700 focus:ring-2 focus:ring-t-yellow/50 focus:border-t-yellow min-h-[120px]"
					placeholder="Catatan khusus bentuk tubuh..."
				></textarea>
			</div>
		</div>

		<div class="lg:col-span-2 space-y-6">
			
			<div class="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 text-t-blue text-sm">
				<div class="mt-0.5"><Ruler size={18} /></div>
				<p>Masukkan angka <strong>0</strong> jika ukuran tertentu tidak diperlukan. Satuan ukuran dalam <strong>cm</strong>.</p>
			</div>

			{#each [
				{ title: 'Ukuran Badan Atas', icon: Ruler, color: 'text-t-blue', bg: 'bg-blue-100', data: newCustomer.measurements.upperBody, ring: 'focus:ring-t-blue/20' },
				{ title: 'Ukuran Lengan', icon: Scissors, color: 'text-purple-600', bg: 'bg-purple-100', data: newCustomer.measurements.arm, ring: 'focus:ring-purple-200' },
				{ title: 'Ukuran Badan Bawah', icon: Ruler, color: 'text-green-600', bg: 'bg-green-100', data: newCustomer.measurements.lowerBody, ring: 'focus:ring-green-200' }
			] as section}
			
				<div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
					<div class="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center gap-3">
						<div class="p-2 {section.bg} {section.color} rounded-lg">
							<section.icon size={20} class={section.title.includes('Bawah') ? 'rotate-90' : ''}/>
						</div>
						<h3 class="font-bold text-gray-800">{section.title}</h3>
					</div>
					
					<div class="p-6 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6">
						{#each Object.entries(section.data) as [key, value]}
							<div class="relative">
								<!-- svelte-ignore a11y_label_has_associated_control -->
								<label class="block text-xs font-bold text-gray-400 uppercase mb-1.5">
									{formatLabel(key)}
								</label>
								<div class="relative">
									<input 
										type="number" 
										bind:value={section.data[key as keyof typeof section.data]}
										placeholder="0"
										class="w-full pl-4 pr-10 py-2.5 bg-gray-50 border-transparent rounded-xl font-bold text-gray-800 focus:bg-white focus:ring-2 {section.ring} transition"
									/>
									<span class="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">cm</span>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>