<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use App\Models\User;

class AgencyApiTest extends TestCase
{
    public function test_public_services_can_be_retrieved(): void
    {
        $response = $this->getJson('/api/services');
        $response->assertStatus(200)
                 ->assertJsonPath('success', true);
    }

    public function test_public_inquiry_can_be_submitted(): void
    {
        $payload = [
            'name' => 'Automated Test Client',
            'email' => 'client@test.com',
            'phone' => '+123456789',
            'company' => 'QA Tech',
            'budget_range' => '$10k - $25k',
            'message' => 'Automated inquiry test message.',
            'locale' => 'en',
        ];

        $response = $this->postJson('/api/inquiries', $payload);
        $response->assertStatus(201)
                 ->assertJsonPath('success', true);

        $this->assertDatabaseHas('inquiries', [
            'email' => 'client@test.com',
            'name' => 'Automated Test Client'
        ]);
    }

    public function test_users_can_login_with_roles(): void
    {
        $response = $this->postJson('/api/auth/login', [
            'email' => 'admin@smarttouch.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
                 ->assertJsonPath('success', true)
                 ->assertJsonPath('user.role', 'admin');

        $this->assertNotEmpty($response->json('token'));
    }

    public function test_admin_can_access_inquiries(): void
    {
        $admin = User::where('role', 'admin')->first();
        $token = $admin->createToken('test-token', ['admin'])->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
                         ->getJson('/api/dashboard/inquiries');

        $response->assertStatus(200)
                 ->assertJsonPath('success', true);
    }

    public function test_non_admin_cannot_access_inquiries(): void
    {
        $contentUser = User::where('role', 'content')->first();
        $token = $contentUser->createToken('test-token', ['content'])->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
                         ->getJson('/api/dashboard/inquiries');

        $response->assertStatus(403);
    }

    public function test_seo_user_cannot_create_page(): void
    {
        $seoUser = User::where('role', 'seo')->first();
        $token = $seoUser->createToken('test-token', ['seo'])->plainTextToken;

        $payload = [
            'title' => ['en' => 'Test Page', 'ar' => 'صفحة تجريبية'],
            'slug' => ['en' => 'test-page', 'ar' => 'safha-tajribiya'],
            'content' => ['en' => 'Content', 'ar' => 'محتوى'],
        ];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
                         ->postJson('/api/dashboard/pages', $payload);

        $response->assertStatus(403);
    }
}
