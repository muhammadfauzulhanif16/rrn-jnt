<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\App;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        App::setLocale('id');

        $users = ['Admin', 'Kurir 1', 'Kurir 2', 'Pelanggan 1', 'Pelanggan 2'];
        foreach ($users as $user) {
            User::create([
                'id' => Str::uuid(),
                'full_name' => $user,
                'role' => strtolower(explode(' ', $user)[0]),
                'username' => strtolower(str_replace(' ', '_', $user)),
                'password' => bcrypt(strtolower(str_replace(' ', '_', $user))),
            ]);
        }
    }
}
