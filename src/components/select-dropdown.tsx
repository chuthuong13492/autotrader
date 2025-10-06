import { Loader } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FormControl } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { type ReactNode } from 'react'

type SelectDropdownProps = {
  onValueChange?: (value: string) => void
  defaultValue: string | undefined
  placeholder?: string
  prefix?: ReactNode
  isPending?: boolean
  items: { label: string; value: string }[] | undefined
  disabled?: boolean
  className?: string
  isControlled?: boolean
}

export function SelectDropdown({
  defaultValue,
  onValueChange,
  isPending,
  items,
  placeholder,
  prefix,
  disabled,
  className = '',
}: SelectDropdownProps) {
  return (
    <Select value={defaultValue ?? ''}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <FormControl>
        <SelectTrigger disabled={disabled} className={cn(className)}>
          <div className="flex items-center gap-2">
            {prefix && <div className="text-muted-foreground">{prefix}</div>}
            <SelectValue placeholder={placeholder ?? 'Select'} />
          </div>
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {isPending ? (
          <SelectItem disabled value='loading' className='h-14'>
            <div className='flex items-center justify-center gap-2'>
              <Loader className='h-5 w-5 animate-spin' />
              {'  '}
              Loading...
            </div>
          </SelectItem>
        ) : (
          items?.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  )
}
