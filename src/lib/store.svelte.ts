export type Order = {
    id: string;
    client: string;
    phone: string;
    item: string;
    date: string;
    deadline: string;
    price: string;
    status: string;
    model?: string;
    note?: string;
    requestedDeadline?: string;
};

export type Customer = {
    id: string;
    name: string;
    phone: string;
    gender: 'Pria' | 'Wanita';
    lastUpdate: string;
};

// Data Dummy Awal (Dipindahkan dari component)
const initialOrders: Order[] = [
    {
        id: "ORD-001",
        client: "Budi Santoso",
        phone: "0812-3456-7890",
        item: "Kemeja Batik",
        date: "5 Jan",
        deadline: "12 Jan",
        price: "150.000",
        status: "Dipotong",
    },
    {
        id: "ORD-003",
        client: "Joko Anwar",
        phone: "0813-4567-8901",
        item: "Jas Formal",
        date: "8 Jan",
        deadline: "15 Jan",
        price: "850.000",
        status: "Dijahit",
    },
    {
        id: "ORD-002",
        client: "Siti Aminah",
        phone: "0856-7890-1234",
        item: "Gamis Syar'i",
        date: "6 Jan",
        deadline: "20 Jan",
        price: "300.000",
        status: "Menunggu Kain",
    },
];

const initialRequests: Order[] = [
    {
        id: "REQ-991",
        client: "Putri Delina",
        phone: "0812-3456-789",
        item: "Gaun Pesta",
        date: "Baru saja",
        model: "Custom - Lengan Lonceng",
        note: "Butuh cepat untuk minggu depan",
        requestedDeadline: "10 Jan 2026",
        status: "Baru",
        price: "-",
        deadline: "-"
    },
    {
        id: "REQ-992",
        client: "Raffi Ahmad",
        phone: "0811-2233-44",
        item: "Kemeja Slimfit",
        date: "1 Jam lalu",
        model: "Standard",
        note: "Kain bawa sendiri",
        requestedDeadline: "Flexible",
        status: "Baru",
        price: "-",
        deadline: "-"
    },
];

const initialCustomers: Customer[] = [
    { id: "CUST-01", name: "Andi Saputra", phone: "0812-3456-7890", gender: "Pria", lastUpdate: "5 Jan 2026" },
    { id: "CUST-02", name: "Anisa Rahma", phone: "0856-7890-1234", gender: "Wanita", lastUpdate: "20 Des 2025" },
    { id: "CUST-03", name: "Budi Santoso", phone: "0813-4567-8901", gender: "Pria", lastUpdate: "10 Jan 2026" },
    { id: "CUST-04", name: "Citra Kirana", phone: "0877-1234-5678", gender: "Wanita", lastUpdate: "1 Jan 2026" },
    { id: "CUST-05", name: "Dewi Persik", phone: "0811-2233-4455", gender: "Wanita", lastUpdate: "12 Jan 2026" },
    { id: "CUST-06", name: "Doni Salmanan", phone: "0812-9988-7766", gender: "Pria", lastUpdate: "30 Nov 2025" },
    { id: "CUST-07", name: "Eko Patrio", phone: "0857-1122-3344", gender: "Pria", lastUpdate: "8 Jan 2026" },
    { id: "CUST-08", name: "Yanto", phone: "0813-6677-8899", gender: "Pria", lastUpdate: "15 Jan 2026" }
];

export type Tailor = {
    id: string;
    name: string;
    specialties: string[];
    location: string;
    rating: number;
    image?: string;
};

// ... (Existing code)

const initialTailors: Tailor[] = [
    {
        id: "TLR-001",
        name: "SS Tailor",
        specialties: ["Kemeja", "Seragam", "Jas", "Permak"],
        location: "Lowokwaru, Malang",
        rating: 4.8,
    },
    {
        id: "TLR-002",
        name: "Abadi Jaya",
        specialties: ["Gamis", "Kebaya", "Busana Muslim"],
        location: "Klojen, Malang",
        rating: 4.5,
    },
    {
        id: "TLR-003",
        name: "Permak Kilat Bu Siti",
        specialties: ["Permak", "Celana"],
        location: "Blimbing, Malang",
        rating: 4.2,
    },
    {
        id: "TLR-004",
        name: "Taylor Swift (Jahit)",
        specialties: ["Gaun Pesta", "Dress", "Haute Couture"],
        location: "Sukun, Malang",
        rating: 4.9,
    },
    {
        id: "TLR-005",
        name: "Master Jas Pria",
        specialties: ["Jas Formal", "Tuxedo", "Celana Bahan"],
        location: "Kedungkandang, Malang",
        rating: 4.7,
    }
];

// Global Store State
// Menggunakan $state() agar reaktif di seluruh aplikasi (Svelte 5)
export const globalStore = $state({
    orders: initialOrders,
    requests: initialRequests,
    customers: initialCustomers,
    tailors: initialTailors,
    
    // Actions / Mutators
    addOrder(order: Order) {
        this.orders = [order, ...this.orders];
    },
    
    removeRequest(id: string) {
        this.requests = this.requests.filter(r => r.id !== id);
    },

    updateOrderStatus(index: number, status: string) {
        this.orders[index].status = status;
    },

    addCustomer(customer: Customer) {
        this.customers = [customer, ...this.customers];
    }
});
