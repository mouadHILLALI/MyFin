<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Fundraiser;
use Illuminate\Http\Request;
use App\Http\Requests\FundingRequest;
use App\Models\Donation;
use App\Models\FundingRequest as ModelsFundingRequest;
use App\Models\Investor;
use App\Models\Portfolio;

class FundingRequestController extends Controller
{
    public function create(FundingRequest $r)
    {
        $fund = Fundraiser::where('user_id', auth()->user()->id)->first();
        if ($fund) {
            $filePath = $r->file('letter')->store('files', 'public');
            $fileURL = asset('storage/' . $filePath);
            $filePath2 = $r->file('image')->store('images', 'public');
            $imageURL = asset('storage/' . $filePath2);
            try {
                ModelsFundingRequest::create([
                    'title' => $r->title,
                    'description' => $r->description,
                    'image' => $imageURL,
                    'category' => $r->category,
                    'letter' => $fileURL,
                    'goal' => $r->goal,
                    'fundraiser_id' => $fund->id,
                ]);
                return response()->json('funding request was submited for review', 200);
            } catch (\Exception $e) {
                return response()->json($e->getMessage());
            }
        } else {
            return response()->json('please register your profile first');
        }
    }

    public function fetchFund($id)
    {
        try {
            $fund = ModelsFundingRequest::where('id', $id)->first();

            return response()->json(['fund' => $fund], 200);
        } catch (\Exception $e) {
            return response()->json($e->getMessage());
        }
    }
    public function show()
    {
        $fund = Fundraiser::where('user_id', auth()->user()->id)->first();
        if ($fund) {
            $requests = ModelsFundingRequest::where('fundraiser_id', $fund->id)->get();
            $donations = Donation::where('fundingrequest_id', $requests[0]->id)->get();
            $total = 0;
            $users = [];
            foreach ($donations as $donation) {
                $total  += $donation->amount;
                $users[] = User::where('id', $donation->fundingrequest->fundraiser->user_id)->first();
            }
            $combinedData = [];
            for ($i = 0; $i < count($donations); $i++) {
                $combinedData[] = [
                    'donations' => $donations[$i],
                    'users' => isset($users[$i]) ? $users[$i] : null,
                ];
            }
            return response()->json(['data' => $requests, 'total' => $total, 'combinedData'=>$combinedData], 200);
        } else {
            return response()->json('please register your profile first');
        }
    }
    public function getAllfunds()
    {
        try {
            $funds = ModelsFundingRequest::where('reviewd', 0)->get();
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
    public function getFunds()
    {
        try {
            $funds = ModelsFundingRequest::where('reviewd', 1)->get();
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
                    'fund' => $funds[$i],
                    'user' => isset($users[$i]) ? $users[$i] : null,
                ];
            }
            return response()->json($combinedData, 200);
        } catch (\Exception $e) {
            return response($e->getMessage());
        }
    }

    public function fetchEditData($id)
    {
        try {
            $data = ModelsFundingRequest::where('id', $id)->first();
            return response()->json(['data' => $data], 200);
        } catch (\Exception $e) {
            return response($e->getMessage());
        }
    }
    public function update(Request $r)
    {
        try {
            $fund = ModelsFundingRequest::where('id', $r->id)->first();
            if ($r->file('image')) {
                $filePath = $r->file('image')->store('images', 'public');
                $ImageURL = asset('storage/' . $filePath);
            }
            if ($r->file('letter')) {
                $filePath = $r->file('letter')->store('files', 'public');
                $letterURL = asset('storage/' . $filePath);
            }
            $fund->update([
                'title' => $r->title,
                'description' => $r->description,
                'image' => $ImageURL ?? $fund->image,
                'category' => $r->category,
                'reviewd' => 0,
                'letter' => $letterURL ?? $fund->letter,
                'goal' => $r->goal,
            ]);

            return response()->json('The funding request was updated successfully and was submitted for review', 200);
        } catch (\Exception $e) {
            return response($e->getMessage());
        }
    }
    public function destroy($id)
    {
        try {
            $fund = ModelsFundingRequest::where('id', $id)->first();
            $fund->delete();
            return response()->json('deleted succesfully', 200);
        } catch (\Exception $e) {
            return response($e->getMessage());
        }
    }

    public function donate(Request $r)
    {
        try {
            $inv = Investor::where('user_id', auth()->user()->id)->first();
            $donation = Donation::where('fundingrequest_id', (int)$r->id)->where('investor_id', $inv->id)->first();
            $portfolio = Portfolio::where('investor_id', $inv->id)->first();
            $portfolio->update([
                'amount' => $portfolio->balance - (int)$r->amount
            ]);
            if ($donation) {
                $donation->update(
                    ['amount' => $donation->amount + (int)$r->amount]
                );
            } else {
                Donation::create([
                    'fundingrequest_id' => (int)$r->id,
                    'investor_id' => (int)$inv->id,
                    'amount' => (int)$r->amount
                ]);
            }
            return response()->json('You have Donated succesfully', 200);
        } catch (\Exception $e) {
            return response($e->getMessage());
        }
    }
}
