<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\SeoMetadata;
use App\Models\Service;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::with('seo')->orderBy('sort_order', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => $services
        ]);
    }

    public function show($id)
    {
        $service = Service::with(['seo', 'inquiries'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $service
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        if ($user->isSeo()) {
            return response()->json(['success' => false, 'message' => 'SEO specialists cannot create new services.'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|array',
            'title.en' => 'required|string|max:255',
            'title.ar' => 'required|string|max:255',
            'slug' => 'required|array',
            'slug.en' => 'required|string|max:255',
            'slug.ar' => 'required|string|max:255',
            'short_description' => 'required|array',
            'full_content' => 'nullable|array',
            'icon' => 'nullable|string',
            'featured_image' => 'nullable|string',
            'features' => 'nullable|array',
            'sections' => 'nullable|array',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
            'seo' => 'nullable|array',
        ]);

        $service = Service::create([
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'short_description' => $validated['short_description'],
            'full_content' => $validated['full_content'] ?? null,
            'icon' => $validated['icon'] ?? 'Globe',
            'featured_image' => $validated['featured_image'] ?? null,
            'features' => $validated['features'] ?? null,
            'sections' => $validated['sections'] ?? null,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        if (!empty($validated['seo'])) {
            SeoMetadata::updateOrCreate(
                ['entity_type' => 'service', 'entity_id' => $service->id],
                $validated['seo']
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'Service created successfully',
            'data' => $service->load('seo')
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);
        $user = $request->user();

        if ($user->isSeo()) {
            $validated = $request->validate([
                'seo' => 'required|array',
            ]);

            SeoMetadata::updateOrCreate(
                ['entity_type' => 'service', 'entity_id' => $service->id],
                $validated['seo']
            );

            return response()->json([
                'success' => true,
                'message' => 'SEO metadata updated successfully',
                'data' => $service->load('seo')
            ]);
        }

        $validated = $request->validate([
            'title' => 'required|array',
            'title.en' => 'required|string|max:255',
            'title.ar' => 'required|string|max:255',
            'slug' => 'required|array',
            'slug.en' => 'required|string|max:255',
            'slug.ar' => 'required|string|max:255',
            'short_description' => 'required|array',
            'full_content' => 'nullable|array',
            'icon' => 'nullable|string',
            'featured_image' => 'nullable|string',
            'features' => 'nullable|array',
            'sections' => 'nullable|array',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
            'seo' => 'nullable|array',
        ]);

        $service->update([
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'short_description' => $validated['short_description'],
            'full_content' => $validated['full_content'] ?? $service->full_content,
            'icon' => $validated['icon'] ?? $service->icon,
            'featured_image' => array_key_exists('featured_image', $validated) ? $validated['featured_image'] : $service->featured_image,
            'features' => $validated['features'] ?? $service->features,
            'sections' => array_key_exists('sections', $validated) ? $validated['sections'] : $service->sections,
            'sort_order' => $validated['sort_order'] ?? $service->sort_order,
            'is_active' => $validated['is_active'] ?? $service->is_active,
        ]);

        if (isset($validated['seo'])) {
            SeoMetadata::updateOrCreate(
                ['entity_type' => 'service', 'entity_id' => $service->id],
                $validated['seo']
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'Service updated successfully',
            'data' => $service->load('seo')
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        if ($user->isSeo()) {
            return response()->json(['success' => false, 'message' => 'SEO specialists cannot delete services.'], 403);
        }

        $service = Service::findOrFail($id);
        SeoMetadata::where('entity_type', 'service')->where('entity_id', $service->id)->delete();
        $service->delete();

        return response()->json([
            'success' => true,
            'message' => 'Service deleted successfully'
        ]);
    }
}
