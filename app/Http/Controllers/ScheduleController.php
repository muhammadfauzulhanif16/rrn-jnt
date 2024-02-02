<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    public function index()
    {
        $role = Auth::user()->role;
        $userId = Auth::user()->id;

        $orders = null;

        if (Auth::user()->role === "admin") {
            $orders = Order::whereIn('status', ['Sudah Diambil', 'Belum Diambil'])->get()->map(function ($order) {
                return [
                    'id' => $order->id,
                    'customer_name' => $order->customer->full_name,
                    'items_count' => $order->items->count(),
                    'status' => $order->status,
                    'courier_name' => $order->courier->full_name,
                    'updated_at' => $order->updated_at->format('d-m-Y H:i:s'),
                    'created_at' => $order->created_at->format('d-m-Y H:i:s'),
                    'customer' => $order->customer,
                    'items' => $order->items,
                ];
            });
        }

        if (Auth::user()->role === "pelanggan") {
            $orders = Order::where('customer_id', $userId)->whereIn('status', ['Sudah Diambil', 'Belum Diambil'])->get()->map(function ($order) {
                return [
                    'id' => $order->id,
                    'items_count' => $order->items->count(),
                    'status' => $order->status,
                    'courier_name' => $order->courier->full_name,
                    'updated_at' => $order->updated_at->format('d-m-Y H:i:s'),
                    'created_at' => $order->created_at->format('d-m-Y H:i:s'),
                    'customer' => $order->customer,
                    'items' => $order->items,
                ];
            });
        }

        if (Auth::user()->role === "kurir") {
            $orders = Order::where('courier_id', $userId)->whereIn('status', ['Sudah Diambil', 'Belum Diambil'])->get()->map(function ($order) {
                return [
                    'id' => $order->id,
                    'customer_name' => $order->customer->full_name,
                    'items_count' => $order->items->count(),
                    'status' => $order->status,
                    'updated_at' => $order->updated_at->format('d-m-Y H:i:s'),
                    'created_at' => $order->created_at->format('d-m-Y H:i:s'),
                    'customer' => $order->customer,
                    'items' => $order->items,
                ];
            });
        }

        return Inertia::render('Schedule/Index', [
            'title' => 'Penjadwalan',
            'meta' => session('meta'),
            'orders' => $orders
        ]);
    }

    public function create(Order $order)
    {
        return Inertia::render('Schedule/Create', [
            'title' => "Tambah Jadwal ({$order->customer->full_name})",
            'meta' => session('meta'),
            'order' => Order::where('id', $order->id)->with('items')->first(),
            'couriers' => User::where('role', 'kurir')->orderBy('full_name', 'asc')->get()
        ]);
    }

    public function store(Request $request, Order $order)
    {
        $order->update([
            'courier_id' => $request->schedule['courier_id'],
            'status' => 'Belum Diambil'
        ]);

        return redirect()->route('schedule.index')->with('meta', ['status' => true, 'title' => 'Berhasil menambahkan jadwal']);
    }

    public function update(Order $order)
    {
        $order->update([
            'status' => 'Sudah Diambil'
        ]);

        return redirect()->route('schedule.index')->with('meta', ['status' => true, 'title' => 'Berhasil mengubah status pesanan']);
    }
}
