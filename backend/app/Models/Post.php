<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'slug',
        'summary',
        'content',
        'featured_image',
        'status',
        'published_at',
    ];

    protected $casts = [
        'title' => 'array',
        'slug' => 'array',
        'summary' => 'array',
        'content' => 'array',
        'published_at' => 'datetime',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function seo()
    {
        return $this->hasOne(SeoMetadata::class, 'entity_id')->where('entity_type', 'post');
    }
}
