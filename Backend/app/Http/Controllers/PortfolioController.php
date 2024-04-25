<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Models\Loan;
use App\Models\User;
use App\Models\Investor;
use App\Models\Portfolio;
use App\Models\Investments;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function get()
    {
        try {
            $inv = Investor::where('user_id', auth()->user()->id)->first();
            $portfolio = Portfolio::where('investor_id', $inv->id)->first();
            $donations = Donation::where('investor_id', $inv->id)->get();
            $total = 0;
            if ($donations) {
                foreach ($donations as $donation) {
                    $total += $donation->amount;
                }
            }
            return response()->json(['data' => $portfolio, "total" => $total], 200);
        } catch (\Exception $e) {
            return response($e->getMessage());
        }
    }
    public function invest(Request $r)
    {

        try {
            $inv = Investor::where('user_id', auth()->user()->id)->first();
            $portfolio = Portfolio::where('investor_id', $inv->id)->first();
            $newPorfit = $portfolio->estimated_profit +  (int)$r->profit;
            $portfolio->update([
                'balance' => (int)$r->balance,
                'estimated_profit' => (int)$newPorfit
            ]);
            $investement = Investments::where('portfolio_id', $portfolio->id)->where('loan_id', $r->id)->first();
            if ($investement) {
                $investement->update([
                    'amount' => $investement->amount + (int)$r->investment,
                ]);
                return response()->json('Success', 200);
            } else {
                Investments::create([
                    'loan_id' => $r->id,
                    'portfolio_id' => $portfolio->id,
                    'amount' => (int)$r->investment
                ]);
                return response()->json('Success', 200);
            }
        } catch (\Exception $e) {
            return response($e->getMessage());
        }
    }
    public function fetchInvestors()
    {
        try {
            $inv = Investor::where('user_id', auth()->user()->id)->first();
            $loan = Loan::where('investor_id', $inv->id)->first();
            $users = [];

            if ($loan) {
                $investments = Investments::where('loan_id', $loan->id)->get();
                $totalAmount = 0;
                foreach ($investments as $investment) {
                    $totalAmount += $investment->amount;
                    $user = User::find($investment->portfolio->investor->user_id);
                    if ($user) {
                        $users[] = $user;
                    }
                }
                $combinedData = [];
                for ($i = 0; $i < count($investments); $i++) {
                    $combinedData[] = [
                        'investments' => $investments[$i],
                        'users' => isset($users[$i]) ? $users[$i] : null,
                    ];
                }
                return response()->json(['data' => $combinedData, 'total' => $totalAmount, 'loan' => $loan], 200);
            } else {
                return response()->json('no loan was found', 200);
            }
        } catch (\Exception $e) {
            return response($e->getMessage());
        }
    }
}
