<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FundingRequest extends Model
{
    use HasFactory;
    protected $table = 'fundingrequests';
    protected $fillable = [
        'title',
        'description',
        'image',
        'letter',
        'goal',
        'category',
        'fundraiser_id',
        'reviewd',
    ];

    public function fundraiser(){
        return $this->belongsTo(Fundraiser::class , 'fundraiser_id');
    }
}
