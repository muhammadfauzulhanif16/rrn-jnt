<?php

namespace App\Imports;

use App\Models\Item;
use App\Models\Order;
use Maatwebsite\Excel\Concerns\OnEachRow;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Row;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class OrdersImport implements OnEachRow, WithHeadingRow
{
    protected $request;
    protected $order_id;

    public function __construct($request)
    {
        $this->request = $request;

        if ($request->has('order_id')) {
            $this->order_id = $request->order_id;

            Item::where('order_id', $this->order_id)->delete();
        } else {
            $order = Order::create([
                'id' => Str::uuid(),
                'status' => $this->request->status,
                'customer_id' => Auth::id(),
                'is_auto' => true,
            ]);

            $this->order_id = $order->id;
        }
    }

    /**
     * @param Row $row
     */
    public function onRow(Row $row)
    {
        $rowIndex = $row->getIndex();
        $row = $row->toArray();

        if ($rowIndex > 1) { // Skip header row
            Item::create([
                'receipt_number' => $row['nomor_resi'], // Access column by name
                'order_id' => $this->order_id,
            ]);
        }
    }
}