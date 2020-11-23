import React, { useEffect, useState } from "react";
import { Mutation } from "react-apollo";
import { Query } from "react-apollo";
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
      <h1>Agregar un nuevo curso </h1>
      <div className="row">
        <div className="col col-lg-4">
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
        <div className="col col-lg-4">
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
        <Query
          query={gql`
            {
              allCategorias {
                edges {
                  node {
                    id
                    nombre
                  }
                }
              }
            }
          `}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Cargando...</p>;
            if (error) return <p>Error,{{ error }}</p>;
            console.log(data);

            return (                     
                <div className="col col-lg-5">                
                  <label>
                      Seleccione una categoria:
                      <select
                        className="custom-select custom-select-lg mb-3"
                        value={categoria}
                        onClick={(t) => setCategoria(t.target.value)}
                      >
                        <option value={0}>Seleccione una categoria</option>                                          
                  {data.allCategorias.edges.map(({ node }, index) => (                                        
                        <option value={`${index+1}`}>{`${node.nombre}`}</option>                                          
                  ))}
                  </select>
                  </label>
                </div>              
            );
          }}
        </Query>
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
            >
              Agregar +
            </button>
          </div>
        )}
      </Mutation>
    </div>
  );
};

export default Agregar;
