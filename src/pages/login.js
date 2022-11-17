import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

function App() {
  const [Name, setName] = useState("");
  const [NameHasError, setNameHasError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    console.log(errors);
    let result = await fetch("http://10.60.63.89:3000/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const content = await result.json();
    console.log(content);
    if(content.status==="success")
    {
     alert("Se registra su entrada/salida");
     //var date = new Date().toLocaleString("es-MX", {timeZone: "America/Merida"})
    var current_datetime_1 =  new Date().toLocaleString("en-US", {timeZone: "America/Merida"});
    var current_datetime = new Date(current_datetime_1);
    var formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() 
    console.log(formatted_date)
     
     
     
     
     
     var json = JSON.stringify(formatted_date);
     //console.log({'entrada':date})

     (async () => {
      const rawResponse = await fetch('http://10.60.63.89:3000/checkIn', 
      {
        method: 'POST',
        headers:
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        //body: JSON.stringify({a: 1, b: 'Textual content'})
        //body: JSON.stringify(data)
        body: JSON.stringify({email: data.email, time:formatted_date})
      });
      //console.log({'email':data.email});

      const content = await rawResponse.json();
    
      console.log(content);
    })();


    
     
    }
    else if(content.status==="fail")
    {
     alert("Contraseña incorrecta");
    }
 else
 {
      alert('"Usuario no registrado"');
 }

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
                <label htmlFor="">email</label>
                <input
                  type="email"
                  name="email"
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
                <label htmlFor="">pass</label>
                <input
                  type="password"
                  name="pass"
                  className="form-control"
                  placeholder="Contraseña"
                  {...register("pass")}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Inicio
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
