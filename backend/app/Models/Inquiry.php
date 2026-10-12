<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'service_name',
        'name',
        'email',
        'phone',
        'company',
        'budget_range',
        'message',
        'status',
        'admin_notes',
        'locale',
        'ip_address',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
