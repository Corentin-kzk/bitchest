<?php

use App\Http\Controllers\API\CryptoCurrencyController;
use App\Http\Controllers\API\TransactionController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\Api\WalletController;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/me', function (Request $request) {
        return User::with('wallet')->find($request->user()->id);
    });
    Route::patch('/me', [UserController::class, 'editMyUser'])->name('api.editMe');
    Route::middleware(['isAdmin'])->group(function () {
        Route::apiResource('users', UserController::class);
    });
    Route::apiResource('cryptos', CryptoCurrencyController::class)->only(['index', 'show']);
    Route::post('cryptos/buy', [TransactionController::class, 'buyCrypto'])->name('api.buy-crypto');
    Route::post('cryptos/sell', [TransactionController::class, 'sellCrypto'])->name('api.sell-crypto');
    Route::get('/me/wallet', [WalletController::class, 'index'])->name('api.myWallet');
    Route::get('/me/transactions', [TransactionController::class, 'index'])->name('api.myTransaction');
});
