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
        Schema::create('schedules', function (Blueprint $table) {
            $table->uuid('seller_id')->foreign('seller_id')->references('id')->on('sellers');
            $table->string('receipt_number');
            $table->enum('status', ['Sudah Di Pick Up', 'Belum Di Pick Up'])->default('Belum Di Pick Up');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};

