<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seller extends Model
{
    use HasFactory;

    protected $fillable = [
        'shop_name',
        'address',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
