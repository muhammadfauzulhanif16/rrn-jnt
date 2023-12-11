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
            "title" => "All Orders",
            "description" => "List of all orders.",
            'data' => Order::orderBy('created_at', 'desc')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
          return Inertia::render('Order/create',[
            "title" => "Create Order",
            "description" => "Create a new order.",
            'sellers' => Seller::all(),
          ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Order::create([
            'invoice_number' => $request->invoice_number,
            'seller' => $request->seller,
            'customer_name' => $request->customer_name,
            'customer_address' => $request->customer_address,
            'delivery_distance' => $request->delivery_distance,
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
            "title" => "Edit Order",
            "description" => "Edit an existing order.",
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
            'invoice_number' => $request->invoice_number,
            'seller' => $request->seller,
            'customer_name' => $request->customer_name,
            'customer_address' => $request->customer_address,
            'delivery_distance' => $request->delivery_distance,
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
