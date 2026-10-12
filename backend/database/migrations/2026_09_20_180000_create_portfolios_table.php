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
        Schema::create('portfolios', function (Blueprint $table) {
            $table->id();
            $table->json('slug'); // {"en": "shanifi", "ar": "shanifi"}
            $table->json('title'); // {"en": "Shanifi", "ar": "شركة الشنيفي"}
            $table->json('client_name')->nullable(); // {"en": "Ibrahim Al-Shanifi for Trading", "ar": "شركة إبراهيم الشنيفي للتجارة"}
            $table->string('category')->default('web'); // web, branding, photo, app, uiux, content, packaging
            $table->json('tags')->nullable(); // {"en": ["Content Writing", "Web Design"], "ar": ["كتابة المحتوى", "تصميم الويب"]}
            $table->json('intro')->nullable(); // {"en": "...", "ar": "..."}
            $table->string('hero_image')->nullable();
            $table->string('thumbnail_image')->nullable();
            $table->json('company_background')->nullable(); // {"en": "...", "ar": "..."}
            $table->string('work_experience_image')->nullable();
            $table->json('work_experience')->nullable(); // {"en": "...", "ar": "..."}
            $table->string('showcase_image')->nullable();
            $table->json('gallery_images')->nullable(); // ["path1", "path2"]
            $table->json('design_concept')->nullable(); // {"en": "...", "ar": "..."}
            $table->json('next_project')->nullable(); // {"slug": "weetas", "title": {"en": "Weetas", "ar": "ويتاس"}, "tag": "Photos"}
            $table->string('brand_color')->nullable();
            $table->integer('year_completed')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portfolios');
    }
};
