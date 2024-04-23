<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\VerifyRequest;
use App\Models\Fundraiser;
use App\Models\Investor;

class UserController extends Controller
{
    public function register(RegisterRequest $r)
    {
        try {
            $check = User::where('email', $r->email)->first();
            if (!$check) {
                $imagePath = $r->file('image')->store('images', 'public');
                $imageUrl = asset('storage/' . $imagePath);
                $user = User::create([
                    'first_name' => $r->first_name,
                    'family_name' => $r->family_name,
                    'role' => $r->role,
                    'image' => $imageUrl,
                    'email' => $r->email,
                    'password' => Hash::make($r->password),
                ]);
                Auth::login($user, $remember = true);
                $token = $user->createToken('token')->plainTextToken;
                return response()->json(['token' => $token, 'image' => auth()->user()->image, 'name' => auth()->user()->family_name, 'role' => auth()->user()->role], 200);
            } else {
                return response()->json('Email already exist', 401);
            }
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }

    public function login(LoginRequest $r)
    {
        try {
            $user = User::where('email', $r->email)->first();
            if ($user && Hash::check($r->password, $user->password)) {
                Auth::login($user, $remember = true);
                $token = $user->createToken('token')->plainTextToken;
                return response()->json(['status' => 200, 'token' => $token, 'name' => auth()->user()->name, 'image' => auth()->user()->image, 'role' => auth()->user()->role]);
            } else {
                return response()->json(['data'=>'wrong credentials' , 'status'=>401]);
                   
            }
        } catch (\Exception $e) {
            return response($e->getMessage(), 500);
               
        }
    }
    public function logout(Request $r)
    {
        try {
            $r->headers->set('accept', 'application/json');
            $r->user()->currentAccessToken()->delete();
            return response()->json(['message' => 'Successfully logged out', 'status' => true], 200);
        } catch (\Exception $e) {
           return response($e->getMessage());
        }
    }
    public function check()
    {
        $role = auth()->user()->role;
        switch ($role) {
            case 'Investor':
                $check = Investor::where('user_id', auth()->user()->id)->first();
                if (!$check) {
                    return response()->json(['data' => 'false'], 200);
                }
                return response()->json(['data' => 'true'], 200);
                break;
            case 'FundRaiser':
                $check = Fundraiser::where('user_id', auth()->user()->id)->first();
                if (!$check) {
                    return response()->json(['data' => 'false'], 200);
                }
                return response()->json(['data' => 'true'], 200);
                break;
            default:
                break;
        }
    }
    public function verifyProfile(VerifyRequest $r)
    {
        $role = auth()->user()->role;

        switch ($role) {
            case 'Investor':
                try {
                    Investor::create([
                        'CIN' => $r->CIN,
                        'user_id' => auth()->user()->id
                    ]);
                    return response()->json('Registerd succesfully', 200);
                } catch (\Exception $e) {
                    return response($e->getMessage());
                }

                break;
            case 'FundRaiser':
                try {
                    Fundraiser::create([
                        'CIN' => $r->CIN,
                        'user_id' => auth()->user()->id
                    ]);
                    return response()->json('Registerd succesfully', 200);
                } catch (\Exception $e) {
                    return response($e->getMessage());
                }
                break;
            default:
                break;
        }
    }

    public function getData()
    {
        $user = User::where('id', auth()->user()->id)->first();
        try {
            switch (auth()->user()->role) {
                case 'Investor':
                    $investor = Investor::where('user_id', auth()->user()->id)->first();
                    return response()->json(['user' => $user, 'account' => $investor], 200);
                    break;
                case 'FundRaiser':
                    $fundraiser = Fundraiser::where('user_id', auth()->user()->id)->first();
                    return response()->json(['user' => $user, 'account' => $fundraiser], 200);
                    break;
                default:
                    break;
            }
        } catch (\Exception $e) {
            return response($e->getMessage());
        }
    }
}
