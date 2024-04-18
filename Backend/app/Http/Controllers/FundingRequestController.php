<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Fundraiser;
use Illuminate\Http\Request;
use App\Http\Requests\FundingRequest;
use App\Models\FundingRequest as ModelsFundingRequest;

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
    public function show(){
        $fund = Fundraiser::where('user_id', auth()->user()->id)->first();
        if ($fund) {
            $requests = ModelsFundingRequest::where('fundraiser_id', $fund->id)->get();
            return response()->json($requests, 200);
        }else{
            return response()->json('please register your profile first');
        }
    }
    public function getAllfunds(){
        try {
            $funds = ModelsFundingRequest::where('reviewd' , 0)->get();
            $users = [];
            foreach ($funds as $fund) {
                $user = User::find($fund->fundraiser->user_id);
                if ($user) {
                    $users[] = $user;
                }
            }
            $combinedData = [];
            for ($i = 0; $i < count($funds); $i++) {
                $combinedData[] = [
                    'funds' => $funds[$i],
                    'user' => isset($users[$i]) ? $users[$i] : null,
                ];
            }

            return response()->json(['combinedData' => $combinedData], 200);

        } catch (\Exception $e) {
            return response($e->getMessage());
        }
    }
}
