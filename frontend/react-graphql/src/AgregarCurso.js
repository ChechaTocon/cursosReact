import React, { useEffect, useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';



const Agregar = () => {
  let input;
    //const [addTodo, { data }] = Mutation(ADD_TODO);
  const [nombre, setNombre]= useState("")
  const [descripcion, setDescripcion]= useState("")
  const [categoria, setCategoria]= useState("")

  useEffect(() => {
    console.log(nombre, descripcion, categoria)
  },[nombre, descripcion, categoria]);


  return (  
    <div>          
        <input
          value={nombre}
          onChange={t=>setNombre(t.target.value)}                  
          placeholder="Ingrese el nombre del curso"
        />
        <input
          value={descripcion}
          onChange={t=>setDescripcion(t.target.value)}                  
          placeholder="Ingrese la descripción del curso"
        />
        <input
          value={categoria}
          onChange={t=>setCategoria(t.target.value)}                  
          placeholder="Ingrese la categoría del curso"
        />
        <Mutation mutation={
        gql`mutation
          crearCurso($nombre: String! , $descripcion: String!, $categoria: Int!){
            crearCurso(nombre: $nombre, descripcion: $descripcion, categoria: $categoria){
              curso{
              id
              nombre
              descripcion
              categoria{
                id        
              }     }      
            }}
          `
        } variables={{ nombre, descripcion, categoria}}
        onCompleted={() => {window.location.reload();}}
        >
        
  {postMutation => (
    <h1>Agregar un nuevo curso <button type="button" className="btn btn-primary"  onClick={postMutation}>+</button></h1>
  )
  }

</Mutation>
        
    </div>
  );
};


export default Agregar;