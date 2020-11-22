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
                <div className="card" style={{'width':'100%', 'marginTop':'10px'}} key={node.id}>
                    <div className="card-body">
                        <h1 className="card-title">{`${node.nombre}`}</h1>                    
                        <h5 className="card-subtitle mb-2 text-muted"> {`${node.categoria.nombre}`}</h5>       
                        <p className="card-text">{`${node.descripcion}`}</p>                    
                    </div>
                </div>
            ));
        }}
        
    </Query>

);

export default Cursos;