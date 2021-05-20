<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CuisineController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DishController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Users
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/users',[UserController::class, 'getAllUsers']);
Route::get('/user/{id}',[UserController::class, 'getUserById']);
Route::middleware('auth:api')->put('/users',[UserController::class, 'updateUser']);
Route::delete('/users/{id}',[UserController::class, 'deleteUser']);
Route::get('/searchUser/{nickname}', [UserController::class, 'serchUserByNickname']);

// Dish
Route::get("/dish",[DishController::class,'listDish']);
Route::get("/dish/{id}",[DishController::class, 'getDishById']);
Route::post("/dish",[DishController::class,'addDish']);
Route::put('/dish',[DishController::class, 'updateDish']);
Route::delete("/dish/{id}",[DishController::class, 'deleteDish']);
Route::put('/bookDish',[DishController::class, 'bookDish']);

//Cuisine
Route::get('/cuisines', [CuisineController::class, 'getAllCuisine']);
Route::get('/cuisines/{id}',[CuisineController::class, 'getCuisineById']);
Route::post('/cuisines', [CuisineController::class, 'addCuisine']);
Route::put('/cuisines', [CuisineController::class, 'updateCuisine']);
Route::delete('/cuisines/{id}', [CuisineController::class, 'deleteCuisine']);

// filter
Route::get('/dishes/{type}', [DishController::class, 'listDishByType'])->where('type', '[A-Za-z]+');
