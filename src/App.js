import { useForm } from "react-hook-form";
import "./App.css";

function App() {
                     
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    
    let result = await fetch("http://10.60.63.89:3000/addUser", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    console.log(await result.json());
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" text-black p-3 border rounded"
            >
              <div className="form-group mb-3">
                <label htmlFor="">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Nombre"
                  {...register("name", { required: true, maxLength: 20 })}
                />
                {errors.name && errors.nombre.type === "required" && (
                  <div className="alert alert-danger mt-3" role="alert">
                    El nombre es requerido
                  </div>
                )}
                {errors.name && errors.nombre.type === "maxLength" && (
                  <div className="alert alert-danger mt-3" role="alert">
                    El límite de caracteres es de 10
                  </div>
                )}

                <div className="form-group mb-3">
                  <label htmlFor="">Apellido Paterno</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Apellido Paterno"
                    {...register("FatherLastName", {
                      required: true,
                      maxLength: 20,
                    })}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="">Apellido Materno</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Apellido Materno"
                    {...register("MotherLastName")}
                  />
                </div>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  name="name"
                  className="form-control"
                  placeholder="Email"
                  {...register("email", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email no válido",
                    },
                  })}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="">Contraseña</label>
                <input
                  type="password"
                  name="name"
                  className="form-control"
                  placeholder="Contraseña"
                  {...register("pass")}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="">Verificar Contraseña</label>
                <input
                  type="password"
                  name="name"
                  className="form-control"
                  placeholder="Verificar Contraseña"
                  {...register("passVerify")}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Guardar Usuario
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
