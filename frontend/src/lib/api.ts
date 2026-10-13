function isLocalhost(): boolean {
  if (typeof window === "undefined") {
    return process.env.NODE_ENV !== "production";
  }
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1" || host === "::1";
}

export function getBackendUrl(): string {
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_URL;
  }
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, "");
  }
  return isLocalhost() ? "http://localhost:8000" : "";
}

export function getApiBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  return isLocalhost() ? "http://localhost:8000/api" : "";
}

export const BACKEND_URL = getBackendUrl();

export function getBackendMediaUrl(pathOrUrl?: string): string {
  if (!pathOrUrl) return "";
  if (
    pathOrUrl.startsWith("http://") ||
    pathOrUrl.startsWith("https://") ||
    pathOrUrl.startsWith("data:")
  ) {
    return pathOrUrl;
  }
  const cleanPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  const base = getBackendUrl();
  return base ? `${base}${cleanPath}` : cleanPath;
}

export interface TranslatableText {
  en: string;
  ar: string;
}

export interface ServiceItem {
  id: number;
  title: TranslatableText;
  slug: TranslatableText;
  short_description: TranslatableText;
  full_content?: TranslatableText | null;
  icon: string;
  features?: Array<{ en: string; ar: string }> | null;
  sections?: any[] | null;
  featured_image?: string | null;
  sort_order: number;
  is_active: boolean;
  status?: "published" | "draft";
  seo?: SeoItem | null;
  created_at?: string;
  updated_at?: string;
}

export interface DynamicPageItem {
  id: number;
  title: TranslatableText;
  slug: TranslatableText;
  content: TranslatableText;
  template: string;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
  seo?: SeoItem | null;
}

export interface PostItem {
  id: number;
  user_id: number;
  category_id?: number;
  title: TranslatableText;
  slug: TranslatableText;
  summary?: TranslatableText;
  content: TranslatableText;
  featured_image?: string;
  status: "draft" | "published";
  published_at?: string;
  created_at: string;
  author?: { id: number; name: string };
  category?: { id: number; name: TranslatableText; slug: TranslatableText };
  seo?: SeoItem;
}

export interface CategoryItem {
  id: number;
  name: TranslatableText;
  slug: TranslatableText;
  posts_count?: number;
}

export interface InquiryItem {
  id: number;
  service_id?: number;
  service_name?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  budget_range?: string;
  message: string;
  status: "new" | "contacted" | "in_discussion" | "proposal_sent" | "won" | "lost";
  admin_notes?: string;
  locale: "en" | "ar";
  created_at: string;
  service?: ServiceItem;
}

export interface SeoItem {
  id?: number;
  meta_title?: TranslatableText;
  meta_description?: TranslatableText;
  og_title?: TranslatableText;
  og_description?: TranslatableText;
  og_image?: string;
  canonical_url?: string;
  focus_keywords?: TranslatableText;
  indexable?: boolean;
}

export interface UserItem {
  id: number;
  name: string;
  email: string;
  role: "admin" | "content" | "seo";
  created_at?: string;
}

export interface PortfolioItem {
  id: number;
  slug: TranslatableText;
  title: TranslatableText;
  client_name?: TranslatableText;
  category: string;
  tags?: { en: string[]; ar: string[] };
  intro?: TranslatableText;
  hero_image?: string;
  thumbnail_image?: string;
  company_background?: TranslatableText;
  work_experience_image?: string;
  work_experience?: TranslatableText;
  showcase_image?: string;
  gallery_images?: string[];
  design_concept?: TranslatableText;
  next_project?: {
    slug: string;
    title: TranslatableText;
    tag?: string;
  };
  brand_color?: string;
  year_completed?: number;
  sort_order: number;
  is_published: boolean;
  status?: "published" | "draft";
  seo?: SeoItem;
  created_at?: string;
}

// Client helper
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  if (!baseUrl) {
    throw new Error("No remote API endpoint configured. Using local fallback data.");
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(options.headers || {}),
  };

  const authToken = token || (typeof window !== "undefined" ? localStorage.getItem("smarttouch_token") : null);
  if (authToken) {
    (headers as any)["Authorization"] = `Bearer ${authToken}`;
  }

  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `API Error: ${res.status}`);
  }
  return data;
}

export async function uploadImage(
  file: File,
  token?: string
): Promise<{ success: boolean; url: string; filename: string }> {
  const baseUrl = getApiBaseUrl();
  if (!baseUrl) {
    throw new Error("No remote API endpoint configured.");
  }

  const formData = new FormData();
  formData.append("image", file);
  formData.append("file", file);

  const authToken =
    token ||
    (typeof window !== "undefined"
      ? localStorage.getItem("smarttouch_token")
      : null);

  const headers: HeadersInit = {
    Accept: "application/json",
  };
  if (authToken) {
    (headers as any)["Authorization"] = `Bearer ${authToken}`;
  }

  const res = await fetch(`${baseUrl}/dashboard/upload`, {
    method: "POST",
    headers,
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `Upload failed: ${res.status}`);
  }
  return data;
}

