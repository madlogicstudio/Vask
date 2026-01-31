import { useIsMobile } from "../hooks/useIsMobile"
import { useState, useRef, useEffect } from "react";
import SignupAnim from "../assets/vids/Signup.mp4"
import { auth } from "../firebase/FirebaseConfig"
import { createUserWithEmailAndPassword } from "firebase/auth";

type SignUpFormProps = {
  isDark: boolean;
  switchForm: boolean;
  setSwitchForm: React.Dispatch<React.SetStateAction<boolean>>
}

function SignUpForm({switchForm, setSwitchForm}: SignUpFormProps) {

  const isMobile = useIsMobile();

  const [isVisible, setIsVisible] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current?.play();
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          const user = userCredential.user;
          alert("Signed up successfully!");
          console.log(user);
      })
      .catch((error) => {
          console.log(error);
      });
  }

  return (
    <>
      {switchForm && <div className={`${isMobile? 'items-start' : 'items-start'}
          flex-1 h-full w-full flex flex-col justify-center gap-[1rem] p-[1rem]`}>
          <span className='font-semibold text-[1rem] cursor-pointer'>Start your Journey!</span>
          <span className='font-semibold text-[1.5rem] cursor-pointer'>Sign Up to Vask</span>
          <div className="relative w-full flex items-center">
              <input type="email" required placeholder=" "
                  className={`peer w-full pt-6 pb-2 px-2 text-[1rem] outline-none border-b-2 
                  invalid:not-focus:[&:not(:placeholder-shown)]:border-red-500
                  text-[var(--dark-color)]`}
                  onChange={(e) => setEmail(e.target.value)}
              />
              <label className={`absolute left-2 top-4 text-[var(--primary-color)] text-base transition-all
                  peer-focus:top-1 peer-focus:text-sm
                  peer-[&:not(:placeholder-shown)]:top-1
                  peer-[&:not(:placeholder-shown)]:text-sm`}>
                  Email
              </label>
              <i className='bx bx-envelope bx-tada-hover absolute right-2 text-[1.2rem] text-[var(--primary-color)] cursor-pointer'></i> 
          </div>
          <div className="relative w-full flex items-center">
              <input type={isVisible? 'text' : 'password'} required
                  className={`text-[var(--dark-color)]
                      peer w-full pt-6 pb-2 px-2 text-[1rem] outline-none border-b-2 border-[var(--dark-color)]`}
                    onChange={(e) => setPassword(e.target.value)}
              />
              <label className="absolute left-2 top-4 text-[var(--primary-color)] text-base transition-all
                  peer-focus:top-1 peer-focus:text-sm
                  peer-valid:top-1 peer-valid:text-sm">
                  Password
              </label>
              <i className={`${isVisible? 'bx bx-eye bx-tada-hover absolute right-2 text-[1.3rem] text-[var(--primary-color)] cursor-pointer' : 
                  'bx bx-eye-closed bx-tada-hover absolute right-2 text-[1.3rem] text-[var(--primary-color)] cursor-pointer'}
              `}
              onClick={() => setIsVisible((prev) => !prev)}></i> 
          </div>
          <div className="w-full flex flex-col items-start justify-start">
              <div className="flex flex-row item-start justify-start gap-[0.5rem] pl-[0.5rem] flex-wrap">
                <input type="checkbox" className="text-[1rem] cursor-pointer" />
                <span className='text-[0.9rem] cursor-pointer'>By creating an account, you agree to our</span>
                <span className={`text-[var(--dark-color)]
                  text-[0.9rem] underline hovered-light cursor-pointer`}>Terms & Conditions.</span>
              </div>
          </div>
          <span className={`text-[var(--light-color)] bg-[var(--dark-color)]
              w-full text-center hovered-button text-[1rem] p-[1rem] cursor-pointer`}
              onClick={handleSignUp}
              >Sign Up</span>
          <div className="flex flex-row item-center gap-[0.5rem] pl-[0.5rem]">
              <span className={`text-[var(--dark-color)]
                  text-[0.9rem] cursor-pointer`}>Already have an account?</span>
              <span className={`text-[var(--dark-color)]
              text-[0.9rem] underline hovered-light cursor-pointer`}
              onClick={() => setSwitchForm((prev) => !prev)}>Sign In</span>
          </div>
      </div>}
      {!isMobile && switchForm && <div className='flex-1 h-full w-full flex flex-col items-center justify-center'>
        <video 
          ref={videoRef}
          src={SignupAnim}
          muted
          playsInline>
        </video>
      </div>}
    </>
  )
}

export default SignUpForm