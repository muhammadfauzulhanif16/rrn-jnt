<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Seller;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Order/index',[
            "title" => "Daftar Pesanan",
            "description" => "Semua daftar pesanan yang tersedia.",
            'data' => Order::orderBy('created_at', 'desc')->get(),
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
        Order::create([
            'seller' => $request->seller,
            'customer_address' => $request->customer_address,
            'status' => $request->status,
            'delivery_schedule' => $request->delivery_schedule,
        ]);

        return redirect(route('orders.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
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
