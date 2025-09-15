<?php

namespace Database\Seeders;

use App\Models\Box;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class BoxSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Box::factory()->create([
            'height' => 40,
            'width' => 40,
            'count' => 16,
        ]);
    }
}
