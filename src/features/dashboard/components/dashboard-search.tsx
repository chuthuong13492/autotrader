import { Separator } from "@/components/ui/separator";
import { useSearch } from "@/context/search-provider";
import { FilterIcon, SearchIcon } from "lucide-react";
import { useMemo } from "react";
import { type FieldErrors } from "react-hook-form";

interface DashboardSearchProps {
  onResetFilters?: () => void
  formState?: { isDirty: boolean; errors: FieldErrors<FormData> } | null
}

export function DashboardSearch({ onResetFilters, formState }: DashboardSearchProps) {
  const { setOpen } = useSearch();

  const isClear = useMemo(() => {
    return formState?.isDirty
  }, [formState]);

  return (
    <div className="pl-2 w-full">
      <div className="flex lg:hidden space-x-4 w-full h-full items-center transition-all duration-200">
        <SearchIcon
          aria-hidden="true"
          className="text-muted-foreground cursor-pointer"
          color="#ff821c"
          size={18}
          onClick={() => setOpen(true)}
        />

        <Separator
          className="bg-border h-8"
          orientation="vertical"
        />

        <button
          className="flex items-center gap-1"
        >
          <FilterIcon color="#ff821c" aria-hidden="true" size={18} />
          <br />
          <span className="text-lg text-muted-foreground hover:underline transition-all duration-200">Filter</span>
        </button>

        <Separator
          className="bg-border h-full mr-4"
          orientation="vertical"
        />
      </div>

      {isClear && (
        <button
          className="text-lg text-blue-400 hover:underline transition-all duration-200"
          onClick={() => onResetFilters?.()}
        >
          Clear Filters
        </button>
      )}
    </div>
  )
}