<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
            ->get();
        return response()->json(['wallet' => $wallet]);
    }
}
