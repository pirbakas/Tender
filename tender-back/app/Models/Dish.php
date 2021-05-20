<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dish extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    public $fillable = [
        'user_id',
        'type',
        'title',
        'description',
        'portion',
        'location',
        'withdrawal_time',
        'url_image',
        'booker_id'
    ];
}
