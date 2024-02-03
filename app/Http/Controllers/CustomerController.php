<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Customer/Index', [
            'title' => 'Daftar Pelanggan',
            'meta' => session('meta'),
            'customers' => User::where('role', 'pelanggan')
                ->get()
                ->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'full_name' => $user->full_name,
                        'created_at' => Carbon::parse($user->created_at)->format('d-m-Y H:i:s'),
                        'updated_at' => Carbon::parse($user->updated_at)->format('d-m-Y H:i:s'),
                    ];
                }),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $customer)
    {
        // dd($customer->id);
        try {
            $customer->delete();

            return redirect()->route('customers.index')->with('meta', [
                'status' => true,
                'title' => 'Berhasil menghapus pelanggan',
            ]);
        } catch (\Throwable $th) {
            return redirect()->back()->with('meta', [
                'status' => false,
                'title' => 'Gagal menghapus pelanggan',
            ]);
        }
    }
}
