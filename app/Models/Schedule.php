<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'seller_id',
        'receipt_number',
        'status'
    ];

    public function seller()
    {
        return $this->belongsTo(Seller::class);
    }
}
