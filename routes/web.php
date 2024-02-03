<?php

use App\Http\Controllers\CourierController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScheduleController;
use App\Models\History;
use App\Models\Order;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
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

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::fallback(fn () => auth()->check() ? redirect()->route('dashboard') : redirect()->route('login'));

Route::middleware(['auth'])->prefix('dashboard')->group(function () {
    Route::get('/', function () {
        $role = Auth::user()->role;
        $userId = Auth::user()->id;

        // $orders = Order::when($role === 'pelanggan', function ($query) use ($userId) {
        //     return $query->where('customer_id', $userId)->whereIn('status', ['Siap Dikirim', 'Belum Siap Dikirim']);
        // }, function ($query) {
        //     return $query->where('status', 'Siap Dikirim');
        // })->get();

        // $schedule = Order::when($role === 'pelanggan', function ($query) use ($userId) {
        //     return $query->where('customer_id', $userId);
        // }, function ($query) use ($role, $userId) {
        //     if ($role === 'kurir') {
        //         return $query->where('courier_id', $userId);
        //     }
        // })->whereIn('status', ['Sudah Diambil', 'Belum Diambil'])->get();

        return Inertia::render('Dashboard', [
            'title' => 'Beranda',
            'meta' => session('meta'),
            'couriers' => User::where('role', 'kurir')->get(),
            'customers' => User::where('role', 'pelanggan')->get(),
            'orders' => Order::orderBy('created_at', 'desc')->get(),
            // 'schedule' => $schedule
            'histories' => History::orderBy('created_at', 'desc')->take(5)->get()->map(function ($history) {
                return [
                    'id' => $history->id,
                    'full_name' => $history->user->full_name,
                    'action' => $history->action,
                    'created_at' => $history->created_at->diffForHumans(),
                ];
            }),
        ]);
    })->name('dashboard');

    Route::get("/schedule", [ScheduleController::class, 'index'])->name("schedule.index");
    Route::get("/schedule/create/{order}", [ScheduleController::class, 'create'])->name("schedule.create");
    Route::post("/schedule/{order}", [ScheduleController::class, 'store'])->name("schedule.store");
    Route::get("/schedule/routes", function () {
        return Inertia::render('Schedule/Routes', [
            'title' => 'Rute Pengiriman',
            // 'meta' => session('meta'),
            'customers' => Order::where('courier_id', Auth::user()->id)
                ->whereIn('status', ['Belum Diambil'])
                ->get()
                ->map(function ($order) {
                    return $order->customer;
                })
                ->unique('id')
                ->values()
        ]);
    })->name("schedule.routes");
    Route::put("/schedule/{order}", [ScheduleController::class, 'update'])->name("schedule.update");

    Route::resource('histories', HistoryController::class);

    Route::get('/settings', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/settings', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/settings', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resources([
        'couriers' => CourierController::class,
        'customers' => CustomerController::class,
        'orders' => OrderController::class,
    ]);
});



require __DIR__ . '/auth.php';
