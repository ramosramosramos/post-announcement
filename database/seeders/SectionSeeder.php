<?php

namespace Database\Seeders;

use App\Models\Section;
use Illuminate\Database\Seeder;

class SectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Section::create([
            'name' => 'A',
        ]);
        Section::create([
            'name' => 'B',
        ]);
        Section::create([
            'name' => 'C',
        ]);
        Section::create([
            'name' => 'D',
        ]);
    }
}
