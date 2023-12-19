<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Seller;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sellers = Seller::has('orders')->withCount('orders')->get()->map(function ($seller) {
            return [
                'id' => $seller->id,
                'name' => $seller->name,
                'order_count' => $seller->orders_count,
            ];
        })->toArray();

        return Inertia::render('Order/index', [
            "title" => "Daftar Pesanan",
            "description" => "Semua daftar pesanan yang tersedia.",
            "data" => $sellers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Order/create', [
            "title" => "Tambah Pesanan",
            "description" => "Tambahkan pesanan baru.",
            'sellers' => Seller::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $items = $request->input('items');

        foreach ($items as $item) {
            Order::create([
                'id' => Str::uuid(),
                'seller_id' => $request['seller_id'],
                'receipt_number' => $item['receipt_number'],
                'customer_address' => $item['customer_address'],
                'status' => $item['status'],
                'delivery_schedule' => $item['delivery_schedule'],
            ]);
        }

        return to_route('orders.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        return Inertia::render('Order/show', [
            "title" => "Jadwalkan Pesanan",
            "description" => "Jadwalkan pesanan untuk dikirim.",
            'data' => $order,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        return Inertia::render('Order/edit', [
            "title" => "Ubah Pesanan [{$order->receipt_number}]",
            "description" => "Ubah data pesanan.",
            'order' => $order,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $order->update([
            'seller' => $request->seller,
            'receipt_number' => $request->receipt_number,
            'customer_address' => $request->customer_address,
            'status' => $request->status,
            'delivery_schedule' => $request->delivery_schedule,
        ]);

        return to_route('orders.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->delete();

        return to_route('orders.index');
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\Courier;
use App\Http\Requests\StoreCourierRequest;
use App\Http\Requests\UpdateCourierRequest;
use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CourierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return Inertia::render('Schedule/index', [
        //     "title" => "Daftar Kurir",
        //     // "description" => "Semua daftar kurir yang terdaftar.",
        //     // 'data' => User::where('role', 'courier')->orderBy('created_at', 'desc')->get(),
        // ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // return Inertia::render('Courier/create', [
        //     "title" => "Tambah Kurir",
        //     "description" => "Tambahkan kurir baru.",
        // ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourierRequest $request)
    {
        // User::create([
        //     'id' => Str::uuid(),
        //     'full_name' => $request->full_name,
        //     'username' => $request->username,
        //     'password' => $request->password,
        // ]);

        // return to_route('couriers.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Courier $courier)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $courier)
    {
        // return Inertia::render('Courier/edit', [
        //     "title" => "Ubah Kurir",
        //     "description" => "Ubah data kurir",
        //     'courier' => $courier,
        // ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourierRequest $request, User $courier)
    {
        // $courier->update([
        //     'full_name' => $request->full_name,
        //     'username' => $request->username,
        //     'password' => $request->password ? Hash::make($request->password) : $courier->password,
        // ]);

        // return to_route('couriers.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $courier)
    {
        // $courier->delete();

        // return to_route('couriers.index');
    }
}
