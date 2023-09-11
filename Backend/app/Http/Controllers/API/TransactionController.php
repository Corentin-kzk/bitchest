<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\CryptoCurrency;
use App\Models\cryptoWallet;
use App\Models\Transaction;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class TransactionController extends Controller
{

    public function index(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'page' => 'integer|min:1',
            'per_page' => 'integer|min:1',
            'cryptoId' => 'integer|min:1|exists:crypto_currencies,id',

        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $page = $request->input('page', 1); // Page par défaut : 1
        $perPage = $request->input('per_page', 8); // Nombre d'éléments par page par défaut : 10
        $cryptoId =  $request->input('cryptoId');
        // Récupérer le portefeuille de l'utilisateur avec les transactions associées
        $wallet = Wallet::where('user_id', auth()->user()->id)->first();
        if ($cryptoId) {
            $transactions = $wallet->transaction()->with('cryptoCurrency')->orderBy('created_at', 'desc')->whereHas('cryptoCurrency', function ($query) use ($cryptoId) {
                $query->where('id', $cryptoId);
            })->paginate($perPage, ['*'], 'page', $page);
        } else {
            $transactions = $wallet->transaction()->with('cryptoCurrency')->orderBy('created_at', 'desc')->paginate($perPage, ['*'], 'page', $page);
        }
        return response()->json($transactions);
    }


    public function buyCrypto(Request $request)
    {
        //Validate data from request
        $validator = Validator::make($request->all(), [
            'amount' => 'required|numeric|min:0.01',
            'id' => 'required|integer|min:1|exists:crypto_currencies,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        //Retrieved logged user
        $user = auth()->user();
        //retrieved cryptocurrency
        $crypto = CryptoCurrency::find($request->id);

        if (!$crypto) {
            return response()->json(['message' => 'Crypto not found'], 404);
        }
        //Calculation of Crypto currency based on it's amount and price
        $price = $request->amount * $crypto->price;

        if ($user->wallet->balance - $price < 0) {
            return response()->json(['message' => 'Insufficient funds'], 400);
        }

        //Retrieving or creating cryptoWallet
        $cryptoWallet = cryptoWallet::firstOrCreate(
            [
                'crypto_id' => $crypto->id,
                'wallet_id' =>  $user->wallet->id,
            ],
            [
                'crypto_id ' => $crypto->id,
                'wallet_id' =>  $user->wallet->id,
                'amount' => 0,
                'balance' =>  0,
            ]
        );
        if ($cryptoWallet) {
            $cryptoWallet->amount += $request->amount;
            $cryptoWallet->balance += $price;
            $cryptoWallet->save();
        }

        //Create a new Transaction
        $transaction = new Transaction();
        $transaction->crypto_id = $crypto->id;
        $transaction->wallet_id = $user->wallet->id;
        $transaction->amount = $request->amount;
        $transaction->price = $price;
        $transaction->type = 'buy';
        $transaction->save();


        $user->wallet->balance -= $price;
        $user->wallet->save();

        return response()->json(['message' => 'Crypto buy successful'], 200);
    }

    public function sellCrypto(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'transactionId' => 'required|integer|min:1|exists:transactions,id',
            'cryptoId' => 'required|integer|min:1|exists:crypto_currencies,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $user = auth()->user();

        $crypto = CryptoCurrency::find($request->cryptoId);

        if (!$crypto) {
            return response()->json(['message' => 'Crypto not found'], 404);
        }

        $transaction = Transaction::find($request->transactionId);

        if (!$transaction)
            return response()->json(['message' => 'Transaction not found'], 404);

        $cryptoWallet = cryptoWallet::where('crypto_id', $crypto->id)->where('wallet_id', $user->wallet->id)->first();

        if (!$cryptoWallet)
            return response()->json(['message' => 'Wallet not found'], 404);

        $oldPriceByCrypto = $transaction->price / $transaction->amount;
        $profit =   $crypto->price - $oldPriceByCrypto;

        $price = floatval($transaction->amount) * floatval($crypto->price);

        if ($transaction->amount - $cryptoWallet->amount === 0) {
            $cryptoWallet->delete();
        } else {
            $cryptoWallet->amount -= $transaction->amount;
            $cryptoWallet->balance -= $transaction->price;
            $cryptoWallet->save();
        }

        $sellTransaction = new Transaction();
        $sellTransaction->crypto_id = $crypto->id;
        $sellTransaction->wallet_id = $user->wallet->id;
        $sellTransaction->amount = $transaction->amount;
        $sellTransaction->price =  $price;
        $sellTransaction->profit = $profit;
        $sellTransaction->type = 'sell';
        $sellTransaction->save();


        $transaction->owned = false;
        $transaction->save();

        $user->wallet->balance += $price;
        $user->wallet->save();

        return response()->json(['message' => 'Crypto sale successful']);
    }
}
