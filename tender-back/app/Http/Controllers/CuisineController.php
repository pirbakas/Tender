<?php

namespace App\Http\Controllers;

use App\Models\Cuisine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CuisineController extends Controller
{
    public function getAllCuisine()
    {
        return Cuisine::all();
    }


    public function addCuisine(Request $request)
    {
        $cuisine = new Cuisine;
        $cuisine->cuisinetitle = $request->cuisinetitle;
        $cuisine->description = $request->description;
        $cuisine->urlimage = $request->urlimage;
        $result=$cuisine->save();
        if ($result){
            return Cuisine::all();
        }else{
            return ["result"=>"Problem : user has not been saved ... :-("];
        }
    }

    public function updateCuisine(Request $request){
        if (isset($request->id)){$cuisine = Cuisine::find($request->id);}
        else{return ["result"=>"Problem : there is no id to work with"];}
        if (isset($request->cuisinetitle)){$cuisine->cuisinetitle=$request->cuisinetitle;}
        if (isset($request->description)){$cuisine->description=$request->description;}
        if (isset($request->urlimage)){$cuisine->urlimage=$request->urlimage;}
        $cuisine->updated_at=now();
        $result=$cuisine->save();
        if ($result){
            return Cuisine::all();
        }else{
            return ["result"=>"Problem : user has not been updated ... :-("];
        }
    }

    public function deleteCuisine($id)
    {
        $cuisine = Cuisine::find($id);
        $result=$cuisine->delete();
        if ($result){
            return DB::table('cuisines')->get();
        }else{
            return ["result"=>"Problem : user has not been deleted ... :-("];
        }
    }

    public function getCuisineById($id)
    {
        return Cuisine::find($id);
    }
}

