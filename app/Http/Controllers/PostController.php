<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\Reaction;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::query()->where('is_archive_at', null)
            ->with(['user:id,name', 'reactions', 'media'])
            ->select(['id', 'content', 'user_id', 'created_at'])
            ->latest()
            ->paginate(10);

        return inertia('Post/Index', [
            'posts' => PostResource::collection($posts),
        ]);
    }

    public function archive()
    {
        $posts = Post::query()->whereNotNull('is_archive_at')
            ->with(['user:id,name', 'reactions', 'media'])
            ->select(['id', 'content', 'user_id', 'created_at'])
            ->latest()
            ->paginate(10);

        return inertia('Post/Archive', [
            'posts' => PostResource::collection($posts),
        ]);
    }

    public function bin()
    {
        $posts = Post::query()->onlyTrashed()
            ->with(['user:id,name', 'reactions', 'media'])
            ->select(['id', 'content', 'user_id', 'created_at'])
            ->latest()
            ->paginate(10);


        return inertia('Post/Bin', [
            'posts' => PostResource::collection($posts),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return inertia('Post/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $post = Post::create($request->validated());
        if ($request->hasFile('image')) {
            $post->addMedia($request->image)->toMediaCollection('images');
        }
    }


    public function edit(Post $post)
    {
        return inertia('Post/Edit', ['getPost' => new PostResource($post)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        $post->update($request->validated());
        if ($request->hasFile('image')) {
            if ($request->old_image) {
                $post->media()->delete();
            }
            $post->addMedia($request->image)->toMediaCollection('images');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();
    }

    public function moveArchive(Post $post)
    {

        $post->update([
            'is_archive_at' => now(),
        ]);
    }

    public function restoreArchive(Post $post)
    {
        $post->update([
            'is_archive_at' => null,
        ]);
    }

    public function restore($id)
    {
        $post = Post::onlyTrashed()->findOrFail($id);
        $post->restore();
    }

    public function forceDelete($id)
    {
        $post = Post::onlyTrashed()->findOrFail($id);
        $post->forceDelete();
    }



    public function react(Request $request, Post $post)
    {

        $reaction = Reaction::where('user_id', $request->user_id)
            ->where('post_id', $post->id)
            ->first();

        if ($reaction) {
            // If the reaction is the same, remove it (unreact)
            if ($reaction->type === $request->type) {
                $reaction->delete();
                return back();
            }


            $reaction->update(['type' => $request->type]);
            return back();
        }


        Reaction::create([
            'user_id' => $request->user_id,
            'post_id' => $post->id,
            'type' => $request->type,
        ]);
        return back();
    }
}
