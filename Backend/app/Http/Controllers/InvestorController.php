<?php

namespace App\Http\Controllers;

use App\Models\Investor;
use App\Models\Portfolio;
use App\Models\User;
use Illuminate\Http\Request;

class InvestorController extends Controller
{
    public function check() {

        try {
            $inv = Investor::where('user_id' , auth()->user()->id)->first();
            if ($inv) {
                $port = Portfolio::where('investor_id' , $inv->id)->first();
                if ($port) {
                    $user = User::where('id', auth()->user()->id)->first();
                    return response()->json(['res'=>$port ,'msg'=>'portfolio exist' , 'user'=>$user] , 200);
                }else{
                    return response()->json(['res'=>'no portfolio was found'] , 200);
                }
            }else{
                return response()->json(['res'=>'Register your Profile first'] , 200);
            }
        } catch (\Exception $e) {
            return response()->json(['res'=>$e->getMessage()] , 401);
        }
    }
}
