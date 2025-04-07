import Link from 'next/link'
interface Recipe {
    id: string;
}
export default function EditRecipe({id}: Recipe) {
    return (
        <Link href={`/recipes/edit/${id}`}>
            <button className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
        </Link>
    )
}
