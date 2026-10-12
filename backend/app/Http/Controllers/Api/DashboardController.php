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
}
