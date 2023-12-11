<?php

namespace App\Http\Controllers;

use App\Models\Courier;
use App\Http\Requests\StoreCourierRequest;
use App\Http\Requests\UpdateCourierRequest;
use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Models\User;

class CourierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Courier/index',[
            "title" => "All Couriers",
            "description" => "List of all couriers.",
            'data' => User::where('role', 'courier')->orderBy('created_at', 'desc')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Courier/create',[
            "title" => "Create Courier",
            "description" => "Create a new courier.",
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        User::create([
            'full_name' => $request->full_name,
            'username' => $request->username,
            'password' => $request->password,
        ]);

        return redirect(route('couriers.index'));
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
      return Inertia::render('Courier/edit',[
        "title" => "Edit Courier",
        "description" => "Edit courier details.",
        'currentData' => $courier,
    ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $courier)
    {
        $courier->update([
        'full_name' => $request->full_name,
        'username' => $request->username,
        'password' => $request->password ? Hash::make($request->password) : $courier->password,
    ]);

        return redirect(route('couriers.index'));
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
