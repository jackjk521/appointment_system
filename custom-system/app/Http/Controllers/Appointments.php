<?php

namespace App\Http\Controllers;

use App\Models\Appointments_model;
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

    public function get_appointment_by_id (Request $request){

        $id = $request->input('appointment_id');
        $appointment = Appointments_model::where('appointments.id', $id)
            ->join('patients', 'appointments.patient_id', '=', 'patients.id')
            ->selectRaw("CONCAT(patients.first_name, ' ', patients.last_name) AS full_name, patients.first_name, patients.last_name, appointments.*")
            ->get();

        return response()->json($appointment->first());
    }

    public function insert_appointment(Request $request)
    {
        $appointment = new Appointments_model;
        $appointment->user_id= $request->input('modalData')['user_id'];
        $appointment->patient_id = $request->input('modalData')['patient_id'];
        $appointment->from_datetime = $request->input('modalData')['from_datetime'];
        $appointment->to_datetime = $request->input('modalData')['to_datetime'];
        $appointment->purpose= $request->input('modalData')['purpose'];
        $appointment->date_created = now()->toDateTimeString();
        $appointment->removed = 0;

        $appointment->save();

        // Get Appointment Id
        $appointment_id = $appointment->id;

        // Log
        if($appointment->save()){
            $log = new Logs_model;
                $log->user_id = ($request->input('modalData')['user_id'] != '') ? $request->input('modalData')['user_id'] : 3 ; // Change to default admin value
                $log->date = now()->toDateTimeString();
                $log->message =($request->input('modalData')['username'] != '') ? $request->input('modalData')['username'] : 'admin' . " has added appointment: " . $appointment_id . " successfully.";
                $log->save();
        }

        return response()->json(['success' => true , 'message' => 'Appointment created successfully']);
    }

    public function update_appointment(Request $request)
    {
        // var_dump($request->input('itemData'));
        $appointment = Appointments_model::find($request->input('modalData')['appointment_id']);
        $appointment->patient_id = $request->input('modalData')['patient_id'];
        $appointment->from_datetime = $request->input('modalData')['from_datetime'];
        $appointment->to_datetime = $request->input('modalData')['to_datetime'];
        $appointment->purpose = $request->input('modalData')['purpose'];

        $appointment->save();

        // Log
        if($appointment->save()){
            $log = new Logs_model;
                $log->user_id = ($request->input('modalData')['user_id'] != '') ? $request->input('modalData')['user_id'] : 3 ; // Change to default admin value
                $log->date = now()->toDateTimeString();
                $log->message =($request->input('modalData')['username'] != '') ? $request->input('modalData')['username'] : 'admin' . " has updated an appointment with id : " . $request->input('modalData')['appointment_id']. " successfully.";
                $log->save();
        }

        return response()->json(['success' => true , 'message' => 'Appointment updated successfully']);
    }

    public function remove_appointment(Request $request)
    {
        $appointment = Appointments_model::find(($request->input('modalData')['appointment_id']));
        $appointment->removed = 1;
        $appointment->save();

        // Log
        if($appointment->save()){
            $log = new Logs_model;
                $log->user_id = ($request->input('modalData')['user_id'] != '') ? $request->input('modalData')['user_id'] : 3 ; // Change to default admin value
                $log->date = now()->toDateTimeString();
                $log->message =($request->input('modalData')['username'] != '') ? $request->input('modalData')['username'] : 'admin' . " has removed an patient with id : " . $request->input('modalData')['appointment_id'];
                $log->save();
        }

        return response()->json(['success' => true , 'message' => 'Appointment removed successfully']);
    }


}
