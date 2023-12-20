<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use App\Models\Seller;
use App\Http\Requests\StoreSellerRequest;
use App\Http\Requests\UpdateSellerRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Order;

class SellerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Seller/index', [
            "title" => "Daftar Pelanggan",
            "description" => "Semua daftar pelanggan yang terdaftar.",
            "sellers" => Seller::orderBy('created_at', 'desc')->get()->map(function ($seller) {
                $seller->order_count = Order::where('seller_id', $seller->id)->count();
                return $seller;
            }),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Seller/create', [
            "title" => "Tambah Pelanggan",
            "description" => "Tambahkan pelanggan baru.",
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSellerRequest $request)
    {
        Seller::create([
            'id' => Str::uuid(),
            'name' => $request->name,
            'phone_number' => $request->phone_number,
            'address' => $request->address,
            'distance' => $request->distance,
            'item_name' => $request->item_name,
            'item_type' => $request->item_type,
        ]);

        return to_route('customers.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Seller $customer)
    {

        return Inertia::render('Seller/show', [
            "title" => "Daftar Pesanan [{$customer->name}]",
            "description" => "Semua daftar pesanan yang tersedia.",
            'orders' => Order::where('seller_id', $customer->id)->get(),
            // 'schedules' => Schedule::where('seller_id', $customer->id)->get()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Seller $customer)
    {
        return Inertia::render('Seller/edit', [
            "title" => "Ubah Pelanggan",
            "description" => "Ubah data pelanggan.",
            'customer' => $customer,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Seller $customer)
    {
        $customer->update([
            'name' => $request->name,
            'phone_number' => $request->phone_number,
            'address' => $request->address,
            'distance' => $request->distance,
            'item_name' => $request->item_name,
            'item_type' => $request->item_type,
        ]);

        return to_route('customers.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Seller $customer)
    {
        $customer->delete();

        return to_route('customers.index');
    }
}
