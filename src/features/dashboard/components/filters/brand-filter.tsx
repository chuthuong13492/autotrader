import { type Control, useWatch, useFormContext } from "react-hook-form"
import { brandFilterData } from "../../data/filter-data"
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { FormData } from "../dashboard-filter"
import { cn } from "@/lib/utils"
import {  useMemo } from "react" 

interface BrandFilterProps {
  control: Control<FormData>
  className?: string
}

export function BrandFilter({ control, className }: BrandFilterProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <FormLabel className="text-sm font-medium ">Brand</FormLabel>
      <div className="space-y-4 text-black">
        <MakeSelect control={control} />
        <ModelSelect control={control} />
        <TrimSelect control={control} />
      </div>
    </div>
  )
}

function MakeSelect({ control }: { control: Control<FormData> }) {
  const { reset, getValues } = useFormContext<FormData>()

  const values = useWatch<FormData>({
    control: control,
  })

  const {selectedMakes, selectedModels, selectedTrims} = values;

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
                field.onChange([])
                reset({
                  selectedMakes: [],
                  selectedModels: [],
                  selectedTrims: [],
                  minPrice: getValues('minPrice'),
                  maxPrice: getValues('maxPrice'),
                  selectedBodyTypes: getValues('selectedBodyTypes'),
                  selectedTransmission: getValues('selectedTransmission')
                }, { keepDirty: true })
              }}
            />
            }
          </div>
          <FormControl>
            <Select value={field.value[0] || ''} onValueChange={(value) => {
              field.onChange(value ? [value] : [])
              reset({
                selectedModels: [],
                selectedTrims: [],
                selectedMakes: value ? [value] : [],
                minPrice: getValues('minPrice'),
                maxPrice: getValues('maxPrice'),
                selectedBodyTypes: getValues('selectedBodyTypes'),
                selectedTransmission: getValues('selectedTransmission')
              }, { keepDirty: true })
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select make" />
              </SelectTrigger>
              <SelectContent>
                {brandFilterData.makes.map((make) => (
                  <SelectItem key={make} value={make}>{make}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                    selectedModels: [],
                    selectedTrims: [],
                    selectedMakes: getValues('selectedMakes'),
                    minPrice: getValues('minPrice'),
                    maxPrice: getValues('maxPrice'),
                    selectedBodyTypes: getValues('selectedBodyTypes'),
                    selectedTransmission: getValues('selectedTransmission')
                  }, { keepDirty: true })
                }}
              />
            )}
          </div>
          <FormControl>
            <Select
              value={selectedModels?.[0] || ''}
              onValueChange={(value) => {
                field.onChange(value ? [value] : [])
                reset({
                  selectedTrims: [],
                  selectedMakes: getValues('selectedMakes'),
                  selectedModels: value ? [value] : [],
                  minPrice: getValues('minPrice'),
                  maxPrice: getValues('maxPrice'),
                  selectedBodyTypes: getValues('selectedBodyTypes'),
                  selectedTransmission: getValues('selectedTransmission')
                }, { keepDirty: true })
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {brandFilterData.models[
                  selectedMakes[0] as keyof typeof brandFilterData.models
                ]?.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            {selectedTrims && selectedTrims.length > 0 && <ClearButton onClick={() => reset({ ...getValues(), selectedTrims: [] }, { keepDirty: true })} />}
          </div>
          <FormControl>
            <Select
              value={selectedTrims?.[0] || ''}
              onValueChange={(value) => {
                field.onChange(value ? [value] : [])
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select trim" />
              </SelectTrigger>
              <SelectContent>
                {selectedModels && brandFilterData.trims[
                  selectedModels[0] as keyof typeof brandFilterData.trims
                ]?.map((trim) => (
                  <SelectItem key={trim} value={trim}>
                    {trim}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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