<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Controllers\EmailController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'nickname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed'
        ]);
        if ($validation->fails()) {
            return response()->json($validation->errors(), 202);
        }
        $allData = $request->all();
        $allData['password'] = Hash::make($allData['password']);

        $user = User::create($allData);

        $email = new EmailController();
        $email->sendMail('register', $allData['email'], 'Register validation',[
            'nickname' => $allData['nickname']
        ]);

        $resArr = [];
        $resArr['token'] = $user->createToken('Laravel Password Grant Client')->accessToken;
        $resArr['nickname'] = $user->nickname;
        $resArr['id'] = $user->id;

        return response()->json($resArr, 200);
    }

    public function login (Request $request) {
        if (Auth::attempt([
            'email'=>$request->email,
            'password'=>$request->password
        ])) {
            $user = Auth::user();
            $resArr = [];
            $resArr['token'] = $user->createToken('Laravel Password Grant Client')->accessToken;
            $resArr['nickname'] = $user->nickname;
            $resArr['id'] = $user->id;
            return response()->json($resArr, 200);
        } else {
            return response()->json(['Error' => 'Unauthorized Access'], 203);
        }
    }

    public function logout (Request $request) {
        $token = $request->user()->token();
        $token->revoke();
        return response()->json(['message' => 'You have been successfully logged out!'], 200);
    }
}
