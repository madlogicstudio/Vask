'use client' 

type UserProofProps = {
    userImage: string;
    userName: string;
    position: string;
}

const UserProof = ({userImage, userName, position}: UserProofProps) => {
    return (
        <div className='flex flex-row items-center justify-center gap-[calc(0.6vw+0.4rem)]'>
            
            <div className="flex flex-col items-center justify-center">
                <img src={userImage} className="h-[64px] w-[64px] rounded-full" alt="" />
            </div>
            <div className="flex flex-col items-start justify-start gap-[calc(0.4vw+0.3rem)]">
                <span className='anek text-[length:var(--medium-font)] text-[color:var(--pink-color)] cursor-pointer transition duration-300 ease-in-out leading-[1.1]'>
                    {userName}
                </span>
                <span className='anek text-[length:var(--medium-font)] text-[color:var(--light-color)] cursor-pointer transition duration-300 ease-in-out leading-[1.1]'>
                    {position}
                </span>
            </div>

        </div>
    )
}

export default UserProof