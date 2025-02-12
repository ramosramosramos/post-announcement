<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {

    Route::get('/', [PostController::class, 'index'])->name('home');
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::middleware(['admin'])->group(function () {
        Route::get('/posts/archive/data', [PostController::class, 'archive'])->name('posts.archive');
        Route::get('/posts/bin/data', [PostController::class, 'bin'])->name('posts.bin');
        Route::resource('posts', PostController::class)->except(['index', 'update', 'destroy']);
        Route::post('/posts/{post}/update', [PostController::class, 'update'])->name('posts.update');
        Route::post('/posts/{post}/moveArchive', [PostController::class, 'moveArchive'])->name('posts.moveArchive');
        Route::post('/posts/{post}/restoreArchive', [PostController::class, 'restoreArchive'])->name('posts.restoreArchive');
        Route::post('/posts/{post}/destroy', [PostController::class, 'destroy'])->name('posts.destroy');
        Route::post('/posts/{id}/restore', [PostController::class, 'restore'])->name('posts.restore');
        Route::post('/posts/{id}/forceDelete', [PostController::class, 'forceDelete'])->name('posts.forceDelete');
    });

    Route::post('/posts/{post}/react', [PostController::class, 'react'])->name('posts.react');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile/update', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/destroy', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile/avatar', [ProfileController::class, 'avatar'])->name('profile.avatar');
});

require __DIR__.'/auth.php';
