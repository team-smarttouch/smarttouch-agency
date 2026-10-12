<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Dynamic Pages
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->json('title'); // {"en": "...", "ar": "..."}
            $table->json('slug');  // {"en": "about-us", "ar": "man-nahnu"}
            $table->json('content'); // Blocks or rich HTML
            $table->string('template')->default('default'); // default, about, services, contact
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 2. Services Catalog (Web & App dev, SEO marketing, branding, etc.)
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->json('title'); // {"en": "...", "ar": "..."}
            $table->json('slug');  // {"en": "...", "ar": "..."}
            $table->json('short_description');
            $table->json('full_content')->nullable();
            $table->string('icon')->default('Globe'); // Lucide icon name
            $table->json('features')->nullable(); // Array of key features in EN and AR
            $table->string('featured_image')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 3. Blog Categories
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->json('name'); // {"en": "...", "ar": "..."}
            $table->json('slug');
            $table->timestamps();
        });

        // 4. Blog Posts
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
            $table->json('title'); // {"en": "...", "ar": "..."}
            $table->json('slug');
            $table->json('summary')->nullable();
            $table->json('content');
            $table->string('featured_image')->nullable();
            $table->enum('status', ['draft', 'published'])->default('draft');
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });

        // 5. Inquiries & Leads (Captured from Contact Us & Service Pages)
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->nullable()->constrained()->nullOnDelete();
            $table->string('service_name')->nullable();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('company')->nullable();
            $table->string('budget_range')->nullable(); // e.g. "$5k - $10k", "$10k - $25k", "+$25k"
            $table->text('message');
            $table->enum('status', ['new', 'contacted', 'in_discussion', 'proposal_sent', 'won', 'lost'])->default('new');
            $table->text('admin_notes')->nullable();
            $table->string('locale')->default('en'); // en or ar
            $table->string('ip_address')->nullable();
            $table->timestamps();
        });

        // 6. SEO Metadata & Audits (Accessible/editable by SEO & Admin roles)
        Schema::create('seo_metadata', function (Blueprint $table) {
            $table->id();
            $table->string('entity_type'); // page, service, post
            $table->unsignedBigInteger('entity_id');
            $table->json('meta_title')->nullable();
            $table->json('meta_description')->nullable();
            $table->json('og_title')->nullable();
            $table->json('og_description')->nullable();
            $table->string('og_image')->nullable();
            $table->string('canonical_url')->nullable();
            $table->json('schema_markup')->nullable();
            $table->json('focus_keywords')->nullable();
            $table->boolean('indexable')->default(true);
            $table->timestamps();

            $table->index(['entity_type', 'entity_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seo_metadata');
        Schema::dropIfExists('inquiries');
        Schema::dropIfExists('posts');
        Schema::dropIfExists('categories');
        Schema::dropIfExists('services');
        Schema::dropIfExists('pages');
    }
};
