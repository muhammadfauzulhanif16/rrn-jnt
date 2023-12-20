<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SellerController;
use App\Http\Controllers\CourierController;
use App\Http\Controllers\ScheduleController;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::fallback(function () {
    if (auth()->check()) {
        return to_route('schedules.index');
    } else {
        return to_route('login');
    }
});

// Route::get('/orders', function () {
//     return Inertia::render('Orders');
// })->name('orders');
// Route::get('/orders', [OrderController::class, 'index'])->name('orders');



// Route::get('/sellers', function () {
//     return Inertia::render('Sellers');
// })->name('sellers');

// Route::get('/couriers', function () {
//     return Inertia::render('Couriers');
// })->name('couriers');

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::resource('schedules', ScheduleController::class);
 Route::resource('orders', OrderController::class);
    Route::resource('customers', SellerController::class);
    Route::resource('couriers', CourierController::class);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route::resource('orders', \App\Http\Controllers\OrderController::class);

require __DIR__ . '/auth.php';
