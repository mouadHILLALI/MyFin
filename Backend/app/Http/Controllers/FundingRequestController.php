<?php

namespace App\Http\Controllers;

use App\Http\Requests\FundingRequest;
use App\Models\FundingRequest as ModelsFundingRequest;
use App\Models\Fundraiser;
use Illuminate\Http\Request;

class FundingRequestController extends Controller
{
    public function create(FundingRequest $r){
        $fund = Fundraiser::where('user_id', auth()->user()->id)->first();
        if($fund){
            $filePath = $r->file('letter')->store('files', 'public');
            $fileURL = asset('storage/' . $filePath);
            $filePath2 = $r->file('image')->store('images', 'public');
            $imageURL = asset('storage/' . $filePath2);
            try {
                ModelsFundingRequest::create([
                    'title'=>$r->title ,
                    'description'=>$r->description ,
                    'image'=>$imageURL ,
                    'letter'=>$fileURL ,
                    'goal'=>$r->goal ,
                    'fundraiser_id'=>$fund->id,
                ]);
                return response()->json('funding request was submited for review' , 200);
            } catch (\Exception $e) {
                return response()->json($e->getMessage());
            }
        }else{
            return response()->json('please register your profile first');
        }
    }
}
