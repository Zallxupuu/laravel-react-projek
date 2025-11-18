<?php

namespace App\Http\Controllers;

use App\Models\Borrowers;
use Illuminate\Http\Request;

class BorrowersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = Borrowers::create($request->all());

        return response()->json([
            'success'=>true,
            'data'=>$data
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $data = Borrowers::findOrFail($id);

        return response()->json($data, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Borrowers $borrowers)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = Borrowers::findOrFail($id);

        $data-> update($request->all());
        return response()->json($data, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Borrowers::destroy($id);

        return response()->json(null, 200);
    }
}
