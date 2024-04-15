<?php

use App\Http\Controllers\InvestorController;
use App\Http\Controllers\LoansController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\Investor;
use GuzzleHttp\Promise\Create;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/user/register', [UserController::class, 'register'])->middleware('guest');
Route::post('/user/login', [UserController::class, 'login'])->middleware('guest');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/user/logout', [UserController::class, 'logout']);
    Route::post('/user/verify', [UserController::class, 'verifyProfile']);
    Route::get('/user/check', [UserController::class, 'check']);
    Route::get('/user/data', [UserController::class, 'getData']);
});

Route::middleware('auth:sanctum', 'Admin')->group(function () {
});

Route::middleware('auth:sanctum', 'Investor')->group(function () {
    Route::get('/investor/loan/get' , [LoansController::class , 'getLoans']);
    Route::get('/investor/check' , [InvestorController::class , 'check']);
    Route::post('/investor/loan/create' , [LoansController::class , 'create']);
    Route::post('/investor/portfolio/create' , [InvestorController::class , 'createPortfolio']);
});

Route::middleware('auth:sanctum', 'Fundraiser')->group(function () {
});
