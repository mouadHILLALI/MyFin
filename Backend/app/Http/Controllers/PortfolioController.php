<?php

namespace App\Http\Controllers;

use App\Models\Investments;
use App\Models\Investor;
use App\Models\Portfolio;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function get()
    {
        try {
            $inv = Investor::where('user_id', auth()->user()->id)->first();
            $portfolio = Portfolio::where('investor_id', $inv->id)->first();
            return response()->json($portfolio, 200);
        } catch (\Exception $e) {
            return response($e->getMessage());
        }
    }
    public function invest(Request $r)
    {
        try {
            $inv = Investor::where('user_id', auth()->user()->id)->first();
            $portfolio = Portfolio::where('investor_id', $inv->id)->first();
            $newPorfit = $portfolio->estimated_profit + $r->profit;
            $portfolio->update([
                'balance' => $r->balance,
                'estimated_profit' => $newPorfit
            ]);
            Investments::create([
                'loan_id' => $r->id,
                'portfolio_id' => $portfolio->id,
                'amount' => $r->investment
            ]);
            return response()->json('Success', 200);
        } catch (\Exception $e) {
            return response($e->getMessage());
        }
    }
}
