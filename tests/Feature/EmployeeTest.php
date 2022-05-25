<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EmployeeTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_endpoint()
    {
        $response = $this->get('/api/employee');

        $response->dumpHeaders();

        $response->dumpSession();

        $response->dump();

        $response->assertStatus(200);
    }
    /** @test */
    public function canCreateEmployee()
    {

        $response = $this->postJson('/api/employee', [
            'first_name' => "Pablo",
            'last_name' => "Marmol",
            'phone' => "(XXX) XXX-XXXX",
            'email' => "pablo@marmol.com",
            'contract_date' => "2022-05-25"
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Employee created'
            ]);
    }
    
    public function canCreateEmployeeRepeact()
    {

        $response = $this->postJson('/api/employee', [
            'first_name' => "Pablo",
            'last_name' => "Marmol",
            'phone' => "(XXX) XXX-XXXX",
            // 'email' => "pablo@marmol.com",
            // 'contract_date' => "2022-05-25"
        ]);

        $response->assertStatus(500)
            ->assertJson([
                'message' => 'Employee created'
            ]);
    }
}
