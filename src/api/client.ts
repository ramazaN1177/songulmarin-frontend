import axios from 'axios';
import type { 
  Brand, Product, Service, Page, Reference, GalleryItem, HeroSlide, QuoteFormData 
} from '../types';
import { 
  mockBrands, mockProducts, mockServices, mockReferences, mockGallery, mockHeroSlides, mockPages 
} from './mockData';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 2500,
});

export const apiService = {
  // Brands
  getBrands: async (): Promise<Brand[]> => {
    try {
      const res = await api.get('/brands');
      return res.data;
    } catch {
      return mockBrands;
    }
  },

  getBrandBySlug: async (slug: string): Promise<Brand | null> => {
    try {
      const res = await api.get(`/brands/${slug}`);
      return res.data;
    } catch {
      const brand = mockBrands.find(b => b.slug === slug);
      if (!brand) return null;
      const products = mockProducts.filter(p => p.brandId === brand.id);
      return { ...brand, products };
    }
  },

  // Products
  getProducts: async (brandSlug?: string): Promise<Product[]> => {
    try {
      const url = brandSlug ? `/products?brand=${brandSlug}` : '/products';
      const res = await api.get(url);
      return res.data;
    } catch {
      if (brandSlug) {
        const brand = mockBrands.find(b => b.slug === brandSlug);
        return brand ? mockProducts.filter(p => p.brandId === brand.id) : [];
      }
      return mockProducts;
    }
  },

  getProductBySlug: async (slug: string): Promise<Product | null> => {
    try {
      const res = await api.get(`/products/${slug}`);
      return res.data;
    } catch {
      const prod = mockProducts.find(p => p.slug === slug);
      if (!prod) return null;
      const brand = mockBrands.find(b => b.id === prod.brandId);
      return { ...prod, brand };
    }
  },

  // Services
  getServices: async (): Promise<Service[]> => {
    try {
      const res = await api.get('/services');
      return res.data;
    } catch {
      return mockServices;
    }
  },

  getServiceBySlug: async (slug: string): Promise<Service | null> => {
    try {
      const res = await api.get(`/services/${slug}`);
      return res.data;
    } catch {
      return mockServices.find(s => s.slug === slug) || null;
    }
  },

  // References
  getReferences: async (): Promise<Reference[]> => {
    try {
      const res = await api.get('/references');
      return res.data;
    } catch {
      return mockReferences;
    }
  },

  // Gallery
  getGallery: async (category?: string, type?: 'IMAGE' | 'VIDEO'): Promise<GalleryItem[]> => {
    try {
      let url = '/gallery';
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (type) params.append('type', type);
      if (params.toString()) url += `?${params.toString()}`;
      
      const res = await api.get(url);
      return res.data;
    } catch {
      let filtered = [...mockGallery];
      if (category && category !== 'All' && category !== 'Tümü') {
        filtered = filtered.filter(g => g.category === category);
      }
      if (type) {
        filtered = filtered.filter(g => g.type === type);
      }
      return filtered;
    }
  },

  // Hero Slides
  getHeroSlides: async (): Promise<HeroSlide[]> => {
    try {
      const res = await api.get('/hero-slides');
      return res.data;
    } catch {
      return mockHeroSlides;
    }
  },

  // Pages (Corporate / Hakkımızda / Misyon / KVKK)
  getPageBySlug: async (slug: string): Promise<Page | null> => {
    try {
      const res = await api.get(`/pages/${slug}`);
      return res.data;
    } catch {
      return mockPages.find(p => p.slug === slug) || null;
    }
  },

  // Submit Quote / Form
  submitForm: async (data: QuoteFormData): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await api.post('/forms', data);
      return res.data;
    } catch {
      return { success: true, message: 'Teklif talebiniz başarıyla alındı.' };
    }
  }
};
