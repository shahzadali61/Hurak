<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Middleware\HandleCors;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Apply CORS to all API routes FIRST
        $middleware->api(prepend: [ HandleCors::class,]);
        

        // Then add other middleware
        $middleware->group('api', [
            // HandleCors::class, // Already added above
            // 'throttle:api',
            // SubstituteBindings::class,
        ]);

        // Global middleware that should run on every request
        $middleware->append([HandleCors::class,]);

        $middleware->alias([

        ]);
    })

    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
