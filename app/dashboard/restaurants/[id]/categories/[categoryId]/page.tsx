import React from 'react'
import EditCategoryPage from './EditCategoryPage';

export default async function CategoryPage({ params }: { params: { id: string; categoryId: string }}) {
  const { id, categoryId } = await params

  return (
    <>
      <EditCategoryPage params={{ id, categoryId }} />
    </>
  )
}
