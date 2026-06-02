'use client'

type DashboardProps = {
    isDark: boolean;
}

function page({isDark}: DashboardProps) {
  return (
    <div className={`${isDark ? "text-[var(--light-color)] bg-[var(--dark-color)]" : "bg-[var(--light-color)] text-[var(--dark-color)]"}
        h-screen flex flex-col items-center justify-center scroll-smooth`}>
        Dashboard
    </div>
  )
}

export default page