<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;

class Detail_orders extends Model
{

    protected $table = "detail_orders";
    protected $fillable = ["id_user", "id_product", "qty"];

    public function order()
    {
        return $this->belongsTo("App\Orders", "id", "id_order");
    }

    public function product()
    {
        return $this->belongsTo("App\Product", "id", "id_products");
    }

}
