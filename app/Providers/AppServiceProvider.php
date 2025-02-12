<?php

namespace App\Providers;

use App\Models\post;
use App\Observers\PostObserver;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (!app()->runningInConsole() || app()->runningUnitTests()) {
            post::observe(PostObserver::class);
        }
        Vite::prefetch(concurrency: 3);
    }
}
