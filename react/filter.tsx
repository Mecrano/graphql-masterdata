import React from 'react'
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'

const filter = () => {
  const { filters } = useSearchPage()

  console.log(filters)

  if (filters.length === 0 && filters[0].facets.length === 0) {
    return <p>No hay filtro</p>
  }

  return filters[0].facets.map(({ name, linkEncoded }:any) => {
    return <h5><a href={linkEncoded} ><img src={`/arquivos/filtros_image_${name}.png`} alt={name} /></a></h5>
  })
}

export default filter
