<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CryptoCurrencies extends Model
{
    use HasFactory;

    protected $fillable = [
        'label',
        'symbol',
    ];
    protected $hidden = [
        'updated_at',
        'created_at'
    ];
    public function history()
    {
        return $this->hasMany(CryptoHistory::class, 'crypto_currency_id');
    }
}
