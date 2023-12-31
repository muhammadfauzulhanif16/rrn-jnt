<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seller extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';
    

    protected $fillable = [
        'id',
        'name',
        'phone_number',
        'address',
        'distance',
        'item_name',
        'item_type',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }
}
