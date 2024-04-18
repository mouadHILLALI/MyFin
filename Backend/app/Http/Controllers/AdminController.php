<?php

namespace App\Http\Controllers;

use App\Models\FundingRequest;
use App\Models\Loan;
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
}