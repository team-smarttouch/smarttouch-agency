<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use App\Models\SeoMetadata;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    /**
     * List all portfolios for dashboard
     */
    public function index(Request $request)
    {
        $query = Portfolio::with(['seo']);

        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        if ($request->has('status') && $request->status !== 'all') {
            if ($request->status === 'published') {
                $query->where('is_published', true);
            } elseif ($request->status === 'draft') {
                $query->where('is_published', false);
            }
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title->en', 'like', "%{$search}%")
                  ->orWhere('title->ar', 'like', "%{$search}%")
                  ->orWhere('slug->en', 'like', "%{$search}%");
            });
        }

        $portfolios = $query->orderBy('sort_order', 'asc')->orderBy('created_at', 'desc')->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $portfolios
        ]);
    }

    /**
     * Get single portfolio for dashboard editing
     */
    public function show($id)
    {
        $portfolio = is_numeric($id) 
            ? Portfolio::with(['seo'])->find($id) 
            : Portfolio::with(['seo'])->where('slug->en', $id)->orWhere('slug->ar', $id)->first();

        if (!$portfolio) {
            return response()->json(['success' => false, 'message' => 'Portfolio not found'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $portfolio
        ]);
    }

    /**
     * Store new portfolio
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title.en' => 'required|string|max:255',
            'title.ar' => 'nullable|string|max:255',
            'slug.en' => 'required|string|max:255',
            'slug.ar' => 'nullable|string|max:255',
            'category' => 'required|string',
            'client_name.en' => 'nullable|string',
            'client_name.ar' => 'nullable|string',
            'tags.en' => 'nullable|array',
            'tags.ar' => 'nullable|array',
            'intro.en' => 'nullable|string',
            'intro.ar' => 'nullable|string',
            'hero_image' => 'nullable|string',
            'thumbnail_image' => 'nullable|string',
            'company_background.en' => 'nullable|string',
            'company_background.ar' => 'nullable|string',
            'work_experience_image' => 'nullable|string',
            'work_experience.en' => 'nullable|string',
            'work_experience.ar' => 'nullable|string',
            'showcase_image' => 'nullable|string',
            'gallery_images' => 'nullable|array',
            'design_concept.en' => 'nullable|string',
            'design_concept.ar' => 'nullable|string',
            'next_project' => 'nullable|array',
            'brand_color' => 'nullable|string|max:50',
            'year_completed' => 'nullable|integer',
            'is_published' => 'nullable|boolean',
            'status' => 'nullable|in:draft,published',
            'sort_order' => 'nullable|integer',
            'seo' => 'nullable|array',
        ]);

        if ($request->has('status') && !isset($validated['is_published'])) {
            $validated['is_published'] = ($request->status === 'published');
        }

        $portfolioData = collect($validated)->except(['seo'])->all();
        $portfolio = Portfolio::create($portfolioData);

        if (!empty($request->seo)) {
            SeoMetadata::updateOrCreate(
                ['entity_type' => 'portfolio', 'entity_id' => $portfolio->id],
                $request->seo
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'Portfolio created successfully',
            'data' => $portfolio->load(['seo'])
        ], 201);
    }

    /**
     * Update existing portfolio
     */
    public function update(Request $request, $id)
    {
        $portfolio = Portfolio::findOrFail($id);

        $validated = $request->validate([
            'title.en' => 'sometimes|required|string|max:255',
            'title.ar' => 'nullable|string|max:255',
            'slug.en' => 'sometimes|required|string|max:255',
            'slug.ar' => 'nullable|string|max:255',
            'category' => 'sometimes|required|string',
            'client_name.en' => 'nullable|string',
            'client_name.ar' => 'nullable|string',
            'tags.en' => 'nullable|array',
            'tags.ar' => 'nullable|array',
            'intro.en' => 'nullable|string',
            'intro.ar' => 'nullable|string',
            'hero_image' => 'nullable|string',
            'thumbnail_image' => 'nullable|string',
            'company_background.en' => 'nullable|string',
            'company_background.ar' => 'nullable|string',
            'work_experience_image' => 'nullable|string',
            'work_experience.en' => 'nullable|string',
            'work_experience.ar' => 'nullable|string',
            'showcase_image' => 'nullable|string',
            'gallery_images' => 'nullable|array',
            'design_concept.en' => 'nullable|string',
            'design_concept.ar' => 'nullable|string',
            'next_project' => 'nullable|array',
            'brand_color' => 'nullable|string|max:50',
            'year_completed' => 'nullable|integer',
            'is_published' => 'nullable|boolean',
            'status' => 'nullable|in:draft,published',
            'sort_order' => 'nullable|integer',
            'seo' => 'nullable|array',
        ]);

        if ($request->has('status')) {
            $validated['is_published'] = ($request->status === 'published');
        }

        $portfolioData = collect($validated)->except(['seo'])->all();
        $portfolio->update($portfolioData);

        if ($request->has('seo')) {
            SeoMetadata::updateOrCreate(
                ['entity_type' => 'portfolio', 'entity_id' => $portfolio->id],
                $request->seo
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'Portfolio updated successfully',
            'data' => $portfolio->load(['seo'])
        ]);
    }

    /**
     * Delete portfolio
     */
    public function destroy($id)
    {
        $portfolio = Portfolio::findOrFail($id);
        $portfolio->delete();

        return response()->json([
            'success' => true,
            'message' => 'Portfolio deleted successfully'
        ]);
    }
}
