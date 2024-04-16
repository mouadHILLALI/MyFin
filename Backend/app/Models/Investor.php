<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Investor extends Model
{

    use HasFactory;
    protected $fillable = [
        'CIN',
        'user_id'
    ];

    public function User(){
        return $this->belongsTo(User::class , 'user_id');
    }
}
