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

        $users = User::with(['media'])
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'like', '%'.$search.'%');

            })
            ->select(['id', 'name', 'section', 'year_level'])->paginate(10);

        return inertia('User/Index', [
            'users' => UserResource::collection($users),
            'search' => $search,
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
