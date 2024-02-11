<?php

namespace App\Http\Controllers;

use App\Models\History;
use App\Models\Order;
use App\Models\User;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;

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
                    'taken_on' => $order->taken_on ? Carbon::parse($order->taken_on)->format('d-m-Y H:i:s') : '-',
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
                    'taken_on' => $order->taken_on ? Carbon::parse($order->taken_on)->format('d-m-Y H:i:s') : '-',
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
                    'taken_on' => $order->taken_on ? Carbon::parse($order->taken_on)->format('d-m-Y H:i:s') : '-',
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

//    public function store(Request $request, Order $order)
//    {
//        // Retrieve all couriers with the type of transportation "motorbike"
//        $couriers = User::where('role', 'kurir')->where('transportation_type', 'Motor')->get();
//
//        $selectedCourier = null;
//
//        foreach ($couriers as $courier) {
//            // Calculate the total items_count of the courier's orders
//            $totalItemsCount = Order::where('courier_id', $courier->id)->withCount('items')->get()->sum('items_count');
//
//            // Check if the courier's transportation capacity minus the total items_count is greater than or equal to the items_count of the new order
//            if ($courier->transportation_capacity - $totalItemsCount >= $order->items()->count()) {
//                $selectedCourier = $courier;
//                break;
//            }
//        }
//
//        // If no courier with "motorbike" type of transportation was selected, try to select a courier with "car" type of transportation
//        if (!$selectedCourier) {
//            $couriers = User::where('role', 'kurir')->where('transportation_type', 'Mobil')->get();
//
//            foreach ($couriers as $courier) {
//                // Calculate the total items_count of the courier's orders
//                $totalItemsCount = Order::where('courier_id', $courier->id)->withCount('items')->get()->sum('items_count');
//
//                // Check if the courier's transportation capacity minus the total items_count is greater than or equal to the items_count of the new order
//                if ($courier->transportation_capacity - $totalItemsCount >= $order->items()->count()) {
//                    $selectedCourier = $courier;
//                    break;
//                }
//            }
//        }
//
//        if ($selectedCourier) {
//            $order->update([
//                'courier_id' => $selectedCourier->id,
//                'taken_on' => Carbon::parse($request->schedule['taken_on'])->format('Y-m-d H:i:s'),
//                'status' => 'Belum Diambil'
//            ]);
//
//            History::create([
//                'id' => Str::uuid(),
//                'user_id' => Auth::id(),
//                'action' => 'menambahkan jadwal',
//            ]);
//
//            return redirect()->route('schedule.index')->with('meta', ['status' => true, 'title' => 'Berhasil menambahkan jadwal']);
//        } else {
//            return redirect()->route('schedule.index')->with('meta', ['status' => false, 'title' => 'Tidak ada kurir yang tersedia']);
//        }
//    }

    public function store(Request $request, Order $order)
    {
        // Retrieve all couriers with the type of transportation "motorbike"
        $couriers = User::where('role', 'kurir')->where('transportation_type', 'Motor')->get();

        $selectedCourier = null;

        $takenOn = Carbon::parse($request->schedule['taken_on']);

        foreach ($couriers as $courier) {
            // Calculate the total items_count of the courier's orders on the same "taken_on" date
            $totalItemsCount = Order::where('courier_id', $courier->id)
                ->whereDate('taken_on', $takenOn->format('Y-m-d'))
                ->withCount('items')->get()->sum('items_count');

            // Check if the courier's transportation capacity minus the total items_count is greater than or equal to the items_count of the new order
            if ($courier->transportation_capacity - $totalItemsCount >= $order->items()->count()) {
                // Check if the courier has already delivered goods to the customer on the same "taken_on" date
                $previousOrder = Order::where('courier_id', $courier->id)
                    ->where('customer_id', $order->customer_id)
                    ->whereDate('taken_on', $takenOn->format('Y-m-d'))
                    ->first();

                if ($previousOrder) {
                    // If the courier has already delivered goods to the customer on the same "taken_on" date, continue the loop to select another courier
                    continue;
                }

                $selectedCourier = $courier;
                break;
            }
        }

        // If no courier with "motorbike" type of transportation was selected, try to select a courier with "car" type of transportation
        if (!$selectedCourier) {
            $couriers = User::where('role', 'kurir')->where('transportation_type', 'Mobil')->get();

            foreach ($couriers as $courier) {
                // Calculate the total items_count of the courier's orders on the same "taken_on" date
                $totalItemsCount = Order::where('courier_id', $courier->id)
                    ->whereDate('taken_on', $takenOn->format('Y-m-d'))
                    ->withCount('items')->get()->sum('items_count');

                // Check if the courier's transportation capacity minus the total items_count is greater than or equal to the items_count of the new order
                if ($courier->transportation_capacity - $totalItemsCount >= $order->items()->count()) {
                    // Check if the courier has already delivered goods to the customer on the same "taken_on" date
                    $previousOrder = Order::where('courier_id', $courier->id)
                        ->where('customer_id', $order->customer_id)
                        ->whereDate('taken_on', $takenOn->format('Y-m-d'))
                        ->first();

                    if ($previousOrder) {
                        // If the courier has already delivered goods to the customer on the same "taken_on" date, continue the loop to select another courier
                        continue;
                    }

                    $selectedCourier = $courier;
                    break;
                }
            }
        }

        if ($selectedCourier) {
            $order->update([
                'courier_id' => $selectedCourier->id,
                'taken_on' => $takenOn->format('Y-m-d H:i:s'),
                'status' => 'Belum Diambil'
            ]);

            History::create([
                'id' => Str::uuid(),
                'user_id' => Auth::id(),
                'action' => 'menambahkan jadwal',
            ]);

            return redirect()->route('schedule.index')->with('meta', ['status' => true, 'title' => 'Berhasil menambahkan jadwal']);
        } else {
            return redirect()->route('schedule.index')->with('meta', ['status' => false, 'title' => 'Tidak ada kurir yang tersedia']);
        }
    }

    public function update(Order $order)
    {
        $order->update([
            'status' => 'Sudah Diambil'
        ]);

        History::create([
            'id' => Str::uuid(),
            'user_id' => Auth::id(),
            'action' => 'mengambil pesanan',
        ]);

        return redirect()->route('schedule.index')->with('meta', ['status' => true, 'title' => 'Berhasil mengubah status pesanan']);
    }
}
