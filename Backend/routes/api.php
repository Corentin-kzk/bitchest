<?php

use App\Http\Controllers\API\CryptoCurrenciesController;
use App\Http\Controllers\API\UserController;
use App\Models\CryptoCurrencies;
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
        return $request->user();
    });
    Route::middleware(['isAdmin'])->group(function () {
        Route::apiResource('users', UserController::class);
    });
    Route::apiResource('cryptos', CryptoCurrenciesController::class);
});




