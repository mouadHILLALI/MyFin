<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('fundingrequests', function (Blueprint $table) {
            $table->id();
            $table->string('letter_of_justification');
            $table->integer('fundraising_goal');
            $table->foreignId('fundraiser_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fundingrequests');
    }
};
