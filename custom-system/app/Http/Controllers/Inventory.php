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

        $items = Items_model::where('removed', 0)->get();

        return response()->json($items);
    }

    public function get_item_by_id(Request $request){

        $itemId = intval($request->input('itemId'));
        $item = Items_model::find($itemId);

        return response()->json($item);
    }

    public static function generate_product_number()
    {
        $uniqueId = Items_model::generateUniqueProdNo();
        return $uniqueId;
    }

    public function insert_item(Request $request)
    {
        // var_dump($request->input('itemData'));
        $item = new Items_model;
        $item->product_number = $request->input('addData')['product_number'];
        $item->item_name = $request->input('addData')['item_name'];
        $item->unit = $request->input('addData')['unit'];
        $item->unit_price = $request->input('addData')['unit_price'];
        $item->total_quantity= $request->input('addData')['total_quantity'];
        $item->date_created = now()->toDateTimeString();
        $item->removed = 0;

        $item->save();

        // Log
        if($item->save()){
            $log = new Logs_model;
                $log->user_id = ($request->input('addData')['user_id'] != '') ? $request->input('addData')['user_id'] : 3 ; // Change to default admin value
                $log->date = now()->toDateTimeString();
                $log->message =($request->input('addData')['username'] != '') ? $request->input('addData')['username'] : 'admin' . " has added item: " . $request->input('addData')['item_name'] . " successfully.";
                $log->save();
        }

        return response()->json(['success' => true , 'message' => 'Item created successfully']);
    }

    public function update_item(Request $request)
    {
        // var_dump($request->input('itemData'));
        $item = Items_model::find($request->input('editData')['product_id']);
        $item->item_name = $request->input('editData')['item_name'];
        $item->unit = $request->input('editData')['unit'];
        $item->unit_price = $request->input('editData')['unit_price'];
        $item->total_quantity= $request->input('editData')['total_quantity'];

        $item->save();

        // Log
        if($item->save()){
            $log = new Logs_model;
                $log->user_id = ($request->input('editData')['user_id'] != '') ? $request->input('editData')['user_id'] : 3 ; // Change to default admin value
                $log->date = now()->toDateTimeString();
                $log->message =($request->input('editData')['username'] != '') ? $request->input('editData')['username'] : 'admin' . " has update item with product number: " . $request->input('editData')['product_number'] . " successfully.";
                $log->save();
        }

        return response()->json(['success' => true , 'message' => 'Item created successfully']);
    }

    public function remove_item(Request $request)
    {
        $item = Items_model::find(($request->input('removeData')['product_id']));
        $item->removed = 1;
        $item->save();

        // Log
        if($item->save()){
            $log = new Logs_model;
                $log->user_id = ($request->input('removeData')['user_id'] != '') ? $request->input('removeData')['user_id'] : 3 ; // Change to default admin value
                $log->date = now()->toDateTimeString();
                $log->message =($request->input('removeData')['username'] != '') ? $request->input('removeData')['username'] : 'admin' . " has removed an item with product number: " . $request->input('removeData')['product_number'];
                $log->save();
        }

        return response()->json(['success' => true , 'message' => 'Item created successfully']);
    }


}
