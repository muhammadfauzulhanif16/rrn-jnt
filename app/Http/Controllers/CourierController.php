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
        return Inertia::render('Courier/index', [
            "title" => "Daftar Kurir",
            "description" => "Semua daftar kurir yang terdaftar.",
            'data' => User::where('role', 'courier')->orderBy('created_at', 'desc')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Courier/create', [
            "title" => "Tambah Kurir",
            "description" => "Tambahkan kurir baru.",
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourierRequest $request)
    {
        User::create([
            'id' => Str::uuid(),
            'full_name' => $request->full_name,
            'username' => $request->username,
            'password' => $request->password,
        ]);

        return to_route('couriers.index');
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
        return Inertia::render('Courier/edit', [
            "title" => "Ubah Kurir",
            "description" => "Ubah data kurir",
            'courier' => $courier,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourierRequest $request, User $courier)
    {
        $courier->update([
            'full_name' => $request->full_name,
            'username' => $request->username,
            'password' => $request->password ? Hash::make($request->password) : $courier->password,
        ]);

        return to_route('couriers.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $courier)
    {
        $courier->delete();

        return redirect(route('couriers.index'));
    }
}
