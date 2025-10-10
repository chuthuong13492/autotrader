import { type Control, useWatch, useFormContext } from "react-hook-form"
import { brandFilterData } from "../../data/filter-data"
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import type { FormData } from "../dashboard-filter"
import { cn } from "@/lib/utils"
import { useMemo } from "react"
import { SelectDropdown } from "@/components/select-dropdown"

interface BrandFilterProps {
  control: Control<FormData>
  className?: string
}

export function BrandFilter({ control, className }: BrandFilterProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <MakeSelect control={control} />
      <ModelSelect control={control} />
      <TrimSelect control={control} />
    </div>
  )
}

function MakeSelect({ control }: { control: Control<FormData> }) {
  const { reset, getValues } = useFormContext<FormData>()

  const values = useWatch<FormData>({
    control: control,
  })

  const { selectedMakes, selectedModels, selectedTrims } = values;

  return (
    <FormField
      control={control}
      name="selectedMakes"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel className="text-xs text-muted-foreground">Make</FormLabel>
            {(selectedMakes && selectedMakes.length > 0 || selectedModels && selectedModels.length > 0 || selectedTrims && selectedTrims.length > 0) && <ClearButton
              text="Clear All"
              onClick={() => {
                reset({
                  ...getValues(),
                  selectedMakes: '',
                  selectedModels: '',
                  selectedTrims: '',
                })
              }}
            />
            }
          </div>
          <FormControl>
            <SelectDropdown
              defaultValue={field.value ?? ''}
              onValueChange={(value) => {
                field.onChange(value)
                reset({
                  ...getValues(),
                  selectedModels: '',
                  selectedTrims: '',
                })
              }}
              placeholder='Select make'
              items={brandFilterData.makes.map((make) => ({ label: make, value: make }))}
            />
          </FormControl>
        </FormItem>
      )}
    />
  )
}

function ModelSelect({ control }: { control: Control<FormData> }) {
  const { reset, getValues } = useFormContext<FormData>()

  const values = useWatch({ control })

  const { selectedMakes, selectedModels } = values;

  return (
    selectedMakes && selectedMakes?.length > 0 && <FormField
      control={control}
      name="selectedModels"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel className="text-xs text-muted-foreground">Model</FormLabel>
            {selectedModels && selectedModels.length > 0 && (
              <ClearButton
                onClick={() => {
                  reset({
                    ...getValues(),
                    selectedModels: '',
                    selectedTrims: '',
                  })
                }}
              />
            )}
          </div>
          <FormControl>
            <SelectDropdown
              defaultValue={field.value ?? ''}
              onValueChange={(value) => {
                field.onChange(value)
                reset({
                  ...getValues(),
                  selectedTrims: '',
                })
              }}
              placeholder='Select model'
              items={(selectedMakes
                ? brandFilterData.models[selectedMakes as keyof typeof brandFilterData.models] ?? []
                : []
              ).map((model) => ({ label: model, value: model }))}
            />
          </FormControl>
        </FormItem>
      )}
    />
  )
}

function TrimSelect({ control }: { control: Control<FormData> }) {
  const { reset, getValues } = useFormContext<FormData>()

  const values = useWatch({ control })

  const { selectedMakes, selectedModels, selectedTrims } = values;

  const isShow = useMemo(() => {
    return (selectedMakes && selectedMakes.length > 0) && (selectedModels && selectedModels.length > 0)
  }, [selectedMakes, selectedModels])

  return (
    isShow && <FormField
      control={control}
      name="selectedTrims"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel className="text-xs text-muted-foreground">Trim</FormLabel>
            {selectedTrims && selectedTrims.length > 0 && <ClearButton onClick={() => {
              reset({
                ...getValues(),
                selectedTrims: '',
              })
            }} />}
          </div>
          <FormControl>
            <SelectDropdown
              defaultValue={field.value ?? ''}
              onValueChange={(value) => {
                field.onChange(value)
              }}
              placeholder='Select trim'
              items={(selectedModels
                ? brandFilterData.trims[selectedModels as keyof typeof brandFilterData.trims] ?? []
                : []
              ).map((trim) => ({ label: trim, value: trim }))}
            />
          </FormControl>
        </FormItem>
      )}
    />
  )
}

function ClearButton({ onClick, text = "Clear" }: { onClick: () => void; text?: string }) {
  return (
    <span
      role="button"
      tabIndex={0}
      className="text-xs text-black hover:underline cursor-pointer"
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
    >
      {text}
    </span>
  )
}