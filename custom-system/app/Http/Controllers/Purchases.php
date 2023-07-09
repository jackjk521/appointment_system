<?php

namespace App\Http\Controllers;

use App\Models\Patients_model;
use App\Models\Purchase_header_model;
use App\Models\Purchase_line_model;

use App\Models\Logs_model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon; // setting Datetime

class Purchases extends Controller
{
    public function index()
    {
        $data = Purchase_header_model::all();

        return response()->json($data);
    }

    public function get_all_purchase_header(Request $request){

        // $purchases = Purchase_header_model::where('removed', 0)->orderByDesc('id')->get();
        // join with patient table to get their name

        $purchases= Purchase_header_model::join('patients', 'purchase_header.patient_id', '=', 'patients.id')
            ->selectRaw("CONCAT(patients.first_name, ' ', patients.last_name) AS patient_name, purchase_header.* ")
            ->where('purchase_header.removed', 0)->orderByDesc('purchase_header.id')->get();

        return response()->json($purchases);
    }

    public static function generate_purchase_number()
    {
        $uniqueId = Purchase_header_model::generateUniquePurchaseNo();
        return $uniqueId;
    }

    public function get_purchase_header_by_id(Request $request){
        

        $id = $request->input('purch_header_id');
        $purchases = Purchase_header_model::join('patients', 'purchase_header.patient_id', '=', 'patients.id')
                                        ->join('users', 'purchase_header.user_id', '=', 'users.id')
                                        ->selectRaw("CONCAT(patients.first_name, ' ', patients.last_name) AS patient_name, purchase_header.*, users.username, patients.id as patient_id ")
                                        ->where('purchase_header.removed', 0)
                                        ->where('purchase_header.id', $id)->get();
        // join with patient table to get their name

        return response()->json($purchases);
    }

    public function get_purchase_line_by_id(Request $request){
        $id = $request->input('purch_header_id');
        $purchases = Purchase_line_model::join('purchase_header', 'purchase_line.purchase_header_id', '=', 'purchase_header.id')
                                        ->join('items', 'purchase_line.item_id', '=', 'items.id')
                                        ->select('purchase_line.*', 'items.item_name')
                                        ->where('purchase_header.removed', 0)
                                        ->where('purchase_header.id', $id)->get();
        // join with patient table to get their name

        return response()->json($purchases);
    }

    public function insert_purchase(Request $request)
    {
        // Insert Purchase Header > return the inserted Id
            $purchase = new Purchase_header_model;
            $purchase->purchase_number = $request->input('addData')['purchase_number'];
            $purchase->user_id= $request->input('addData')['user_id'];
            $purchase->patient_id = $request->input('addData')['patient_id'];
            $purchase->total_amount = $request->input('addData')['total_amount'];
            $purchase->date_created = now()->toDateTimeString();
            $purchase->removed = 0;

            $purchase->save();

        //     // Get Purchase Header Id
            $purch_header_id = $purchase->id;

        //     // Save the purchase line items
            $purchase_line = $request->input('addData')['purchLineData'];
        // // Loop through all the purchases and insert them 1 by 1 with the purchase_header_id
            foreach ($purchase_line as $data){
                $purch_line = new Purchase_line_model;
                $purch_line->purchase_header_id = $purch_header_id;
                $purch_line->item_id = $data['item_id'];
                $purch_line->item_price = $data['item_price'];
                $purch_line->purchased_quantity = $data['purchased_quantity'];
                $purch_line->purchase_sub_total = floatval($data['purchase_sub_total']);
                $purch_line->save();
            }


        // // Log
        if($purchase->save()){
            $log = new Logs_model;
                $log->user_id = ($request->input('addData')['user_id'] != '') ? $request->input('addData')['user_id'] : 3 ; // Change to default admin value
                $log->date = now()->toDateTimeString();
                $log->message =($request->input('addData')['username'] != '') ? $request->input('addData')['username'] : 'admin' . " has create a new purchase header with ID : " . $request->input('addData')['purchase_number'] . " successfully.";
                $log->save();
        }

        return response()->json(['success' => true , 'message' => 'Purchase created successfully']);
    }

    // TO EDIT 
    public function update_purchase(Request $request)
    {
        // var_dump($request->input('itemData'));
            // Insert Purchase Header > return the inserted Id
            $purchase = new Purchase_header_model;
            $purchase->purchase_number = $request->input('addData')['purchase_number'];
            $purchase->user_id= $request->input('addData')['user_id'];
            $purchase->patient_id = $request->input('addData')['patient_id'];
            $purchase->total_amount = $request->input('addData')['total_amount'];
            $purchase->date_created = now()->toDateTimeString();
            $purchase->removed = 0;

            $purchase->save();

        //     // Get Purchase Header Id
            $purch_header_id = $purchase->id;

        //     // Save the purchase line items
            $purchase_line = $request->input('addData')['purchLineData'];
        // // Loop through all the purchases and insert them 1 by 1 with the purchase_header_id
            foreach ($purchase_line as $data){
                $purch_line = new Purchase_line_model;
                $purch_line->purchase_header_id = $purch_header_id;
                $purch_line->item_id = $data['item_id'];
                $purch_line->item_price = $data['item_price'];
                $purch_line->purchased_quantity = $data['purchased_quantity'];
                $purch_line->purchase_sub_total = floatval($data['purchase_sub_total']);
                $purch_line->save();
            }


        // // Log
        if($purchase->save()){
            $log = new Logs_model;
                $log->user_id = ($request->input('addData')['user_id'] != '') ? $request->input('addData')['user_id'] : 3 ; // Change to default admin value
                $log->date = now()->toDateTimeString();
                $log->message =($request->input('addData')['username'] != '') ? $request->input('addData')['username'] : 'admin' . " has create a new purchase header with ID : " . $request->input('addData')['purchase_number'] . " successfully.";
                $log->save();
        }

        return response()->json(['success' => true , 'message' => 'Purchase created successfully']);
    }

    public function remove_purchase(Request $request)
    {
        $purchase = Purchase_header_model::find(($request->input('removeData')['purch_header_id']));
        $purchase->removed = 1;
        $purchase->save();

        // Log
        if($purchase->save()){
            $log = new Logs_model;
                $log->user_id = ($request->input('removeData')['user_id'] != '') ? $request->input('removeData')['user_id'] : 3 ; // Change to default admin value
                $log->date = now()->toDateTimeString();
                $log->message =($request->input('removeData')['username'] != '') ? $request->input('removeData')['username'] : 'admin' . " has removed an purchase header with id : " . $request->input('removeData')['purch_header_id'];
                $log->save();
        }

        return response()->json(['success' => true , 'message' => 'Item created successfully']);
    }


}
