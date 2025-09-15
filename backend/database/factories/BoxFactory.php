<?php

namespace Database\Factories;

use App\Models\Box;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Box>
 */
class BoxFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Box::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'height' => $this->faker->numberBetween(10, 100),
            'width' => $this->faker->numberBetween(10, 100),
            'count' => $this->faker->numberBetween(1, 50),
        ];
    }
}
