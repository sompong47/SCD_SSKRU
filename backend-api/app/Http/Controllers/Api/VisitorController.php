<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Visitor;

class VisitorController extends Controller
{
    public function recordVisit(Request $request)
    {
        $ip = $request->ip();
        $date = now()->toDateString();

        Visitor::firstOrCreate([
            'ip_address' => $ip,
            'visited_date' => $date,
        ]);

        $count = Visitor::count();

        return response()->json(['count' => $count]);
    }

    public function getCount()
    {
        $count = Visitor::count();
        return response()->json(['count' => $count]);
    }
}
