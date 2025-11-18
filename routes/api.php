<?php

use App\Http\Controllers\AuthorsController;
use App\Http\Controllers\BookAuthorController;
use App\Http\Controllers\BookLoanController;
use App\Http\Controllers\BooksController;
use App\Http\Controllers\BorrowersController;
use App\Http\Controllers\pegawaiController;
use App\Models\pegawai;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Spatie\FlareClient\Api;

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

Route::apiResource('/pegawais', pegawaiController::class);


Route::apiResource('/authors', AuthorsController::class);
Route::apiResource('/bookAuthor', BookAuthorController::class);
Route::apiResource('/BookLoan', BookLoanController::class);
Route::apiResource('/Books', BooksController::class);
Route::apiResource('/Borrowers', BorrowersController::class);
