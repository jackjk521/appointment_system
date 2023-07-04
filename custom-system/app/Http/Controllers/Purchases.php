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

        $purchases = Purchase_header_model::where('removed', 0)->get();

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

            var_dump($request->input('purchaseData')['purchase_line']);
        // Loop through all the purchases and insert them 1 by 1 with the purchase_header_id

        // $purchase_line = $request->input('purchaseData')['purchase_line'];
      
        // foreach ($data as $row) {
        //     YourModel::create($row);
        // }
    

        // Log
        if($purchase->save()){
            $log = new Logs_model;
                $log->user_id = ($request->input('purchaseData')['user_id'] != '') ? $request->input('purchaseData')['user_id'] : 3 ; // Change to default admin value
                $log->date = now()->toDateTimeString();
                $log->message =($request->input('purchaseData')['username'] != '') ? $request->input('purchaseData')['username'] : 'admin' . " has create a new purchase header with ID : " . $request->input('purchaseData')['purchase_number'] . " successfully.";
                $log->save();
        }

        return response()->json(['success' => true , 'message' => 'Patient created successfully']);
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
