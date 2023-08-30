<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CryptoCurrencies>
 */
class CryptoCurrenciesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
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

        $name = $this->faker->unique()->randomElement(array_keys($cryptoNames));
        $symbol = $cryptoNames[$name];
        $slugifiedCryptoName = Str::slug($name, '-');
        $imageName = $slugifiedCryptoName . '.png';


        $date = Carbon::now()->subDays(29);

        $cotations = [
            [
                'date' => $date->toDateString(),
                'cotation' => $this->getFirstCotation($name)
            ],
        ];
        for ($day = 1; $day <= 29; $day++) {
            $previousCotation = end($cotations);
            $cotation = $previousCotation['cotation'] + $this->getCotationFor($name);

            $cotation = max(0, $cotation);

            $cotations[] = [
                'date' => $date->toDateString(),
                'cotation' => $cotation
            ];

            $date->addDay();
        }

        return [
            'label' => $name,
            'symbol' => $symbol,
            'logo' => env('APP_URL') . '/images/crypto_logos/' . $imageName,
            'history' => json_encode($cotations),
            'price' => 0,
        ];
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
