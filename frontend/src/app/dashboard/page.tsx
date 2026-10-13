"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { 
  apiRequest, uploadImage, DynamicPageItem, PostItem, InquiryItem, UserItem, ServiceItem, CategoryItem, PortfolioItem 
} from "@/lib/api";
import { Modal } from "@/components/Modal";
import { WysiwygEditor } from "@/components/WysiwygEditor";
import { 
  LayoutDashboard, Inbox, FileText, BookOpen, Users, Settings, 
  LogOut, Plus, Edit2, Trash2, CheckCircle, Clock, Search, 
  ExternalLink, Sparkles, Shield, User as UserIcon, Globe, AlertCircle, 
  TrendingUp, BarChart3, Lock, Briefcase, Upload, Image as ImageIcon, CheckCircle2, Layers, Loader2,
  ChevronDown, LayoutGrid, Zap, Share2, ShieldCheck, Filter, ArrowRight
} from "lucide-react";

export default function DashboardPage() {
  const { user, login, logout, isLoading: authLoading } = useAuth();
  const { locale, setLocale, isRtl, getLocalized } = useLanguage();

  // Navigation tab
  const [activeTab, setActiveTab] = useState<"overview" | "inquiries" | "posts" | "pages" | "portfolios" | "services" | "users" | "settings">("overview");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Data State
  const [stats, setStats] = useState<any>(null);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [pages, setPages] = useState<DynamicPageItem[]>([]);
  const [usersList, setUsersList] = useState<UserItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioItem | null>(null);

  // Forms State - Portfolio Modal Tabs
  const [portModalTab, setPortModalTab] = useState<"general" | "content" | "seo">("general");
  const [portTitleEn, setPortTitleEn] = useState("");
  const [portTitleAr, setPortTitleAr] = useState("");
  const [portSlugEn, setPortSlugEn] = useState("");
  const [portSlugAr, setPortSlugAr] = useState("");
  const [portClientEn, setPortClientEn] = useState("");
  const [portClientAr, setPortClientAr] = useState("");
  const [portCategory, setPortCategory] = useState("web");
  const [portTagsEn, setPortTagsEn] = useState("");
  const [portTagsAr, setPortTagsAr] = useState("");
  const [portIntroEn, setPortIntroEn] = useState("");
  const [portIntroAr, setPortIntroAr] = useState("");
  const [portHeroImage, setPortHeroImage] = useState("");
  const [portCompanyBgEn, setPortCompanyBgEn] = useState("");
  const [portCompanyBgAr, setPortCompanyBgAr] = useState("");
  const [portWorkExpImage, setPortWorkExpImage] = useState("");
  const [portWorkExpEn, setPortWorkExpEn] = useState("");
  const [portWorkExpAr, setPortWorkExpAr] = useState("");
  const [portShowcaseImage, setPortShowcaseImage] = useState("");
  const [portDesignConceptEn, setPortDesignConceptEn] = useState("");
  const [portDesignConceptAr, setPortDesignConceptAr] = useState("");
  const [portNextSlug, setPortNextSlug] = useState("weetas");
  const [portNextTitleEn, setPortNextTitleEn] = useState("Weetas");
  const [portNextTitleAr, setPortNextTitleAr] = useState("ويتاس للعقارات");
  const [portStatus, setPortStatus] = useState<"published" | "draft">("published");
  const [portIsPublished, setPortIsPublished] = useState(true);
  const [portMetaTitleEn, setPortMetaTitleEn] = useState("");
  const [portMetaTitleAr, setPortMetaTitleAr] = useState("");
  const [portMetaDescEn, setPortMetaDescEn] = useState("");
  const [portMetaDescAr, setPortMetaDescAr] = useState("");
  const [portMetaKeywordsEn, setPortMetaKeywordsEn] = useState("");
  const [portMetaKeywordsAr, setPortMetaKeywordsAr] = useState("");
  const [isUploadingPortHero, setIsUploadingPortHero] = useState(false);
  const [isUploadingPortWork, setIsUploadingPortWork] = useState(false);
  const [isUploadingPortShowcase, setIsUploadingPortShowcase] = useState(false);

  // Modals state
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<PostItem | null>(null);
  const [postModalTab, setPostModalTab] = useState<"general" | "content" | "seo">("general");
  const [isPageModalOpen, setIsPageModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<DynamicPageItem | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);

  // Settings state
  const [settingsWhatsapp, setSettingsWhatsapp] = useState("+966500000000");
  const [settingsEmail, setSettingsEmail] = useState("info@smarttouch.me");
  const [featuredPortfolios, setFeaturedPortfolios] = useState<string[]>(["homefix", "dala", "weetas"]);
  const [clientsList, setClientsList] = useState<any[]>([]);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsMessage, setSettingsMessage] = useState("");
  const [settingsError, setSettingsError] = useState("");

  // Modals state - Service
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [serviceModalTab, setServiceModalTab] = useState<"general" | "sections" | "content" | "seo">("general");
  const [serviceSections, setServiceSections] = useState<any[]>([]);
  const [activeSectionEditIndex, setActiveSectionEditIndex] = useState<number | null>(null);
  const [isJsonMode, setIsJsonMode] = useState(false);
  const [sectionsJsonText, setSectionsJsonText] = useState("");

  // Forms State - Service
  const [serviceTitleEn, setServiceTitleEn] = useState("");
  const [serviceTitleAr, setServiceTitleAr] = useState("");
  const [serviceSlugEn, setServiceSlugEn] = useState("");
  const [serviceSlugAr, setServiceSlugAr] = useState("");
  const [serviceShortDescEn, setServiceShortDescEn] = useState("");
  const [serviceShortDescAr, setServiceShortDescAr] = useState("");
  const [serviceFullContentEn, setServiceFullContentEn] = useState("");
  const [serviceFullContentAr, setServiceFullContentAr] = useState("");
  const [serviceIcon, setServiceIcon] = useState("Code2");
  const [serviceFeaturedImage, setServiceFeaturedImage] = useState("");
  const [serviceSortOrder, setServiceSortOrder] = useState(0);
  const [serviceStatus, setServiceStatus] = useState<"published" | "draft">("published");
  const [serviceMetaTitleEn, setServiceMetaTitleEn] = useState("");
  const [serviceMetaTitleAr, setServiceMetaTitleAr] = useState("");
  const [serviceMetaDescEn, setServiceMetaDescEn] = useState("");
  const [serviceMetaDescAr, setServiceMetaDescAr] = useState("");
  const [serviceMetaKeywordsEn, setServiceMetaKeywordsEn] = useState("");
  const [serviceMetaKeywordsAr, setServiceMetaKeywordsAr] = useState("");
  const [isUploadingServiceImage, setIsUploadingServiceImage] = useState(false);

  // Forms State - Post Modal Tabs
  const [postTitleEn, setPostTitleEn] = useState("");
  const [postTitleAr, setPostTitleAr] = useState("");
  const [postSlugEn, setPostSlugEn] = useState("");
  const [postSlugAr, setPostSlugAr] = useState("");
  const [postSummaryEn, setPostSummaryEn] = useState("");
  const [postSummaryAr, setPostSummaryAr] = useState("");
  const [postContentEn, setPostContentEn] = useState("");
  const [postContentAr, setPostContentAr] = useState("");
  const [postFeaturedImage, setPostFeaturedImage] = useState("");
  const [postCategoryId, setPostCategoryId] = useState("");
  const [postStatus, setPostStatus] = useState<"draft" | "published">("published");
  const [postMetaTitleEn, setPostMetaTitleEn] = useState("");
  const [postMetaTitleAr, setPostMetaTitleAr] = useState("");
  const [postMetaDescEn, setPostMetaDescEn] = useState("");
  const [postMetaDescAr, setPostMetaDescAr] = useState("");
  const [postMetaKeywordsEn, setPostMetaKeywordsEn] = useState("");
  const [postMetaKeywordsAr, setPostMetaKeywordsAr] = useState("");
  const [isUploadingPostBanner, setIsUploadingPostBanner] = useState(false);

  // Forms State - Page
  const [pageTitleEn, setPageTitleEn] = useState("");
  const [pageTitleAr, setPageTitleAr] = useState("");
  const [pageSlugEn, setPageSlugEn] = useState("");
  const [pageSlugAr, setPageSlugAr] = useState("");
  const [pageContentEn, setPageContentEn] = useState("");
  const [pageContentAr, setPageContentAr] = useState("");
  const [pageTemplate, setPageTemplate] = useState("default");

  // Forms State - User
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState<"admin" | "content" | "seo">("content");

  // Load Dashboard Data
  const loadDashboardData = async () => {
    if (!user) return;
    setIsLoadingData(true);
    try {
      const statsRes = await apiRequest("/dashboard/stats");
      if (statsRes.success) setStats(statsRes.data);

      if (user.role === "admin") {
        const inqRes = await apiRequest("/dashboard/inquiries");
        if (inqRes.success && inqRes.data) setInquiries(inqRes.data.data || []);
        
        const usersRes = await apiRequest("/dashboard/users");
        if (usersRes.success && usersRes.data) setUsersList(usersRes.data);

        try {
          const settRes = await apiRequest("/dashboard/settings");
          if (settRes.success && settRes.data) {
            if (settRes.data.whatsapp_number) setSettingsWhatsapp(settRes.data.whatsapp_number);
            if (settRes.data.inquiry_receiver_email) setSettingsEmail(settRes.data.inquiry_receiver_email);
            if (Array.isArray(settRes.data.featured_portfolios) && settRes.data.featured_portfolios.length === 3) {
              setFeaturedPortfolios(settRes.data.featured_portfolios);
            }
          }
        } catch {}

        try {
          const clRes = await apiRequest("/dashboard/clients");
          if (clRes.success && clRes.data) setClientsList(clRes.data);
        } catch {}
      }

      const postsRes = await apiRequest("/dashboard/posts");
      if (postsRes.success && postsRes.data) setPosts(postsRes.data.data || []);

      const pagesRes = await apiRequest("/dashboard/pages");
      if (pagesRes.success && pagesRes.data) setPages(pagesRes.data);

      const catsRes = await apiRequest("/categories");
      if (catsRes.success && catsRes.data) setCategories(catsRes.data);

      try {
        const srvRes = await apiRequest("/dashboard/services");
        if (srvRes.success && srvRes.data) setServices(srvRes.data);
      } catch {
        const srvRes = await apiRequest("/services");
        if (srvRes.success && srvRes.data) setServices(srvRes.data);
      }

      const portRes = await apiRequest("/dashboard/portfolios");
      if (portRes.success && portRes.data) {
        setPortfolios(portRes.data.data || portRes.data || []);
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");
    try {
      await login(loginEmail, loginPassword);
    } catch (err: any) {
      setLoginError(err.message || "Invalid credentials.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleUpdateInquiryStatus = async (id: number, newStatus: string) => {
    try {
      await apiRequest(`/dashboard/inquiries/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      loadDashboardData();
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus as any });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    setSettingsMessage("");
    setSettingsError("");
    try {
      const res = await apiRequest<{ success: boolean; message: string; data: any }>("/dashboard/settings", {
        method: "POST",
        body: JSON.stringify({
          whatsapp_number: settingsWhatsapp,
          inquiry_receiver_email: settingsEmail,
          featured_portfolios: featuredPortfolios,
        }),
      });
      if (res.success) {
        setSettingsMessage(res.message || "Settings updated successfully!");
        setTimeout(() => setSettingsMessage(""), 5000);
      }
    } catch (err: any) {
      setSettingsError(err?.message || "Failed to update settings");
      setTimeout(() => setSettingsError(""), 5000);
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleToggleClientStatus = async (client: any) => {
    try {
      await apiRequest(`/dashboard/clients/${client.id}`, {
        method: "PUT",
        body: JSON.stringify({ is_active: !client.is_active }),
      });
      setClientsList((prev) =>
        prev.map((c) => (c.id === client.id ? { ...c, is_active: !c.is_active } : c))
      );
    } catch (err) {
      console.error("Failed to toggle client status", err);
    }
  };

  const openCreatePost = () => {
    setEditingPost(null);
    setPostModalTab("general");
    setPostTitleEn("");
    setPostTitleAr("");
    setPostSlugEn("");
    setPostSlugAr("");
    setPostSummaryEn("");
    setPostSummaryAr("");
    setPostContentEn("");
    setPostContentAr("");
    setPostFeaturedImage("");
    setPostCategoryId("");
    setPostStatus("published");
    setPostMetaTitleEn("");
    setPostMetaTitleAr("");
    setPostMetaDescEn("");
    setPostMetaDescAr("");
    setPostMetaKeywordsEn("");
    setPostMetaKeywordsAr("");
    setIsPostModalOpen(true);
  };

  const openEditPost = (post: PostItem) => {
    setEditingPost(post);
    setPostModalTab("general");
    setPostTitleEn(post.title?.en || "");
    setPostTitleAr(post.title?.ar || "");
    setPostSlugEn(post.slug?.en || "");
    setPostSlugAr(post.slug?.ar || "");
    setPostSummaryEn(post.summary?.en || "");
    setPostSummaryAr(post.summary?.ar || "");
    setPostContentEn(post.content?.en || "");
    setPostContentAr(post.content?.ar || "");
    setPostFeaturedImage(post.featured_image || "");
    setPostCategoryId(post.category_id ? String(post.category_id) : "");
    setPostStatus(post.status || "published");
    setPostMetaTitleEn(post.seo?.meta_title?.en || "");
    setPostMetaTitleAr(post.seo?.meta_title?.ar || "");
    setPostMetaDescEn(post.seo?.meta_description?.en || "");
    setPostMetaDescAr(post.seo?.meta_description?.ar || "");
    setPostMetaKeywordsEn(
      typeof post.seo?.focus_keywords === "string" 
        ? post.seo.focus_keywords 
        : post.seo?.focus_keywords?.en || ""
    );
    setPostMetaKeywordsAr(
      typeof post.seo?.focus_keywords === "object" 
        ? post.seo?.focus_keywords?.ar || "" 
        : ""
    );
    setIsPostModalOpen(true);
  };

  const handleUploadPostBanner = async (file: File) => {
    try {
      setIsUploadingPostBanner(true);
      const res = await uploadImage(file);
      if (res && res.url) {
        setPostFeaturedImage(res.url);
      }
    } catch (err: any) {
      alert(err.message || "Failed to upload banner photo");
    } finally {
      setIsUploadingPostBanner(false);
    }
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
        title: { en: postTitleEn, ar: postTitleAr || postTitleEn },
        slug: { en: postSlugEn, ar: postSlugAr || postSlugEn },
        summary: { en: postSummaryEn, ar: postSummaryAr || postSummaryEn },
        content: { en: postContentEn, ar: postContentAr || postContentEn },
        category_id: postCategoryId ? Number(postCategoryId) : null,
        featured_image: postFeaturedImage || null,
        status: postStatus,
        seo: {
          meta_title: { en: postMetaTitleEn || postTitleEn, ar: postMetaTitleAr || postTitleAr || postTitleEn },
          meta_description: { en: postMetaDescEn || postSummaryEn, ar: postMetaDescAr || postSummaryAr || postSummaryEn },
          focus_keywords: { en: postMetaKeywordsEn, ar: postMetaKeywordsAr || postMetaKeywordsEn },
        },
      };

      if (editingPost) {
        await apiRequest(`/dashboard/posts/${editingPost.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await apiRequest("/dashboard/posts", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      setIsPostModalOpen(false);
      setEditingPost(null);
      loadDashboardData();
    } catch (err: any) {
      alert(err.message || "Error saving post");
    }
  };

  const handleDeletePost = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      await apiRequest(`/dashboard/posts/${id}`, { method: "DELETE" });
      loadDashboardData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleSavePage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title: { en: pageTitleEn, ar: pageTitleAr },
        slug: { en: pageSlugEn, ar: pageSlugAr },
        content: { en: pageContentEn, ar: pageContentAr },
        template: pageTemplate,
        is_active: true,
      };

      if (editingPage) {
        await apiRequest(`/dashboard/pages/${editingPage.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await apiRequest("/dashboard/pages", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      setIsPageModalOpen(false);
      setEditingPage(null);
      loadDashboardData();
    } catch (err: any) {
      alert(err.message || "Error saving page");
    }
  };

  const openEditPage = (page: DynamicPageItem) => {
    setEditingPage(page);
    setPageTitleEn(page.title.en || "");
    setPageTitleAr(page.title.ar || "");
    setPageSlugEn(page.slug.en || "");
    setPageSlugAr(page.slug.ar || "");
    setPageContentEn(page.content.en || "");
    setPageContentAr(page.content.ar || "");
    setPageTemplate(page.template || "default");
    setIsPageModalOpen(true);
  };

  const handleDeletePage = async (id: number) => {
    if (!confirm("Are you sure you want to delete this page?")) return;
    try {
      await apiRequest(`/dashboard/pages/${id}`, { method: "DELETE" });
      loadDashboardData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiRequest("/dashboard/users", {
        method: "POST",
        body: JSON.stringify({
          name: newUserName,
          email: newUserEmail,
          password: newUserPassword,
          role: newUserRole,
        }),
      });

      setIsUserModalOpen(false);
      setNewUserName("");
      setNewUserEmail("");
      setNewUserPassword("");
      loadDashboardData();
    } catch (err: any) {
      alert(err.message || "Error creating user");
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm("Are you sure you want to remove this user?")) return;
    try {
      await apiRequest(`/dashboard/users/${id}`, { method: "DELETE" });
      loadDashboardData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleUploadPortHero = async (file: File) => {
    try {
      setIsUploadingPortHero(true);
      const res = await uploadImage(file);
      if (res && res.url) {
        setPortHeroImage(res.url);
      }
    } catch (err: any) {
      alert(err.message || "Failed to upload hero image");
    } finally {
      setIsUploadingPortHero(false);
    }
  };

  const handleUploadPortWork = async (file: File) => {
    try {
      setIsUploadingPortWork(true);
      const res = await uploadImage(file);
      if (res && res.url) {
        setPortWorkExpImage(res.url);
      }
    } catch (err: any) {
      alert(err.message || "Failed to upload work experience image");
    } finally {
      setIsUploadingPortWork(false);
    }
  };

  const handleUploadPortShowcase = async (file: File) => {
    try {
      setIsUploadingPortShowcase(true);
      const res = await uploadImage(file);
      if (res && res.url) {
        setPortShowcaseImage(res.url);
      }
    } catch (err: any) {
      alert(err.message || "Failed to upload showcase collage");
    } finally {
      setIsUploadingPortShowcase(false);
    }
  };

  const openCreatePortfolio = () => {
    setEditingPortfolio(null);
    setPortModalTab("general");
    setPortTitleEn("");
    setPortTitleAr("");
    setPortSlugEn("");
    setPortSlugAr("");
    setPortClientEn("");
    setPortClientAr("");
    setPortCategory("web");
    setPortTagsEn("Content Writing, Web Design");
    setPortTagsAr("كتابة المحتوى, تصميم الويب");
    setPortIntroEn("");
    setPortIntroAr("");
    setPortHeroImage("/images/portfolio/shanifi-hero-mockup@2x.png");
    setPortCompanyBgEn("");
    setPortCompanyBgAr("");
    setPortWorkExpImage("/images/portfolio/shanifi-donuts@2x.png");
    setPortWorkExpEn("");
    setPortWorkExpAr("");
    setPortShowcaseImage("/images/portfolio/shanifi-showcase-collage@2x.png");
    setPortDesignConceptEn("");
    setPortDesignConceptAr("");
    setPortNextSlug("weetas");
    setPortNextTitleEn("Weetas");
    setPortNextTitleAr("ويتاس");
    setPortStatus("published");
    setPortIsPublished(true);
    setPortMetaTitleEn("");
    setPortMetaTitleAr("");
    setPortMetaDescEn("");
    setPortMetaDescAr("");
    setPortMetaKeywordsEn("");
    setPortMetaKeywordsAr("");
    setIsPortfolioModalOpen(true);
  };

  const openEditPortfolio = (p: PortfolioItem) => {
    setEditingPortfolio(p);
    setPortModalTab("general");
    setPortTitleEn(p.title?.en || "");
    setPortTitleAr(p.title?.ar || "");
    setPortSlugEn(p.slug?.en || "");
    setPortSlugAr(p.slug?.ar || "");
    setPortClientEn(p.client_name?.en || "");
    setPortClientAr(p.client_name?.ar || "");
    setPortCategory(p.category || "web");
    setPortTagsEn(p.tags?.en?.join(", ") || "");
    setPortTagsAr(p.tags?.ar?.join(", ") || "");
    setPortIntroEn(p.intro?.en || "");
    setPortIntroAr(p.intro?.ar || "");
    setPortHeroImage(p.hero_image || "");
    setPortCompanyBgEn(p.company_background?.en || "");
    setPortCompanyBgAr(p.company_background?.ar || "");
    setPortWorkExpImage(p.work_experience_image || "");
    setPortWorkExpEn(p.work_experience?.en || "");
    setPortWorkExpAr(p.work_experience?.ar || "");
    setPortShowcaseImage(p.showcase_image || "");
    setPortDesignConceptEn(p.design_concept?.en || "");
    setPortDesignConceptAr(p.design_concept?.ar || "");
    setPortNextSlug(p.next_project?.slug || "weetas");
    setPortNextTitleEn(p.next_project?.title?.en || "Weetas");
    setPortNextTitleAr(p.next_project?.title?.ar || "ويتاس");
    const isPub = p.is_published !== false && p.status !== "draft";
    setPortStatus(isPub ? "published" : "draft");
    setPortIsPublished(isPub);
    setPortMetaTitleEn(p.seo?.meta_title?.en || "");
    setPortMetaTitleAr(p.seo?.meta_title?.ar || "");
    setPortMetaDescEn(p.seo?.meta_description?.en || "");
    setPortMetaDescAr(p.seo?.meta_description?.ar || "");
    setPortMetaKeywordsEn(
      typeof p.seo?.focus_keywords === "string" 
        ? p.seo.focus_keywords 
        : p.seo?.focus_keywords?.en || ""
    );
    setPortMetaKeywordsAr(
      typeof p.seo?.focus_keywords === "object" 
        ? p.seo?.focus_keywords?.ar || "" 
        : ""
    );
    setIsPortfolioModalOpen(true);
  };

  const handleSavePortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
        title: { en: portTitleEn, ar: portTitleAr || portTitleEn },
        slug: { en: portSlugEn, ar: portSlugAr || portSlugEn },
        client_name: { en: portClientEn, ar: portClientAr || portClientEn },
        category: portCategory,
        tags: {
          en: portTagsEn.split(",").map((s) => s.trim()).filter(Boolean),
          ar: portTagsAr.split(",").map((s) => s.trim()).filter(Boolean),
        },
        intro: { en: portIntroEn, ar: portIntroAr || portIntroEn },
        hero_image: portHeroImage,
        company_background: { en: portCompanyBgEn, ar: portCompanyBgAr || portCompanyBgEn },
        work_experience_image: portWorkExpImage,
        work_experience: { en: portWorkExpEn, ar: portWorkExpAr || portWorkExpEn },
        showcase_image: portShowcaseImage,
        design_concept: { en: portDesignConceptEn, ar: portDesignConceptAr || portDesignConceptEn },
        next_project: {
          slug: portNextSlug,
          title: { en: portNextTitleEn, ar: portNextTitleAr || portNextTitleEn },
        },
        is_published: portStatus === "published",
        status: portStatus,
        seo: {
          meta_title: { en: portMetaTitleEn || portTitleEn, ar: portMetaTitleAr || portTitleAr || portTitleEn },
          meta_description: { en: portMetaDescEn || portIntroEn, ar: portMetaDescAr || portIntroAr || portIntroEn },
          focus_keywords: { en: portMetaKeywordsEn, ar: portMetaKeywordsAr || portMetaKeywordsEn },
        },
      };

      if (editingPortfolio) {
        await apiRequest(`/dashboard/portfolios/${editingPortfolio.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await apiRequest("/dashboard/portfolios", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      setIsPortfolioModalOpen(false);
      setEditingPortfolio(null);
      loadDashboardData();
    } catch (err: any) {
      alert(err.message || "Error saving portfolio project");
    }
  };

  const handleDeletePortfolio = async (id: number) => {
    if (!confirm("Are you sure you want to delete this portfolio project?")) return;
    try {
      await apiRequest(`/dashboard/portfolios/${id}`, { method: "DELETE" });
      loadDashboardData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const openCreateService = () => {
    setEditingService(null);
    setServiceTitleEn("");
    setServiceTitleAr("");
    setServiceSlugEn("");
    setServiceSlugAr("");
    setServiceShortDescEn("");
    setServiceShortDescAr("");
    setServiceFullContentEn("");
    setServiceFullContentAr("");
    setServiceIcon("Code2");
    setServiceFeaturedImage("");
    setServiceSortOrder(services.length + 1);
    setServiceStatus("published");
    setServiceMetaTitleEn("");
    setServiceMetaTitleAr("");
    setServiceMetaDescEn("");
    setServiceMetaDescAr("");
    setServiceMetaKeywordsEn("");
    setServiceMetaKeywordsAr("");
    setServiceSections([]);
    setActiveSectionEditIndex(null);
    setIsJsonMode(false);
    setSectionsJsonText("[]");
    setServiceModalTab("general");
    setIsServiceModalOpen(true);
  };

  const openEditService = (s: ServiceItem) => {
    setEditingService(s);
    setServiceTitleEn(s.title?.en || "");
    setServiceTitleAr(s.title?.ar || "");
    setServiceSlugEn(s.slug?.en || "");
    setServiceSlugAr(s.slug?.ar || "");
    setServiceShortDescEn(s.short_description?.en || "");
    setServiceShortDescAr(s.short_description?.ar || "");
    setServiceFullContentEn(s.full_content?.en || "");
    setServiceFullContentAr(s.full_content?.ar || "");
    setServiceIcon(s.icon || "Code2");
    setServiceFeaturedImage(s.featured_image || "");
    setServiceSortOrder(s.sort_order || 0);
    setServiceStatus(s.is_active ? "published" : "draft");
    setServiceMetaTitleEn(s.seo?.meta_title?.en || "");
    setServiceMetaTitleAr(s.seo?.meta_title?.ar || "");
    setServiceMetaDescEn(s.seo?.meta_description?.en || "");
    setServiceMetaDescAr(s.seo?.meta_description?.ar || "");
    setServiceMetaKeywordsEn(
      typeof s.seo?.focus_keywords === "string"
        ? s.seo.focus_keywords
        : s.seo?.focus_keywords?.en || ""
    );
    setServiceMetaKeywordsAr(
      typeof s.seo?.focus_keywords === "object"
        ? s.seo?.focus_keywords?.ar || ""
        : ""
    );
    const secs = Array.isArray(s.sections) ? JSON.parse(JSON.stringify(s.sections)) : [];
    setServiceSections(secs);
    setSectionsJsonText(JSON.stringify(secs, null, 2));
    setActiveSectionEditIndex(null);
    setIsJsonMode(false);
    setServiceModalTab("general");
    setIsServiceModalOpen(true);
  };

  const handleUploadServiceImage = async (file: File) => {
    setIsUploadingServiceImage(true);
    try {
      const res = await uploadImage(file);
      if (res && res.url) {
        setServiceFeaturedImage(res.url);
      }
    } catch (err: any) {
      alert(err.message || "Failed to upload service image");
    } finally {
      setIsUploadingServiceImage(false);
    }
  };

  const handleAddSection = (type: string) => {
    let newSec: any = {
      id: `${type}-${Date.now()}`,
      type,
      title: { en: "Section Title", ar: "عنوان القسم" },
    };

    if (type === "hero") {
      newSec.lead = { en: "Enter lead paragraph here...", ar: "أدخل الفقرة التمهيدية هنا..." };
      newSec.image = serviceFeaturedImage || "/images/services/web-app-hero.png";
      newSec.sublead = { en: "Enter additional lead content...", ar: "أدخل محتوى تفصيلي إضافي..." };
    } else if (type === "feature_split_list") {
      newSec.subtitle = { en: "Section subtitle", ar: "وصف موجز للقسم" };
      newSec.theme = "default";
      newSec.items = [
        {
          title: { en: "Feature Item", ar: "ميزة أساسية" },
          description: { en: "Feature description...", ar: "شرح الميزة..." },
          image: "/images/services/web-dev-website.png",
          checkpoints: [
            { en: "Key benefit point 1", ar: "ميزة ونقطة قوة 1" },
            { en: "Key benefit point 2", ar: "ميزة ونقطة قوة 2" }
          ]
        }
      ];
    } else if (type === "card_grid") {
      newSec.subtitle = { en: "Cards grid description", ar: "وصف لشبكة البطاقات" };
      newSec.columns = 3;
      newSec.cards = [
        {
          icon: "Zap",
          title: { en: "Fast Performance", ar: "أداء سريع وفائق" },
          description: { en: "Description for card 1", ar: "شرح تفصيلي للبطاقة" }
        },
        {
          icon: "ShieldCheck",
          title: { en: "Secure Architecture", ar: "أمان متقدم" },
          description: { en: "Description for card 2", ar: "شرح تفصيلي للبطاقة" }
        },
        {
          icon: "TrendingUp",
          title: { en: "Measurable Growth", ar: "نمو مستمر" },
          description: { en: "Description for card 3", ar: "شرح تفصيلي للبطاقة" }
        }
      ];
    } else if (type === "pricing_tiers") {
      newSec.title = { en: "Choose Your Plan", ar: "اختر الباقة المناسبة لك" };
      newSec.tiers = [
        {
          name: { en: "Starter", ar: "الباقة الأساسية" },
          price: "$1,500",
          period: { en: "/month", ar: "/شهرياً" },
          description: { en: "Ideal for starter setups", ar: "مثالية للمشاريع الناشئة" },
          features: [
            { en: "Social Media Management", ar: "إدارة منصات التواصل" },
            { en: "Paid Ads", ar: "إعلانات ممولة" },
            { en: "Content Creation", ar: "صناعة المحتوى" },
            { en: "Analytics & Reporting", ar: "تقارير شهرية" }
          ],
          cta_text: { en: "Get Started", ar: "ابدأ الآن" },
          cta_link: "/contact"
        }
      ];
    } else if (type === "platform_logos") {
      newSec.title = { en: "CRM Setup & Integration", ar: "إعداد ودمج أنظمة إدارة علاقات العملاء" };
      newSec.platforms = [
        { name: "HubSpot", logo: "/images/services/crm-platform-hubspot.png" },
        { name: "Salesforce", logo: "/images/services/crm-platform-salesforce.png" },
        { name: "Zoho", logo: "/images/services/crm-platform-zoho.png" },
        { name: "Odoo", logo: "/images/services/crm-platform-odoo.png" }
      ];
      newSec.cards = [
        {
          icon: "Users",
          title: { en: "CRM Setup", ar: "تهيئة النظام" },
          description: { en: "Pipeline configuration matching your business", ar: "تهيئة مسار المبيعات بما يناسب أعمالك" }
        }
      ];
    } else if (type === "why_us") {
      newSec.title = { en: "Why Smart Touch?", ar: "لماذا سمارت تاتش؟" };
      newSec.description = { en: "Things that genuinely set us apart", ar: "ما يميز خبرتنا وخدماتنا" };
      newSec.image = "/images/services/web-dev-why-us.png";
      newSec.checkpoints = [
        { en: "Dedicated strategy built for your business", ar: "استراتيجية مخصصة لعملك" },
        { en: "Experienced team with proven track record", ar: "فريق ذو خبرة موثوقة" },
        { en: "Ongoing support after launch", ar: "دعم مستمر بعد التدشين" }
      ];
    } else if (type === "faq_accordion") {
      newSec.title = { en: "Frequently Asked Questions", ar: "الأسئلة الشائعة" };
      newSec.items = [
        {
          question: { en: "How long does implementation take?", ar: "كم من الوقت يستغرق التنفيذ؟" },
          answer: { en: "Depending on scope, typical projects take 2-4 weeks.", ar: "يعتمد ذلك على النطاق، عادةً من أسبوعين إلى 4 أسابيع." }
        }
      ];
    } else if (type === "cta_banner") {
      newSec.title = { en: "Ready To Start Your Project?", ar: "جاهز لبدء مشروعك معنا؟" };
      newSec.subtitle = { en: "Contact us today to discuss details.", ar: "تواصل معنا اليوم لمناقشة التفاصيل." };
      newSec.button_text = { en: "Contact Us", ar: "تواصل معنا" };
      newSec.button_link = "/contact";
      newSec.theme = "laptop";
      newSec.image = "/images/services/web-dev-cta-banner.png";
    }

    const updated = [...serviceSections, newSec];
    setServiceSections(updated);
    setSectionsJsonText(JSON.stringify(updated, null, 2));
    setActiveSectionEditIndex(updated.length - 1);
  };

  const handleMoveSection = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= serviceSections.length) return;
    const updated = [...serviceSections];
    const item = updated.splice(fromIdx, 1)[0];
    updated.splice(toIdx, 0, item);
    setServiceSections(updated);
    setSectionsJsonText(JSON.stringify(updated, null, 2));
    setActiveSectionEditIndex(toIdx);
  };

  const handleDeleteSection = (idx: number) => {
    if (!confirm("Are you sure you want to remove this section?")) return;
    const updated = serviceSections.filter((_, i) => i !== idx);
    setServiceSections(updated);
    setSectionsJsonText(JSON.stringify(updated, null, 2));
    setActiveSectionEditIndex(null);
  };

  const handleUpdateSection = (idx: number, updatedSec: any) => {
    const updated = [...serviceSections];
    updated[idx] = updatedSec;
    setServiceSections(updated);
    setSectionsJsonText(JSON.stringify(updated, null, 2));
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let finalSections = serviceSections;
      if (isJsonMode) {
        try {
          finalSections = JSON.parse(sectionsJsonText);
        } catch (jsonErr: any) {
          alert("Invalid JSON syntax in Sections Editor: " + jsonErr.message);
          return;
        }
      }

      const payload: any = {
        title: { en: serviceTitleEn, ar: serviceTitleAr || serviceTitleEn },
        slug: { en: serviceSlugEn, ar: serviceSlugAr || serviceSlugEn },
        short_description: { en: serviceShortDescEn, ar: serviceShortDescAr || serviceShortDescEn },
        full_content: { en: serviceFullContentEn, ar: serviceFullContentAr || serviceFullContentEn },
        icon: serviceIcon,
        sections: finalSections,
        featured_image: serviceFeaturedImage,
        sort_order: Number(serviceSortOrder),
        is_active: serviceStatus === "published",
        status: serviceStatus,
        seo: {
          meta_title: { en: serviceMetaTitleEn || serviceTitleEn, ar: serviceMetaTitleAr || serviceTitleAr || serviceTitleEn },
          meta_description: { en: serviceMetaDescEn || serviceShortDescEn, ar: serviceMetaDescAr || serviceShortDescAr || serviceShortDescEn },
          focus_keywords: { en: serviceMetaKeywordsEn, ar: serviceMetaKeywordsAr || serviceMetaKeywordsEn },
        },
      };

      if (editingService) {
        await apiRequest(`/dashboard/services/${editingService.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await apiRequest("/dashboard/services", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      setIsServiceModalOpen(false);
      setEditingService(null);
      loadDashboardData();
    } catch (err: any) {
      alert(err.message || "Error saving service");
    }
  };

  const handleDeleteService = async (id: number) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await apiRequest(`/dashboard/services/${id}`, { method: "DELETE" });
      loadDashboardData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "contacted":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "in_discussion":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      case "proposal_sent":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/30";
      case "won":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "lost":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      default:
        return "bg-slate-800 text-slate-400 border-slate-700";
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur">
          <div className="text-center mb-8 space-y-2">
            <div className="w-12 h-12 bg-indigo-600/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto border border-indigo-500/30 mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Agency Portal Login</h1>
            <p className="text-xs text-slate-400">Authenticate with your assigned staff credentials</p>
          </div>

          {loginError && (
            <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="staff@smarttouch.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoggingIn ? "Authenticating..." : "Sign In to Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-lg">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">{user.name}</h1>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider border ${
                  user.role === "admin" ? "bg-purple-500/10 text-purple-400 border-purple-500/30" :
                  user.role === "content" ? "bg-blue-500/10 text-blue-400 border-blue-500/30" :
                  "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                }`}>
                  Role: {user.role}
                </span>
              </div>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLocale(locale === "en" ? "ar" : "en")}
              className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>{locale === "en" ? "عربي" : "EN"}</span>
            </button>

            <button
              onClick={logout}
              className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-xs font-semibold text-rose-300 flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === "overview"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview & KPIs</span>
          </button>

          {user.role === "admin" && (
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === "inquiries"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <Inbox className="w-4 h-4" />
              <span>Inquiries Pipeline</span>
              {inquiries.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-indigo-500/40 text-[10px] font-mono">
                  {inquiries.length}
                </span>
              )}
            </button>
          )}

          <button
            onClick={() => setActiveTab("posts")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === "posts"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Blog CMS</span>
          </button>

          <button
            onClick={() => setActiveTab("portfolios")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === "portfolios"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Portfolios</span>
            {portfolios.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-indigo-500/40 text-[10px] font-mono">
                {portfolios.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === "services"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Services Catalog</span>
            {services.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-indigo-500/40 text-[10px] font-mono">
                {services.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("pages")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === "pages"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Dynamic Pages</span>
          </button>

          {user.role === "admin" && (
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === "users"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Users & RBAC</span>
            </button>
          )}

          {user.role === "admin" && (
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === "settings"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>General Settings</span>
            </button>
          )}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 space-y-2">
                <span className="text-xs font-semibold text-slate-400">Total Inquiries</span>
                <div className="text-3xl font-extrabold text-white">{stats?.inquiries_count ?? inquiries.length}</div>
                <div className="text-xs text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Real-time captured leads</span>
                </div>
              </div>

              <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 space-y-2">
                <span className="text-xs font-semibold text-slate-400">Published Blog Posts</span>
                <div className="text-3xl font-extrabold text-white">{stats?.published_posts_count ?? posts.length}</div>
                <div className="text-xs text-indigo-400">Bilingual English & Arabic</div>
              </div>

              <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 space-y-2">
                <span className="text-xs font-semibold text-slate-400">Active Dynamic Pages</span>
                <div className="text-3xl font-extrabold text-white">{pages.length}</div>
                <div className="text-xs text-purple-400">Custom page management</div>
              </div>

              <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 space-y-2">
                <span className="text-xs font-semibold text-slate-400">Agency Capabilities</span>
                <div className="text-3xl font-extrabold text-white">{services.length}</div>
                <div className="text-xs text-pink-400">Core service catalog</div>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-900/40 border border-slate-800 p-6 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Quick Actions</h3>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={openCreatePost}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-indigo-600/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Blog Post</span>
                </button>

                <button
                  onClick={() => {
                    setEditingPage(null);
                    setPageTitleEn("");
                    setPageTitleAr("");
                    setPageSlugEn("");
                    setPageSlugAr("");
                    setPageContentEn("");
                    setPageContentAr("");
                    setIsPageModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 border border-slate-700 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Dynamic Page</span>
                </button>

                {user.role === "admin" && (
                  <button
                    onClick={() => setIsUserModalOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 border border-slate-700 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create User Account</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "inquiries" && user.role === "admin" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Client Inquiries & Lead Pipeline</h2>
                <p className="text-xs text-slate-400">Captured through Contact Us and Service pages</p>
              </div>
              <button
                onClick={loadDashboardData}
                className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white"
              >
                Refresh Stream
              </button>
            </div>

            <div className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left rtl:text-right text-xs">
                  <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4">Client Name & Email</th>
                      <th className="px-6 py-4">Target Service</th>
                      <th className="px-6 py-4">Budget Range</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4 text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-white">{inq.name}</div>
                          <div className="text-slate-400 text-[11px]">{inq.email}</div>
                          {inq.company && <div className="text-indigo-400 text-[10px]">{inq.company}</div>}
                        </td>
                        <td className="px-6 py-4 font-medium">
                          {inq.service_name || (inq.service ? getLocalized(inq.service.title) : "General Inquiry")}
                        </td>
                        <td className="px-6 py-4 font-mono text-slate-300">
                          {inq.budget_range || "Unspecified"}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(inq.status)} bg-slate-900`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="in_discussion">In Discussion</option>
                            <option value="proposal_sent">Proposal Sent</option>
                            <option value="won">Won</option>
                            <option value="lost">Lost</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-slate-400">
                          {new Date(inq.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-end">
                          <button
                            onClick={() => setSelectedInquiry(inq)}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-semibold"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "posts" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Agency Blog CMS</h2>
                <p className="text-xs text-slate-400">Create, edit, and publish articles in English & Arabic</p>
              </div>

              {(user.role === "admin" || user.role === "content") && (
                <button
                  onClick={openCreatePost}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Post</span>
                </button>
              )}
            </div>

            <div className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-xl">
              <table className="w-full text-left rtl:text-right text-xs">
                <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Title (EN / AR)</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Author</th>
                    <th className="px-6 py-4 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-800/40">
                      <td className="px-6 py-4">
                        <div className="font-bold text-white">{post.title.en}</div>
                        <div className="text-slate-400 text-[11px] font-sans" dir="rtl">{post.title.ar}</div>
                      </td>
                      <td className="px-6 py-4">
                        {post.category ? getLocalized(post.category.name) : "General"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          post.status === "published" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                        }`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        {post.author ? post.author.name : "System"}
                      </td>
                      <td className="px-6 py-4 text-end space-x-2 rtl:space-x-reverse">
                        <button
                          onClick={() => openEditPost(post)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300"
                          title="Edit Post"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        {(user.role === "admin" || user.role === "content") && (
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-rose-400"
                            title="Delete Post"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "pages" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Dynamic Website Pages</h2>
                <p className="text-xs text-slate-400">Add, edit, and localize custom pages (About, Terms, Landing)</p>
              </div>

              {(user.role === "admin" || user.role === "content") && (
                <button
                  onClick={() => {
                    setEditingPage(null);
                    setPageTitleEn("");
                    setPageTitleAr("");
                    setPageSlugEn("");
                    setPageSlugAr("");
                    setPageContentEn("");
                    setPageContentAr("");
                    setIsPageModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Page</span>
                </button>
              )}
            </div>

            <div className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-xl">
              <table className="w-full text-left rtl:text-right text-xs">
                <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Title & Slug</th>
                    <th className="px-6 py-4">Template</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {pages.map((page) => (
                    <tr key={page.id} className="hover:bg-slate-800/40">
                      <td className="px-6 py-4">
                        <div className="font-bold text-white">{page.title.en}</div>
                        <div className="text-slate-400 text-[11px]">/{page.slug.en}</div>
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-400">{page.template}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 text-end space-x-2 rtl:space-x-reverse">
                        <button
                          onClick={() => openEditPage(page)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300"
                          title="Edit Page"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        {(user.role === "admin" || user.role === "content") && (
                          <button
                            onClick={() => handleDeletePage(page.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-rose-400"
                            title="Delete Page"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "portfolios" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Portfolio Projects & Case Studies</h2>
                <p className="text-xs text-slate-400">Manage featured client work, inner case studies, and live showcase details</p>
              </div>

              {(user.role === "admin" || user.role === "content") && (
                <button
                  onClick={openCreatePortfolio}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              )}
            </div>

            {/* Homepage Featured Strip Banner */}
            <div className="rounded-2xl bg-indigo-950/40 border border-indigo-500/30 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0 text-indigo-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>Homepage Showcase ("Our Selected Work")</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      3 Featured Slots
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Live slots: <span className="font-semibold text-slate-200">{featuredPortfolios.join(" • ")}</span> (hover state activates deep navy spotlight)
                  </div>
                </div>
              </div>
              {user.role === "admin" && (
                <button
                  type="button"
                  onClick={() => setActiveTab("settings")}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-400/30 text-indigo-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Configure Homepage 3</span>
                </button>
              )}
            </div>

            <div className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-xl">
              <table className="w-full text-left rtl:text-right text-xs">
                <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Project</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Slug / Inner URL</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {portfolios.map((p) => {
                    const pSlug = typeof p.slug === "object" ? p.slug?.en : p.slug;
                    const isFeatured = featuredPortfolios.includes(pSlug);
                    return (
                      <tr key={p.id} className="hover:bg-slate-800/40">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {p.hero_image ? (
                              <img src={p.hero_image} alt={p.title.en} className="w-12 h-9 rounded-lg object-cover border border-slate-700 shrink-0" />
                            ) : (
                              <div className="w-12 h-9 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                                <Briefcase className="w-4 h-4 text-slate-500" />
                              </div>
                            )}
                            <div>
                              <div className="font-bold text-white flex items-center gap-2">
                                <span>{p.title.en}</span>
                                {isFeatured && (
                                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                    ★ Featured
                                  </span>
                                )}
                              </div>
                              <div className="text-slate-400 text-[11px]">{p.title.ar}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono text-indigo-400 font-semibold uppercase">{p.category}</td>
                        <td className="px-6 py-4 text-slate-400 font-mono text-[11px]">
                          /portfolio/{p.slug.en}.html
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.is_published !== false ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" : "bg-slate-700 text-slate-400"
                          }`}>
                            {p.is_published !== false ? "Published" : "Draft"}
                          </span>
                        </td>
                      <td className="px-6 py-4 text-end space-x-2 rtl:space-x-reverse">
                        <a
                          href={`/en/portfolio/${p.slug.en}.html`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                          title="View Live Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        {(user.role === "admin" || user.role === "content") && (
                          <button
                            onClick={() => openEditPortfolio(p)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 cursor-pointer"
                            title="Edit Project"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {user.role === "admin" && (
                          <button
                            onClick={() => handleDeletePortfolio(p.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-rose-400 cursor-pointer"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
                  {portfolios.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                        No portfolio projects found. Click "+ Add Project" to create one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "services" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-400" />
                  <span>Services Catalog & Solutions</span>
                </h2>
                <p className="text-xs text-slate-400">Manage digital service offerings, full HTML content, banner photos, and SEO metadata</p>
              </div>

              {(user.role === "admin" || user.role === "content") && (
                <button
                  onClick={openCreateService}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 cursor-pointer self-start sm:self-auto transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Service</span>
                </button>
              )}
            </div>

            <div className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-xl">
              <table className="w-full text-left rtl:text-right text-xs">
                <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4">Anchor / Slug</th>
                    <th className="px-6 py-4">Order</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {services.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {s.featured_image ? (
                            <img
                              src={s.featured_image}
                              alt={s.title?.en || "Service"}
                              onError={(e) => {
                                const target = e.currentTarget;
                                if (!target.src.includes(":8000") && s.featured_image?.startsWith("/")) {
                                  target.src = `http://localhost:8000${s.featured_image}`;
                                }
                              }}
                              className="w-10 h-10 rounded-lg object-cover border border-slate-700 shrink-0 bg-slate-800"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                              <Layers className="w-5 h-5" />
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-white text-sm">{s.title?.en || "Untitled Service"}</div>
                            <div className="text-slate-400 text-[11px] font-sans" dir="rtl">{s.title?.ar || ""}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-indigo-400 text-xs">
                        #service-{s.slug?.en || s.id}
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-300">
                        {s.sort_order ?? 0}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          s.is_active !== false && s.status !== "draft"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : "bg-slate-700 text-slate-400"
                        }`}>
                          {s.is_active !== false && s.status !== "draft" ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-end space-x-2 rtl:space-x-reverse">
                        <a
                          href={`/en/services.html#service-${s.slug?.en || s.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                          title="View on Services Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        {(user.role === "admin" || user.role === "content") && (
                          <button
                            onClick={() => openEditService(s)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 cursor-pointer transition-colors"
                            title="Edit Service"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {user.role === "admin" && (
                          <button
                            onClick={() => handleDeleteService(s.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-rose-400 cursor-pointer transition-colors"
                            title="Delete Service"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {services.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                        No services found. Click "+ Add Service" to create one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "users" && user.role === "admin" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Staff Users & Roles (RBAC)</h2>
                <p className="text-xs text-slate-400">Manage administrator, content creator, and SEO specialist accounts</p>
              </div>

              <button
                onClick={() => setIsUserModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30"
              >
                <Plus className="w-4 h-4" />
                <span>Add User</span>
              </button>
            </div>

            <div className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-xl">
              <table className="w-full text-left rtl:text-right text-xs">
                <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Assigned Role</th>
                    <th className="px-6 py-4">Role Permissions</th>
                    <th className="px-6 py-4 text-end">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {usersList.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-800/40">
                      <td className="px-6 py-4">
                        <div className="font-bold text-white">{u.name}</div>
                        <div className="text-slate-400 text-[11px]">{u.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                          u.role === "admin" ? "bg-purple-500/10 text-purple-400 border border-purple-500/30" :
                          u.role === "content" ? "bg-blue-500/10 text-blue-400 border border-blue-500/30" :
                          "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        {u.role === "admin" && "Full administrative control, inquiries, user management"}
                        {u.role === "content" && "Create/edit blog posts & dynamic pages"}
                        {u.role === "seo" && "Edit SEO metadata & structured data"}
                      </td>
                      <td className="px-6 py-4 text-end">
                        {u.id !== user.id && (
                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-rose-400"
                            title="Delete User"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "settings" && user.role === "admin" && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">General Agency Settings</h2>
                <p className="text-xs text-slate-400">Configure global contact routing, agency WhatsApp number, and lead inquiry notification recipients.</p>
              </div>
            </div>

            <form onSubmit={handleSaveSettings} className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8 space-y-6 shadow-xl">
              {settingsMessage && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{settingsMessage}</span>
                </div>
              )}

              {settingsError && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{settingsError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. WhatsApp Number */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Agency WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={settingsWhatsapp}
                    onChange={(e) => setSettingsWhatsapp(e.target.value)}
                    placeholder="+966500000000"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-mono focus:ring-2 focus:ring-indigo-500/50"
                  />
                  <p className="text-[11px] text-slate-500">
                    Include country code without spaces (e.g. <code>+966500000000</code>). Powers all WhatsApp CTA buttons on website.
                  </p>
                  {settingsWhatsapp && (
                    <div className="pt-1">
                      <a
                        href={`https://wa.me/${settingsWhatsapp.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Test WhatsApp Click-to-Chat</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* 2. Inquiry Receiver Email */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Inquiry Receiver Email
                  </label>
                  <input
                    type="email"
                    value={settingsEmail}
                    onChange={(e) => setSettingsEmail(e.target.value)}
                    placeholder="info@smarttouch.me"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-mono focus:ring-2 focus:ring-indigo-500/50"
                  />
                  <p className="text-[11px] text-slate-500">
                    Email address where incoming lead inquiries from contact forms and service pages are dispatched.
                  </p>
                </div>

                {/* 3. Homepage Featured Work (Our Selected Work) */}
                <div className="md:col-span-2 pt-6 border-t border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-indigo-400" />
                        <span>Homepage Featured Work ("Our Selected Work")</span>
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Select which 3 portfolio items are spotlighted on the homepage. Default state is light; hover state displays the deep navy blue gradient.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Slot 1: Left */}
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                          Slot 1 (Left Card)
                        </label>
                        <span className="text-[10px] text-slate-500 font-mono">Position 1</span>
                      </div>
                      <select
                        value={featuredPortfolios[0] || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFeaturedPortfolios([val, featuredPortfolios[1] || "", featuredPortfolios[2] || ""]);
                        }}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
                      >
                        {portfolios.map((p) => {
                          const s = typeof p.slug === "object" ? p.slug?.en : p.slug;
                          const t = typeof p.title === "object" ? p.title?.en : p.title;
                          return (
                            <option key={p.id} value={s}>
                              {t} ({s})
                            </option>
                          );
                        })}
                      </select>
                      {(() => {
                        const item = portfolios.find(p => (typeof p.slug === "object" ? p.slug?.en : p.slug) === featuredPortfolios[0]);
                        if (!item) return null;
                        return (
                          <div className="flex items-center gap-2.5 pt-2 text-[11px] text-slate-300">
                            {item.thumbnail_image || item.hero_image ? (
                              <img src={item.thumbnail_image || item.hero_image} alt="" className="w-10 h-7 rounded object-cover border border-slate-700 shrink-0" />
                            ) : null}
                            <div className="truncate">
                              <span className="font-semibold text-white">{typeof item.title === "object" ? item.title.en : item.title}</span>
                              <div className="text-[10px] text-slate-500">{item.category}</div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Slot 2: Center */}
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                          Slot 2 (Center Card)
                        </label>
                        <span className="text-[10px] text-slate-500 font-mono">Position 2</span>
                      </div>
                      <select
                        value={featuredPortfolios[1] || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFeaturedPortfolios([featuredPortfolios[0] || "", val, featuredPortfolios[2] || ""]);
                        }}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
                      >
                        {portfolios.map((p) => {
                          const s = typeof p.slug === "object" ? p.slug?.en : p.slug;
                          const t = typeof p.title === "object" ? p.title?.en : p.title;
                          return (
                            <option key={p.id} value={s}>
                              {t} ({s})
                            </option>
                          );
                        })}
                      </select>
                      {(() => {
                        const item = portfolios.find(p => (typeof p.slug === "object" ? p.slug?.en : p.slug) === featuredPortfolios[1]);
                        if (!item) return null;
                        return (
                          <div className="flex items-center gap-2.5 pt-2 text-[11px] text-slate-300">
                            {item.thumbnail_image || item.hero_image ? (
                              <img src={item.thumbnail_image || item.hero_image} alt="" className="w-10 h-7 rounded object-cover border border-slate-700 shrink-0" />
                            ) : null}
                            <div className="truncate">
                              <span className="font-semibold text-white">{typeof item.title === "object" ? item.title.en : item.title}</span>
                              <div className="text-[10px] text-slate-500">{item.category}</div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Slot 3: Right */}
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                          Slot 3 (Right Card)
                        </label>
                        <span className="text-[10px] text-slate-500 font-mono">Position 3</span>
                      </div>
                      <select
                        value={featuredPortfolios[2] || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFeaturedPortfolios([featuredPortfolios[0] || "", featuredPortfolios[1] || "", val]);
                        }}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
                      >
                        {portfolios.map((p) => {
                          const s = typeof p.slug === "object" ? p.slug?.en : p.slug;
                          const t = typeof p.title === "object" ? p.title?.en : p.title;
                          return (
                            <option key={p.id} value={s}>
                              {t} ({s})
                            </option>
                          );
                        })}
                      </select>
                      {(() => {
                        const item = portfolios.find(p => (typeof p.slug === "object" ? p.slug?.en : p.slug) === featuredPortfolios[2]);
                        if (!item) return null;
                        return (
                          <div className="flex items-center gap-2.5 pt-2 text-[11px] text-slate-300">
                            {item.thumbnail_image || item.hero_image ? (
                              <img src={item.thumbnail_image || item.hero_image} alt="" className="w-10 h-7 rounded object-cover border border-slate-700 shrink-0" />
                            ) : null}
                            <div className="truncate">
                              <span className="font-semibold text-white">{typeof item.title === "object" ? item.title.en : item.title}</span>
                              <div className="text-[10px] text-slate-500">{item.category}</div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isSavingSettings}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSavingSettings ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Settings...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Save General Settings</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* 4. Client Brands Section (Connected to Database) */}
            <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-indigo-400" />
                    <span>Top Client Brands ({clientsList.length} Connected in Database)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage client brand logos displayed dynamically across Homepage, Services, and About Us pages.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {clientsList.map((client) => {
                  const clientName = typeof client.name === "object" ? client.name.en : client.name;
                  return (
                    <div
                      key={client.id}
                      className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-between text-center gap-2 ${
                        client.is_active
                          ? "bg-slate-950/70 border-slate-800"
                          : "bg-slate-950/30 border-slate-800/40 opacity-50"
                      }`}
                    >
                      <div className="w-full h-12 flex items-center justify-center bg-white/5 rounded-xl p-2">
                        <img
                          src={client.logo}
                          alt={clientName}
                          className="max-h-8 max-w-full object-contain filter brightness-90 contrast-125"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      </div>
                      <div className="w-full">
                        <div className="text-[11px] font-bold text-white truncate" title={clientName}>
                          {clientName}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleToggleClientStatus(client)}
                          className={`mt-1.5 w-full py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                            client.is_active
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                              : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700"
                          }`}
                        >
                          {client.is_active ? "Active" : "Disabled"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Portfolio Modal with 3 Tabs: General, Content, Meta SEO */}
      <Modal
        isOpen={isPortfolioModalOpen}
        onClose={() => setIsPortfolioModalOpen(false)}
        title={editingPortfolio ? "Edit Portfolio Project" : "Add New Portfolio Project"}
        maxWidth="4xl"
      >
        <form onSubmit={handleSavePortfolio} className="space-y-5 text-xs max-h-[78vh] overflow-y-auto pr-1">
          {/* Tabs Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <button
              type="button"
              onClick={() => setPortModalTab("general")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                portModalTab === "general"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>General</span>
            </button>
            <button
              type="button"
              onClick={() => setPortModalTab("content")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                portModalTab === "content"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Content</span>
            </button>
            <button
              type="button"
              onClick={() => setPortModalTab("seo")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                portModalTab === "seo"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Meta SEO</span>
            </button>
          </div>

          {/* TAB 1: GENERAL */}
          {portModalTab === "general" && (
            <div className="space-y-4">
              {/* Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Project Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={portTitleEn}
                    onChange={(e) => {
                      setPortTitleEn(e.target.value);
                      if (!editingPortfolio) setPortSlugEn(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                    }}
                    placeholder="e.g. Shanifi Fresh Food"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Project Title (Arabic) *</label>
                  <input
                    type="text"
                    required
                    dir="rtl"
                    value={portTitleAr}
                    onChange={(e) => setPortTitleAr(e.target.value)}
                    placeholder="مثال: الشنيفي للمنتجات الطازجة"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Slugs, Category, and Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">URL Slug (English) *</label>
                  <input
                    type="text"
                    required
                    value={portSlugEn}
                    onChange={(e) => setPortSlugEn(e.target.value)}
                    placeholder="e.g. shanifi"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 font-mono text-xs"
                  />
                  <span className="text-[10px] text-slate-500">Live URL: /portfolio/{portSlugEn || "slug"}.html</span>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category *</label>
                  <select
                    value={portCategory}
                    onChange={(e) => setPortCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="web">Web Development</option>
                    <option value="branding">Branding</option>
                    <option value="photo">Photography</option>
                    <option value="packaging">Packaging Design</option>
                    <option value="brochure">Brochure Design</option>
                    <option value="uiux">UI/UX Design</option>
                    <option value="app">APP / Mobile</option>
                    <option value="content">Content Writing</option>
                    <option value="pr">Public Relations</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Publishing Status *</label>
                  <select
                    value={portStatus}
                    onChange={(e) => {
                      const st = e.target.value as "published" | "draft";
                      setPortStatus(st);
                      setPortIsPublished(st === "published");
                    }}
                    className={`w-full px-3 py-2 rounded-xl border font-bold focus:outline-none ${
                      portStatus === "published"
                        ? "bg-emerald-950/50 border-emerald-500/50 text-emerald-300"
                        : "bg-amber-950/50 border-amber-500/50 text-amber-300"
                    }`}
                  >
                    <option value="published">Published (Live Portfolio)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Client & Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Client Name (English & Arabic)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={portClientEn}
                      onChange={(e) => setPortClientEn(e.target.value)}
                      placeholder="Client Name EN"
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      dir="rtl"
                      value={portClientAr}
                      onChange={(e) => setPortClientAr(e.target.value)}
                      placeholder="اسم العميل بالعربية"
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Tags (Comma separated)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={portTagsEn}
                      onChange={(e) => setPortTagsEn(e.target.value)}
                      placeholder="Content Writing, Web Design"
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      dir="rtl"
                      value={portTagsAr}
                      onChange={(e) => setPortTagsAr(e.target.value)}
                      placeholder="كتابة المحتوى, تصميم الويب"
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Hero Banner Upload */}
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Hero Mockup Banner Photo</span>
                  </label>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-xs font-semibold transition-colors">
                    {isUploadingPortHero ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>Upload Banner</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleUploadPortHero(f);
                      }}
                    />
                  </label>
                </div>
                <div className="flex gap-3 items-center">
                  {portHeroImage && (
                    <img
                      src={portHeroImage}
                      alt="Banner Preview"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.includes(":8000") && portHeroImage.startsWith("/")) {
                          target.src = `http://localhost:8000${portHeroImage}`;
                        }
                      }}
                      className="w-20 h-14 rounded-lg object-cover border border-slate-700 shrink-0 bg-slate-900"
                    />
                  )}
                  <input
                    type="text"
                    value={portHeroImage}
                    onChange={(e) => setPortHeroImage(e.target.value)}
                    placeholder="https://... or /images/portfolio/..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none font-mono text-[11px]"
                  />
                </div>
              </div>

              {/* Intro statement */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Hero Intro (English)</label>
                  <textarea
                    rows={2}
                    value={portIntroEn}
                    onChange={(e) => setPortIntroEn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Hero Intro (Arabic)</label>
                  <textarea
                    rows={2}
                    dir="rtl"
                    value={portIntroAr}
                    onChange={(e) => setPortIntroAr(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Next Project info */}
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <label className="font-semibold text-slate-300 block">Next Project Footer Link</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={portNextSlug}
                    onChange={(e) => setPortNextSlug(e.target.value)}
                    placeholder="Slug (e.g. weetas)"
                    className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none font-mono"
                  />
                  <input
                    type="text"
                    value={portNextTitleEn}
                    onChange={(e) => setPortNextTitleEn(e.target.value)}
                    placeholder="Title EN (e.g. Weetas)"
                    className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                  />
                  <input
                    type="text"
                    dir="rtl"
                    value={portNextTitleAr}
                    onChange={(e) => setPortNextTitleAr(e.target.value)}
                    placeholder="العنوان بالعربية (مثال: ويتاس)"
                    className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONTENT (WYSIWYG EDITORS & MEDIA) */}
          {portModalTab === "content" && (
            <div className="space-y-6">
              {/* Section 1: Company Background */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span>Section 1: Company Background</span>
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Company Background (English)</label>
                    <WysiwygEditor
                      value={portCompanyBgEn}
                      onChange={setPortCompanyBgEn}
                      placeholder="Write company background details..."
                      dir="ltr"
                      minHeight="160px"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Company Background (Arabic)</label>
                    <WysiwygEditor
                      value={portCompanyBgAr}
                      onChange={setPortCompanyBgAr}
                      placeholder="اكتب نبذة عن الشركة بالعربية..."
                      dir="rtl"
                      minHeight="160px"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Work Experience */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span>Section 2: Work Experience</span>
                </h4>

                {/* Image Uploader */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Work Graphic Image</span>
                    </label>
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition-colors">
                      {isUploadingPortWork ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      <span>Upload Graphic</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleUploadPortWork(f);
                        }}
                      />
                    </label>
                  </div>
                  <div className="flex gap-3 items-center">
                    {portWorkExpImage && (
                      <img
                        src={portWorkExpImage}
                        alt="Work Graphic Preview"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes(":8000") && portWorkExpImage.startsWith("/")) {
                            target.src = `http://localhost:8000${portWorkExpImage}`;
                          }
                        }}
                        className="w-20 h-14 rounded-lg object-cover border border-slate-700 shrink-0 bg-slate-900"
                      />
                    )}
                    <input
                      type="text"
                      value={portWorkExpImage}
                      onChange={(e) => setPortWorkExpImage(e.target.value)}
                      placeholder="/images/portfolio/shanifi-donuts@2x.png"
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none font-mono text-[11px]"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Work Experience Details (English)</label>
                    <WysiwygEditor
                      value={portWorkExpEn}
                      onChange={setPortWorkExpEn}
                      placeholder="Detail the work process and deliverables..."
                      dir="ltr"
                      minHeight="160px"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Work Experience Details (Arabic)</label>
                    <WysiwygEditor
                      value={portWorkExpAr}
                      onChange={setPortWorkExpAr}
                      placeholder="تفاصيل سياق وتنفيذ العمل بالعربية..."
                      dir="rtl"
                      minHeight="160px"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Design Concept & Showcase */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pink-500" />
                  <span>Section 3: Showcase Collage & Design Concept</span>
                </h4>

                {/* Showcase Image Uploader */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-pink-400" />
                      <span>Showcase Collage Image</span>
                    </label>
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 border border-pink-500/40 text-xs font-semibold transition-colors">
                      {isUploadingPortShowcase ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      <span>Upload Collage</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleUploadPortShowcase(f);
                        }}
                      />
                    </label>
                  </div>
                  <div className="flex gap-3 items-center">
                    {portShowcaseImage && (
                      <img
                        src={portShowcaseImage}
                        alt="Collage Preview"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes(":8000") && portShowcaseImage.startsWith("/")) {
                            target.src = `http://localhost:8000${portShowcaseImage}`;
                          }
                        }}
                        className="w-20 h-14 rounded-lg object-cover border border-slate-700 shrink-0 bg-slate-900"
                      />
                    )}
                    <input
                      type="text"
                      value={portShowcaseImage}
                      onChange={(e) => setPortShowcaseImage(e.target.value)}
                      placeholder="/images/portfolio/shanifi-showcase-collage@2x.png"
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none font-mono text-[11px]"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Design Concept Details (English)</label>
                    <WysiwygEditor
                      value={portDesignConceptEn}
                      onChange={setPortDesignConceptEn}
                      placeholder="Explain design reasoning and aesthetic principles..."
                      dir="ltr"
                      minHeight="160px"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Design Concept Details (Arabic)</label>
                    <WysiwygEditor
                      value={portDesignConceptAr}
                      onChange={setPortDesignConceptAr}
                      placeholder="شرح المفهوم التصميمي والهوية بالعربية..."
                      dir="rtl"
                      minHeight="160px"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: META SEO */}
          {portModalTab === "seo" && (
            <div className="space-y-5">
              <div className="p-3.5 rounded-2xl bg-sky-950/30 border border-sky-800/40 text-slate-300 text-xs">
                <p className="font-semibold text-sky-400">SEO & Metadata Optimization</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Enhance your portfolio project ranking on Google, Bing, and social sharing previews.
                </p>
              </div>

              {/* Meta Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Meta Title (English)</label>
                  <input
                    type="text"
                    value={portMetaTitleEn}
                    onChange={(e) => setPortMetaTitleEn(e.target.value)}
                    placeholder={portTitleEn ? `${portTitleEn} | Case Study` : "e.g. Shanifi Fresh Food - Portfolio"}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Meta Title (Arabic)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={portMetaTitleAr}
                    onChange={(e) => setPortMetaTitleAr(e.target.value)}
                    placeholder={portTitleAr ? `${portTitleAr} | دراسة حالة` : "عنوان الميتا بالعربية"}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Meta Descriptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Meta Description (English)</label>
                  <textarea
                    rows={3}
                    value={portMetaDescEn}
                    onChange={(e) => setPortMetaDescEn(e.target.value)}
                    placeholder="Brief summary displayed in Google search results..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Meta Description (Arabic)</label>
                  <textarea
                    rows={3}
                    dir="rtl"
                    value={portMetaDescAr}
                    onChange={(e) => setPortMetaDescAr(e.target.value)}
                    placeholder="وصف الميتا لمحركات البحث باللغة العربية..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Keywords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Focus Keywords (English)</label>
                  <input
                    type="text"
                    value={portMetaKeywordsEn}
                    onChange={(e) => setPortMetaKeywordsEn(e.target.value)}
                    placeholder="portfolio, web development, ui/ux"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Focus Keywords (Arabic)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={portMetaKeywordsAr}
                    onChange={(e) => setPortMetaKeywordsAr(e.target.value)}
                    placeholder="معرض الأعمال, تصميم مواقع, تجربة المستخدم"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Google SERP Preview Card */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Google Search Result Preview</span>
                <div className="space-y-0.5 pt-1">
                  <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                    <span>https://smarttouch.me › portfolio › {portSlugEn || "project"}.html</span>
                  </div>
                  <div className="text-sm font-semibold text-sky-400 hover:underline cursor-pointer">
                    {portMetaTitleEn || portTitleEn || "Project Title"} - Smart Touch Agency
                  </div>
                  <div className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {portMetaDescEn || portIntroEn || "Explore our design, digital development, and creative strategy case study."}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal Actions Footer */}
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsPortfolioModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              {editingPortfolio ? "Update Portfolio Project" : "Create Portfolio Project"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Service Modal with 3 Tabs: General, Content, Meta SEO */}
      <Modal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        title={editingService ? "Edit Service Offering" : "Add New Service Offering"}
        maxWidth="4xl"
      >
        <form onSubmit={handleSaveService} className="space-y-5 text-xs max-h-[78vh] overflow-y-auto pr-1">
          {/* Tabs Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <button
              type="button"
              onClick={() => setServiceModalTab("general")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                serviceModalTab === "general"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>General</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setServiceModalTab("sections");
                setSectionsJsonText(JSON.stringify(serviceSections, null, 2));
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                serviceModalTab === "sections"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Sections Builder ({serviceSections.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setServiceModalTab("content")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                serviceModalTab === "content"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Content</span>
            </button>
            <button
              type="button"
              onClick={() => setServiceModalTab("seo")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                serviceModalTab === "seo"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Meta SEO</span>
            </button>
          </div>

          {/* TAB 1: GENERAL */}
          {serviceModalTab === "general" && (
            <div className="space-y-4">
              {/* Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Service Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={serviceTitleEn}
                    onChange={(e) => {
                      setServiceTitleEn(e.target.value);
                      if (!editingService) {
                        setServiceSlugEn(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                      }
                    }}
                    placeholder="e.g. Web Development"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Service Title (Arabic) *</label>
                  <input
                    type="text"
                    required
                    dir="rtl"
                    value={serviceTitleAr}
                    onChange={(e) => setServiceTitleAr(e.target.value)}
                    placeholder="مثال: تطوير وبرمجة المواقع"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Slugs and Icon */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">URL Slug (English) *</label>
                  <input
                    type="text"
                    required
                    value={serviceSlugEn}
                    onChange={(e) => setServiceSlugEn(e.target.value)}
                    placeholder="e.g. web-development"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 font-mono text-xs"
                  />
                  <span className="text-[10px] text-slate-500">Live Anchor: #service-{serviceSlugEn || "slug"}</span>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Slug (Arabic)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={serviceSlugAr}
                    onChange={(e) => setServiceSlugAr(e.target.value)}
                    placeholder="مثال: تطوير-المواقع"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Icon Identifier</label>
                  <input
                    type="text"
                    value={serviceIcon}
                    onChange={(e) => setServiceIcon(e.target.value)}
                    placeholder="e.g. Code2, Palette, Megaphone"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 font-mono text-xs"
                  />
                </div>
              </div>

              {/* Order & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Sort Order (Sequence)</label>
                  <input
                    type="number"
                    value={serviceSortOrder}
                    onChange={(e) => setServiceSortOrder(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-[10px] text-slate-500">Determines display position on the services page</span>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Publishing Status *</label>
                  <select
                    value={serviceStatus}
                    onChange={(e) => setServiceStatus(e.target.value as "published" | "draft")}
                    className={`w-full px-3 py-2 rounded-xl border font-bold focus:outline-none ${
                      serviceStatus === "published"
                        ? "bg-emerald-950/50 border-emerald-500/50 text-emerald-300"
                        : "bg-amber-950/50 border-amber-500/50 text-amber-300"
                    }`}
                  >
                    <option value="published">Published (Live on site)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Service Featured Image Upload */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-indigo-400" />
                    <span>Featured Image / Collage Banner</span>
                  </label>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-xs font-semibold transition-colors">
                    {isUploadingServiceImage ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleUploadServiceImage(f);
                      }}
                    />
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  {serviceFeaturedImage && (
                    <div className="relative group">
                      <img
                        src={serviceFeaturedImage}
                        alt="Service Image Preview"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes(":8000") && serviceFeaturedImage.startsWith("/")) {
                            target.src = `http://localhost:8000${serviceFeaturedImage}`;
                          }
                        }}
                        className="w-24 h-16 rounded-xl object-cover border border-slate-700 shrink-0 bg-slate-900"
                      />
                      <button
                        type="button"
                        onClick={() => setServiceFeaturedImage("")}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove Image"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  <input
                    type="text"
                    value={serviceFeaturedImage}
                    onChange={(e) => setServiceFeaturedImage(e.target.value)}
                    placeholder="e.g. /images/services/web-development-showcase.png or https://..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none font-mono text-[11px]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: SECTIONS BUILDER */}
          {serviceModalTab === "sections" && (
            <div className="space-y-6">
              {/* Sections Builder Control Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                    <span>Modular Page Sections ({serviceSections.length})</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Build and customize page sections to match 100% of the service design specifications.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Quick Add Section Dropdown */}
                  <div className="relative group">
                    <button
                      type="button"
                      className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/30"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Section</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                    </button>
                    <div className="absolute right-0 top-full mt-1.5 w-60 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-1.5 z-30 hidden group-hover:block space-y-0.5">
                      <button
                        type="button"
                        onClick={() => handleAddSection("hero")}
                        className="w-full text-left px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 text-xs font-semibold flex items-center gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Hero Banner & Lead</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddSection("feature_split_list")}
                        className="w-full text-left px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 text-xs font-semibold flex items-center gap-2"
                      >
                        <Layers className="w-3.5 h-3.5 text-sky-400" />
                        <span>Feature Split List</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddSection("card_grid")}
                        className="w-full text-left px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 text-xs font-semibold flex items-center gap-2"
                      >
                        <LayoutGrid className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Icon Card Grid</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddSection("pricing_tiers")}
                        className="w-full text-left px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 text-xs font-semibold flex items-center gap-2"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>3-Tier Pricing Table</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddSection("platform_logos")}
                        className="w-full text-left px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 text-xs font-semibold flex items-center gap-2"
                      >
                        <Share2 className="w-3.5 h-3.5 text-rose-400" />
                        <span>Platform Logos (CRM)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddSection("why_us")}
                        className="w-full text-left px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 text-xs font-semibold flex items-center gap-2"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                        <span>Why Us Navy Card</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddSection("faq_accordion")}
                        className="w-full text-left px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 text-xs font-semibold flex items-center gap-2"
                      >
                        <Filter className="w-3.5 h-3.5 text-cyan-400" />
                        <span>FAQ Accordion</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddSection("cta_banner")}
                        className="w-full text-left px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 text-xs font-semibold flex items-center gap-2"
                      >
                        <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                        <span>Themed CTA Banner</span>
                      </button>
                    </div>
                  </div>

                  {/* Toggle JSON Mode */}
                  <button
                    type="button"
                    onClick={() => {
                      if (!isJsonMode) {
                        setSectionsJsonText(JSON.stringify(serviceSections, null, 2));
                      } else {
                        try {
                          const parsed = JSON.parse(sectionsJsonText);
                          setServiceSections(parsed);
                        } catch (err: any) {
                          alert("Invalid JSON: " + err.message);
                          return;
                        }
                      }
                      setIsJsonMode(!isJsonMode);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                      isJsonMode
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
                    }`}
                  >
                    {isJsonMode ? "Visual Editor Mode" : "JSON Editor Mode"}
                  </button>
                </div>
              </div>

              {/* JSON Editor View */}
              {isJsonMode ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span>Direct Section Schema Editor (JSON format)</span>
                    <button
                      type="button"
                      onClick={() => {
                        try {
                          const parsed = JSON.parse(sectionsJsonText);
                          setServiceSections(parsed);
                          alert("JSON parsed and synchronized successfully!");
                        } catch (err: any) {
                          alert("JSON Syntax Error: " + err.message);
                        }
                      }}
                      className="text-indigo-400 hover:underline font-semibold"
                    >
                      Format & Validate
                    </button>
                  </div>
                  <textarea
                    rows={16}
                    value={sectionsJsonText}
                    onChange={(e) => setSectionsJsonText(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-slate-950 font-mono text-xs text-emerald-400 border border-slate-800 focus:outline-none focus:border-indigo-500 resize-y leading-relaxed"
                  />
                </div>
              ) : (
                /* Visual Section Cards List */
                <div className="space-y-4">
                  {serviceSections.length === 0 ? (
                    <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 space-y-3">
                      <Layers className="w-10 h-10 text-slate-600 mx-auto" />
                      <p className="text-sm font-semibold text-slate-300">No sections added yet</p>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Add sections like Hero Banner, Feature Split List, Pricing Table, or Why Us box to build this service page.
                      </p>
                    </div>
                  ) : (
                    serviceSections.map((sec: any, idx: number) => {
                      const isExpanded = activeSectionEditIndex === idx;
                      const titleEn = sec.title?.en || sec.title || sec.id || `Section ${idx + 1}`;
                      const typeLabel =
                        sec.type === "hero"
                          ? "Hero Banner"
                          : sec.type === "feature_split_list"
                          ? "Feature Split List"
                          : sec.type === "card_grid"
                          ? "Icon Card Grid"
                          : sec.type === "pricing_tiers"
                          ? "Pricing Tiers"
                          : sec.type === "platform_logos"
                          ? "Platform Logos"
                          : sec.type === "why_us"
                          ? "Why Us Box"
                          : sec.type === "faq_accordion"
                          ? "FAQ Accordion"
                          : sec.type === "cta_banner"
                          ? "CTA Banner"
                          : sec.type;

                      return (
                        <div
                          key={sec.id || idx}
                          className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-sm transition-all"
                        >
                          {/* Card Header Bar */}
                          <div className="flex items-center justify-between p-3.5 bg-slate-950/60 border-b border-slate-800/80 gap-3">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="w-6 h-6 rounded-lg bg-indigo-600/20 text-indigo-400 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                                {idx + 1}
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-300 shrink-0">
                                {typeLabel}
                              </span>
                              <span className="font-semibold text-white truncate text-xs">
                                {titleEn}
                              </span>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => handleMoveSection(idx, idx - 1)}
                                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-20"
                                title="Move Up"
                              >
                                ▲
                              </button>
                              <button
                                type="button"
                                disabled={idx === serviceSections.length - 1}
                                onClick={() => handleMoveSection(idx, idx + 1)}
                                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-20"
                                title="Move Down"
                              >
                                ▼
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteSection(idx)}
                                className="p-1 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-400"
                                title="Delete Section"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setActiveSectionEditIndex(isExpanded ? null : idx)}
                                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-[11px] flex items-center gap-1"
                              >
                                <span>{isExpanded ? "Collapse" : "Edit"}</span>
                                <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                              </button>
                            </div>
                          </div>

                          {/* Expanded Section Editor Form */}
                          {isExpanded && (
                            <div className="p-4 space-y-4 text-xs bg-slate-900/40">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-slate-300 font-semibold mb-1">
                                    Section Title (English)
                                  </label>
                                  <input
                                    type="text"
                                    value={sec.title?.en || ""}
                                    onChange={(e) => {
                                      const updated = { ...sec, title: { ...sec.title, en: e.target.value } };
                                      handleUpdateSection(idx, updated);
                                    }}
                                    className="w-full px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                                  />
                                </div>
                                <div>
                                  <label className="block text-slate-300 font-semibold mb-1">
                                    Section Title (Arabic)
                                  </label>
                                  <input
                                    type="text"
                                    dir="rtl"
                                    value={sec.title?.ar || ""}
                                    onChange={(e) => {
                                      const updated = { ...sec, title: { ...sec.title, ar: e.target.value } };
                                      handleUpdateSection(idx, updated);
                                    }}
                                    className="w-full px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                                  />
                                </div>
                              </div>

                              {/* Hero Specific Fields */}
                              {sec.type === "hero" && (
                                <div className="space-y-3 pt-2 border-t border-slate-800">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                      <label className="block text-slate-300 font-semibold mb-1">Lead Text (English)</label>
                                      <textarea
                                        rows={2}
                                        value={sec.lead?.en || ""}
                                        onChange={(e) => {
                                          const updated = { ...sec, lead: { ...sec.lead, en: e.target.value } };
                                          handleUpdateSection(idx, updated);
                                        }}
                                        className="w-full px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-slate-300 font-semibold mb-1">Lead Text (Arabic)</label>
                                      <textarea
                                        rows={2}
                                        dir="rtl"
                                        value={sec.lead?.ar || ""}
                                        onChange={(e) => {
                                          const updated = { ...sec, lead: { ...sec.lead, ar: e.target.value } };
                                          handleUpdateSection(idx, updated);
                                        }}
                                        className="w-full px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block text-slate-300 font-semibold mb-1">Hero Banner Image URL</label>
                                    <input
                                      type="text"
                                      value={sec.image || ""}
                                      onChange={(e) => {
                                        const updated = { ...sec, image: e.target.value };
                                        handleUpdateSection(idx, updated);
                                      }}
                                      className="w-full px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-[11px] focus:outline-none"
                                    />
                                  </div>
                                </div>
                              )}

                              {/* Subtitle for other types */}
                              {sec.type !== "hero" && sec.subtitle !== undefined && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                                  <div>
                                    <label className="block text-slate-300 font-semibold mb-1">Subtitle (English)</label>
                                    <input
                                      type="text"
                                      value={sec.subtitle?.en || ""}
                                      onChange={(e) => {
                                        const updated = { ...sec, subtitle: { ...sec.subtitle, en: e.target.value } };
                                        handleUpdateSection(idx, updated);
                                      }}
                                      className="w-full px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-slate-300 font-semibold mb-1">Subtitle (Arabic)</label>
                                    <input
                                      type="text"
                                      dir="rtl"
                                      value={sec.subtitle?.ar || ""}
                                      onChange={(e) => {
                                        const updated = { ...sec, subtitle: { ...sec.subtitle, ar: e.target.value } };
                                        handleUpdateSection(idx, updated);
                                      }}
                                      className="w-full px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                                    />
                                  </div>
                                </div>
                              )}

                              {/* Why Us Specific Fields */}
                              {sec.type === "why_us" && (
                                <div className="space-y-3 pt-2 border-t border-slate-800">
                                  <div>
                                    <label className="block text-slate-300 font-semibold mb-1">Team / Office Photo URL</label>
                                    <input
                                      type="text"
                                      value={sec.image || ""}
                                      onChange={(e) => {
                                        const updated = { ...sec, image: e.target.value };
                                        handleUpdateSection(idx, updated);
                                      }}
                                      className="w-full px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-[11px] focus:outline-none"
                                    />
                                  </div>
                                </div>
                              )}

                              {/* CTA Banner Specific Fields */}
                              {sec.type === "cta_banner" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                                  <div>
                                    <label className="block text-slate-300 font-semibold mb-1">Button Text (English)</label>
                                    <input
                                      type="text"
                                      value={sec.button_text?.en || ""}
                                      onChange={(e) => {
                                        const updated = { ...sec, button_text: { ...sec.button_text, en: e.target.value } };
                                        handleUpdateSection(idx, updated);
                                      }}
                                      className="w-full px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-slate-300 font-semibold mb-1">Button Text (Arabic)</label>
                                    <input
                                      type="text"
                                      dir="rtl"
                                      value={sec.button_text?.ar || ""}
                                      onChange={(e) => {
                                        const updated = { ...sec, button_text: { ...sec.button_text, ar: e.target.value } };
                                        handleUpdateSection(idx, updated);
                                      }}
                                      className="w-full px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                                    />
                                  </div>
                                </div>
                              )}

                              {/* Quick Raw JSON viewer for fine-tuning items */}
                              <div className="pt-2">
                                <label className="block text-slate-400 font-mono text-[10px] mb-1">
                                  Section Payload (Items / Tiers / Cards):
                                </label>
                                <textarea
                                  rows={5}
                                  value={JSON.stringify(sec, null, 2)}
                                  onChange={(e) => {
                                    try {
                                      const parsed = JSON.parse(e.target.value);
                                      handleUpdateSection(idx, parsed);
                                    } catch {}
                                  }}
                                  className="w-full p-2.5 rounded-xl bg-slate-950 font-mono text-[11px] text-slate-300 border border-slate-800 focus:outline-none"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CONTENT */}
          {serviceModalTab === "content" && (
            <div className="space-y-6">
              {/* Short Descriptions */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  <span>Card Summary / Short Description</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Short Description (English)</label>
                    <textarea
                      rows={3}
                      value={serviceShortDescEn}
                      onChange={(e) => setServiceShortDescEn(e.target.value)}
                      placeholder="Concise overview displayed in the card list on the services page..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Short Description (Arabic)</label>
                    <textarea
                      rows={3}
                      dir="rtl"
                      value={serviceShortDescAr}
                      onChange={(e) => setServiceShortDescAr(e.target.value)}
                      placeholder="نبذة موجزة تظهر في بطاقة الخدمة في صفحة الخدمات..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Full Content with Wysiwyg Editor */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span>Full Service Content & Specifications</span>
                </h4>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Detailed Content (English)</label>
                  <WysiwygEditor
                    value={serviceFullContentEn}
                    onChange={setServiceFullContentEn}
                    placeholder="Write detailed service scope, methodology, features, deliverables..."
                    dir="ltr"
                    minHeight="180px"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Detailed Content (Arabic)</label>
                  <WysiwygEditor
                    value={serviceFullContentAr}
                    onChange={setServiceFullContentAr}
                    placeholder="اكتب المحتوى التفصيلي للخدمة ومميزاتها ونطاق العمل بالعربية..."
                    dir="rtl"
                    minHeight="180px"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: META SEO */}
          {serviceModalTab === "seo" && (
            <div className="space-y-5">
              <div className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-800/40 text-slate-300 text-xs">
                <p className="font-semibold text-indigo-400">SEO & Metadata Optimization</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Optimize this service for search engine crawlers and social media rich previews.
                </p>
              </div>

              {/* Meta Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Meta Title (English)</label>
                  <input
                    type="text"
                    value={serviceMetaTitleEn}
                    onChange={(e) => setServiceMetaTitleEn(e.target.value)}
                    placeholder={serviceTitleEn ? `${serviceTitleEn} Services | Smart Touch` : "e.g. Web Development Agency - Smart Touch"}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Meta Title (Arabic)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={serviceMetaTitleAr}
                    onChange={(e) => setServiceMetaTitleAr(e.target.value)}
                    placeholder={serviceTitleAr ? `${serviceTitleAr} | سمارت تاتش` : "عنوان الميتا بالعربية"}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Meta Descriptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Meta Description (English)</label>
                  <textarea
                    rows={3}
                    value={serviceMetaDescEn}
                    onChange={(e) => setServiceMetaDescEn(e.target.value)}
                    placeholder="Brief description appearing on Google search engine result snippets..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Meta Description (Arabic)</label>
                  <textarea
                    rows={3}
                    dir="rtl"
                    value={serviceMetaDescAr}
                    onChange={(e) => setServiceMetaDescAr(e.target.value)}
                    placeholder="وصف الميتا لمحركات البحث باللغة العربية..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Focus Keywords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Focus Keywords (English)</label>
                  <input
                    type="text"
                    value={serviceMetaKeywordsEn}
                    onChange={(e) => setServiceMetaKeywordsEn(e.target.value)}
                    placeholder="e.g. web development, react, next.js, software company"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Focus Keywords (Arabic)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={serviceMetaKeywordsAr}
                    onChange={(e) => setServiceMetaKeywordsAr(e.target.value)}
                    placeholder="مثال: تطوير المواقع, تصميم المواقع, شركة برمجة"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Google SERP Preview Card */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Google Search Result Preview</span>
                <div className="space-y-0.5 pt-1">
                  <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                    <span>https://smarttouch.me › services.html#service-{serviceSlugEn || "service"}</span>
                  </div>
                  <div className="text-sm font-semibold text-sky-400 hover:underline cursor-pointer">
                    {serviceMetaTitleEn || serviceTitleEn || "Service Title"} - Smart Touch Agency
                  </div>
                  <div className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {serviceMetaDescEn || serviceShortDescEn || "Leading digital solutions and agency services across Saudi Arabia and the GCC."}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal Actions Footer */}
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsServiceModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              {editingService ? "Update Service" : "Create Service"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Blog Post Modal with 3 Tabs: General, Content, Meta SEO matching screenshot */}
      <Modal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        title={editingPost ? "Edit Blog Post" : "Create New Blog Post"}
        maxWidth="3xl"
      >
        <form onSubmit={handleSavePost} className="space-y-5 text-xs max-h-[78vh] overflow-y-auto pr-1">
          {/* Tabs Navigation matching user screenshot */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <button
              type="button"
              onClick={() => setPostModalTab("general")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                postModalTab === "general"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>General</span>
            </button>
            <button
              type="button"
              onClick={() => setPostModalTab("content")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                postModalTab === "content"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Content</span>
            </button>
            <button
              type="button"
              onClick={() => setPostModalTab("seo")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                postModalTab === "seo"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Meta SEO</span>
            </button>
          </div>

          {/* TAB 1: GENERAL */}
          {postModalTab === "general" && (
            <div className="space-y-4">
              {/* Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={postTitleEn}
                    onChange={(e) => {
                      setPostTitleEn(e.target.value);
                      if (!editingPost) setPostSlugEn(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                    }}
                    placeholder="e.g. The Latest Innovation in Web 2026"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Title (Arabic) *</label>
                  <input
                    type="text"
                    required
                    dir="rtl"
                    value={postTitleAr}
                    onChange={(e) => setPostTitleAr(e.target.value)}
                    placeholder="أحدث الابتكارات في عالم الويب 2026"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Slug, Category, and Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Slug (English) *</label>
                  <input
                    type="text"
                    required
                    value={postSlugEn}
                    onChange={(e) => setPostSlugEn(e.target.value)}
                    placeholder="the-latest-innovation"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={postCategoryId}
                    onChange={(e) => setPostCategoryId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="">-- No Category --</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name.en}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Publishing Status *</label>
                  <select
                    value={postStatus}
                    onChange={(e) => setPostStatus(e.target.value as "draft" | "published")}
                    className={`w-full px-3 py-2 rounded-xl border font-bold focus:outline-none ${
                      postStatus === "published"
                        ? "bg-emerald-950/50 border-emerald-500/50 text-emerald-300"
                        : "bg-amber-950/50 border-amber-500/50 text-amber-300"
                    }`}
                  >
                    <option value="published">Published (Live Article)</option>
                    <option value="draft">Draft (Unpublished)</option>
                  </select>
                </div>
              </div>

              {/* Banner Photo Upload */}
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Banner Photo / Featured Image</span>
                  </label>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-xs font-semibold transition-colors">
                    {isUploadingPostBanner ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>Upload Banner</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleUploadPostBanner(f);
                      }}
                    />
                  </label>
                </div>
                <div className="flex gap-3 items-center">
                  {postFeaturedImage && (
                    <img
                      src={postFeaturedImage}
                      alt="Banner Preview"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.includes(":8000") && postFeaturedImage.startsWith("/")) {
                          target.src = `http://localhost:8000${postFeaturedImage}`;
                        }
                      }}
                      className="w-20 h-14 rounded-lg object-cover border border-slate-700 shrink-0 bg-slate-900"
                    />
                  )}
                  <input
                    type="text"
                    value={postFeaturedImage}
                    onChange={(e) => setPostFeaturedImage(e.target.value)}
                    placeholder="https://... or /uploads/..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none font-mono text-[11px]"
                  />
                </div>
              </div>

              {/* Summary EN / AR */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Summary (English)</label>
                <textarea
                  rows={2}
                  value={postSummaryEn}
                  onChange={(e) => setPostSummaryEn(e.target.value)}
                  placeholder="Brief synopsis for blog cards..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Summary (Arabic)</label>
                <textarea
                  rows={2}
                  dir="rtl"
                  value={postSummaryAr}
                  onChange={(e) => setPostSummaryAr(e.target.value)}
                  placeholder="ملخص المقال باللغة العربية..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 2: CONTENT (WYSIWYG EDITORS) */}
          {postModalTab === "content" && (
            <div className="space-y-6">
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-300 text-xs flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-white">Visual WYSIWYG & HTML Editor: </span>
                  Format text with bold, headings, lists, blockquotes, links, and inline photos. Switch to <span className="font-mono text-amber-400">&lt;&gt; HTML Code</span> mode anytime to inspect and edit raw markup.
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-semibold text-slate-200">Article Content (English) *</label>
                <WysiwygEditor
                  value={postContentEn}
                  onChange={setPostContentEn}
                  placeholder="Write the complete article in English..."
                  dir="ltr"
                  minHeight="280px"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-semibold text-slate-200">Article Content (Arabic) *</label>
                <WysiwygEditor
                  value={postContentAr}
                  onChange={setPostContentAr}
                  placeholder="اكتب المقال الكامل باللغة العربية..."
                  dir="rtl"
                  minHeight="280px"
                />
              </div>
            </div>
          )}

          {/* TAB 3: META SEO */}
          {postModalTab === "seo" && (
            <div className="space-y-5">
              <div className="p-3.5 rounded-2xl bg-sky-950/30 border border-sky-800/40 text-slate-300 text-xs">
                <p className="font-semibold text-sky-400">Search Engine Optimization (SEO)</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Configure search engine meta titles, descriptions, and focus keywords for maximum discoverability.
                </p>
              </div>

              {/* Meta Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Meta Title (English)</label>
                  <input
                    type="text"
                    value={postMetaTitleEn}
                    onChange={(e) => setPostMetaTitleEn(e.target.value)}
                    placeholder={postTitleEn || "e.g. 2026 Web Innovations - Agency Insights"}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Meta Title (Arabic)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={postMetaTitleAr}
                    onChange={(e) => setPostMetaTitleAr(e.target.value)}
                    placeholder={postTitleAr || "عنوان الميتا بالعربية"}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Meta Descriptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Meta Description (English)</label>
                  <textarea
                    rows={3}
                    value={postMetaDescEn}
                    onChange={(e) => setPostMetaDescEn(e.target.value)}
                    placeholder="Short description shown in Google search results..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Meta Description (Arabic)</label>
                  <textarea
                    rows={3}
                    dir="rtl"
                    value={postMetaDescAr}
                    onChange={(e) => setPostMetaDescAr(e.target.value)}
                    placeholder="وصف الميتا لمحركات البحث باللغة العربية..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Keywords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Focus Keywords (English)</label>
                  <input
                    type="text"
                    value={postMetaKeywordsEn}
                    onChange={(e) => setPostMetaKeywordsEn(e.target.value)}
                    placeholder="nextjs 16, laravel 12, web development"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Focus Keywords (Arabic)</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={postMetaKeywordsAr}
                    onChange={(e) => setPostMetaKeywordsAr(e.target.value)}
                    placeholder="تطوير الويب, برمجة المواقع, نكست جي اس"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Google SERP Preview Card */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Google Search Result Live Preview</span>
                <div className="space-y-0.5 pt-1">
                  <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                    <span>https://smarttouch.me › blog › {postSlugEn || "post-slug"}</span>
                  </div>
                  <div className="text-sm font-semibold text-sky-400 hover:underline cursor-pointer">
                    {postMetaTitleEn || postTitleEn || "Article Title"} - Smart Touch Agency
                  </div>
                  <div className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {postMetaDescEn || postSummaryEn || "Article summary and meta description will appear here on Google search results."}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal Actions Footer */}
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsPostModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              {editingPost ? "Save Changes" : "Publish Article"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isPageModalOpen}
        onClose={() => setIsPageModalOpen(false)}
        title={editingPage ? "Edit Dynamic Page" : "Create Dynamic Page"}
        maxWidth="2xl"
      >
        <form onSubmit={handleSavePage} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Title (English) *</label>
              <input
                type="text"
                required
                value={pageTitleEn}
                onChange={(e) => {
                  setPageTitleEn(e.target.value);
                  if (!editingPage) setPageSlugEn(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Title (Arabic) *</label>
              <input
                type="text"
                required
                dir="rtl"
                value={pageTitleAr}
                onChange={(e) => setPageTitleAr(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">URL Slug (English) *</label>
              <input
                type="text"
                required
                value={pageSlugEn}
                onChange={(e) => setPageSlugEn(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Template</label>
              <select
                value={pageTemplate}
                onChange={(e) => setPageTemplate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
              >
                <option value="default">Default Content</option>
                <option value="about">About Company</option>
                <option value="services">Services Hub</option>
                <option value="contact">Contact & Inquiries</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Content (English) *</label>
            <textarea
              required
              rows={4}
              value={pageContentEn}
              onChange={(e) => setPageContentEn(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Content (Arabic) *</label>
            <textarea
              required
              rows={4}
              dir="rtl"
              value={pageContentAr}
              onChange={(e) => setPageContentAr(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
            >
              {editingPage ? "Update Page" : "Save & Publish Page"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        title="Create Staff User with Role"
        maxWidth="md"
      >
        <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="Omar Farooq"
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              placeholder="omar@smarttouch.com"
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Password *</label>
            <input
              type="password"
              required
              value={newUserPassword}
              onChange={(e) => setNewUserPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Assigned Role (RBAC) *</label>
            <select
              value={newUserRole}
              onChange={(e) => setNewUserRole(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold"
            >
              <option value="admin">Admin (Full Access & Inquiries)</option>
              <option value="content">Content Creator (Blog & Pages)</option>
              <option value="seo">SEO Specialist (Metadata & Audits)</option>
            </select>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
            >
              Create Account
            </button>
          </div>
        </form>
      </Modal>

      {selectedInquiry && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedInquiry(null)}
          title={`Inquiry #${selectedInquiry.id} - ${selectedInquiry.name}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div>
                <span className="text-slate-500 block">Email</span>
                <span className="font-semibold text-white">{selectedInquiry.email}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Phone</span>
                <span className="font-semibold text-white">{selectedInquiry.phone || "None"}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Company</span>
                <span className="font-semibold text-white">{selectedInquiry.company || "None"}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Estimated Budget</span>
                <span className="font-semibold text-emerald-400">{selectedInquiry.budget_range || "Unspecified"}</span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 block font-semibold mb-1">Target Service</span>
              <div className="p-3 rounded-xl bg-slate-800 text-white font-medium">
                {selectedInquiry.service_name || "General Agency Request"}
              </div>
            </div>

            <div>
              <span className="text-slate-400 block font-semibold mb-1">Client Message & Requirements</span>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 leading-relaxed">
                {selectedInquiry.message}
              </div>
            </div>

            <div>
              <span className="text-slate-400 block font-semibold mb-1">Pipeline Status</span>
              <select
                value={selectedInquiry.status}
                onChange={(e) => handleUpdateInquiryStatus(selectedInquiry.id, e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-850 border border-slate-700 text-white"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in_discussion">In Discussion</option>
                <option value="proposal_sent">Proposal Sent</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
