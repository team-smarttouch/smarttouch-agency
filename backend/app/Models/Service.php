<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'short_description',
        'full_content',
        'icon',
        'features',
        'sections',
        'featured_image',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'title' => 'array',
        'slug' => 'array',
        'short_description' => 'array',
        'full_content' => 'array',
        'features' => 'array',
        'sections' => 'array',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function inquiries()
    {
        return $this->hasMany(Inquiry::class);
    }

    public function seo()
    {
        return $this->hasOne(SeoMetadata::class, 'entity_id')->where('entity_type', 'service');
    }
}
