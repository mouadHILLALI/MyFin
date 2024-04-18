<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    use HasFactory;
    use HasFactory;
    protected $fillable = [
        'amount',
        'duration',
        'profit_rate',
        'business_model',
        'investor_id',
        'reviewd',
    ];

    public function Investor(){
        return $this->belongsTo(Investor::class , 'investor_id');
    }
}
