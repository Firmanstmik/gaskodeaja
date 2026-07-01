// import React from 'react';
// import Link from 'next/link';
// import { Search, Calendar, User, ArrowRight, MessageCircle, ChevronRight } from 'lucide-react';

// export default function BlogPage() {
//   const posts = [
//     {
//       id: 1,
//       title: "Harga Jasa Website di Lombok 2026 (Lengkap & Terbaru)",
//       desc: "Panduan lengkap harga jasa website di Lombok, mulai dari website sederhana hingga profesional.",
//       category: "Website",
//       date: "24 April 2026",
//       slug: "harga-jasa-website-lombok-2026"
//     },
//     {
//       id: 2,
//       title: "Kenapa Website Bisnis Anda Tidak Mendatangkan Customer?",
//       desc: "Pelajari kesalahan umum yang membuat website tidak menghasilkan dan cara memperbaikinya.",
//       category: "Tips Bisnis",
//       date: "22 April 2026",
//       slug: "kenapa-website-tidak-mendatangkan-customer"
//     },
//     // ... artikel lainnya
//   ];

//   return (
//     <div className="bg-white min-h-screen">
//       {/* 🧭 HEADER SECTION */}
//       <section className="bg-slate-50 py-20 px-6 border-b border-slate-100">
//         <div className="max-w-4xl mx-auto text-center">
//           <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Blog & Insight Digital</h1>
//           <p className="text-lg text-slate-600 mb-8 leading-relaxed">
//             Tips, strategi, dan informasi seputar website, aplikasi, dan cara mengembangkan bisnis secara digital.
//           </p>
//           <Link href="https://wa.me/your-number" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg">
//             Konsultasi Gratis Sekarang <MessageCircle className="ml-2" size={18} />
//           </Link>
//         </div>
//       </section>

//       <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-12">

//         {/* 🧠 LIST ARTIKEL (Main Content) */}
//         <main className="lg:col-span-2 space-y-12">
//           {posts.map((post) => (
//             <article key={post.id} className="group border-b border-slate-100 pb-12 transition-all">
//               <div className="flex items-center gap-4 text-sm text-blue-600 font-bold mb-4 uppercase tracking-widest">
//                 <span>{post.category}</span>
//                 <span className="text-slate-300">•</span>
//                 <span className="text-slate-400 font-medium">{post.date}</span>
//               </div>
//               <Link href={`/blog/${post.slug}`}>
//                 <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
//                   {post.title}
//                 </h2>
//               </Link>
//               <p className="text-slate-600 leading-relaxed mb-6">
//                 {post.desc}
//               </p>
//               <Link href={`/blog/${post.slug}`} className="inline-flex items-center font-bold text-slate-900 hover:gap-3 transition-all">
//                 Baca Selengkapnya <ArrowRight className="ml-2 text-blue-600" size={18} />
//               </Link>
//             </article>
//           ))}
//         </main>

//         {/* 🔍 SIDEBAR (SEO BOOST & CATEGORIES) */}
//         <aside className="space-y-10">
//           {/* Search Box */}
//           <div className="relative">
//             <input type="text" placeholder="Cari artikel..." className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-600 transition-all" />
//             <Search className="absolute right-5 top-4 text-slate-400" />
//           </div>

//           {/* Categories */}
//           <div className="bg-slate-50 p-8 rounded-3xl">
//             <h3 className="text-xl font-black mb-6">Kategori</h3>
//             <ul className="space-y-4">
//               {['Website', 'SEO', 'Digital Marketing', 'Tips Bisnis'].map((cat) => (
//                 <li key={cat}>
//                   <Link href={`/blog/category/${cat.toLowerCase()}`} className="flex justify-between items-center text-slate-600 hover:text-blue-600 font-medium transition-all group">
//                     {cat} <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* 🧲 CTA SIDEBAR (Soft Selling) */}
//           <div className="bg-blue-600 p-8 rounded-3xl text-white">
//             <h3 className="text-xl font-bold mb-4">Butuh Website untuk Bisnis Anda?</h3>
//             <p className="text-blue-100 text-sm mb-6 leading-relaxed">
//               Kami siap membantu Anda membuat website profesional yang siap menghasilkan.
//             </p>
//             <Link href="https://wa.me/your-number" className="block text-center bg-white text-blue-600 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors">
//               Konsultasi Gratis
//             </Link>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }

// import React from 'react';
// import { Search, Calendar, ChevronRight, MessageCircle, Tag } from 'lucide-react';
// import Link from 'next/link';
// import { ApiBlogRepository } from "@/core/infrastructure/repositories/ApiBlogRepository";
// import { GetBlogPageData } from "@/core/application/use-cases/GetBlogPageData";

// export default async function BlogPage() {
//   const repository = new ApiBlogRepository();
//   const useCase = new GetBlogPageData(repository);
//   const data = await useCase.execute();

//   const uri = process.env.NEXT_PUBLIC_IMG_URL || "http://127.0.0.1:8006";

//   return (
//     <div className="bg-slate-950 min-h-screen text-slate-200 font-sans">

//       {/* --- 🧭 HERO SECTION --- */}
//       <section 
//         className="relative min-h-[50vh] flex items-center overflow-hidden"
//         style={{
//           backgroundImage: `linear-gradient(to bottom, rgba(2, 6, 23, 0.7), rgba(2, 6, 23, 1)), url('${uri}/${data.hero.imagePath}')`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center'
//         }}
//       >
//         <div className="container mx-auto px-6 relative z-10">
//           <div className="max-w-3xl">
//             <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white">
//               {data.hero.title}
//             </h1>
//             <p className="text-xl text-slate-300 mb-8 leading-relaxed">
//               {data.hero.subtitle}
//             </p>
//             <Link href={data.hero.ctaLink} className="inline-flex items-center bg-[#A47148] hover:bg-[#8B5E3C] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-[#A47148]/20">
//               {data.hero.ctaText}
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* --- 🎯 CATEGORY FILTER --- */}
//       <section className="py-12 border-b border-slate-900 sticky top-0 bg-slate-950/80 backdrop-blur-md z-30">
//         <div className="container mx-auto px-6">
//           <div className="flex flex-wrap items-center gap-4">
//             <span className="text-sm font-bold uppercase tracking-widest text-slate-500 mr-4">Kategori:</span>
//             <button className="px-6 py-2 rounded-full bg-[#A47148] text-white text-sm font-bold transition-all">Semua</button>
//             {data.categories.map((cat) => (
//               <button key={cat.id} className="px-6 py-2 rounded-full bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white text-sm font-bold transition-all border border-slate-800">
//                 {cat.name}
//               </button>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* --- 📝 BLOG LIST --- */}
//       <section className="py-20 container mx-auto px-6">
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {data.posts.map((post) => {
//             const categoryName = data.categories.find(c => c.id === post.categoryId)?.name || "Uncategorized";
//             return (
//               <article key={post.id} className="group bg-slate-900/40 rounded-[2.5rem] overflow-hidden border border-slate-800 hover:border-[#A47148]/50 transition-all flex flex-col h-full shadow-2xl shadow-black/50">
//                 <div className="p-8 flex flex-col flex-grow">
//                   <div className="flex items-center gap-3 mb-6">
//                     <span className="px-3 py-1 bg-[#A47148]/10 text-[#A47148] rounded-lg text-[10px] font-bold uppercase tracking-widest border border-[#A47148]/20">
//                       {categoryName}
//                     </span>
//                     <span className="text-slate-600 text-xs flex items-center">
//                       <Calendar size={12} className="mr-1" /> May 2026
//                     </span>
//                   </div>

//                   <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#A47148] transition-colors leading-tight">
//                     {post.title}
//                   </h3>

//                   <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
//                     {post.excerpt}
//                   </p>

//                   <Link href={`/blogs/${post.slug}`} className="inline-flex items-center text-white font-bold text-sm group/link">
//                     Baca Selengkapnya 
//                     <ChevronRight size={18} className="ml-1 group-hover/link:translate-x-2 transition-transform text-[#A47148]" />
//                   </Link>
//                 </div>
//               </article>
//             );
//           })}
//         </div>
//       </section>

//       {/* --- 📞 CLOSING SECTION --- */}
//       <section className="py-24 px-6 container mx-auto">
//         <div className="bg-gradient-to-br from-slate-900 to-black rounded-[3rem] p-12 md:p-20 text-center border border-slate-800 shadow-2xl relative overflow-hidden">
//           <div className="relative z-10">
//             <h2 className="text-4xl md:text-5xl font-black mb-6 text-white leading-tight">
//               {data.closing.pernyataan}
//             </h2>
//             <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
//               {data.closing.jawaban[0]}
//             </p>
//             <Link 
//               href={data.hero.ctaLink} 
//               className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-12 py-5 rounded-2xl font-black text-xl transition-all hover:scale-105 shadow-2xl shadow-green-500/20"
//             >
//               <MessageCircle className="mr-3" size={28} /> Chat Kami Sekarang
//             </Link>
//           </div>
//           {/* Decorative element */}
//           <div className="absolute top-0 right-0 w-64 h-64 bg-[#A47148]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
//         </div>
//       </section>

//     </div>
//   );
// }

import React from 'react';
import { Search, Calendar, ChevronRight, MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ApiBlogRepository } from "@/core/infrastructure/repositories/ApiBlogRepository";
import { GetBlogPageData } from "@/core/application/use-cases/GetBlogPageData";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const repository = new ApiBlogRepository();
  const useCase = new GetBlogPageData(repository);
  const data = await useCase.execute();

  const uri = process.env.NEXT_PUBLIC_IMG_URL || "http://127.0.0.1:8006";

  return (
    <div className="min-h-screen text-slate-200 font-sans">

      {/* --- 🧭 HERO SECTION --- */}
      <section
        className="relative min-h-[50vh] flex items-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(2, 6, 23, 0.7), rgba(2, 6, 23, 1)), url('${uri}/${data.hero.imagePath}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white">
              {data.hero.title}
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              {data.hero.subtitle}
            </p>
            <Link href={data.hero.ctaLink} className="inline-flex items-center bg-[#A47148] hover:bg-[#8B5E3C] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-[#A47148]/20">
              {data.hero.ctaText}
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-3 gap-16">

        {/* 🧠 LIST ARTIKEL (Main Content) */}
        <main className="lg:col-span-2 space-y-20">
          {data.posts.map((post) => {
            const categoryName = data.categories.find(c => c.id === post.categoryId)?.name || "Uncategorized";
            return (
              <article key={post.id} className="group border-b border-slate-900 pb-16 transition-all">
                <div className="flex items-center gap-4 text-xs text-[#A47148] font-bold mb-5 uppercase tracking-[0.2em]">
                  <span>{categoryName}</span>
                  <span className="text-slate-800">•</span>
                  <span className="text-slate-500 font-medium flex items-center gap-1">
                    <Calendar size={14} /> May 2026
                  </span>
                </div>

                <Link href={`/blogs/${post.slug}`}>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 group-hover:text-[#A47148] transition-colors leading-tight">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-slate-500 text-lg leading-relaxed mb-8">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blogs/${post.slug}`}
                  className="inline-flex items-center font-bold text-slate-600 group/btn hover:text-[#A47148] transition-all"
                >
                  Baca Selengkapnya
                  <ArrowRight className="ml-2 text-[#A47148] group-hover/btn:translate-x-3 transition-transform" size={20} />
                </Link>
              </article>
            );
          })}
        </main>

        {/* 🔍 SIDEBAR (SEO BOOST & CATEGORIES) */}
        <aside className="space-y-12">

          {/* Search Box */}
          <div className="relative group">
            <input
              type="text"
              placeholder="Cari artikel..."
              className="w-full bg-white border border-[#A47148] rounded-2xl py-4 px-6 text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#A47148]/50 focus:border-[#A47148] transition-all"
            />
            <Search className="absolute right-5 top-4 text-slate-500 group-focus-within:text-[#A47148] transition-colors" />
          </div>

          {/* Categories */}
          <div className="bg-orange-200/40 shadow-lg p-8 rounded-[2rem]">
            <h3 className="text-xl font-black text-slate-700 mb-8 border-b border-slate-800 pb-4">Kategori</h3>
            <ul className="space-y-5">
              {data.categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/blogs/category/${cat.slug}`}
                    className="flex justify-between items-center text-slate-600 hover:text-[#A47148] font-semibold transition-all group/cat"
                  >
                    {cat.name}
                    <ChevronRight size={18} className="group-hover/cat:translate-x-2 transition-transform opacity-50 group-hover/cat:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 🧲 CTA SIDEBAR (Menggunakan data Closing dari API) */}
          <div className="bg-orange-300/50 p-10 rounded-[2.5rem] text-white shadow-2xl shadow-[#A47148]/10 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 text-slate-800">
                {data.closing.pernyataan}
              </h3>
              <p className="text-slate-500 text-sm mb-8">
                {data.closing.jawaban[0]}
              </p>
              <Link
                href={data.hero.ctaLink}
                className="block text-center bg-[#A47148] text-white py-4 rounded-xl font-black hover:bg-[#8B5E3C] transition-all transform hover:-translate-y-1"
              >
                Konsultasi Gratis
              </Link>
            </div>
            {/* Dekorasi Aksen */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </div>
        </aside>

      </div>
    </div>
  );
}