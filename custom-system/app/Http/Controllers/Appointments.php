<?php

namespace App\Http\Controllers;

use App\Models\Appointments_model;
use App\Models\Patients_model;
use App\Models\Logs_model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon; // setting Datetime

class Appointments extends Controller
{
    public function index()
    {
        $data = Appointments_model::all();

        return response()->json($data);
    }

    public function get_all_appointments(Request $request){

        $appointments = Appointments_model::join('patients', 'appointments.patient_id', '=', 'patients.id')
                        ->selectRaw("CONCAT(patients.first_name, ' ', patients.last_name) AS full_name, patients.first_name, patients.last_name, appointments.*")
                        ->where('appointments.removed', 0)->orderByDesc('appointments.id')->get();

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

    public function insert_appointment(Request $request)
    {
        // var_dump($request->input('addData'));
        $appointment = new Appointments_model;
        $appointment->user_id= $request->input('addData')['user_id'];
        $appointment->patient_id = $request->input('addData')['patient_id'];
        $appointment->from_datetime = $request->input('addData')['from_datetime'];
        $appointment->to_datetime = $request->input('addData')['to_datetime'];
        $appointment->purpose= $request->input('addData')['purpose'];
        $appointment->date_created = now()->toDateTimeString();
        $appointment->removed = 0;

        $appointment->save();

        // Get Appointment Id
        $appointment_id = $appointment->id;

        // Log
        if($appointment->save()){
            $log = new Logs_model;
                $log->user_id = ($request->input('addData')['user_id'] != '') ? $request->input('addData')['user_id'] : 3 ; // Change to default admin value
                $log->date = now()->toDateTimeString();
                $log->message =($request->input('addData')['username'] != '') ? $request->input('addData')['username'] : 'admin' . " has added appointment: " . $appointment_id . " successfully.";
                $log->save();
        }

        return response()->json(['success' => true , 'message' => 'Appointment created successfully']);
    }

    public function update_appointment(Request $request)
    {
        // var_dump($request->input('itemData'));
        $appointment = Appointments_model::find($request->input('editData')['appointment_id']);
        $appointment->patient_id = $request->input('editData')['patient_id'];
        $appointment->from_datetime = $request->input('editData')['from_datetime'];
        $appointment->to_datetime = $request->input('editData')['to_datetime'];
        $appointment->purpose = $request->input('editData')['purpose'];

        $appointment->save();

        // Log
        if($appointment->save()){
            $log = new Logs_model;
                $log->user_id = ($request->input('editData')['user_id'] != '') ? $request->input('editData')['user_id'] : 3 ; // Change to default admin value
                $log->date = now()->toDateTimeString();
                $log->message =($request->input('editData')['username'] != '') ? $request->input('editData')['username'] : 'admin' . " has updated an appointment with id : " . $request->input('editData')['appointment_id']. " successfully.";
                $log->save();
        }

        return response()->json(['success' => true , 'message' => 'Appointment updated successfully']);
    }

    public function remove_appointment(Request $request)
    {
        $appointment = Appointments_model::find(($request->input('removeData')['appointment_id']));
        $appointment->removed = 1;
        $appointment->save();

        // Log
        if($appointment->save()){
            $log = new Logs_model;
                $log->user_id = ($request->input('removeData')['user_id'] != '') ? $request->input('removeData')['user_id'] : 3 ; // Change to default admin value
                $log->date = now()->toDateTimeString();
                $log->message =($request->input('removeData')['username'] != '') ? $request->input('removeData')['username'] : 'admin' . " has removed an patient with id : " . $request->input('removeData')['appointment_id'];
                $log->save();
        }

        return response()->json(['success' => true , 'message' => 'Appointment removed successfully']);
    }


}
