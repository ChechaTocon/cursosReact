import React, { useEffect, useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const Agregar = () => {
  let input;
  //const [addTodo, { data }] = Mutation(ADD_TODO);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    console.log(nombre, descripcion, categoria);
  }, [nombre, descripcion, categoria]);

  return (
    <div className="jumbotron">
         <h1>
            Agregar un nuevo curso{" "}</h1>
      <div className="row">
        <div className="col col-lg-3">
          <label for="nombre">Nombre del curso</label>
          <input
            value={nombre}
            onChange={(t) => setNombre(t.target.value)}
            id="nombre"
            class="form-control"
            placeholder="Ingrese el nombre del curso"
          />
        </div>
      </div>
      <div className="row">
        <div className="col col-lg-3">
          <label for="descripcion">Descripción del curso</label>
          <input
            class="form-control"
            value={descripcion}
            id="descripcion"
            onChange={(t) => setDescripcion(t.target.value)}
            placeholder="Ingrese la descripción del curso"
          />
        </div>
      </div>
      <div className="row">
      <div className="col col-lg-3">
        <label for="categoria">Categoria del curso</label>
        <input
          id="categoria"
          class="form-control"
          value={categoria}
          onChange={(t) => setCategoria(t.target.value)}
          placeholder="Ingrese la categoría del curso"
        />
      </div>
      </div>
      <Mutation
        mutation={gql`
          mutation crearCurso(
            $nombre: String!
            $descripcion: String!
            $categoria: Int!
          ) {
            crearCurso(
              nombre: $nombre
              descripcion: $descripcion
              categoria: $categoria
            ) {
              curso {
                id
                nombre
                descripcion
                categoria {
                  id
                }
              }
            }
          }
        `}
        variables={{ nombre, descripcion, categoria }}
        onCompleted={() => {
          window.location.reload();
        }}
      >
        {(postMutation) => (
          <div>     
            <br></br>  
            <button
              type="button"
              className="btn btn-primary"
              onClick={postMutation}
            >Agregar 
              +
            </button>          
            </div>
        )}
      </Mutation>
    </div>
  );
};

export default Agregar;
