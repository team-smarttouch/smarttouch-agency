<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Invalid email or password.'],
            ]);
        }

        // Generate Sanctum token with role-based abilities
        $token = $user->createToken('dashboard-access', [$user->role])->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'permissions' => [
                    'can_manage_users' => $user->isAdmin(),
                    'can_manage_inquiries' => $user->isAdmin(),
                    'can_manage_content' => $user->isAdmin() || $user->isContent(),
                    'can_manage_seo' => $user->isAdmin() || $user->isSeo(),
                ]
            ]
        ]);
    }

    public function me(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'success' => true,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'permissions' => [
                    'can_manage_users' => $user->isAdmin(),
                    'can_manage_inquiries' => $user->isAdmin(),
                    'can_manage_content' => $user->isAdmin() || $user->isContent(),
                    'can_manage_seo' => $user->isAdmin() || $user->isSeo(),
                ]
            ]
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully'
        ]);
    }
}
