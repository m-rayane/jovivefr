import { FormField } from '../atoms/form/formField'
import { TextField } from '../atoms/form/textField'
import { Button } from '../atoms/form/button'

export default function ProductForm({
  className,
  onSubmit,
  product,
  handleImage,
}) {
  return (
    <>
      <form action="" onSubmit={onSubmit}>
        <FormField name={product.name} className={className} children="Nom" />
        <TextField
          name={product.description}
          className={className}
          children="Description"
        />
        <FormField
          name={product.brand}
          className={className}
          children="Marque"
        />
        <FormField
          name={product.model}
          className={className}
          children="Modèle"
        />
        <FormField
          name={product.price}
          className={className}
          children="Prix unitaire"
        />
        <FormField
          name={product.weight}
          className={className}
          children="Poids unitaire"
        />
        <FormField
          name={product.category}
          className={className}
          children="catégorie"
        />
        <FormField
          name={product.image}
          className={className}
          type="file"
          children="Photo principale"
          onChange={handleImage}
        />
        <Button children="Ajouter" />
      </form>
    </>
  )
}
