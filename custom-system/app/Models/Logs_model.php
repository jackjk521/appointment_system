<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Logs_model extends Model
{
    public $timestamps = false;
    protected $table = 'logs'; // Specify the table name

     /**
     * The attributes that are mass assignable.
     *
     * @var array<integer, string,string>
     */
    protected $fillable = [
        'user_id',
        'date',
        'message',
    ];
}
