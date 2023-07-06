<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Purchase_header_model extends Model
{
    public $timestamps = false;
    protected $table = 'purchase_header'; // Specify the table name

    public static function generateUniquePurchaseNo()
    {
        $count = self::count();
        $prefix = 'PH-';
        $paddingLength = 10; // Number of zeros to pad

        return $prefix . str_pad($count + 1, $paddingLength, '0', STR_PAD_LEFT);
    }

     /**
     * The attributes that are mass assignable.
     *
     * @var array<string, integer, integer, float>
     */
    protected $fillable = [     
        'purchase_number',
        'user_id',
        'patient_id',
        'total_amount',
    ];
}
