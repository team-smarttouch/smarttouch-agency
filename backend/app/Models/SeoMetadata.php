<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeoMetadata extends Model
{
    use HasFactory;

    protected $table = 'seo_metadata';

    protected $fillable = [
        'entity_type',
        'entity_id',
        'meta_title',
        'meta_description',
        'og_title',
        'og_description',
        'og_image',
        'canonical_url',
        'schema_markup',
        'focus_keywords',
        'indexable',
    ];

    protected $casts = [
        'meta_title' => 'array',
        'meta_description' => 'array',
        'og_title' => 'array',
        'og_description' => 'array',
        'schema_markup' => 'array',
        'focus_keywords' => 'array',
        'indexable' => 'boolean',
    ];
}
