import React from 'react'
import { useQuery } from 'react-apollo'

import GET_DOCUMENT from './graphQL/getDocuments.gql'

const saludo = ({ document }: any) => {

  const { loading, data, error } = useQuery(GET_DOCUMENT, { variables: {
    "acronym": "CL",
    "fields": ["document", "documentType", "firstName", "email"],
    "where": "document=" + document
  }})

  if (loading) {
    return <h1>Cargando...</h1>
  }

  if (error) {
    console.error(error)
    return <h1>Error</h1>
  }

  console.log(data)

  return data.documents[0].fields.map(({key, value}: any) => {
    if (key === "firstName") {
      return <h1>Hola {value}</h1>
    }

    return null
  })
}

export default saludo
