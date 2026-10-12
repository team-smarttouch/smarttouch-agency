<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Page;
use App\Models\SeoMetadata;

class PageController extends Controller
{
    public function index()
    {
        $pages = Page::with('seo')->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $pages
        ]);
    }

    public function show($id)
    {
        $page = Page::with('seo')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $page
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        if ($user->isSeo()) {
            return response()->json(['success' => false, 'message' => 'SEO specialists cannot create new pages.'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|array',
            'title.en' => 'required|string|max:255',
            'title.ar' => 'required|string|max:255',
            'slug' => 'required|array',
            'slug.en' => 'required|string|max:255',
            'slug.ar' => 'required|string|max:255',
            'content' => 'required|array',
            'content.en' => 'required|string',
            'content.ar' => 'required|string',
            'template' => 'nullable|string',
            'is_active' => 'nullable|boolean',
            'seo' => 'nullable|array',
        ]);

        $page = Page::create([
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'content' => $validated['content'],
            'template' => $validated['template'] ?? 'default',
            'is_active' => $validated['is_active'] ?? true,
        ]);

        if (!empty($validated['seo'])) {
            SeoMetadata::updateOrCreate(
                ['entity_type' => 'page', 'entity_id' => $page->id],
                $validated['seo']
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'Page created successfully',
            'data' => $page->load('seo')
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $page = Page::findOrFail($id);
        $user = $request->user();

        // SEO role can only update SEO metadata
        if ($user->isSeo()) {
            $validated = $request->validate([
                'seo' => 'required|array',
            ]);

            SeoMetadata::updateOrCreate(
                ['entity_type' => 'page', 'entity_id' => $page->id],
                $validated['seo']
            );

            return response()->json([
                'success' => true,
                'message' => 'SEO metadata updated successfully',
                'data' => $page->load('seo')
            ]);
        }

        $validated = $request->validate([
            'title' => 'required|array',
            'title.en' => 'required|string|max:255',
            'title.ar' => 'required|string|max:255',
            'slug' => 'required|array',
            'slug.en' => 'required|string|max:255',
            'slug.ar' => 'required|string|max:255',
            'content' => 'required|array',
            'template' => 'nullable|string',
            'is_active' => 'nullable|boolean',
            'seo' => 'nullable|array',
        ]);

        $page->update([
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'content' => $validated['content'],
            'template' => $validated['template'] ?? $page->template,
            'is_active' => $validated['is_active'] ?? $page->is_active,
        ]);

        if (isset($validated['seo'])) {
            SeoMetadata::updateOrCreate(
                ['entity_type' => 'page', 'entity_id' => $page->id],
                $validated['seo']
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'Page updated successfully',
            'data' => $page->load('seo')
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        if ($user->isSeo()) {
            return response()->json(['success' => false, 'message' => 'SEO specialists cannot delete pages.'], 403);
        }

        $page = Page::findOrFail($id);
        SeoMetadata::where('entity_type', 'page')->where('entity_id', $page->id)->delete();
        $page->delete();

        return response()->json([
            'success' => true,
            'message' => 'Page deleted successfully'
        ]);
    }
}
