<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WalletController extends Controller
{
    public function index()
    {
        // Récupérez l'utilisateur connecté
        $user = User::with('wallet.transactions')->find(auth()->user()->id);
        // Récupérez le wallet de l'utilisateur avec ses transactions
        // $wallet = $user->wallet()->with('transactions')->first();
        return response()->json($user);
    }
}
