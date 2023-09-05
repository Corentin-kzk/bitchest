<?php

namespace Database\Seeders;

use App\Models\CryptoCurrencies;
use App\Models\CryptoHistory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class CryptoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cryptoNames = [
            'Bitcoin' => 'BTC',
            'Ethereum' => 'ETH',
            'Ripple' => 'XRP',
            'Bitcoin Cash' => 'BCH',
            'Cardano' => 'ADA',
            'Litecoin' => 'LTC',
            'NEM' => 'XEM',
            'Stellar' => 'XLM',
            'IOTA' => 'MIOTA',
            'Dash' => 'DASH'
        ];

        foreach ($cryptoNames as $name => $symbol) {
            $slugifiedCryptoName = Str::slug($name, '-');
            $imageName = $slugifiedCryptoName . '.png';

            CryptoCurrencies::updateOrInsert(
                ['label' => $name],
                [
                    'label' => $name,
                    'logo' => env('APP_URL') . '/images/crypto_logos/' . $imageName,
                    'price' => 0,
                    'symbol' => $symbol,
                ]
            );

            $crypto = CryptoCurrencies::where('label', $name)->first();
            $currentPrice = 0;
            for ($day = 1; $day <= 30; $day++) {
                if ($day === 1) {
                    $currentPrice = $this->getFirstCotation($name);
                } else {
                    $currentPrice +=  $this->getCotationFor($name);
                }
                $history = new CryptoHistory([
                    'crypto_currency_id' => $crypto->id,
                    'price' => max(0, $currentPrice),
                    'created_at' => now()->subDays(30 - $day), // Date remontant de 30 jours à aujourd'hui
                    'updated_at' => now()->subDays(30 - $day),
                ]);


                $history->save();
                // Mettez à jour la valeur "price" dans CryptoCurrencies avec la dernière valeur de l'historique
                if ($day === 30) {
                    DB::table('crypto_currencies')
                        ->where('id', $crypto->id)
                        ->update(['price' => max(0, $currentPrice)]);
                }
            }
        }
    }

    /**
     * Renvoie la valeur de mise sur le marché de la crypto monnaie
     * @param $cryptoname {string} Le nom de la crypto monnaie
     */
    private function getFirstCotation($cryptoname)
    {
        return ord(substr($cryptoname, 0, 1)) + rand(0, 10);
    }

    /**
     * Renvoie la variation de cotation de la crypto monnaie sur un jour
     * @param $cryptoname {string} Le nom de la crypto monnaie
     */
    private function getCotationFor($cryptoname)
    {
        return ((rand(0, 99) > 40) ? 1 : -1) * ((rand(0, 99) > 49) ? ord(substr($cryptoname, 0, 1)) : ord(substr($cryptoname, -1))) * (rand(1, 10) * .01);
    }
}
