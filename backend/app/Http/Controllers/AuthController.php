<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function signup(Request $request)
{
    // Validation
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8|confirmed',
    ]);

    if ($validator->fails()) {
        $response = [
            'message' => $validator->errors(),
            'status' => 'error',
            'code' => 422
        ];
        return response()->json($response, $response['code']);
    }
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);
    $token = $user->createToken('authToken')->plainTextToken;

    // Return success response
    $response = [
        'message' => 'User registered successfully!',
        'token' => $token,
        'user' => $user,
        'status' => 'success',
        'code' => 201
    ];

    return response()->json($response, $response['code']);
}
public function login(Request $request)
{
    // Validation
    $validator = Validator::make($request->all(), [
        'email' => 'required|string|email|max:255',
        'password' => 'required|string|min:8',
    ]);

    if ($validator->fails()) {
        $response = [
            'message' => $validator->errors(),
            'status' => 'error',
            'code' => 422
        ];
        return response()->json($response, $response['code']);
    }


    // Check if user exists
    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        $response = [
            'message' => 'Invalid email or password.',
            'status' => 'error',
            'code' => 401
        ];
        return response()->json($response, $response['code']);
    }
     // Generate token for the user
     $token = $user->createToken('authToken')->plainTextToken;

    // Return success response with the token
    $response = [
        'message' => 'Login successful!',
        'token' => $token,
        'user' => $user,
        'status' => 'success',
        'code' => 200
    ];

    return response()->json($response, $response['code']);
}

public function logout(Request $request)
{
    // Retrieve the authenticated user's current token
    $token = $request->user()->currentAccessToken();

    if ($token) {
        // Revoke the token
        $token->delete();

        $response = [
            'message' => 'Logged out successfully.',
            'status' => 'success',
            'code' => 200
        ];
    } else {
        $response = [
            'message' => 'No active session found.',
            'status' => 'error',
            'code' => 401
        ];
    }

    return response()->json($response, $response['code']);
}

public function get_users()
    {
        // Sare users ka data JSON mein return hoga
        return response()->json(User::all());
    }

}
