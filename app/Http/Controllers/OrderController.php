<?php

namespace App\Http\Controllers;

use App\Imports\OrdersImport;
use App\Models\Item;
use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\History;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Order::with(['customer', 'items'])
            ->withCount('items');

        if (Auth::user()->role === 'admin') {
            $query = $query->where('status', 'Siap Dikirim')->orderBy('created_at');
        } else {
            $query = $query->where('customer_id', Auth::id())
                ->whereIn('status', ['Siap Dikirim', 'Belum Siap Dikirim'])->orderBy('created_at', 'desc');
        }

        $orders = $query->get()->map(function ($order) {
            return [
                'id' => $order->id,
                'customer' => $order->customer->full_name,
                'items_count' => $order->items_count,
                'status' => $order->status,
                'created_at' => $order->created_at->format('d-m-Y H:i:s'),
                'updated_at' => $order->updated_at->format('d-m-Y H:i:s'),

            ];
        });

        return Inertia::render('Order/Index', [
            'title' => 'Daftar Pesanan',
            'meta' => session('meta'),
            'orders' => $orders,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Order/Create', [
            'title' => 'Tambah Pesanan',
            'meta' => session('meta'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        try {
            if ($request->file("file")) {
                Excel::import(new OrdersImport($request), $request->file('file'));
            } else {
                $order = Order::create([
                    'id' => Str::uuid(),
                    'status' => $request->status,
                    'customer_id' => Auth::id(),
                ]);

                foreach ($request->items as $item) {
                    Item::create([
                        'receipt_number' => $item["receipt_number"],
                        'order_id' => $order->id,
                    ]);
                }
            }

            History::create([
                'id' => Str::uuid(),
                'user_id' => Auth::id(),
                'action' => 'menambahkan pesanan',
            ]);

            return redirect()->route('orders.index')->with('meta', [
                'status' => true,
                'title' => 'Berhasil menambahkan pesanan',
            ]);
        } catch (\Exception $e) {
            return redirect()->route('orders.index')->with('meta', [
                'status' => false,
                'title' => 'Gagal menambahkan pesanan',
            ]);
        }
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
        $order->load('items'); // Load the items related to this order

        return Inertia::render('Order/Edit', [
            'title' => 'Ubah Pesanan',
            'meta' => session('meta'),
            'order' => $order,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        try {
            $order->update([
                'status' => $request->status,
                'customer_id' => Auth::id(),
            ]);

            if ($request->file("file")) {
                Excel::import(new OrdersImport($request), $request->file('file'));

                $receiptNumbers = collect($request->items)->pluck('receipt_number');
                Item::where('order_id', $order->id)->whereNotIn('receipt_number', $receiptNumbers)->delete();

                $order->update([
                    'updated_at' => now(),
                ]);
            } else {
                if ($order->id) {
                    foreach ($request->items as $item) {
                        $itemToUpdate = Item::where('receipt_number', $item['receipt_number'])->first();
                        if ($itemToUpdate) {
                            // Update existing item
                            $itemToUpdate->update([
                                'receipt_number' => $item["receipt_number"],
                                'order_id' => $order->id,
                            ]);
                        } else {
                            // Create new item
                            Item::create([
                                'receipt_number' => $item["receipt_number"],
                                'order_id' => $order->id,
                            ]);
                        }
                    }

                    $receiptNumbers = collect($request->items)->pluck('receipt_number');
                    Item::where('order_id', $order->id)->whereNotIn('receipt_number', $receiptNumbers)->delete();

                    $order->update([
                        'updated_at' => now(),
                    ]);
                } else {
                    $order = Order::create([
                        'id' => Str::uuid(),
                        'status' => $request->status,
                        'customer_id' => Auth::id(),
                    ]);

                    foreach ($request->items as $item) {
                        Item::create([
                            'receipt_number' => $item["receipt_number"],
                            'order_id' => $order->id,
                        ]);
                    }
                }
            }

            History::create([
                'id' => Str::uuid(),
                'user_id' => Auth::id(),
                'action' => 'mengubah pesanan',
            ]);

            return redirect()->route('orders.index')->with('meta', [
                'status' => true,
                'title' => 'Berhasil mengubah pesanan',
            ]);
        } catch (\Exception $e) {
            return redirect()->route('orders.index')->with('meta', [
                'status' => false,
                'title' => 'Gagal mengubah pesanan',
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->delete();

        History::create([
            'id' => Str::uuid(),
            'user_id' => Auth::id(),
            'action' => 'menghapus pesanan',
        ]);

        return redirect()->route('orders.index')->with('meta', [
            'status' => true,
            'title' => 'Berhasil menghapus pesanan',
        ]);
    }
}
