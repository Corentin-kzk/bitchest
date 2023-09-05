<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CryptoHistory extends Model
{
    use HasFactory;
    protected $hidden = [
        'id',
        'updated_at',
        'crypto_currency_id'
    ];
    public function crypto_currency()
    {
        return $this->belongsTo(CryptoCurrency::class, 'crypto_currency_id');
    }
}
