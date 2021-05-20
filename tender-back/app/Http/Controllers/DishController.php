<?php

namespace App\Http\Controllers;

use App\Http\Controllers\EmailController;
use App\Models\Cuisine;
use App\Models\Dish;
use App\Models\User;
use Illuminate\Http\Request;


//Mettre toutes les fonctions utilent au CRUD
class DishController extends Controller
{
    // Fonction Afficher les listes
    function listDish(){
        return Dish::all();
    }

    // Show dish by type
    function listDishByType($type) {
        return Dish::all()->where('type_n', $type);
    }

    // Fonction Afficher un plat
    function getDishById($id){
        return Dish::find($id);
    }

    // Function get type name by id
    function getTypeNameById($id) {
        $name = Cuisine::find($id);
        return $name->cuisine_title;
    }

    //Fonction créer les dish
    function addDish(Request $req){
        $errorMessage = [];
        $dish = new Dish;

        if (isset($req->user_id)) {
            $dish->user_id = $req->user_id;
        } else {
            $errorMessage[] = 'user';
        }
        if (isset($req->type)) {
            $dish->type = $req->type;
        }
        else {
            $errorMessage[] = 'type';
        }
        if (isset($req->title)) {
            $dish->title = $req->title;
        }
        else {
            $errorMessage[] = 'title';
        }
        if (isset($req->description)) {
            $dish->description = $req->description;
        }
        else {
            $errorMessage[] = 'description';
        }
        if (isset($req->portion)) {
            $dish->portion = $req->portion;
        }
        else {
            $errorMessage[] = 'portion';
        }
        if (isset($req->location)) {
            $dish->location = $req->location;
        }
        else {
            $errorMessage[] ='location';
        }
        if (isset($req->withdrawal_time)) {
            $dish->withdrawal_time = $req->withdrawal_time;
        }
        else {
            $errorMessage[] = 'withdrawal_time';
        }
        if($errorMessage) {
            return response()->json($errorMessage, 202);
        }

        $dish->booker_id = "";
        $dish->url_image = "";
        $dish->type_n = $this->getTypeNameById($req->user_id);

        $dish->save();
        return response()->json(['success' => 'You add a new dish successfully'], 200);
        $email = new EmailController();
        $email->sendMail('confirmNewPlat', (User::find($req->user_id)->email), 'Your dish has been added !',[
            'nom' => (User::find($req->user_id)->nickname),
            'email' => (User::find($req->user_id)->email),
            'title_dish' => $req->title,
            'location' => $req->location,
            'portion' => $req->portion,
            'description' => $req->description,
            'withdrawal'=> $req->withdrawal_time
        ]);

    }

    //Fonction update dish
    function updateDish(Request $req){
        if (isset($req->id)){$dish = Dish::find($req->id);}
        else{
            return "Id dish required";
        }
        if (isset($req->type)) {$dish->type = $req->type;}
        if (isset($req->title)) {$dish->title = $req->title;}
        if (isset($req->description)) {$dish->description = $req->description;}
        if (isset($req->portion)){$dish->portion = $req->portion;}
        if (isset($req->location)){$dish->location = $req->location;}
        if (isset($req->withdrawal_time)) {$dish->withdrawal_time = $req->withdrawal_time;}
        if (isset($req->url_image)) {$dish->url_image = $req->url_image;}
        if (isset($req->booker_id)) {$dish->booker_id = $req->booker_id;}

        $dish->save();

            return "update successful";
        }

    //Fonction delete dish
    function deleteDish($id){
        $dish = Dish::find($id);
        $dish->delete();
    }

    //Fonction book a dish
    function bookDish(Request $req){
        if (isset($req->dish_id)) {
            $dish = Dish::find($req->dish_id);
            if (!isset($req->booker_id)){
                return "Id booker required";
            }
            $dish->booker_id = $req->booker_id;
            $var_portion = $dish->portion;
            $dish->portion = 0;
            $dish->save();

            $cuistot = User::find($dish->user_id);
            $booker = User::find($req->booker_id);

            $email_cuisot = new EmailController();
            $email_cuisot->sendMail('dishBookedCuistot', $cuistot->email, 'Your dish has been booked',[
                'type' => $dish->type,
                'title' => $dish->title,
                'description' => $dish->description,
                'portion' => $var_portion,
                'time' => $dish->withdrawal_time,
                'booker' => $booker->nickname,
                'location' => $dish->location
            ]);

            $email_booker = new EmailController();
            $email_booker->sendMail('dishBookedBooker', $booker->email, 'You booked a dish',[
                'type' => $dish->type,
                'title' => $dish->title,
                'description' => $dish->description,
                'portion' => $var_portion,
                'time' => $dish->withdrawal_time,
                'cuistot' => $cuistot->nickname,
                'location' => $dish->location
            ]);

            return response()->json(["success" => "Success : the dish has been booked !"], 200);
        }
        else{
            return response()->json(["error" => "Id dish required"], 202);
        }

    }
}



