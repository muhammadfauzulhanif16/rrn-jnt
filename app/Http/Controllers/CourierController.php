<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCourierRequest;
use App\Http\Requests\UpdateCourierRequest;
use App\Models\User;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

setlocale(LC_TIME, 'id_ID');

class CourierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Carbon::setLocale('id');

        return Inertia::render('Courier/Index', [
            'title' => 'Daftar Kurir',
            'meta' => session('meta'),
            'couriers' => User::where('role', 'kurir')
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
        return Inertia::render('Courier/Create', [
            'title' => 'Tambah Kurir',
            'meta' => session('meta'),
            'users' => User::get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            foreach ($request->couriers as $courier) {
                User::create([
                    'id' => Str::uuid(),
                    'full_name' => $courier['full_name'],
                    'role' => 'kurir',
                    'username' => $courier['username'],
                    'password' => bcrypt($courier['password']),
                ]);
            }

            return redirect()->route('couriers.index')->with('meta', [
                'status' => true,
                'title' => 'Berhasil menambahkan kurir',
            ]);
        } catch (\Throwable $th) {
            return redirect()->back()->with('meta', [
                'status' => false,
                'title' => 'Gagal menambahkan kurir',
            ]);
        }
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
        return Inertia::render('Courier/Edit', [
            'title' => 'Ubah Kurir',
            'meta' => session('meta'),
            'courier' => $courier, // 'password' => '
            // 'courier' => [
            //     'id' => $courier->id,
            //     'full_name' => $courier->full_name,
            //     'username' => $courier->username,
            //     'password' => $courier->password,
            // ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $courier)
    {
        try {
            $courier->update([
                'full_name' => $request->full_name,
            ]);

            return redirect()->route('couriers.index')->with('meta', [
                'status' => true,
                'title' => 'Berhasil mengubah kurir',
            ]);
        } catch (\Throwable $th) {
            return redirect()->back()->with('meta', [
                'status' => false,
                'title' => 'Gagal mengubah kurir',
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $courier)
    {
        try {
            $courier->delete();

            return redirect()->route('couriers.index')->with('meta', [
                'status' => true,
                'title' => 'Berhasil menghapus kurir',
            ]);
        } catch (\Throwable $th) {
            return redirect()->back()->with('meta', [
                'status' => false,
                'title' => 'Gagal menghapus kurir',
            ]);
        }
    }
}
