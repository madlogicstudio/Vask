import { useRef } from "react";
import UserProof from "./UserProof"
import { useGSAP } from "../hooks/useGSAP";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
gsap.registerPlugin(TextPlugin);

type ProofCardProps = {
    userImage: string;
    message: string;
    userName: string;
    position: string;
    isDark: boolean;
}

const ProofCard = ({userImage, message, userName, position, isDark}: ProofCardProps) => {

    const cardRef = useRef<HTMLDivElement>(null);
    const messageRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {

        gsap.fromTo(
            messageRef.current,
            {
                text: "",
            },
            {
                text: `"${message}"`,
                duration: 6,
                ease: "none",
                scrollTrigger: {
                trigger: cardRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            }
            }
        );

    }, [message]);

    return (
        <div ref={cardRef} className={`bg-[var(--primary-color)] text-[color:var(--light-color)]
            w-full h-full flex flex-col items-start justify-between gap-[calc(1.8vw+1.2rem)] p-[calc(0.6vw+0.4rem)] rounded-lg`}>
            <i className="bx bx-quote-right text-[length:var(--hero-font)] text-[color:var(--light-color)]" />
            <span ref={messageRef} className='anek text-[length:var(--medium-font)] cursor-pointer transition duration-300 ease-in-out leading-[1.1]'>
                "{message}"
            </span>
            <span className='anek text-[length:var(--large-font)] cursor-pointer transition duration-300 ease-in-out leading-[1.1]'>
                <UserProof userImage={userImage} userName={userName} position={position} />
            </span>
        </div>
    )
}

export default ProofCard