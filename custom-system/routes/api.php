<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Login;
use App\Http\Controllers\Inventory;
use App\Http\Controllers\Patients;
use App\Http\Controllers\Purchases;




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

// Patients Routes
Route::get('/patients', [Patients::class, 'get_all_patients']);
Route::post('/add_patient', [Patients::class, 'insert_patient']);
Route::post('/update_patient', [Patients::class, 'update_patient']);
Route::post('/remove_patient', [Patients::class, 'remove_patient']);

// Purchases
Route::get('/purchases', [Purchases::class, 'get_all_purchase_header']);
Route::get('/gen_purchase_number', [Purchases::class, 'generate_purchase_number']);
Route::post('/add_purchase', [Purchases::class, 'insert_purchase']);
// Route::post('/update_purchase', [purchases::class, 'update_purchase']);
// Route::post('/remove_purchase', [purchases::class, 'remove_purchase']);





// Route::post('/signUp', [LoginController::class, 'register']); // route for registration form
// Route::post('/login', [LoginController::class, 'login']); // route for login form

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
