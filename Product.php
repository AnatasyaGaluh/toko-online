<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    protected $table = "products";
    protected $primaryKey = "id";
    protected $fillable = ["name","stock","price","description","image"];
}
