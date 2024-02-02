<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'status',
        'customer_id',
        'courier_id',
        'updated_at'
    ];

    public function items()
    {
        return $this->hasMany(Item::class);
    }

    public function customer()
    {
        return $this->belongsTo(User::class);
    }

    public function courier()
    {
        return $this->belongsTo(User::class);
    }
}
