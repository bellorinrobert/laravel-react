<?php

namespace Tests;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\Artisan;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication, RefreshDatabase;
    protected $faker;

    /**
     * Sets up tests
     */
    public function setUp(): void{
        parent::setUp();

        // $this->faker = Faker::create();

        Artisan::call('migrate');
    }

    public function tearDown(): void {
        Artisan::call('migrate:rollback');

        parent::tearDown();
    }
}
