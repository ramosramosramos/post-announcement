<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreYearLevelRequest;
use App\Http\Requests\UpdateYearLevelRequest;
use App\Http\Resources\YearLevelResource;
use App\Models\YearLevel;

class YearLevelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $year_levels = YearLevel::select(['id', 'name', 'created_at'])->paginate(20);

        return inertia('YearLevel/Index', ['year_levels' => YearLevelResource::collection($year_levels)]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreYearLevelRequest $request)
    {
        YearLevel::create($request->validated());
    }

    public function update(UpdateYearLevelRequest $request, YearLevel $year_level)
    {
        $year_level->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(YearLevel $year_level)
    {
        $year_level->delete();
    }
}
