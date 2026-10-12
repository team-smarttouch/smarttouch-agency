<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'client_name',
        'category',
        'tags',
        'intro',
        'hero_image',
        'thumbnail_image',
        'company_background',
        'work_experience_image',
        'work_experience',
        'showcase_image',
        'gallery_images',
        'design_concept',
        'next_project',
        'brand_color',
        'year_completed',
        'sort_order',
        'is_published',
        'status',
    ];

    protected $casts = [
        'slug' => 'array',
        'title' => 'array',
        'client_name' => 'array',
        'tags' => 'array',
        'intro' => 'array',
        'company_background' => 'array',
        'work_experience' => 'array',
        'gallery_images' => 'array',
        'design_concept' => 'array',
        'next_project' => 'array',
        'year_completed' => 'integer',
        'is_published' => 'boolean',
        'sort_order' => 'integer',
    ];

    protected $appends = ['status'];

    public function seo()
    {
        return $this->hasOne(SeoMetadata::class, 'entity_id')->where('entity_type', 'portfolio');
    }

    public function getStatusAttribute()
    {
        return $this->is_published ? 'published' : 'draft';
    }

    public function setStatusAttribute($value)
    {
        $this->attributes['is_published'] = ($value === 'published' || $value === true || $value === '1' || $value === 1);
    }
}
