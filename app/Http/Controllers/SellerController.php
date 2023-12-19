<?php

namespace App\Http\Controllers;

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
            "title" => "Daftar Penjual",
            "description" => "Semua daftar penjual yang terdaftar.",
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
            "title" => "Tambah Penjual",
            "description" => "Tambahkan penjual baru.",
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
            'item_name' => $request->item_name,
            'item_type' => $request->item_type,
        ]);

        return to_route('sellers.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Seller $seller)
    {
        return Inertia::render('Seller/show', [
            "title" => "Daftar Pesanan [{$seller->name}]",
            "description" => "Semua daftar pesanan yang tersedia.",
            'orders' => Order::where('seller_id', $seller->id)->get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Seller $seller)
    {
        return Inertia::render('Seller/edit', [
            "title" => "Ubah Penjual",
            "description" => "Ubah data penjual.",
            'seller' => $seller,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Seller $seller)
    {
        $seller->update([
            'name' => $request->name,
            'phone_number' => $request->phone_number,
            'address' => $request->address,
            'item_name' => $request->item_name,
            'item_type' => $request->item_type,
        ]);

        return redirect(route('sellers.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Seller $seller)
    {
        $seller->delete();

        return redirect(route('sellers.index'));
    }
}
