import React from 'react'
import { useQuery, useMutation } from 'react-apollo'
import { Button } from 'vtex.styleguide'

import GET_DOCUMENT from './graphQL/getDocuments.gql'
import UPDATE_DOCUMENT from './graphQL/updateDocument.gql'

const saludo = ({ document }: any) => {
  const [cambiarNombre, {data: responseData}] = useMutation(UPDATE_DOCUMENT)

  const { loading, data, error } = useQuery(GET_DOCUMENT, { variables: {
    "acronym": "CL",
    "fields": ["document", "documentType", "firstName", "lastName", "email"],
    "where": "document=" + document
  }})

  if (loading) {
    return <h1>Cargando...</h1>
  }

  if (error) {
    console.error(error)
    return <h1>Error</h1>
  }

  console.log(data, responseData)

  return data.documents[0].fields.map(({key, value}: any) => {
    if (key === "firstName") {
      return <>
        <h1>Hola {value}</h1>
        <Button onClick={() => {
          cambiarNombre({ variables: {
            "acronym": "CL",
            "document": {
              "fields": [...data.documents[0].fields.filter(({ key }: any) => key !== "lastName"), { key: "lastName", value: "Obando"}]
            }
          }})
        }}>Presioname</Button>
      </>
    }

    return null
  })
}

export default saludo
