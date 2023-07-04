<?php

namespace App\Http\Controllers;

use App\Models\User_model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class Login extends Controller
{
    public function index()
    {
        $data = User_model::all();

        return response()->json($data);
    }

    public function insert_user(Request $request)
    {
        $user = new User_model;
        $user->username = $request->input('userData')['username'];
        $user->password = bcrypt($request->input('userData')['password']);
        $user->role = $request->input('userData')['role'];
        $user->user_status = $request->input('userData')['user_status'];
    
        $user->save();

        return response()->json(['success' => true , 'message' => 'User created successfully']);
    }
    public function login_user(Request $request)
    {

          // Validate the request data
            // $credentials = $request->validate([
            //     'username' => 'required',
            //     'password' => 'required',
            // ]);

            // var_dump()
            // Find the user by email
            $user = User_model::where('username', $request->input('userData')['username'])->first();
            
            if ($user && Hash::check($request->input('userData')['password'], $user->password)) {
                
                return response()->json(['success' => true , 'user_id' => $user->id, 'message' => 'User successfully authenticated']);

            } else {
                return response()->json(['error' => true , 'message' => 'User credentials invalid']);
            }
            
        }


    // Add other methods for update, delete, etc.
}
