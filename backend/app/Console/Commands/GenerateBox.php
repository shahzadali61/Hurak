<?php

namespace App\Console\Commands;

use App\Models\Box;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class GenerateBox extends Command
{

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate-box';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate a new box until limit is reached';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $total = Box::count();

        if ($total >= 16) {
            $this->info('Limit reached. Sending email...');
            $this->sendDoneEmail();
            return self::SUCCESS;
        }

        Box::create([
            'height' => 40,
            'width'  => 40,
            'count'  => $total + 1,
            'colour' => $this->randomColour(),
        ]);

        $this->info('Box created! Current total: ' . ($total + 1));

        // Add 30 second timer before next execution
        $this->info('Waiting 30 seconds before next box generation...');
        sleep(30); // 30 seconds

        return self::SUCCESS;
    }
    private function randomColour(): string
    {
        return sprintf('#%06X', mt_rand(0, 0xFFFFFF));
    }
    private function sendDoneEmail(): void
    {
        Mail::raw(
            '1st Task Done — Shahzad Dawood',
            fn($msg) => $msg->to('Dawood.ahmed@collaborak.com')
                            ->subject('1st Task Done — Shahzad Dawood')
        );
    }
}
