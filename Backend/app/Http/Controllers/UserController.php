<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;

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
                return response()->json(['token' => $token, 'image' => auth()->user()->image, 'name' => auth()->user()->family_name, 'role'=>auth()->user()->role], 200);
            } else {
                return response()->json('Email already exist', 200);
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
                return response()->json(['status' => 200, 'token' => $token, 'name' => auth()->user()->name, 'image' => auth()->user()->image]);
            } else {
                return response('Wrong credentials', 500)
                    ->header('Content-Type', 'text/plain');
            }
        } catch (\Exception $e) {
            return response($e->getMessage(), 500)
                ->header('Content-Type', 'text/plain');
        }
    }
    public function logout(Request $r)
    {
        $r->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Successfully logged out', 'status' => true], 200);
    }
}
