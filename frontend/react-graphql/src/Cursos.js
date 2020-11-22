import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const Cursos=()=>(
    //consulta al endpoint de graphene
    <Query query={gql`
    {
        allCursos {
            edges {
                node {
                    id,
                    nombre,
                    descripcion
                    categoria{
                        nombre
                    }
                }
            }
        }
    }
    `}>
        {({loading, error, data})=>{
            if(loading) return <p>Cargando...</p>
            if(error) return <p>Error,{{error}}</p>
            console.log(data)
            return data.allCursos.edges.map(({node})=>(
                <div key={node.id}>
                    <h1>{`${node.nombre}`}</h1>                    
                    <p>{`${node.descripcion}`}</p>       
                    <p>{`${node.categoria.nombre}`}</p>                    
                </div>
            ));
        }}
        
    </Query>

);

export default Cursos;