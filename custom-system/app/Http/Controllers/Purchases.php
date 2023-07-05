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

    public function insert_purchase(Request $request)
    {
        // Insert Purchase Header > return the inserted Id
            $purchase = new Purchase_header_model;
            $purchase->purchase_number = $request->input('purchaseData')['purchase_number'];
            $purchase->user_id= $request->input('purchaseData')['user_id'];
            $purchase->patient_id = $request->input('purchaseData')['patient_id'];
            $purchase->total_amount = $request->input('purchaseData')['total_amount'];
            $purchase->date_created = now()->toDateTimeString();
            $purchase->removed = 0;

            $purchase->save();

            // Get Purchase Header Id
            $purch_header_id = $purchase->id;

            // Save the purchase line items
            $purchase_line = $request->input('purchaseData')['purchase_line'];
        // Loop through all the purchases and insert them 1 by 1 with the purchase_header_id
            foreach ($purchase_line as $data){
                $purch_line = new Purchase_line_model;
                $purch_line->purchase_header_id = $purch_header_id;
                $purch_line->item_id = $data['item_id'];
                $purch_line->item_price = $data['item_price'];
                $purch_line->purchased_quantity = $data['purchased_quantity'];
                $purch_line->purchase_sub_total = floatval($data['purchase_sub_total']);
                $purch_line->save();
            }


        // Log
        if($purchase->save()){
            $log = new Logs_model;
                $log->user_id = ($request->input('purchaseData')['user_id'] != '') ? $request->input('purchaseData')['user_id'] : 3 ; // Change to default admin value
                $log->date = now()->toDateTimeString();
                $log->message =($request->input('purchaseData')['username'] != '') ? $request->input('purchaseData')['username'] : 'admin' . " has create a new purchase header with ID : " . $request->input('purchaseData')['purchase_number'] . " successfully.";
                $log->save();
        }

        return response()->json(['success' => true , 'message' => 'Purchase created successfully']);
    }

    public function update_patient(Request $request)
    {
        // var_dump($request->input('itemData'));
        $patient = Patients_model::find($request->input('patientData')['patient_id']);
        $patient->first_name = $request->input('patientData')['first_name'];
        $patient->last_name = $request->input('patientData')['last_name'];
        $patient->age = $request->input('patientData')['age'];
        $patient->weight = $request->input('patientData')['weight'];
        $patient->height= $request->input('patientData')['height'];

        $patient->save();

        // Log
        if($patient->save()){
            $log = new Logs_model;
                $log->user_id = ($request->input('patientData')['user_id'] != '') ? $request->input('patientData')['user_id'] : 3 ; // Change to default admin value
                $log->date = now()->toDateTimeString();
                $log->message =($request->input('patientData')['username'] != '') ? $request->input('patientData')['username'] : 'admin' . " has updated an patient with id : " . $request->input('patientData')['patient_id']. " successfully.";
                $log->save();
        }

        return response()->json(['success' => true , 'message' => 'Item created successfully']);
    }

    public function remove_patient(Request $request)
    {
        $patient = Patients_model::find(($request->input('patientData')['patient_id']));
        $patient->removed = 1;
        $patient->save();

        // Log
        if($patient->save()){
            $log = new Logs_model;
                $log->user_id = ($request->input('patientData')['user_id'] != '') ? $request->input('patientData')['user_id'] : 3 ; // Change to default admin value
                $log->date = now()->toDateTimeString();
                $log->message =($request->input('patientData')['username'] != '') ? $request->input('patientData')['username'] : 'admin' . " has removed an patient with id : " . $request->input('patientData')['patient_id'];
                $log->save();
        }

        return response()->json(['success' => true , 'message' => 'Item created successfully']);
    }


}
