<?php

namespace App\Http\Controllers;

use App\Models\Patients_model;
use App\Models\Purchase_line_model;
use App\Models\Logs_model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon; // setting Datetime

class Patients extends Controller
{
    public function index()
    {
        $data = Patients_model::all();

        return response()->json($data);
    }

    public function get_all_patients(Request $request){

        $patients = Patients_model::selectRaw("CONCAT(first_name, ' ', last_name) AS full_name,  patients.* ")->where('removed', 0)->orderByDesc('id')->get();

        return response()->json($patients);
    }

    public function get_patient(Request $request){

        $id = $request->input('patient_id');
        $patient = Patients_model::selectRaw("CONCAT(first_name, ' ', last_name) AS full_name,  patients.* ")->where('removed', 0)->where('id', $id)->get();

        return response()->json($patient);
    }

    public function get_patient_purchase_history(Request $request){

        $id = $request->input('patient_id');
        $history = Purchase_line_model::join('purchase_header', 'purchase_header.id', '=', 'purchase_line.purchase_header_id')
            ->join('patients', 'patients.id', '=', 'purchase_header.patient_id')
            ->join('items', 'items.id', '=', 'purchase_line.item_id')
            ->select('purchase_header.date_created', 'purchase_line.*', 'items.item_name', 'items.id as item_id')
            ->where('patients.removed', 0)
            ->where('purchase_header.removed', 0)
            ->where('patients.id', $id)
            ->orderByDesc('purchase_line.id')
            ->get();

        return response()->json($history);
    }

    public function insert_patient(Request $request)
    {
        $patient = new Patients_model;
        $patient->user_id= $request->input('modalData')['user_id'];
        $patient->first_name = $request->input('modalData')['first_name'];
        $patient->last_name = $request->input('modalData')['last_name'];
        $patient->age = $request->input('modalData')['age'];
        $patient->weight = $request->input('modalData')['weight'];
        $patient->height= $request->input('modalData')['height'];

        $patient->save();

        // Log
        if($patient->save()){
            $log = new Logs_model;
                $log->user_id = ($request->input('modalData')['user_id'] != '') ? $request->input('modalData')['user_id'] : 3 ; // Change to default admin value
                $log->date = now()->toDateTimeString();
                $log->message =($request->input('modalData')['username'] != '') ? $request->input('modalData')['username'] : 'admin' . " has modaled patient: " . $request->input('modalData')['item_name'] . " successfully.";
                $log->save();
        }

        return response()->json(['success' => true , 'message' => 'Patient created successfully']);
    }

    public function update_patient(Request $request)
    {
        // var_dump($request->input('itemData'));
        $patient = Patients_model::find($request->input('modalData')['patient_id']);
        $patient->first_name = $request->input('modalData')['first_name'];
        $patient->last_name = $request->input('modalData')['last_name'];
        $patient->age = $request->input('modalData')['age'];
        $patient->weight = $request->input('modalData')['weight'];
        $patient->height= $request->input('modalData')['height'];

        $patient->save();

        // Log
        if($patient->save()){
            $log = new Logs_model;
                $log->user_id = ($request->input('modalData')['user_id'] != '') ? $request->input('modalData')['user_id'] : 3 ; // Change to default admin value
                $log->date = now()->toDateTimeString();
                $log->message =($request->input('modalData')['username'] != '') ? $request->input('modalData')['username'] : 'admin' . " has updated an patient with id : " . $request->input('modalData')['patient_id']. " successfully.";
                $log->save();
        }

        return response()->json(['success' => true , 'message' => 'Patient updated successfully']);
    }

    public function remove_patient(Request $request)
    {
        $patient = Patients_model::find(($request->input('modalData')['patient_id']));
        $patient->removed = 1;
        $patient->save();

        // Log
        if($patient->save()){
            $log = new Logs_model;
                $log->user_id = ($request->input('modalData')['user_id'] != '') ? $request->input('modalData')['user_id'] : 3 ; // Change to default admin value
                $log->date = now()->toDateTimeString();
                $log->message =($request->input('modalData')['username'] != '') ? $request->input('modalData')['username'] : 'admin' . " has removed an patient with id : " . $request->input('modalData')['patient_id'];
                $log->save();
        }

        return response()->json(['success' => true , 'message' => 'Removed patient successfully']);
    }


}
