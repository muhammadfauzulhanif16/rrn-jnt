<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\History;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            // 'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'meta' => session('meta'),
            'users' => User::all(),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request): RedirectResponse
    {
        // dd($request->all());
        // $request->user()->fill($request->validated());

        // if ($request->user()->isDirty('email')) {
        //     $request->user()->email_verified_at = null;
        // }

        $request->user()->update(
            [
                'full_name' => $request->full_name,
                'phone_number' => $request->phone_number,
                'address' => $request->address,
                'longitude' => $request->longitude,
                'latitude' => $request->latitude,
                'username' => $request->username,
                'password' => $request->password ? bcrypt($request->password) : $request->user()->password,
            ]
        );

        History::create([
            'id' => Str::uuid(),
            'user_id' => $request->user()->id,
            'action' => 'Memperbarui data diri',
        ]);

        return Redirect::route('profile.edit')->with('meta', [
            "status" => true,
            "title" => "Berhasil memperbarui data",
        ]);
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
