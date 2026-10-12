<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Post;
use App\Models\SeoMetadata;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::with(['category', 'author:id,name', 'seo'])->orderBy('created_at', 'desc');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $posts = $query->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $posts
        ]);
    }

    public function show($id)
    {
        $post = Post::with(['category', 'author:id,name', 'seo'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $post
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        if ($user->isSeo()) {
            return response()->json(['success' => false, 'message' => 'SEO specialists cannot create new posts.'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|array',
            'title.en' => 'required|string|max:255',
            'title.ar' => 'required|string|max:255',
            'slug' => 'required|array',
            'slug.en' => 'required|string|max:255',
            'slug.ar' => 'required|string|max:255',
            'summary' => 'nullable|array',
            'content' => 'required|array',
            'category_id' => 'nullable|exists:categories,id',
            'featured_image' => 'nullable|string',
            'status' => 'required|in:draft,published',
            'seo' => 'nullable|array',
        ]);

        $post = Post::create([
            'user_id' => $user->id,
            'category_id' => $validated['category_id'] ?? null,
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'summary' => $validated['summary'] ?? null,
            'content' => $validated['content'],
            'featured_image' => $validated['featured_image'] ?? null,
            'status' => $validated['status'],
            'published_at' => $validated['status'] === 'published' ? now() : null,
        ]);

        if (!empty($validated['seo'])) {
            SeoMetadata::updateOrCreate(
                ['entity_type' => 'post', 'entity_id' => $post->id],
                $validated['seo']
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'Blog post created successfully',
            'data' => $post->load(['category', 'seo'])
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        $user = $request->user();

        // SEO role can only update SEO metadata
        if ($user->isSeo()) {
            $validated = $request->validate([
                'seo' => 'required|array',
            ]);

            SeoMetadata::updateOrCreate(
                ['entity_type' => 'post', 'entity_id' => $post->id],
                $validated['seo']
            );

            return response()->json([
                'success' => true,
                'message' => 'SEO metadata updated successfully',
                'data' => $post->load(['category', 'seo'])
            ]);
        }

        $validated = $request->validate([
            'title' => 'required|array',
            'title.en' => 'required|string|max:255',
            'title.ar' => 'required|string|max:255',
            'slug' => 'required|array',
            'slug.en' => 'required|string|max:255',
            'slug.ar' => 'required|string|max:255',
            'summary' => 'nullable|array',
            'content' => 'required|array',
            'category_id' => 'nullable|exists:categories,id',
            'featured_image' => 'nullable|string',
            'status' => 'required|in:draft,published',
            'seo' => 'nullable|array',
        ]);

        $publishedAt = $post->published_at;
        if ($validated['status'] === 'published' && !$publishedAt) {
            $publishedAt = now();
        }

        $post->update([
            'category_id' => $validated['category_id'] ?? $post->category_id,
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'summary' => $validated['summary'] ?? $post->summary,
            'content' => $validated['content'],
            'featured_image' => $validated['featured_image'] ?? $post->featured_image,
            'status' => $validated['status'],
            'published_at' => $publishedAt,
        ]);

        if (isset($validated['seo'])) {
            SeoMetadata::updateOrCreate(
                ['entity_type' => 'post', 'entity_id' => $post->id],
                $validated['seo']
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'Blog post updated successfully',
            'data' => $post->load(['category', 'seo'])
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        if ($user->isSeo()) {
            return response()->json(['success' => false, 'message' => 'SEO specialists cannot delete posts.'], 403);
        }

        $post = Post::findOrFail($id);
        SeoMetadata::where('entity_type', 'post')->where('entity_id', $post->id)->delete();
        $post->delete();

        return response()->json([
            'success' => true,
            'message' => 'Blog post deleted successfully'
        ]);
    }
}
