<?php

namespace Database\Seeders;

use App\Models\CryptoCurrencies;
use Illuminate\Database\Seeder;

class CryptoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CryptoCurrencies::factory()->count(10)->create();
    }

    
}
