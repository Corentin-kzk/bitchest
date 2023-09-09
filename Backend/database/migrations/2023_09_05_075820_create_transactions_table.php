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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->enum('type', ['buy', 'sell']);
            $table->decimal('amount', 15, 2, true)->default(0);
            $table->decimal('price', 15, 2, true)->default(0);
            $table->decimal('profit', 15, 2)->default(0);
            $table->boolean('owned')->default(true);
            $table->unsignedBigInteger('wallet_id');
            $table->foreign('wallet_id')->references('id')->on('wallets')->onDelete('cascade');
            $table->unsignedBigInteger('crypto_id');
            $table->foreign('crypto_id')->references('id')->on('crypto_currencies');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
