<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\CryptoCurrency;
use Illuminate\Http\Request;

class CryptoCurrencyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $cryptocurrencies = CryptoCurrency::query();
        if ($request->has('name')) {
            $cryptocurrencies->where('label', 'like', '%' . $request->input('name') . '%');
        }
        $cryptocurrencies = $cryptocurrencies->get();
        return response()->json($cryptocurrencies);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $cryptocurrencie = CryptoCurrency::with(['history' => function ($query) {
            $query->orderBy('created_at', 'asc');
        }])->find($id);
        return response()->json($cryptocurrencie);
    }
}
