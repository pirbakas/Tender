<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Dish extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dishes', function (Blueprint $table) {
            $table->id()->unique();
            $table->timestamps();
            $table->string('user_id');
            $table->string('type');
            $table->string('title');
            $table->text('description');
            $table->integer('portion');
            $table->text('location');
            $table->time('withdrawal_time');
            $table->string('url_image');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dishes');
    }
}
