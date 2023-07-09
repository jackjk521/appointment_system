<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Login;
use App\Http\Controllers\Inventory;
use App\Http\Controllers\Patients;
use App\Http\Controllers\Purchases;
use App\Http\Controllers\Appointments;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Login Route 
Route::post('/signUp', [Login::class, 'insert_user']);
Route::post('/login', [Login::class, 'login_user']);

// Inventory Routes
Route::get('/items', [Inventory::class, 'get_all_items']);
Route::get('/gen_prod_number', [Inventory::class, 'generate_product_number']);
Route::post('/add_item', [Inventory::class, 'insert_item']);
Route::post('/update_item', [Inventory::class, 'update_item']);
Route::post('/remove_item', [Inventory::class, 'remove_item']);
Route::get('/get_item', [Inventory::class, 'get_item_by_id']);

// Patients Routes
Route::get('/patients', [Patients::class, 'get_all_patients']);
Route::get('/get_patient', [Patients::class, 'get_patient']);
Route::get('/get_patient_history', [Patients::class, 'get_patient_purchase_history']);
Route::post('/add_patient', [Patients::class, 'insert_patient']);
Route::post('/update_patient', [Patients::class, 'update_patient']);
Route::post('/remove_patient', [Patients::class, 'remove_patient']);

// Purchases
Route::get('/purchases', [Purchases::class, 'get_all_purchase_header']);
Route::get('/get_purchase', [Purchases::class, 'get_purchase_header_by_id']);
Route::get('/get_purchase_line', [Purchases::class, 'get_purchase_line_by_id']);
Route::get('/gen_purchase_number', [Purchases::class, 'generate_purchase_number']);
Route::post('/add_purchase', [Purchases::class, 'insert_purchase']);
// Route::post('/update_purchase', [purchases::class, 'update_purchase']);
Route::post('/remove_purchase', [Purchases::class, 'remove_purchase']);

// Appointments
Route::get('/appointments', [Appointments::class, 'get_all_appointments']);
// Route::get('/get_purchase', [Appointments::class, 'get_purchase_header_by_id']);
// Route::get('/get_purchase_line', [Appointments::class, 'get_purchase_line_by_id']);
Route::post('/add_appointment', [Appointments::class, 'insert_appointment']);
Route::post('/update_appointment', [Appointments::class, 'update_appointment']);
Route::post('/remove_appointment', [Appointments::class, 'remove_appointment']);



// Route::post('/signUp', [LoginController::class, 'register']); // route for registration form
// Route::post('/login', [LoginController::class, 'login']); // route for login form

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});