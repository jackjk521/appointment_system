<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patients_model extends Model
{
    public $timestamps = false;
    protected $table = 'patients'; // Specify the table name

     /**
     * The attributes that are mass assignable.
     *
     * @var array<string, string, integer, float, integer, string>
     */
    protected $fillable = [     
        'first_name',
        'last_name',
        'age',
        'height',
        'weight'
    ];
}
