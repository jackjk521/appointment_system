<?php

namespace App\Http\Controllers;

use App\Models\Patients_model;
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

        $patients = Patients_model::where('removed', 0)->get();

        return response()->json($patients);
    }

    public function insert_patient(Request $request)
    {
        var_dump($request->input('patientData'));
        $patient = new Patients_model;
        $patient->user_id= $request->input('patientData')['user_id'];
        $patient->first_name = $request->input('patientData')['first_name'];
        $patient->last_name = $request->input('patientData')['last_name'];
        $patient->age = $request->input('patientData')['age'];
        $patient->weight = $request->input('patientData')['weight'];
        $patient->height= $request->input('patientData')['height'];
        $patient->date_created = now()->toDateTimeString();
        $patient->removed = 0;

        $patient->save();

        // Log
        if($patient->save()){
            $log = new Logs_model;
                $log->user_id = ($request->input('patientData')['user_id'] != '') ? $request->input('patientData')['user_id'] : 3 ; // Change to default admin value
                $log->date = now()->toDateTimeString();
                $log->message =($request->input('patientData')['username'] != '') ? $request->input('patientData')['username'] : 'admin' . " has added patient: " . $request->input('itemData')['item_name'] . " successfully.";
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
