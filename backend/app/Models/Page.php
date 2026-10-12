<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'template',
        'is_active',
    ];

    protected $casts = [
        'title' => 'array',
        'slug' => 'array',
        'content' => 'array',
        'is_active' => 'boolean',
    ];

    public function seo()
    {
        return $this->hasOne(SeoMetadata::class, 'entity_id')->where('entity_type', 'page');
    }
}
