import { Category } from "@/core/domain/entities/Category";

interface Props {
  categories: Category[];
  defaultValue?: number;
  className?: string;
}

export default function CategorySelect({ categories, defaultValue, className }: Props) {
  return (
    <div>
      <label className="text-sm font-bold text-slate-700">Category</label>
      <select 
        name="category_id" 
        defaultValue={defaultValue} 
        className={className} 
        required
      >
        <option value="" disabled>-- Pilih Kategori --</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}