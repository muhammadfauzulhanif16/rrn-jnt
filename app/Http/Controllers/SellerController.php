<?php

namespace App\Http\Controllers;

use App\Models\Seller;
use App\Http\Requests\StoreSellerRequest;
use App\Http\Requests\UpdateSellerRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SellerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Seller/index',[
            "title" => "All Sellers",
            "description" => "List of all sellers.",
            'data' => Seller::orderBy('created_at', 'desc')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Seller/create',[
            "title" => "Create Seller",
            "description" => "Create a new seller.",
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Seller::create([
            'shop_name' => $request->shop_name,
            'address' => $request->address,
        ]);

        return redirect(route('sellers.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Seller $seller)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Seller $seller)
    {
        return Inertia::render('Seller/edit',[
            "title" => "Edit Seller",
            "description" => "Edit seller details.",
            'currentData' => $seller,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Seller $seller)
    {
        $seller->update([
            'shop_name' => $request->shop_name,
            'address' => $request->address,
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
