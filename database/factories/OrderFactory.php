<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Customer;
use App\Models\Seller;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'invoice_number' => fake()->unique()->randomNumber(8),
            'seller_id' => Seller::factory(),
            'customer_name' => fake()->name(),
            'customer_address' => fake()->address(),
            'delivery_distance' => fake()->numberBetween(1, 100),
            'delivery_schedule' => fake()->dateTime(),
        ];
    }
}
