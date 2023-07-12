<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Purchase_line_model extends Model
{
    public $timestamps = false;
    protected $table = 'purchase_line'; // Specify the table name

     /**
     * The attributes that are mass assignable.
     *
     * @var array<integer, integer, float, float>
     */
    protected $fillable = [     
        'purchase_header_id',
        'item_id',
        'item_price',
        'purchased_quantity',
        'purchase_sub_total',
    ];
}
