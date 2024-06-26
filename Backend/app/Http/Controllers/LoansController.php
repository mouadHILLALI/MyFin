<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateLoanRequest;
use App\Models\Investments;
use App\Models\Investor;
use App\Models\Loan;
use App\Models\User;
use Illuminate\Http\Request;

use function PHPUnit\Framework\countOf;

class LoansController extends Controller
{
    public function getLoans()
    {
        $inv = Investor::where('user_id', auth()->user()->id)->first();
        try {
            if ($inv) {
                $loans = Loan::where('investor_id', $inv->id)->get();
                return response()->json(['data' => $loans], 200);
            }
        } catch (\Exception $e) {
            return response()->json(['res' => $e->getMessage()], 401);
        }
    }
    public function create(CreateLoanRequest $r)
    {
        try {
            $investor = Investor::where('user_id', auth()->user()->id)->first();
            $filePath = $r->file('file')->store('files', 'public');
            $fileURL = asset('storage/' . $filePath);
            $loan = Loan::where('investor_id', $investor->id)->first();
            if (!$loan) {
                Loan::create([
                    'amount' => $r->amount,
                    'duration' => $r->duration,
                    'profit_rate' => $r->rate,
                    'business_model' => $filePath,
                    'investor_id' => $investor->id,
                ]);
                return response()->json(['res' => 'Loan was submitted for review'], 200);
            }
        } catch (\Exception $e) {
            return response($e->getMessage());
        }
    }
    public function Allloans()
    {
        try {
            $loans = Loan::where('reviewd', 0)->get();
            $users = [];
            foreach ($loans as $loan) {
                $user = User::find($loan->investor->user_id);
                if ($user) {
                    $users[] = $user;
                }
            }

            $combinedData = [];
            for ($i = 0; $i < count($loans); $i++) {
                $combinedData[] = [
                    'loan' => $loans[$i],
                    'user' => isset($users[$i]) ? $users[$i] : null,
                ];
            }

            return response()->json(['combinedData' => $combinedData], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function getLoan($id)
    {
        try {
            $loan = Loan::where('id', $id)->first();
            return response()->json(['data' => $loan], 200);
        } catch (\Exception $e) {
            return response($e->getMessage());
        }
    }
    public function Update(Request $r)
    {
        try {
            $loan = Loan::where('id', $r->id)->first();
            if ($r->file('file')) {
                $filePath = $r->file('file')->store('files', 'public');
                $fileURL = asset('storage/' . $filePath);
            }
            $loan->update([
                'amount' => $r->amount,
                'duration' => $r->duration,
                'profit_rate' => $r->rate,
                'reviewd' => 0,
                'business_model' => $fileURL ?? $loan->business_model,
            ]);

            return response()->json('The loan was updated successfully and was submitted for review', 200);
        } catch (\Exception $e) {
            return response($e->getMessage());
        }
    }
    public function Portfolioloans()
    {
        try {
            $inv = Investor::where('user_id', auth()->user()->id)->first();
            if ($inv) {
                $loans = [];
                if ($inv->id) {
                    $loans = Loan::where('investor_id', '!=', $inv->id)->where('reviewd', 1)->get();
                }
                $users = [];
                foreach ($loans as $loan) {
                    $user = User::find($loan->investor->user_id);
                    if ($user) {
                        $users[] = $user;
                    }
                }

                $combinedData = [];
                for ($i = 0; $i < count($loans); $i++) {
                    $combinedData[] = [
                        'loan' => $loans[$i],
                        'user' => isset($users[$i]) ? $users[$i] : null,
                    ];
                }
                return response()->json($combinedData, 200);
            } else {
                return response('register your profile');
            }
        } catch (\Exception $e) {
            return response($e->getMessage());
        }
    }


    public function singleLoan($id)
    {
        try {
            $loan = Loan::where('id', $id)->first();
            $investments = Investments::where('loan_id', $loan->id)->get();
            return response()->json(['loan' => $loan, 'investemnts' => $investments], 200);
        } catch (\Exception $e) {
            return response($e->getMessage());
        }
    }
    public function destroy($id)
    {
        try {
            $investments = Investments::where('loan_id', $id)->get();

            if (count($investments) === 0) {
                $loan = Loan::where('id', $id)->first();
                $loan->delete();
                return response()->json('loan deleted succesfully', 200);
            } else {
                return response()->json('refund Investors first', 200);
            }
        } catch (\Exception $e) {
            return response($e->getMessage());
        }
    }
}
