<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointments_model extends Model
{
    public $timestamps = false;
    protected $table = 'appointments'; // Specify the table name

     /**
     * The attributes that are mass assignable.
     *
     * @var array< integer, integer, string, string, string>
     */
    protected $fillable = [     
        'user_id',
        'customer_id',
        'from_datetime',
        'to_datetime',
        'purpose'
    ];
}
