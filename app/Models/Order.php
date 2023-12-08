<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable=[
        'invoice_number',
        'seller_id',
        'customer_name',
        'customer_address',
        'delivery_distance',
        'delivery_schedule',
    ];

    public function seller()
    {
        return $this->belongsTo(Seller::class);
    }
}
