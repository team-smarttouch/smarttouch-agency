<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Inquiry;
use App\Models\Page;
use App\Models\Post;
use App\Models\SeoMetadata;
use App\Models\Service;
use App\Models\User;

class DashboardController extends Controller
{
    public function getStats(Request $request)
    {
        $user = $request->user();

        $stats = [
            'role' => $user->role,
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
            ],
            'posts_count' => Post::count(),
            'published_posts_count' => Post::where('status', 'published')->count(),
            'pages_count' => Page::count(),
            'services_count' => Service::count(),
        ];

        if ($user->isAdmin()) {
            $stats['inquiries_count'] = Inquiry::count();
            $stats['new_inquiries_count'] = Inquiry::where('status', 'new')->count();
            $stats['users_count'] = User::count();
            $stats['inquiries_by_status'] = [
                'new' => Inquiry::where('status', 'new')->count(),
                'contacted' => Inquiry::where('status', 'contacted')->count(),
                'in_discussion' => Inquiry::where('status', 'in_discussion')->count(),
                'proposal_sent' => Inquiry::where('status', 'proposal_sent')->count(),
                'won' => Inquiry::where('status', 'won')->count(),
                'lost' => Inquiry::where('status', 'lost')->count(),
            ];
            $stats['recent_inquiries'] = Inquiry::with('service:id,title')
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get();
        } elseif ($user->isContent()) {
            $stats['recent_posts'] = Post::with('category')
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get();
        } elseif ($user->isSeo()) {
            $stats['seo_records_count'] = SeoMetadata::count();
            $stats['indexable_count'] = SeoMetadata::where('indexable', true)->count();
            $stats['services_missing_seo'] = Service::whereDoesntHave('seo')->count();
            $stats['posts_missing_seo'] = Post::whereDoesntHave('seo')->count();
            $stats['pages_missing_seo'] = Page::whereDoesntHave('seo')->count();
        }

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }

    public function getSettings(Request $request)
    {
        $settings = \App\Models\Setting::all()->pluck('value', 'key');

        return response()->json([
            'success' => true,
            'data' => [
                'whatsapp_number' => $settings['whatsapp_number'] ?? '+966500000000',
                'inquiry_receiver_email' => $settings['inquiry_receiver_email'] ?? 'info@smarttouch.me',
                'featured_portfolios' => $settings['featured_portfolios'] ?? ['homefix', 'dala', 'weetas'],
                'homepage_process' => $settings['homepage_process'] ?? null,
            ]
        ]);
    }

    public function getHomepageProcess(Request $request)
    {
        $process = \App\Models\Setting::get('homepage_process');

        return response()->json([
            'success' => true,
            'data' => $process
        ]);
    }

    public function updateHomepageProcess(Request $request)
    {
        $validated = $request->validate([
            'homepage_process' => 'required|array',
        ]);

        \App\Models\Setting::set('homepage_process', $validated['homepage_process'], 'homepage');

        return response()->json([
            'success' => true,
            'message' => 'Homepage process section updated successfully',
            'data' => \App\Models\Setting::get('homepage_process')
        ]);
    }

    public function updateSettings(Request $request)
    {
        $validated = $request->validate([
            'whatsapp_number' => 'nullable|string|max:50',
            'inquiry_receiver_email' => 'nullable|email|max:150',
            'featured_portfolios' => 'nullable|array',
            'homepage_process' => 'nullable|array',
        ]);

        if (array_key_exists('whatsapp_number', $validated)) {
            \App\Models\Setting::set('whatsapp_number', $validated['whatsapp_number'], 'general');
        }

        if (array_key_exists('inquiry_receiver_email', $validated)) {
            \App\Models\Setting::set('inquiry_receiver_email', $validated['inquiry_receiver_email'], 'general');
        }

        if (array_key_exists('featured_portfolios', $validated)) {
            \App\Models\Setting::set('featured_portfolios', $validated['featured_portfolios'], 'general');
        }

        if (array_key_exists('homepage_process', $validated)) {
            \App\Models\Setting::set('homepage_process', $validated['homepage_process'], 'homepage');
        }

        return response()->json([
            'success' => true,
            'message' => 'General settings updated successfully',
            'data' => [
                'whatsapp_number' => \App\Models\Setting::get('whatsapp_number', '+966500000000'),
                'inquiry_receiver_email' => \App\Models\Setting::get('inquiry_receiver_email', 'info@smarttouch.me'),
                'featured_portfolios' => \App\Models\Setting::get('featured_portfolios', ['homefix', 'dala', 'weetas']),
            ]
        ]);
    }

    // Client Brands Management
    public function getClients(Request $request)
    {
        $clients = \App\Models\Client::orderBy('sort_order', 'asc')->get();
        return response()->json([
            'success' => true,
            'data' => $clients
        ]);
    }

    public function createClient(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'logo' => 'required|string',
            'link' => 'nullable|string',
            'alt' => 'nullable|string',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $client = \App\Models\Client::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Client created successfully',
            'data' => $client
        ], 201);
    }

    public function updateClient(Request $request, $id)
    {
        $client = \App\Models\Client::findOrFail($id);

        $validated = $request->validate([
            'name' => 'nullable',
            'logo' => 'nullable|string',
            'link' => 'nullable|string',
            'alt' => 'nullable|string',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $client->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Client updated successfully',
            'data' => $client
        ]);
    }

    public function deleteClient($id)
    {
        $client = \App\Models\Client::findOrFail($id);
        $client->delete();

        return response()->json([
            'success' => true,
            'message' => 'Client deleted successfully'
        ]);
    }
}
