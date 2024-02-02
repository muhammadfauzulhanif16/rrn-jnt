<?php

namespace App\Imports;

use App\Models\Item;
use App\Models\Order;
use Maatwebsite\Excel\Concerns\OnEachRow;
use Maatwebsite\Excel\Row;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class OrdersImport implements OnEachRow
{
    protected $request;
    protected $order;

    public function __construct($request)
    {
        $this->request = $request;
        $this->order = Order::create([
            'id' => Str::uuid(),
            'status' => $this->request->status,
            'customer_id' => Auth::id(),
        ]);
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
                'receipt_number' => $row[0], // Adjust this if your receipt_number is not in the first column
                'order_id' => $this->order->id,
            ]);
        }
    }
}
