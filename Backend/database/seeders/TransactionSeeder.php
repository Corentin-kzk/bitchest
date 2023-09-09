<?php

namespace Database\Seeders;

use App\Models\CryptoCurrency;
use App\Models\cryptoWallet;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Récupérez les utilisateurs de manière aléatoire
        $users = User::inRandomOrder()->with('wallet')->get();
        $cryptoCurrencies = CryptoCurrency::inRandomOrder()->take(rand(1, 6))->get();


        foreach ($users as $user) {

            foreach ($cryptoCurrencies as $cryptoCurrency) {
                $cryptoHistories = $cryptoCurrency->history()->inRandomOrder()->take(rand(1, 6))->get();
                foreach ($cryptoHistories as $cryptoHistory) {


                    $amount = rand(1, 250);
                    $price = $amount * $cryptoHistory->price;

                    $cryptoWallet = cryptoWallet::firstOrCreate(
                        [
                            'crypto_id' => $cryptoCurrency->id,
                            'wallet_id' =>  $user->wallet->id,
                        ],
                        [
                            'crypto_id' => $cryptoCurrency->id,
                            'wallet_id' =>  $user->wallet->id,
                            'amount' => 0,
                            'balance' =>  0,
                        ]
                    );
                    if ($cryptoWallet) {
                        $cryptoWallet->amount += $amount;
                        $cryptoWallet->balance += $price;
                        $cryptoWallet->save();
                    }

                    $transaction = new Transaction();
                    $transaction->crypto_id = $cryptoCurrency->id;
                    $transaction->wallet_id = $user->wallet->id;
                    $transaction->amount = $amount;
                    $transaction->price = $price;
                    $transaction->type = 'buy';
                    $transaction->created_at = $cryptoHistory->created_at;
                    $transaction->updated_at = $cryptoHistory->updated_at;
                    $transaction->save();
                }
            }
        }
    }
}
