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
                    <p>{`${node.nombre}`}</p>                    
                    <p>{`${node.categoria.nombre}`}</p>                    
                </div>
            ));
        }}
        
    </Query>

);

export default Cursos;