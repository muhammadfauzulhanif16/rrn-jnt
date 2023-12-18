<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable=[
        'id',
        'seller_id',
        'receipt_number',
        'customer_address',
        'status',
        'delivery_schedule',
    ];

    public function seller()
    {
        return $this->belongsTo(Seller::class);
    }
}
