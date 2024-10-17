import { Input } from "../ui/input";

export function SearchForm() {
  return (
    <Input
      type="search"
      placeholder="Pesquisar posts..."
      className="max-w-md mx-auto"
    />
  )
}