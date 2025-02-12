<?php

namespace Database\Seeders;

use App\Models\YearLevel;
use Illuminate\Database\Seeder;

class YearLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        YearLevel::create([
            'name'=>'Grade 10'
        ]);
        YearLevel::create([
            'name'=>'Grade 11'
        ]);
        YearLevel::create([
            'name'=>'Grade 12'
        ]);
    }
}
