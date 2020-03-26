<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Alamat extends Model{
    protected $table = "alamat";
    protected $primary = "id_pengiriman";
    protected $fillable = ["id_user", "id_pengiriman", "nama_penerima", "email", "kode_pos", "jalan", "rt", "rw", "kecamatan", "kota"];

    public function user()
    {
        return $this->belongsTo("App\User", "id_user");
    }
}