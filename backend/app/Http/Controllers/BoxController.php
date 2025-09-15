<?php

namespace App\Http\Controllers;

use App\Models\Box;
use Illuminate\Http\Request;

class BoxController extends Controller
{
    public function Box()
    {
        // Sare users ka data JSON mein return hoga
        return response()->json(Box::all());
    }
}
