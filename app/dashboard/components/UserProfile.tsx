'use client'

import type { User } from "../../page"
import { useState, useEffect, useRef } from "react"
import { useIsMobile } from "@/app/home/hooks/useIsMobile"
import { db } from "../../home/firebase/FirebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import DefaultImg from "../../home/assets/User.png"

type UserProfileProps = {
    isDark: boolean;
    hubName: string;
    setHubName: React.Dispatch<React.SetStateAction<string>>;
}

export const UserProfile = ({isDark, hubName, setHubName}: UserProfileProps) => {

    const [user, setUser] = useState<User | null>(null);
    const isMobile = useIsMobile();
    const [createHub, setCreateHub] = useState(false);
    const hubRef = useRef<HTMLInputElement | null>(null);
    const username = user?.email?.split("@")[0] ?? "Guest";
    const [hubId, setHubId] = useState("");
    const [showIds, setShowIds] = useState(false);

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
    
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
    }, []);
    
    useEffect(() => {
        console.log(
          `User Profile: Id:${user?.uid}, Email:${user?.email}`
        )
    }, [user]);

    //fetch hubid
    useEffect(() => {
        if (!user) return;

        const fetchHub = async () => {
            try {
                const snapshot = await getDocs(
                    collection(db, "operators", user.uid, "hubs")
                );

                if (!snapshot.empty) {
                    const hubDoc = snapshot.docs[0];

                    setHubName(hubDoc.data().hubName);
                    setHubId(hubDoc.id);
                }
            } catch (error) {
                console.error("Error fetching hub:", error);
            }
        };

        fetchHub();
    }, [user]);

    return (
        <div className={`${isDark ? 
            "text-[var(--dashboard-light)] bg-[var(--dashboard-primary)]" : "bg-[var(--dashboard-light)] text-[var(--dashboard-dark)]"}
            h-auto w-full flex flex-col items-start justify-start gap-3 p-3 rounded-lg`}>
            
            <div className="flex flex-row items-center justify-center gap-3">
                <div className="flex flex-row items-center justify-center">
                    {user?.uid && <img src={DefaultImg.src} className="h-16 w-16 rounded-full" alt="" />}
                    {!user?.uid && <div className="flex items-center bg-black p-3 rounded-full cursor-pointer">
                        <i className="bx bx-user text-3xl text-[var(--dashboard-light)]" />
                    </div>}
                </div>
                <div className="flex flex-col items-start justify-center gap-1">
                    <span className={`poppins cursor-pointer text-md text-[color:var(--pink-color)] transition duration-300 ease-in-out `}>
                        {username.length > 9
                            ? `${username.slice(0, 9)}...`
                            : username}
                    </span>
                    <span className={`poppins cursor-pointer text-sm transition duration-300 ease-in-out`}>
                        Operator
                    </span>
                </div>
            </div>
            {!hubName && <div className={`${isDark? "bg-[var(--dashboard-dark)]" : "bg-[var(--dashboard-white)]"}
                w-full flex flex-row items-center justify-between gap-3 p-3 rounded-lg cursor-pointer`}
                onClick={() => setCreateHub(true)}>
                <span className="poppins flex flex-col items-center justify-center text-sm">
                    Create a Hub
                </span>
                <div className="flex flex-col items-center justify-center">
                    <i className="bx bx-plus" />
                </div>
            </div>}
            {hubName && <div className={`${isDark? "bg-[var(--dashboard-dark)]" : "bg-[var(--dashboard-white)]"}
                w-full flex flex-row items-center justify-between gap-3 p-3 rounded-lg cursor-pointer`}>
                <span className="poppins flex flex-col items-center justify-center text-sm">
                    {hubName}
                </span>
                <div className="flex flex-col items-center justify-center">
                    <i className="bx bx-network-device text-[24px]" />
                </div>
            </div>}
            
            {/* Ids */}
            {hubName && (
                <div
                    className={`${
                        isDark
                            ? "bg-[var(--dashboard-dark)]"
                            : "bg-[var(--dashboard-white)]"
                    } w-full rounded-lg`}
                >
                    <div
                        className="w-full flex flex-row items-center justify-between p-3 cursor-pointer"
                        onClick={() => setShowIds(!showIds)}
                    >
                        <span className="poppins text-sm font-semibold">
                            Hub Information
                        </span>

                        <i
                            className={`bx ${
                                showIds ? "bx-chevron-up" : "bx-chevron-down"
                            } text-xl`}
                        />
                    </div>

                    {showIds && (
                        <div className="flex flex-col gap-4 px-3 pb-3">
                            <div className="flex flex-col gap-1">
                                <p className="poppins text-sm font-semibold">
                                    Operator ID
                                </p>

                                <p className="poppins text-xs break-all opacity-80">
                                    {user?.uid}
                                </p>
                            </div>

                            <div className="flex flex-col gap-1">
                                <p className="poppins text-sm font-semibold">
                                    Hub ID
                                </p>

                                <p className="poppins text-xs break-all opacity-80">
                                    {hubId}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {createHub && 
                <div className="h-screen w-full bg-[rgba(0,0,0,0.5)] absolute top-0 left-0 z-20
                    flex flex-col items-center justify-center">
                    <div className="flex flex-row items-center justify-center h-auto w-auto bg-white p-6 gap-3 rounded-lg">
                        <input ref={hubRef} type="text" placeholder="Enter Name" 
                            className="poppins cursor-pointer text-sm transition duration-300 ease-in-out p-3 text-[var(--dashboard-dark)] 
                            outline-none border border-[var(--dashboard-dark)]" 
                            />
                        <span className="poppins cursor-pointer text-sm transition duration-300 ease-in-out
                            text-[var(--dashboard-light)] p-3 bg-[var(--dashboard-dark)]"
                            onClick={async () => {
                                const value = hubRef.current?.value?.trim();
                                const uid = user?.uid;

                                if (!value || !uid) return;

                                try {
                                    // Create hub
                                    const hubDoc = await addDoc(
                                        collection(db, "operators", uid, "hubs"),
                                        {
                                            hubName: value,
                                            createdAt: new Date(),
                                        }
                                    );

                                    // Create chat
                                    const chatDoc = await addDoc(
                                        collection(
                                            db,
                                            "operators",
                                            uid,
                                            "hubs",
                                            hubDoc.id,
                                            "chats"
                                        ),
                                        {
                                            createdAt: new Date(),
                                        }
                                    );

                                    // Create welcome message
                                    await addDoc(
                                        collection(
                                            db,
                                            "operators",
                                            uid,
                                            "hubs",
                                            hubDoc.id,
                                            "chats",
                                            chatDoc.id,
                                            "messages"
                                        ),
                                        {
                                            text: "Welcome to Vask",
                                            senderId: "system",
                                            senderType: "system",
                                            createdAt: new Date(),
                                        }
                                    );

                                    setHubName(value);
                                    setCreateHub(false);

                                    if (hubRef.current) {
                                        hubRef.current.value = "";
                                    }

                                } catch (error) {
                                    console.error("Error creating hub:", error);
                                }
                            }}>
                            Submit
                        </span>
                    </div>
                </div>
            }
            
        </div>
    )
}
