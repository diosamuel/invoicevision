// import { FloatingEmojis } from "@/components/floating-emojis"
import { Navbar } from "@/components/navbar"

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center bg-white text-black">
      {/* Navbar */}
      <Navbar />

      {/* Background with floating emojis */}
      {/* <FloatingEmojis /> */}

      {/* Content container */}
      <main className="container relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-16 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Nota AI: Scan, Simpan, & Analisis Nota dengan AI!
        </h1>
        <h2 className="mb-10 text-xl font-medium text-gray-700 sm:text-2xl md:text-3xl">
          Scan & Simpan Nota dengan AI
        </h2>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <button className="rounded-md bg-black px-8 py-3 font-medium text-white transition-colors hover:bg-gray-800">
            Mulai Sekarang
          </button>
          {/* <button className="rounded-md border border-black bg-white px-8 py-3 font-medium text-black transition-colors hover:bg-gray-100">
            Pelajari Lebih Lanjut
          </button> */}
        </div>
      </main>
    </div>
  )
}

