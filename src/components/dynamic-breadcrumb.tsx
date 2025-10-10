import { Link } from '@tanstack/react-router'
import { useMemo } from 'react'
import { ChevronRight } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { type DashboardDispatch, type DashboardRootState } from '@/stores/dashboard-store'
import { type BreadcrumbItem, buildFilterUrl } from '@/lib/breadcrumb-utils'
import { filterPageAsync } from '@/stores/dashboard-slice'
import type { FormData } from '@/features/dashboard/components/dashboard-filter'

type DynamicBreadcrumbProps = {
  lastItem?: BreadcrumbItem
}

export function DynamicBreadcrumb({ lastItem }: DynamicBreadcrumbProps) {
  const dispatch = useDispatch<DashboardDispatch>()

  const state = useSelector((state: DashboardRootState) => state.dashboard)
  const { values } = state

  const breadcrumbItems = useMemo(() => {
    const items: BreadcrumbItem[] = [
      {
        label: 'Cars for Sale', href: buildFilterUrl({
          search: state.search,
          sort: state.sort,
        })
      },
    ]

    if (values.selectedMakes) {
      items.push({
        label: values.selectedMakes,
        href: buildFilterUrl({
          search: state.search,
          sort: state.sort,
          minPrice: values.minPrice,
          maxPrice: values.maxPrice,
          selectedMakes: values.selectedMakes,
          selectedBodyTypes: values.selectedBodyTypes,
          selectedTransmission: values.selectedTransmission,
        }),
      })
    }

    if (values.selectedModels) {
      items.push({
        label: values.selectedModels,
        href: buildFilterUrl({
          search: state.search,
          sort: state.sort,
          minPrice: values.minPrice,
          maxPrice: values.maxPrice,
          selectedMakes: values.selectedMakes,
          selectedModels: values.selectedModels,
          selectedBodyTypes: values.selectedBodyTypes,
          selectedTransmission: values.selectedTransmission,
        }),
      })
    }

    if (values.selectedTrims) {
      items.push({
        label: values.selectedTrims,
        href: buildFilterUrl({
          search: state.search,
          sort: state.sort,
          minPrice: values.minPrice,
          maxPrice: values.maxPrice,
          selectedMakes: values.selectedMakes,
          selectedModels: values.selectedModels,
          selectedTrims: values.selectedTrims,
          selectedBodyTypes: values.selectedBodyTypes,
          selectedTransmission: values.selectedTransmission,
        }),
      })
    }

    if (lastItem) {
      items.push({ ...lastItem, isActive: true })
    } else if (items.length > 1) {
      items[items.length - 1].isActive = true
    }

    return items
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  const parseHrefToFormData = (href: string): Partial<FormData> => {
    try {
      const url = new URL(href, window.location.origin)
      const params = url.searchParams
      const fd: Partial<FormData> = {}
      const minPrice = params.get('minPrice')
      const maxPrice = params.get('maxPrice')
      const selectedMakes = params.get('selectedMakes')
      const selectedModels = params.get('selectedModels')
      const selectedTrims = params.get('selectedTrims')
      const selectedBodyTypes = params.getAll('selectedBodyTypes')
      const selectedTransmission = params.get('selectedTransmission')

      fd.minPrice = minPrice ?? ''
      fd.maxPrice = maxPrice ?? ''
      fd.selectedMakes = selectedMakes ?? ''
      fd.selectedModels = selectedModels ?? ''
      fd.selectedTrims = selectedTrims ?? ''
      fd.selectedBodyTypes = selectedBodyTypes ?? []
      fd.selectedTransmission = selectedTransmission ? selectedTransmission as FormData['selectedTransmission'] : "All"
      return fd
    } catch {
      return {}
    }
  }

  return (
    <nav className="flex items-center space-x-2 text-sm">
      {/* Dynamic breadcrumb items */}
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex items-center">
          {item.href ? (
            <Link
              to={item.href}
              onClick={async () => await dispatch(filterPageAsync(parseHrefToFormData(item.href!)))}
              className={`relative ${item.isActive ? "text-foreground font-medium" : "text-muted-foreground "}
                hover:text-foreground transition-colors 
                after:transition-all after:duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 
                hover:after:w-full after:bg-foreground`}
            >
              {item.label}
            </Link>
          ) : (
            <span className={item.isActive ? "text-foreground font-medium" : "text-muted-foreground"}>
              {item.label}
            </span>
          )}

          {index < breadcrumbItems.length - 1 && (
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-2" />
          )}
        </div>
      ))}
    </nav>
  )
}
