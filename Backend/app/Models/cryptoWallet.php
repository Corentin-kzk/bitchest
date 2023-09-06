<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class cryptoWallet extends Model
{
    use HasFactory;
    protected $fillable = [
        'crypto_id', 'wallet_id', 'amount', 'price'
    ];
    protected $hiden = [
        'updated_at',
        'created_at'
    ];
    public function wallet()
    {
        return $this->belongsTo(Wallet::class);
    }
    public function cryptoCurrency()
    {
        return $this->belongsTo(cryptoCurrency::class, 'crypto_id');
    }
}
