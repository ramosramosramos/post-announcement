<?php

namespace Database\Seeders;

// use App\Models\Post;
// use App\Models\Reaction;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::create([
            'name' => 'Ghenisis Nolasco Capistrano',
            'email' => 'admin@gmail.com',
            'email_verified_at' => now(),
            'role' => 'admin',
            'year_level' => 'Grade 12',
            'section' => 'A',
            'password' => Hash::make('password'),
            'remember_token' => str()->random(10),
        ]);
        User::create([
            'name' => 'Ghenisis Nolasco Capistrano Admin 2',
            'email' => 'admin2@gmail.com',
            'email_verified_at' => now(),
            'role' => 'admin',
            'year_level' => 'Grade 12',
            'section' => 'B',
            'password' => Hash::make('password'),
            'remember_token' => str()->random(10),
        ]);

        $this->call([
            SectionSeeder::class,
            YearLevelSeeder::class,
        ]);
        // User::factory(10)->create();
        // Post::factory(100)->create();
        // Reaction::factory(100)->create();
    }
}
