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
                'address' => $seller->address,
                'order_total' => $seller->orders_count,
                'order_status' => $seller->orders->first() ? $seller->orders->first()->status : null,
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
    public function create(Request $request)
    {
        $currentData = $request->input('currentData');

        return Inertia::render('Order/create', [
            "title" => "Tambah Pesanan",
            "description" => "Tambahkan pesanan baru.",
            'sellers' => Seller::withCount('orders')->get()->map(function ($seller) {
                return [
                    'id' => $seller->id,
                    'name' => $seller->name,
                    'orders_count' => $seller->orders_count,
                ];
            }),
            'currentData' => $currentData,
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
                'status' => $request['status'],
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
    public function edit(Request $request, Seller $seller)
    {
        $seller_id = $request->route('order');
        $seller = Seller::with('orders')->find($seller_id);

        if (!$seller) {
            abort(404, 'Seller not found');
        }

        return Inertia::render('Order/edit', [
            "title" => "Ubah Pesanan [{$seller->name}]",
            "description" => "Ubah data pesanan.",
            'currentData' => $seller,
            'sellers' => Seller::all(),
            'orders' => $seller->orders,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $items = $request->input('items');
        $deleteOrderIds = $request->input('deleteOrderIds');
    
        // Delete orders
        if ($deleteOrderIds) {
            Order::destroy($deleteOrderIds);
        }
    
        foreach ($items as $item) {
            if (isset($item['id'])) {
                // Update existing order
                $order = Order::updateOrCreate(
                    ['id' => $item['id']],
                    [
                        'seller_id' => $request['seller_id'],
                        'receipt_number' => $item['receipt_number'],
                        'status' => $request['status'],
                    ]
                );
            } else {
                // Create new order
                $order = Order::create([
                    'id' => Str::uuid(),
                    'seller_id' => $request['seller_id'],
                    'receipt_number' => $item['receipt_number'],
                    'status' => $request['status'],
                ]);
            }
        }
    
        return redirect()->route('orders.index');
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
