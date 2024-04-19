<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Investments extends Model
{
    use HasFactory;
    protected $fillable = [
        'loan_id',
        'portfolio_id',
        'amount'
    ];

    public function Loan(){
        return $this->belongsTo(Loan::class , 'loan_id');
    }
    public function Portfolio(){
        return $this->belongsTo(Portfolio::class , 'portfolio_id');
    }
}
