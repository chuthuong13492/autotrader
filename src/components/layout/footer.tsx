import { Link } from '@tanstack/react-router'

export function Footer() {
  return (
    <footer className='w-full bg-background' style={
      {
        borderTop:
          'var(--base-space-px-4, 2px) solid #ff821c',
      }
    }>
      <div className='mx-auto w-full max-w-7xl px-4 py-10 md:px-6 md:py-12'>
        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3'>
          <div>
            <h3 className='mb-4 text-sm font-semibold uppercase tracking-wide text-black'>
              Shop for a Car
            </h3>
            <ul className='space-y-3 text-sm'>
              <li>
                <Link to='/search-result-page' className='hover:underline text-muted-foreground'>
                  Used Cars For Sale
                </Link>
              </li>
              <li>
                <Link to='/search-result-page' className='hover:underline text-muted-foreground'>
                  Certified Cars
                </Link>
              </li>
              <li>
                <Link to='/search-result-page' className='hover:underline text-muted-foreground'>
                  Car Deals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='mb-4 text-sm font-semibold uppercase tracking-wide text-black'>
              About Us
            </h3>
            <ul className='space-y-3 text-sm'>
              <li>
                <a href='#' className='hover:underline text-muted-foreground'>
                  Company Information
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline text-muted-foreground'>
                  Corporate Information
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline text-muted-foreground'>
                  Jobs at Autotrader
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline text-muted-foreground'>
                  Become an Autotrader Dealer
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline text-muted-foreground'>
                  Press Room
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline text-muted-foreground'>
                  Site Map
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline text-muted-foreground'>
                  Contact Us
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline text-muted-foreground'>
                  About Autotrader
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline text-muted-foreground'>
                  Do Not Sell or Share My Personal Information
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline text-muted-foreground'>
                  Limit the Use of My Sensitive Personal Information
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline text-muted-foreground'>
                  Fraud Awareness
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline text-muted-foreground'>
                  Manage Cookies
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='mb-4 text-sm font-semibold uppercase tracking-wide text-black'>
              Autotrader Affiliates
            </h3>
            <ul className='space-y-3 text-sm'>
              <li>
                <a href='#' className='hover:underline text-muted-foreground'>
                  Classic Cars & Trucks for Sale ↗
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline text-muted-foreground'>
                  Motorcycles for Sale ↗
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline text-muted-foreground'>
                  RVs for Sale ↗
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline text-muted-foreground'>
                  Cars for Bad Credit Buyers ↗
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline text-muted-foreground'>
                  Find Cars for Sale in Australia ↗
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

