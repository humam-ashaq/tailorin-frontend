import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        // Palet Tailorin
        // 't-blue': '#819CEB',   // Biru Utama
        't-blue': '#3974F4',
        // 't-pink': '#FFA1A1',   // Pink Utama (untuk gradasi)
        't-pink': '#F34492',
        't-yellow': '#F7D774', // Aksen (Aktif/Tombol)
        't-dark': '#1E1E1E',   // Teks Gelap
        't-gray': '#F3F4F6',   // Background
      },
      fontFamily: {
        // Opsional: Jika mau font lebih modern, bisa tambah di sini nanti
        sans: ['Inter', 'sans-serif'], 
      }
    }
  },

  plugins: [require("@tailwindcss/typography")]
} as Config;
