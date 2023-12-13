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

        return Inertia::render('Order/index',[
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
          return Inertia::render('Order/create',[
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
        // dd($request->all());
        // Order::create([
        //     'id' => Str::uuid(),
        //     'seller_id' => $request->seller_id,
        //     'customer_address' => $request->customer_address,
        //     'status' => $request->status,
        //     'delivery_schedule' => $request->delivery_schedule,
        // ]);
        // dd($request->all());
        $items = $request->input('items');
        // dd($request->all());

        foreach ($items as $item) {
            // dd($item['customer_address']);
            // $item['id'] = Str::uuid();
            // $item['seller_id'] = $request->seller_id;
            // $item['customer_address'] = $request->customer_address;
            // $item['status'] = $request->status;
            // $item['delivery_schedule'] = $request->delivery_schedule;
            Order::create([
                'id' => Str::uuid(),
                'seller_id' => $request['seller_id'],
                'receipt_number' => $item['receipt_number'],
                'customer_address' => $item['customer_address'],
                // 'status' => $request->status,
                // 'delivery_schedule' => $request->delivery_schedule,
            ]);
        }

        // dd($items);
        // $order = Order::create([
        //     'id' => Str::uuid(),
        //     'seller_id' => $request->seller_id,
        //     'customer_address' => $request->customer_address,
        //     // 'status' => $request->status,
        //     // 'delivery_schedule' => $request->delivery_schedule,
        // ]);
        // foreach ($items as $item) {
        //     // dd($item);
        //     $item['id'] = Str::uuid();
        //     $item['seller_id'] = $request->seller_id;
        //     $item['customer_address'] = $item->customer_address;
        //     // $item['status'] = $request->status;
        //     // $item['delivery_schedule'] = $request->delivery_schedule;
        //     // Order::create($item);
        //     dd($item);
        //     // $order->items()->create([
        //     //     'id' => Str::uuid(),
        //     //     'seller_id' => $request->seller_id,
        //     //     'customer_address' => $item['customer_address'],
        //     //     // 'status' => $item['status'],
        //     //     // 'delivery_schedule' => $item['delivery_schedule'],
        //     // ]);
        // }

        return redirect(route('orders.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        return Inertia::render('Order/edit',[
            "title" => "Ubah Pesanan",
            "description" => "Ubah data pesanan.",
            'data' => $order,
            'sellers' => Seller::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $order->update([
            'seller' => $request->seller,
            'customer_address' => $request->customer_address,
            'status' => $request->status,
            'delivery_schedule' => $request->delivery_schedule,
        ]);

        return redirect(route('orders.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->delete();

        return redirect(route('orders.index'));
    }
}
