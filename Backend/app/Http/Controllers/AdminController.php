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
                    $loan->update([
                        'reviewd' => 1
                    ]);
                    return response()->json(['res' => 'Loan was approved succesfully']);
                    break;
                case 'fund':
                    $fund = FundingRequest::where('id', $id)->first();
                    $fund->update([
                        'reviewd' => 1
                    ]);
                    return response()->json(['res' => 'Funding request was approved succesfully']);
                    break;
                default:
                    break;
            }
        } catch (\Exception $e) {
            return response()->json($e->getMessage());
        }
    }
}
