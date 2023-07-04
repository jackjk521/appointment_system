<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Items_model extends Model
{
    public $timestamps = false;
    protected $table = 'items'; // Specify the table name

    public static function generateUniqueProdNo()
    {
        $count = self::count();
        $prefix = 'P-';
        $paddingLength = 10; // Number of zeros to pad

        return $prefix . str_pad($count + 1, $paddingLength, '0', STR_PAD_LEFT);
    }
     /**
     * The attributes that are mass assignable.
     *
     * @var array<string, string, integer, float, integer, string>
     */
    protected $fillable = [
        'product_number',
        'item_name',
        'unit',
        'unit_price',
        'total_quantity',
        'date_created',
    ];
}
