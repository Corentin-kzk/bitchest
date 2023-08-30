<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\CryptoCurrencies;
use Illuminate\Http\Request;

class CryptoCurrenciesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $cryptocurrencies  = CryptoCurrencies::all();
       return response()->json($cryptocurrencies );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
