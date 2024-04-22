<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\FundingRequestController;
use App\Http\Controllers\InvestorController;
use App\Http\Controllers\LoansController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\Investor;
use App\Models\FundingRequest;
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
    Route::post('/user/verify', [UserController::class, 'verifyProfile']);
    Route::get('/user/check', [UserController::class, 'check']);
    Route::get('/user/data', [UserController::class, 'getData']);
    Route::post('/user/logout', [UserController::class, 'logout']);
});

Route::middleware('auth:sanctum', 'Admin')->group(function () {
    Route::get('/loans/get' , [LoansController::class , 'Allloans']);
    Route::get('/funds/get' , [FundingRequestController::class , 'getAllfunds']);
    Route::post('/application/approve' , [AdminController::class , 'approve']);
});

Route::middleware('auth:sanctum', 'Investor')->group(function () {
    Route::get('/investor/loan/get' , [LoansController::class , 'getLoans']);
    Route::get('/investor/check' , [InvestorController::class , 'check']);
    Route::post('/investor/loan/create' , [LoansController::class , 'create']);
    Route::post('/investor/portfolio/create' , [InvestorController::class , 'createPortfolio']);
    Route::get('/investor/loan/{id}' , [LoansController::class , 'getLoan']);
    Route::post('/investor/loan/update' , [LoansController::class , 'Update']);
    Route::get('/portfolio/loans' , [LoansController::class , 'Portfolioloans']);
    Route::get('/portfolio/get' , [PortfolioController::class , 'get']);
    Route::get('/invest/loan/{id}' , [LoansController::class , 'singleLoan']);
    Route::post('/portfolio/invest' , [PortfolioController::class , 'invest']);
    Route::get('/donations/get' , [FundingRequestController::class , 'getFunds']);
    Route::get('/fetch/investors' , [PortfolioController::class , 'fetchInvestors']);

});

Route::middleware('auth:sanctum', 'Fundraiser')->group(function () {
    Route::post('/fundraiser/fundingrequest/create', [FundingRequestController::class , 'create']);
    Route::get('/fundingrequests/show', [FundingRequestController::class , 'show']);
});
