

import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Link } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { Provider } from 'react-redux'
import { dashboardStore } from '@/stores/dashboard-store'

export function Dashboard() {
  return (
    <Provider store={dashboardStore}>
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <Link className="header-brand" to="/" aria-label="Find Cars for Sale at Autotrader">
          <img className="display-none display-lg-block" src="//www.autotrader.com/cm-api/content/static/img/icon/logos/atc-logo-blue.svg" width="139" height="38" title="Autotrader Used Cars For Sale - New Cars For Sale - SUVs And Trucks For Sale" alt="Autotrader Logo" loading="eager"/>
        </Link>
        <div className='ms-auto flex items-center space-x-4'>
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main fixed>
        <div className='mb-4 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight' style={{color: "#012169"}}>Car Sales</h1>
        </div>
        <div className="flex w-full gap-6">
          <Card className="hidden w-full max-w-xs shrink-0 self-start lg:block">
          {/* <p className="text-sm font-semibold" style={{color: "#012169"}}>Filters</p> */}
          </Card>

          {/* Right: List */}
          <section className="min-w-0 grow">
            <div className="px-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-md bg-muted/40" style={{height: "306px"}}/>
                <div className="rounded-md bg-muted/40" style={{height: "306px"}}/>
                <div className="rounded-md bg-muted/40" style={{height: "306px"}}/>
                <div className="rounded-md bg-muted/40" style={{height: "306px"}}/>
                <div className="rounded-md bg-muted/40" style={{height: "306px"}}/>
                <div className="rounded-md bg-muted/40" style={{height: "306px"}}/>
                <div className="rounded-md bg-muted/40" style={{height: "306px"}}/>

              </div>
            </div>
          </section>
        </div>
      </Main>
    </>
    </Provider>
  )
}

