<script lang="ts">
	// Data dummy untuk contoh
	let pesanan = [
		{ id: '#ORD-001', nama: 'Budi Santoso', status: 'Baru', total: 'Rp 150.000' },
		{ id: '#ORD-002', nama: 'Siti Aminah', status: 'Proses', total: 'Rp 300.000' },
		{ id: '#ORD-003', nama: 'Joko Anwar', status: 'Selesai', total: 'Rp 120.000' }
	];
</script>

<div class="flex min-h-screen bg-gray-100">
	<aside class="w-64 bg-slate-800 text-white hidden md:block">
		<div class="p-6">
			<h2 class="text-2xl font-bold">Tailor Admin</h2>
		</div>
		<nav class="mt-4">
			<a href="/admin" class="block py-3 px-6 bg-slate-700 border-l-4 border-blue-500">Dashboard</a>
			<a href="/admin/orders" class="block py-3 px-6 hover:bg-slate-700 transition">Pesanan Masuk</a>
			<a href="/admin/customers" class="block py-3 px-6 hover:bg-slate-700 transition">Pelanggan</a>
			<a href="/admin/settings" class="block py-3 px-6 hover:bg-slate-700 transition">Pengaturan</a>
		</nav>
	</aside>

	<main class="flex-1 p-8">
		<div class="flex justify-between items-center mb-8">
			<h1 class="text-3xl font-bold text-gray-800">Dashboard Penjahit</h1>
			<button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
				+ Buat Pesanan Manual
			</button>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
			<div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
				<p class="text-gray-500 text-sm">Total Pendapatan</p>
				<p class="text-2xl font-bold text-green-600">Rp 5.200.000</p>
			</div>
			<div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
				<p class="text-gray-500 text-sm">Pesanan Baru</p>
				<p class="text-2xl font-bold text-blue-600">12</p>
			</div>
			<div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
				<p class="text-gray-500 text-sm">Sedang Dikerjakan</p>
				<p class="text-2xl font-bold text-orange-500">5</p>
			</div>
		</div>

		<div class="bg-white rounded-xl shadow-sm overflow-hidden">
			<div class="p-6 border-b border-gray-100">
				<h3 class="font-bold text-lg">Pesanan Terbaru</h3>
			</div>
			<table class="w-full text-left">
				<thead class="bg-gray-50 text-gray-600">
					<tr>
						<th class="p-4">ID Pesanan</th>
						<th class="p-4">Pelanggan</th>
						<th class="p-4">Status</th>
						<th class="p-4">Total</th>
					</tr>
				</thead>
				<tbody>
					{#each pesanan as item}
						<tr class="border-t border-gray-100 hover:bg-gray-50">
							<td class="p-4 font-mono text-sm">{item.id}</td>
							<td class="p-4">{item.nama}</td>
							<td class="p-4">
								<span class="{item.status === 'Baru' ? 'bg-blue-100 text-blue-800' : item.status === 'Selesai' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} px-2 py-1 rounded-full text-xs font-bold">
									{item.status}
								</span>
							</td>
							<td class="p-4">{item.total}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</main>
</div>