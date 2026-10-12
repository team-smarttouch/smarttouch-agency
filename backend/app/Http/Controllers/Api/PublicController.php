<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Category;
use App\Models\Inquiry;
use App\Models\Page;
use App\Models\Post;
use App\Models\Service;
use Illuminate\Support\Facades\Log;

class PublicController extends Controller
{
    public function getServices(Request $request)
    {
        $services = Service::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $services
        ]);
    }

    public function getService(Request $request, $slug)
    {
        $cleanSlug = preg_replace('/^services-/', '', $slug);
        $cleanSlug = preg_replace('/\.html$/', '', $cleanSlug);

        $service = Service::where('is_active', true)
            ->where(function ($query) use ($slug, $cleanSlug) {
                $query->where('slug->en', $slug)
                      ->orWhere('slug->ar', $slug)
                      ->orWhere('slug->en', $cleanSlug)
                      ->orWhere('slug->ar', $cleanSlug);
            })
            ->first();

        if (!$service) {
            return response()->json(['success' => false, 'message' => 'Service not found'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $service
        ]);
    }

    public function getPages(Request $request)
    {
        $pages = Page::where('is_active', true)->get();

        return response()->json([
            'success' => true,
            'data' => $pages
        ]);
    }

    public function getPage(Request $request, $slug)
    {
        $page = Page::where('is_active', true)
            ->where(function ($query) use ($slug) {
                $query->where('slug->en', $slug)
                      ->orWhere('slug->ar', $slug);
            })
            ->first();

        if (!$page) {
            return response()->json(['success' => false, 'message' => 'Page not found'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $page
        ]);
    }

    public function getPosts(Request $request)
    {
        $query = Post::where('status', 'published')
            ->with(['author:id,name', 'category'])
            ->orderBy('published_at', 'desc');

        if ($request->filled('category')) {
            $catSlug = $request->input('category');
            $query->whereHas('category', function ($q) use ($catSlug) {
                $q->where('slug->en', $catSlug)->orWhere('slug->ar', $catSlug);
            });
        }

        $posts = $query->paginate(12);

        return response()->json([
            'success' => true,
            'data' => $posts
        ]);
    }

    public function getPost(Request $request, $slug)
    {
        $post = Post::where('status', 'published')
            ->where(function ($query) use ($slug) {
                $query->where('slug->en', $slug)
                      ->orWhere('slug->ar', $slug);
            })
            ->with(['author:id,name', 'category', 'seo'])
            ->first();

        if (!$post) {
            return response()->json(['success' => false, 'message' => 'Post not found'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $post
        ]);
    }

    public function getCategories()
    {
        $categories = Category::withCount('posts')->get();

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }

    public function submitInquiry(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'company' => 'nullable|string|max:255',
            'service_id' => 'nullable|exists:services,id',
            'service_name' => 'nullable|string|max:255',
            'budget_range' => 'nullable|string|max:100',
            'message' => 'required|string|max:5000',
            'locale' => 'nullable|string|in:en,ar',
        ]);

        if (empty($validated['service_name']) && !empty($validated['service_id'])) {
            $service = Service::find($validated['service_id']);
            if ($service) {
                $validated['service_name'] = $service->title['en'] ?? null;
            }
        }

        $inquiry = Inquiry::create([
            'service_id' => $validated['service_id'] ?? null,
            'service_name' => $validated['service_name'] ?? null,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'company' => $validated['company'] ?? null,
            'budget_range' => $validated['budget_range'] ?? null,
            'message' => $validated['message'],
            'status' => 'new',
            'locale' => $validated['locale'] ?? 'en',
            'ip_address' => $request->ip(),
        ]);

        Log::info("New agency lead received: #{$inquiry->id} from {$inquiry->name} ({$inquiry->email})");

        return response()->json([
            'success' => true,
            'message' => $validated['locale'] === 'ar' 
                ? 'تم استلام استفسارك بنجاح! سيتواصل معك فريقنا في أقرب وقت.' 
                : 'Thank you! Your inquiry has been received. Our team will contact you shortly.',
            'data' => [
                'id' => $inquiry->id,
                'status' => $inquiry->status,
            ]
        ], 201);
    }

    public function getPortfolios(Request $request)
    {
        $query = \App\Models\Portfolio::where('is_published', true);

        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        $portfolios = $query->orderBy('sort_order', 'asc')->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $portfolios
        ]);
    }

    public function getPortfolio(Request $request, $slug)
    {
        $clean = preg_replace('/\.html$/', '', $slug);

        $portfolio = \App\Models\Portfolio::where('is_published', true)
            ->where(function ($query) use ($clean) {
                $query->where('slug->en', $clean)
                      ->orWhere('slug->ar', $clean);
            })
            ->with(['seo'])
            ->first();

        if (!$portfolio) {
            return response()->json(['success' => false, 'message' => 'Portfolio not found'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $portfolio
        ]);
    }
}
