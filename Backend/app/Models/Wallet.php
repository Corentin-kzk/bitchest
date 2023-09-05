<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function transaction()
    {
        return $this->hasOne(Transaction::class, 'wallet_id');
    }

    protected $hidden = [
        'user_id',
        'id',
        'updated_at',
        'created_at'
    ];
}
