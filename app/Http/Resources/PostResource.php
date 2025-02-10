<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
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

        foreach ($this->reactions as $reaction) {
            if (isset($reactionCounts[$reaction->type])) {
                $reactionCounts[$reaction->type]++;
            }
        }

        return [
            'id' => $this->id,
            'content' => $this->content,
            'name' => $this->user->name,
            'reactions' => $reactionCounts,
            'created_at' => Carbon::parse($this->created_at)->diffForHumans(),
            'media_image' => $this->media->value('id') ? Storage::url($this->media->value('id').'/'.$this->media->value('file_name')) : null,
        ];
    }
}
