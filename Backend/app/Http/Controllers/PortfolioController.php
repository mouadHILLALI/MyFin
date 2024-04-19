<?php

namespace App\Http\Controllers;

use App\Models\Investor;
use App\Models\Portfolio;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function get(){
        try {
            $inv = Investor::where('user_id', auth()->user()->id)->first();
            $portfolio = Portfolio::where('investor_id', $inv->id)->first();
            return response()->json($portfolio,200);
        } catch (\Exception $e) {
            return response($e->getMessage());
        }
    }
}
