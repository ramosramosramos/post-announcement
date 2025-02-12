<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSectionRequest;
use App\Http\Requests\UpdateSectionRequest;
use App\Http\Resources\SectionResource;
use App\Models\Section;

class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sections = Section::select(['id', 'name', 'created_at'])->paginate(20);

        return inertia('Section/Index', ['sections' => SectionResource::collection($sections)]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSectionRequest $request)
    {
        Section::create($request->validated());
    }

    public function update(UpdateSectionRequest $request, Section $section)
    {
        $section->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Section $section)
    {
        $section->delete();
    }
}
