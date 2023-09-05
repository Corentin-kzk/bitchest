<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\CryptoCurrencies;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CryptoController extends Controller
{
    public function buyCrypto(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'amount' => 'required|numeric|min:0.01',
            'id' => 'required|integer|min:1|exists:crypto_currencies,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        $user = auth()->user();
        $crypto = CryptoCurrencies::find($request->id);

        if (!$crypto) {
            return response()->json(['message' => 'Crypto not found'], 404);
        }

        $price = $request->amount * $crypto->price;
        if ($user->wallet->balance - $price < 0) {
            return response()->json(['message' => 'Insufficient funds'], 400);
        }


        $transaction = new Transaction();
        $transaction->crypto_id = $crypto->id;
        $transaction->wallet_id = $user->wallet->id;
        $transaction->amount = $request->amount;
        $transaction->price = $price;
        $transaction->type = 'buy';
        $transaction->save();

        $user->wallet->balance -= $price;
        $user->wallet->save();

        return response()->json(['message' => 'Insufficient funds'], 200);
    }

    public function sellCrypto(Request $request)
    {
        // Logique de vente de crypto-monnaie ici

        // Enregistrez la transaction dans la base de données
        // ...

        return response()->json(['message' => 'Crypto sale successful']);
    }
}
