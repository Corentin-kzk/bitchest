<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    protected $fillable = ['crypto_id', 'wallet_id', 'amount', 'type', 'price'];
    public function cryptoCurrency()
    {
        return $this->belongsTo(CryptoCurrency::class, 'crypto_id');
    }

    public function wallet()
    {
        return $this->belongsTo(Wallet::class, 'wallet_id');
    }
}
