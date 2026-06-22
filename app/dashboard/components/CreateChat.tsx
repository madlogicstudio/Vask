'use client'

import { useIsMobile } from "@/app/home/hooks/useIsMobile"
import type { User } from "../../page"
import { useState, useEffect, useRef } from "react"
import { db, auth } from "@/app/home/firebase/FirebaseConfig"
import {
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    query,
    orderBy,
    onSnapshot,
    getDoc
} from "firebase/firestore";
import { doc } from "firebase/firestore"

type CreateChatProps = {
    isDark: boolean;
    hubName: string;
}

export const CreateChat = ({ isDark, hubName }: CreateChatProps) => {

    const [user, setUser] = useState<User | null>(null);
    const [chatId, setChatId] = useState("");
    const [message, setMessage] = useState("");
    const [hubId, setHubId] = useState("");
    const isMobile = useIsMobile();

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    type Message = {
        id: string;
        senderId: string;
        senderName: string;
        text?: string;
        imageUrl?: string;
        type?: "text" | "image";
    }

    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // fetch hubId
    useEffect(() => {
        if (!user || !hubName) return;

        const fetchHubId = async () => {
            try {
                const snapshot = await getDocs(
                    collection(db, "operators", user.uid, "hubs")
                );

                const hub = snapshot.docs.find(
                    (doc) => doc.data().hubName === hubName
                );

                if (hub) {
                    setHubId(hub.id);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchHubId();
    }, [user, hubName]);

    //fetch chatId
    useEffect(() => {
        if (!user || !hubId) return;

        const fetchChatId = async () => {
            try {
                const snapshot = await getDocs(
                    collection(
                        db,
                        "operators",
                        user.uid,
                        "hubs",
                        hubId,
                        "chats"
                    )
                );

                if (!snapshot.empty) {
                    setChatId(snapshot.docs[0].id);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchChatId();
    }, [user, hubId]);

    //forImageCloudinary
    const uploadToCloudinary = async (file: File) => {
        const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", "madlogicstudio_vask_image_upload"); // from Cloudinary
        formData.append("cloud_name", "de4i0nirw");

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/de4i0nirw/image/upload`,
            {
            method: "POST",
            body: formData,
            }
        );

        const data = await res.json();
        return data.secure_url; // image URL
    };

    //store chats
    const sendMessage = async () => {
        if (!message.trim() && !selectedImage) return;
        if (!hubId || !chatId || !user) return;

        try {
            let imageUrl = "";
            let type: "text" | "image" = "text";

            // IMAGE UPLOAD VIA CLOUDINARY
            if (selectedImage) {
                imageUrl = await uploadToCloudinary(selectedImage);
                type = "image";
            }

            await addDoc(
                collection(
                    db,
                    "operators",
                    user.uid,
                    "hubs",
                    hubId,
                    "chats",
                    chatId,
                    "messages"
                ),
                {
                    text: message || "",
                    senderId: user.uid,
                    senderName: "Operator",
                    type,
                    imageUrl: imageUrl || "",
                    createdAt: serverTimestamp(),
                }
            );

            setMessage("");
            setSelectedImage(null);
        } catch (error) {
            console.error(error);
        }
    };

    //read chats
    useEffect(() => {

        if (!user || !chatId) return;

        const q = query(
            collection(
                db,
                "operators",
                user.uid,
                "hubs",
                hubId,
                "chats",
                chatId,
                "messages"
            ),
            orderBy("createdAt", "asc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {

            const fetchedMessages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Message[];

            setMessages(fetchedMessages);

        });

        return () => unsubscribe();

    }, [user, hubId, chatId]);

    return (
        <div className={`${isDark ? "text-[var(--dashboard-light)] bg-[var(--dashboard-dark)]" : "bg-[var(--dashboard-white)] text-[var(--dashboard-dark)]"}
            ${isMobile? "h-full overflow-y-auto hide-scroll" : "h-full"}
            w-full flex flex-col items-start justify-start gap-3 p-3 rounded-lg`}>
            
            <div className={`${isDark ? "bg-[var(--dashboard-primary)] h-full" : "bg-[var(--dashboard-light)] h-full"}
                flex-1 w-full rounded-lg p-3 overflow-y-auto hide-scrollbar`}>

                {messages.map((msg) => {
                    const isMine = msg.senderId === user?.uid;

                    return (
                        <div
                            key={msg.id}
                            className={`mb-2 flex ${
                                isMine ? "justify-end" : "justify-start"
                            }`}
                        >   
                            <div className="flex flex-col">
                                <span
                                    className={`text-sm mt-2 mb-2 ${
                                        isMine
                                            ? "text-right text-gray-400"
                                            : "text-left text-gray-400"
                                    }`}
                                >
                                    {msg.senderName}
                                </span>
                                <div
                                    className={`rounded-lg max-w-[100%] ${
                                        msg.type === "image"
                                            ? ""
                                            : `p-3 ${
                                                isMine
                                                    ? "bg-[var(--primary-color)] text-[var(--dashboard-light)]"
                                                    : "bg-[var(--dashboard-secondary)] text-[var(--dashboard-light)]"
                                            }`
                                    }`}
                                >
                                    {msg.type === "image" ? (
                                        <img
                                            src={msg.imageUrl}
                                            alt="Chat image"
                                            className="rounded-lg max-w-[250px] h-auto"
                                        />
                                    ) : (
                                        msg.text
                                    )}
                                </div>
                            </div>
                            
                        </div>
                    );
                })}

            </div>

            <div className="h-auto w-full border border-white flex flex-row items-center justify-center rounded-full p-1">
                <i className={`${isMobile? "p-3" : "p-3"}
                    bx bx-plus text-[18px] cursor-pointer rounded-full hover:bg-[var(--dashboard-primary)] transition duration-300 ease-in-out`} 
                    onClick={() => fileInputRef.current?.click()}/>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder="Write your message..."
                    className={`${isMobile? "text-[12px] pl-0 pr-2" : "p-3"}
                        poppins w-full outline-none border-none`}
                />
                <span className={`${isDark? "text-[var(--dashboard-dark)] bg-[var(--dashboard-light)]" : "text-[var(--dashboard-light)] bg-[var(--dashboard-primary)]"}
                    ${isMobile? "text-[12px] py-3 px-4" : "text-sm py-3 px-6 "}
                    poppins rounded-full cursor-pointer`} onClick={sendMessage}>Submit</span>
            </div>

            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setSelectedImage(file);
                }}
            />

        </div>
    );
}