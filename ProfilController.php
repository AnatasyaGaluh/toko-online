<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use App\Profil;
use Auth;
class ProfilController extends Controller
{

  function __construct()
  {

  }
  public function get()
  {
    $profil = [];
    foreach (Profil::all() as $p) {
      $item = [
        "id_profil" => $p->id_profil,
        "id_user" => $p->id_user,
        "nama_lengkap" => $p->nama_lengkap,
        "no_ktp" => $p->no_ktp,
        "jenis_kelamin" => $p->jenis_kelamin,
        "tanggal_lahir" => $p->tanggal_lahir,
        "nohp" => $p->nohp,
        "image" => $p->image,
      ];
      array_push($profil, $item);
    }
    return response([
      "profil" => $profil
    ]);
  }


  public function save(Request $request)
  {
    $action = $request->action;
    if ($action == "insert") {
      try {
        $profil = new Profil();
        $profil->id_profil = $request->id_profil;
        $profil->id_user = $request->id_user;
        $profil->nama_lengkap = $request->nama_lengkap;
        $profil->no_ktp = $request->no_ktp;
        $profil->jenis_kelamin = $request->jenis_kelamin;
        $profil->tanggal_lahir = $request->tanggal_lahir;
        $profil->nohp = $request->nohp;

        if($request->file('image')){
          $file = $request->file('image');
          $name = $file->getClientOriginalName();
          $file->move(\base_path() ."/public/images", $name);
          $profil->image = $name;
        }
        $profil->save();

        return response(["message" => "Data user berhasil ditambahkan"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }else if($action == "update"){
      try {
        $profil = Profil::where("id_profil", $request->id_profil)->first();
        $profil->id_user = $request->id_user;
        $profil->nama_lengkap = $request->nama_lengkap;
        $profil->no_ktp = $request->no_ktp;
        $profil->jenis_kelamin = $request->jenis_kelamin;
        $profil->tanggal_lahir = $request->tanggal_lahir;
        $profil->nohp = $request->nohp;
        if($request->file('image')){
          $file = $request->file('image');
          $name = $file->getClientOriginalName();
          $file->move(\base_path() ."/public/images", $name);
          $profil->image = $name;
        }
        $profil->save();

        return response(["message" => "Data user berhasil diubah"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }
  }

  public function drop($id_user)
  {
    try {
      User::where("id_user", $id_user)->delete();
      return response(["message" => "Data user berhasil dihapus"]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }

  }

 ?>