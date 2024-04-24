<?php

namespace App\Http\Controllers;

use App\Models\FundingRequest;
use App\Models\Fundraiser;
use App\Models\Investments;
use App\Models\Investor;
use App\Models\Loan;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function approve(Request $r)
    {
        try {
            $id = $r->id;
            $type = $r->type;

            switch ($type) {
                case 'loan':
                    $loan = Loan::where('id', $id)->first();
                    if ($loan) {
                        $loan->update(['reviewd' => 1]);
                        return response()->json(['res' => 'Loan was approved successfully', 'data' => $type], 200);
                    } else {
                        return response()->json(['error' => 'Loan not found'], 404);
                    }
                    break;

                case 'fund':
                    $fund = FundingRequest::where('id', $id)->first();
                    if ($fund) {
                        $fund->update(['reviewd' => 1]);
                        return response()->json(['res' => 'Funding request was approved successfully'], 200);
                    } else {
                        return response()->json(['error' => 'Funding request not found'], 404);
                    }
                    break;

                default:
                    return response()->json(['error' => 'Invalid request type'], 400);
                    break;
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function stats()
    {
        try {
            $totalInvestors = Investor::count();
            $totalFundraisers = Fundraiser::count();
            $investements = Investments::get();
            $total = 0;
            $loans = Loan::where('reviewd', 0)->orderBy('amount')->limit(3)->get();
            $Totalloans = Loan::get();
            $amount= 0;
            foreach ($investements as $investement) {
                $total += $investement->amount;
            }
            foreach($Totalloans as $Totalloan){
                $amount += $Totalloan->amount;
            }
            return response()->json(['totalinv' => $totalInvestors, 'totalfunds' => $totalFundraisers, 'total' => $total, 'loans' => $loans ,'amount'=>$amount],200);
        } catch (\Exception $e) {
            return response($e->getMessage());
        }
    }

    public function search(Request $r)
    {
        try {
            $search = $r->search;

            $loanResults = Loan::where('amount', 'LIKE', $search)->where('reviewd', 0)->get();
            $fundingResults = FundingRequest::where('title', "LIKE", '%' . $search . '%')->where('reviewd', 0)->get();

            $combinedData = [];

            foreach ($loanResults as $loan) {
                $user = User::find($loan->investor->user_id);
                $combinedData[] = ['loan' => $loan, 'user' => $user];
            }

            foreach ($fundingResults as $funding) {
                $user = User::find($funding->fundraiser->user_id);
                $combinedData[] = ['funding' => $funding, 'user' => $user];
            }

            return response()->json(['data' => $combinedData], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
