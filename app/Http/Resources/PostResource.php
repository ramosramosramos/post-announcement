<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $this->withoutWrapping();
        $reactionCounts = [
            'like' => 0,
            'dislike' => 0,
            'heart' => 0,
            'angry' => 0,
            'sad' => 0,
            'wow' => 0,
        ];

        // Count reactions
        foreach ($this->reactions as $reaction) {
            if (isset($reactionCounts[$reaction->type])) {
                $reactionCounts[$reaction->type]++;
            }
        }

        // Get the authenticated user's reaction
        $userReaction = $this->reactions
            ->where('user_id', Auth::user()->id)
            ->first();

        return [
            'id' => $this->id,
            'content' => $this->content,
            'name' => $this->user->name,
            'reactions' => $reactionCounts,
            'user_reaction' => $userReaction ? $userReaction->type : null, // Include the user's reaction type
            'created_at' => Carbon::parse($this->created_at)->diffForHumans(),
            'media_image' => $this->media->value('id') ? Storage::url($this->media->value('id').'/'.$this->media->value('file_name')) : null,
        ];
    }
}
