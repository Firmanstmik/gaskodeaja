// src/core/infrastructure/repositories/ApiFooterRepository.ts

import { Footer } from "../../domain/entities/Footer";
import { IFooterRepository } from "../../domain/repositories/IFooterRepository";
import { apiClient } from "../services/ApiClient";

export class ApiFooterRepository implements IFooterRepository {
  private readonly path = '/footer';
  // Endpoint publik (tanpa auth) untuk render footer di layout situs
  private readonly publicPath = '/public/footer';

  async get(): Promise<Footer | null> {
    try {
      const res = await apiClient(this.publicPath, { cache: 'no-store' });
      if (!res.ok) return null;
      
      const response = await res.json();
      const data = response.data;
      
      if (!data) return null;

      return {
        id: data.id,
        brandName: data.brand_name || '',
        logoPath: data.logo_path,
        shortDescription: data.short_description || '',
        address: data.address,
        email: data.email,
        phone: data.phone,
        // Cek apakah social_links sudah berupa object (dari cast Laravel) atau masih string
        socialLinks: typeof data.social_links === 'string' 
          ? JSON.parse(data.social_links) 
          : (data.social_links || {}),
        copyrightText: data.copyright_text || ''
      };
    } catch (error) {
      console.error("Fetch Footer Error:", error);
      return null;
    }
  }

  async save(data: Footer): Promise<void> {
    const res = await apiClient(this.path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(this.mapToSchema(data)),
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Gagal membuat data footer');
    }
  }

  async update(id: number, data: Footer): Promise<void> {
    const res = await apiClient(`${this.path}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(this.mapToSchema(data)),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Gagal memperbarui data footer');
    }
  }

  private mapToSchema(data: Footer) {
    return {
      brand_name: data.brandName,
      logo_path: data.logoPath,
      short_description: data.shortDescription,
      address: data.address,
      email: data.email,
      phone: data.phone,
      // Kirim sebagai object langsung. 
      // Jika di Laravel model sudah ada protected $casts = ['social_links' => 'array'], Laravel akan otomatis menanganinya.
      social_links: data.socialLinks || {}, 
      copyright_text: data.copyrightText
    };
  }
}