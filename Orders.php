<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{

    protected $table = "orders";
    protected $primaryKey = "id";
    protected $fillable = ["id_user", "id_pengiriman", "total", "bukti_bayar", "status"];

    public function user()
    {
        return $this->belongsTo("App\User", "id", "id_user");
    }

    public function alamat()
    {
        return $this->belongsTo("App\Alamat", "id", "id_pengiriman");
    }

    public function Detail_orders()
    {
        return $this->hasMany("App\Detail_orders", "id_orders");
    }
}
