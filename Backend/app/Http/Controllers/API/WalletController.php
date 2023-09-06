<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Wallet;

class WalletController extends Controller
{
    public function index()
    {
        $wallet = Wallet::where('user_id', auth()->user()->id)
            ->with([
                'cryptoWallet.cryptoCurrency' => function ($query) {
                    $query->select('label', 'id');
                }, 'transaction.cryptoCurrency' => function ($query) {
                    $query->select('label', 'id');
                }
            ])
            ->first();
        return response()->json($wallet);
    }
}
