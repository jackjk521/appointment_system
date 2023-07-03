<?php

namespace App\Http\Controllers;

use App\Models\Items_model;
use App\Models\Logs_model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon; // setting Datetime

class Inventory extends Controller
{
    public function index()
    {
        $data = Items_model::all();

        return response()->json($data);
    }

    public function get_all_items(Request $request){

        $items = Items_model::all();

        return response()->json($items);
    }

    public static function generate_product_number()
    {
        $uniqueId = Items_model::generateUniqueProdNo();
        return $uniqueId;
    }

    public function insert_item(Request $request)
    {
        var_dump($request->input('itemData'));
        $item = new Items_model;
        $item->product_number = $request->input('itemData')['product_number'];
        $item->item_name = $request->input('itemData')['item_name'];
        $item->unit = $request->input('itemData')['unit'];
        $item->unit_price = $request->input('itemData')['unit_price'];
        $item->total_quantity= $request->input('itemData')['total_quantity'];
        $item->date_created = now()->toDateTimeString();
        $item->removed = 0;

        $item->save();

        // Log
        if($item->save()){
            $log = new Logs_model;
                $log->user_id = $request->input('itemData')['user_id'];
                $log->date = now()->toDateTimeString();
                $log->message = $request->input('itemData')['username'] . "has added item: " . $request->input('itemData')['item_name'] . "successfully.";
                $log->save();
        }

        return response()->json(['success' => true , 'message' => 'Item created successfully']);
    }

}
