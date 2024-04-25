<?php

namespace App\Models;

use App\Models\FundingRequest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Donation extends Model
{
    use HasFactory;
    protected $table = 'donations';
    protected $fillable = [
        'investor_id',
        'fundingrequest_id',
        'amount'
    ];

    public function fundingrequest(){
        return $this->belongsTo(FundingRequest::class , 'fundingrequest_id');
    }
    public function Investor(){
        return $this->belongsTo(Investor::class , 'investor_id');
    }
}
