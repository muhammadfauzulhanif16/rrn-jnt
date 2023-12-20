<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Schedule;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Seller;
use Illuminate\Support\Str;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $sellers = Seller::has('orders')->withCount('orders')->get()->map(function ($seller) {
        //     return [
        //         'id' => $seller->id,
        //         'name' => $seller->name,
        //         'address' => $seller->address,
        //         'order_total' => $seller->orders_count,
        //         'order_status' => $seller->orders->first() ? $seller->orders->first()->status : null,
        //     ];
        // })->toArray();
        // // dd($sellers);
     
        return Inertia::render('Schedule', [
            "title" => "Penjadwalan",
            "description" => "Penjadwalan pengiriman barang.",
            // "data" => $sellers,
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
        $id = $request->input('id');
        $orders = Order::where('seller_id', $id)->get();
        // dd($orders);
        // dd($id);
        // $items = $request->input('items');

        foreach ($orders as $order) {
            Schedule::create([
                'id' => Str::uuid(),
                'seller_id' => $request['seller_id'],
                'receipt_number' => $order['receipt_number'],
            ]);
        }

        // return to_route('orders.index');
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
