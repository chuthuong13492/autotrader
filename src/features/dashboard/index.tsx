import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { DashboardBadge } from './components/dashboard-badge'
import { DashboardFilter } from './components/dashboard-filter'
import { CarList } from './components/car-list/car-list'
import { Footer } from '@/components/layout/footer'

export function Dashboard() {
  return (
    <>
    {/* ===== Top Heading ===== */}
    <Header>
      <div className='ms-auto flex items-center space-x-4'>
        <ProfileDropdown />
      </div>
    </Header>

    <DashboardBadge>
      <a className='font-bold text-md' style={{ color: "#012169" }}>Tariffs: What You Need to Know</a>
    </DashboardBadge>

    {/* ===== Main ===== */}
    <Main>

      <div className='mb-4 flex items-center justify-between space-y-2'>
        <h1 className='text-2xl font-bold tracking-tight' style={{ color: "#012169" }}>Cars for Sale</h1>
      </div>
      <div className="flex w-full gap-0 lg:gap-6">
        <DashboardFilter />
        {/* Right: List */}
        <section className="min-w-0 grow">
          <CarList />
        </section>
      </div>
    </Main>

    {/* ===== Footer ===== */}
    <Footer />
  </>
  )
}

