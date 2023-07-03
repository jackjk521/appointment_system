<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User_model extends Model
{
    public $timestamps = false;
    protected $table = 'users'; // Specify the table name

     /**
     * The attributes that are mass assignable.
     *
     * @var array<string, string, string,  string>
     */
    protected $fillable = [
        'username',
        'password',
        'role',
        'user_status',
    ];
}
