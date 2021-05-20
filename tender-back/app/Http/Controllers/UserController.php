<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function list()
    {
        $users = User::all();

        return view('admin.users', compact('users'));
    }


    public function getAllUsers()
    {
        return User::all();
    }

    public function addUser(Request $request)
    {
        $user = new User;
        $user->nickname = $request->nickname;
        $user->address = $request->address;
        $user->picture = $request->picture;
        $user->description = $request->description;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->created_at = now();
        $result = $user->save();
        if ($result) {
            return ["result" => "Success : user has been added ! :-)"];
        } else {
            return ["result" => "Problem : user has not been saved ... :-("];
        }
    }

    public function updateUser(Request $request)
    {
        if (isset($request->id)) {
            $user = User::find($request->id);
        } else {
            return ["result" => "Problem : there is no id to work with"];
        }
        if (isset($request->nickname)) {
            $user->nickname = $request->nickname;
        }
        if (isset($request->address)) {
            $user->address = $request->address;
        }
        if (isset($request->picture)) {
            $user->picture = $request->picture;
        }
        if (isset($request->description)) {
            $user->description = $request->description;
        }
        if (isset($request->email)) {
            $user->email = $request->email;
        }
        if (isset($request->password)) {
            $user->password = Hash::make($request->password);
        }
        $user->updated_at = now();
        $result = $user->save();
        if ($result) {
            return response()->json(['success' => 'You have been successfully update!'], 200);
        } else {
            return response()->json(["error" => "Problem : user has not been updated ..."], 202);
        }
    }

    public function deleteUser($id)
    {
        $user = User::find($id);
        $result = $user->delete();
        if ($result) {
            return ["result" => "Success : user has been deleted ! :-)"];
        } else {
            return ["result" => "Problem : user has not been deleted ... :-("];
        }
    }

    public function serchUserByNickname($nickname)
    {
        return User::where("nickname", "ilike", "%" . $nickname . "%")->get();
    }

    public function getUserById($id)
    {
        return User::find($id);
    }

}
