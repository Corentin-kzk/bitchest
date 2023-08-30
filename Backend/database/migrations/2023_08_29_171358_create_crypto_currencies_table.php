<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('crypto_currencies', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('label');
            $table->string('logo')->nullable();
            $table->json('history'); 
            $table->integer('price',false, true)->default(0)->nullable(false);
            $table->string('symbol')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crypto_currencies');
    }
};
