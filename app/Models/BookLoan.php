<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookLoan extends Model
{
    use HasFactory;

    protected $fillable = [
        'ISBN',
        'BorrowerID',
        'LoadDate',
        'ReturnDate'
    ];

    protected $primaryKey = 'BookLoanKey';
}
