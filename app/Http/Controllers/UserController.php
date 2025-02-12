<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Section;
use App\Models\User;
use App\Models\YearLevel;
use Illuminate\Support\Facades\Cache;

class UserController extends Controller
{
    public function index()
    {
        $search = request()->input('search');
        $section = request()->input('section');
        $year_level = request()->input('year_level');

        $users = User::with(['media'])
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'like', '%'.$search.'%');
            })
            ->when($section, function ($query) use ($section) {
                $query->where('section', 'like', '%'.$section.'%');
            })
            ->when($year_level, function ($query) use ($year_level) {
                $query->where('year_level', 'like', '%'.$year_level.'%');
            })
            ->select(['id', 'name', 'section', 'year_level'])
            ->paginate(10)->withQueryString();

        return inertia('User/Index', [
            'users' => UserResource::collection($users),
            'filter' => [
                'search' => $search,
                'section' => $section,
                'year_level' => $year_level,
            ],
            'props' => $this->props(),
        ]);
    }


    public function show(User $user)
    {

        return inertia('User/Show', ['user' => new UserResource($user->load('media'))]);
    }

    private function props()
    {

        $props = Cache::remember('sections_year', now()->addHours(24), function () {
            $sections = Section::select(['id', 'name'])->get();
            $year_levels = YearLevel::select(['id', 'name'])->get();

            return [
                'sections' => $sections,
                'year_levels' => $year_levels,
            ];
        });

        return $props;
    }
}
