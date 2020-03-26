<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use App\User;
use Auth;
class UserController extends Controller
{

  function __construct()
  {

  }

  public function get()
  {
    $user = [];
    foreach (User::all() as $u) {
      $item = [
        "id_user" => $u->id_user,
        "nama_user" => $u->nama_user,
        "email" => $u->email,
        "role" => $u->role,
        "password" => Crypt::decrypt($u->password),
        "image" => $u->image, 
      ];
      array_push($user, $item);
    }
    return response([
      "user" => $user
    ]);
  }

  public function find(Request $request)
  {
    $find = $request->find;
    $users = User::where("nama_user","like","%$find%")->orWhere("email","like","%$find%")->get();
    $user = [];
    foreach ($user as $u) {
      $item = [
        "id_user" => $u->id_user,
        "nama_user" => $u->nama_user,
        "email" => $u->email,
        "role" => $u->role,
        "password" => Crypt::decrypt($u->password),
        "image" => $u->image
      ];
      array_push($user, $item);
    }
    return response([
      "user" => $user
    ]);
  }

  public function save(Request $request)
  {
    $action = $request->action;
    if ($action == "insert") {
      try {
        $user = new User();
        $user->nama_user = $request->nama_user;
        $user->email = $request->email;
        $user->password = Crypt::encrypt($request->password);
        $user->role = $request->role;

        if ($request->file('image')) {
          $file = $request->file('image');
          $name = $file->getClientOriginalName();
          $file->move(\base_path() ."/public/image/user", $name);
          $user->image = $name;
        }
        $user->save();

        return response(["message" => "Data user berhasil ditambahkan"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }else if($action == "update"){
      try {
        $user = User::where("id_user", $request->id_user)->first();
        $user->nama_user = $request->nama_user;
        $user->email = $request->email;
        $user->password = Crypt::encrypt($request->password);
        $user->role = $request->role;
        if ($request->file('image')) {
          $file = $request->file('image');
          $name = $file->getClientOriginalName();
          $file->move(\base_path() ."/public/image/user", $name);
          $user->image = $name;
        }
        $user->save();

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

  public function getById($id_user)
  {
    try {
      $user = User::where("id_user", $id_user)->get();
      return response(["user" => $user]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }

  public function register(Request $request)
  {
        $user = new User();
        $user->nama = $request->nama;
        $user->email = $request->email;
        $user->password = Crypt::encrypt($request->password);
        $user->role = "user";
        $user->save();
        return "berhasil";
  }

  public function auth(Request $request)
  {
    $email = $request->email;
    $password = $request->password;

    $user = User::where("email", $email);
    if ($user->count() > 0) {
      // login sukses
      $u = $user->first();
      if(Crypt::decrypt($u->password) == $password){
        return response(["status" => true, "role" => $u->role, "user" => $u, "token" => Crypt::encrypt($u->token)]);
      }else{
        return response(["status" => false]);
      }
    }else{
      return response(["status" => false]);
    }
  }

  public function save_profil(Request $request)
  {
    $action =$request->action;
    if ($action == "update") {
      try {
        $user = User::where("id_user", $request->id_user)->first();
        $user->nama_user = $request->nama_user;
        $user->nama_lengkap = $request->nama_lengkap;
        $user->no_ktp = $request->no_ktp;
        $user->jenis_kelamin = $request->jenis_kelamin;
        $user->tanggal_lahir = $request->tanggal_lahir;
        $user->nohp = $request->nohp;
        $user->save();

        return response(["message" => "Data user berhasil ditamnbahkan"]);
        
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }
  }
}
 ?>