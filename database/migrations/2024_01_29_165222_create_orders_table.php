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
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('status');
            $table->foreignUuid('customer_id')->constrained('users')->onDelete('cascade');
            $table->uuid('courier_id')->constrained('users')->nullable()->onDelete('cascade');
            $table->boolean('is_auto')->default(false);
            $table->timestamp('taken_on')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
