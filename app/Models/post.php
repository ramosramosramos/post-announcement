<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class post extends Model implements HasMedia
{
    use HasFactory,InteractsWithMedia,SoftDeletes;

    protected $fillable = [
        'user_id',
        'content',
        'is_archive_at',
    ];

    public function reactions()
    {
        return $this->hasMany(Reaction::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
