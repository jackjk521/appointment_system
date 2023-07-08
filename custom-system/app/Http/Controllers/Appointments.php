<?php

namespace App\Http\Controllers;

use App\Models\Appointments_model;
use App\Models\Logs_model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon; // setting Datetime

class Patients extends Controller
{
    public function index()
    {
        $data = Appointments_model::all();

        return response()->json($data);
    }

    public function get_all_appointments(Request $request){

        $appointments = Appointments_model::where('removed', 0)->orderByDesc('id')->get();

        return response()->json($appointments);
    }

    // public function get_patient(Request $request){

    //     $id = $request->input('patient_id');
    //     $patient = Patients_model::selectRaw("CONCAT(first_name, ' ', last_name) AS full_name,  patients.* ")->where('removed', 0)->where('id', $id)->get();

    //     return response()->json($patient);
    // }

    // public function get_patient_purchase_history(Request $request){

    //     $id = $request->input('patient_id');
    //     // $history = Patients_model::join('purchase_header', 'purchase_header.patient_id', '=', 'patients.id')
    //     //         ->join('purchase_line', 'purchase_line.purchase_header_id', '=', 'purchase_header.id')
    //     //         // ->select('patients.*', 'purchase_header.*', 'purchase_line.*')
    //     //         // ->where('patients.id', $id)
    //     //         // ->where('patients.removed', 0)
    //     //         ->orderByDesc('purchase_line.id')
    //     //         ->get();

    //     $history = Purchase_line_model::join('purchase_header', 'purchase_header.id', '=', 'purchase_line.purchase_header_id')
    //         ->join('patients', 'patients.id', '=', 'purchase_header.patient_id')
    //         ->join('items', 'items.id', '=', 'purchase_line.item_id')
    //         ->select('purchase_header.date_created', 'purchase_line.*', 'items.item_name', 'items.id as item_id')
    //         ->where('patients.removed', 0)
    //         ->where('patients.id', $id)
    //         ->orderByDesc('purchase_line.id')
    //         ->get();

    //     return response()->json($history);
    // }

    // public function insert_patient(Request $request)
    // {
    //     var_dump($request->input('patientData'));
    //     $patient = new Patients_model;
    //     $patient->user_id= $request->input('patientData')['user_id'];
    //     $patient->first_name = $request->input('patientData')['first_name'];
    //     $patient->last_name = $request->input('patientData')['last_name'];
    //     $patient->age = $request->input('patientData')['age'];
    //     $patient->weight = $request->input('patientData')['weight'];
    //     $patient->height= $request->input('patientData')['height'];
    //     $patient->date_created = now()->toDateTimeString();
    //     $patient->removed = 0;

    //     $patient->save();

    //     // Log
    //     if($patient->save()){
    //         $log = new Logs_model;
    //             $log->user_id = ($request->input('patientData')['user_id'] != '') ? $request->input('patientData')['user_id'] : 3 ; // Change to default admin value
    //             $log->date = now()->toDateTimeString();
    //             $log->message =($request->input('patientData')['username'] != '') ? $request->input('patientData')['username'] : 'admin' . " has added patient: " . $request->input('itemData')['item_name'] . " successfully.";
    //             $log->save();
    //     }

    //     return response()->json(['success' => true , 'message' => 'Patient created successfully']);
    // }

    // public function update_patient(Request $request)
    // {
    //     // var_dump($request->input('itemData'));
    //     $patient = Patients_model::find($request->input('patientData')['patient_id']);
    //     $patient->first_name = $request->input('patientData')['first_name'];
    //     $patient->last_name = $request->input('patientData')['last_name'];
    //     $patient->age = $request->input('patientData')['age'];
    //     $patient->weight = $request->input('patientData')['weight'];
    //     $patient->height= $request->input('patientData')['height'];

    //     $patient->save();

    //     // Log
    //     if($patient->save()){
    //         $log = new Logs_model;
    //             $log->user_id = ($request->input('patientData')['user_id'] != '') ? $request->input('patientData')['user_id'] : 3 ; // Change to default admin value
    //             $log->date = now()->toDateTimeString();
    //             $log->message =($request->input('patientData')['username'] != '') ? $request->input('patientData')['username'] : 'admin' . " has updated an patient with id : " . $request->input('patientData')['patient_id']. " successfully.";
    //             $log->save();
    //     }

    //     return response()->json(['success' => true , 'message' => 'Item created successfully']);
    // }

    // public function remove_patient(Request $request)
    // {
    //     $patient = Patients_model::find(($request->input('patientData')['patient_id']));
    //     $patient->removed = 1;
    //     $patient->save();

    //     // Log
    //     if($patient->save()){
    //         $log = new Logs_model;
    //             $log->user_id = ($request->input('patientData')['user_id'] != '') ? $request->input('patientData')['user_id'] : 3 ; // Change to default admin value
    //             $log->date = now()->toDateTimeString();
    //             $log->message =($request->input('patientData')['username'] != '') ? $request->input('patientData')['username'] : 'admin' . " has removed an patient with id : " . $request->input('patientData')['patient_id'];
    //             $log->save();
    //     }

    //     return response()->json(['success' => true , 'message' => 'Item created successfully']);
    // }


}
