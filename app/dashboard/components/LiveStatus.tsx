'use client'

import { StatusInput } from "./StatusInput"

type LiveStatusProps= {
    isDark: boolean;
}

const LiveStatus = ({isDark}: LiveStatusProps) => {
    return (
        <div className={`${isDark? "bg-[var(--dashboard-primary)]" : "bg-[var(--dashboard-light)]"}
            h-full flex-1 flex flex-col items-start justify-start rounded-lg p-6 gap-3`}>
            <span className="poppins text-lg font-semibold">
                Status
            </span>

            <div className={`${isDark ? "text-[var(--dashboard-light)] bg-[var(--dashboard-dark)]" : "bg-[var(--dashboard-white)] text-[var(--dashboard-dark)]"}
                h-full w-full overflow-y-scroll`}>
                
                <div className={`
                    flex flex-row items-center justify-start p-3 border-b border-gray-500`}>
                    <span className="poppins w-[300px] text-lg font-semibold text-center">
                        Id
                    </span>
                    <span className="poppins w-[300px] text-lg font-semibold text-center">
                        Route
                    </span>
                    <span className="poppins w-[300px] text-lg font-semibold text-center">
                        Status
                    </span>
                    <span className="poppins w-[300px] text-lg font-semibold text-center">
                        Time
                    </span>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <StatusInput isDark={isDark} id={"01234"} from={"Taguig"} vehicle={"motorcycle"} to={"Pasig"} status={"Canceled"} time={"09:24PM"} />
                    <StatusInput isDark={isDark} id={"08956"} from={"Makati"} vehicle={"truck"} to={"Antipolo"} status={"Delivered"} time={"06:33PM"} />
                    <StatusInput isDark={isDark} id={"23233"} from={"Quezon City"} vehicle={"car"} to={"Pasig"} status={"In-Transit"} time={"12:34PM"} />
                </div>

            </div>

        </div>
    )
}

export default LiveStatus