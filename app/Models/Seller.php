<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seller extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone_number',
        'address',
        'item_name',
        'item_type',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
