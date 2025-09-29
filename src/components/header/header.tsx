"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
    const [open, setOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { data: session } = useSession();

    const searchParams = useSearchParams();
    const pathname = usePathname();
    let currentView = searchParams.get('view');

    let isAdminView = false;
    if (pathname.startsWith('/dashboard')) currentView = 'admin', isAdminView = true;

    const handleLogout = () => {
        signOut({ callbackUrl: "/" });
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const linkClasses = "text-white relative cursor-pointer overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#00FF00] after:transition-all after:duration-300 hover:after:w-full hover:text-[#b6b3b3]";
    const linkClassesExit = `text-white cursor-pointer border-b-2 border-transparent transition-colors duration-300  hover:border-red-500  hover:text-gray-300`;

    const activeLinkClasses = "text-[#b6b3b3] after:w-full";

    const fadingPartsClasses = `transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'opacity-100'}`;

    return (
        <header className={`shadow-md sticky top-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <svg
                        width="80"
                        height="35"
                        viewBox="0 0 80 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-all duration-300 cursor-pointer ${isScrolled ? 'w-24 h-auto' : 'w-20 h-auto'}`}
                        href="/"
                    >
                        <g id="logo_l0gik">
                            <path className={fadingPartsClasses} d="M56.462 0.0180664H51.8052V4.72726H56.462V0.0180664Z" fill="white"></path>
                            <g className={fadingPartsClasses}>
                                <path d="M45.7532 24.2904C47.1122 25.1653 48.145 26.524 48.5799 28.1062H62.1699V24.2904H56.4621V7.48254H47.4565V11.3541H52.1314V24.2904H45.7532Z" fill="white"></path>
                                <path d="M41.5493 31.1769H34.6818C33.9389 31.1769 33.3591 30.6557 33.3591 30.0042C33.3591 29.2969 33.9389 28.7943 34.6818 28.7943H41.5856C42.3104 28.7943 42.8721 29.3155 42.8721 29.967C42.8721 30.6557 42.2923 31.1769 41.5493 31.1769ZM35.9321 15.0949C35.9321 14.0339 36.82 13.215 38.1246 13.215C39.1937 13.215 40.2447 14.0153 40.2447 15.0949V17.7008C40.2447 18.7617 39.2118 19.5807 38.1246 19.5807C36.8381 19.5807 35.9321 18.7803 35.9321 17.7008V15.0949ZM42.2198 25.1834H38.6682V23.3406C41.9661 23.0428 44.5029 20.4742 44.5029 17.5705V15.3555C44.5029 14.0712 44.2492 13.0102 43.6513 12.2284C44.0499 11.67 44.3942 11.3536 45.5901 11.3536V7.50067C42.5459 7.50067 41.6943 8.41269 40.5346 9.88315C39.8098 9.58533 38.8132 9.36201 38.1065 9.36201C34.5188 9.36201 31.4565 12.0795 31.4565 15.3555V17.5705C31.4565 19.6366 32.8155 21.4979 34.8268 22.5402V25.1834H34.6094C32.0001 25.1834 29.9163 27.3239 29.9163 29.8553V30.1159C29.9163 32.6845 32.0001 34.7506 34.6094 34.7506H42.2016C44.8472 34.7506 46.9672 32.6845 46.9672 30.1159V29.8553C46.9491 27.3053 44.8291 25.1834 42.2198 25.1834Z" fill="white"></path>
                            </g>
                            <path className={fadingPartsClasses} d="M64.0544 0.0180664V28.1242H68.4214V18.4826V0.0180664H64.0544Z" fill="white"></path>
                            <g>
                                <path className={fadingPartsClasses} d="M13.4632 24.2904H7.46546V0H0V3.81574H3.13477V24.2718H0.0181198V28.0875H15.855C14.6772 27.0824 13.8618 25.7609 13.4632 24.2904Z" fill="white"></path>
                                <path id="Vector_6" d="M25.0782 22.0196C25.0782 23.2667 24.0454 24.6255 22.3602 24.6255C21.1643 24.6255 20.2221 23.8623 19.7872 23.0061L25.042 9.77203L25.0782 16.9568V22.0196ZM22.324 3.89019C23.3387 3.89019 24.0998 4.28106 24.5709 4.85807L19.5335 17.5524V6.27271C19.5335 5.02561 20.7113 3.89019 22.324 3.89019ZM22.3602 0.0372314C17.9933 0.0372314 15.0579 2.82925 15.0579 6.32856V22.001C15.0579 25.5375 17.9933 28.497 22.3602 28.497C26.6909 28.497 29.5901 25.5189 29.5901 22.001V6.32856C29.5901 2.82925 26.6909 0.0372314 22.3602 0.0372314Z" fill="white"></path>
                            </g>
                            <path className={fadingPartsClasses} d="M79.9999 28.1248L73.7485 18.5575L79.5106 9.7348H74.1652L68.6567 18.4831L74.6364 28.1248H79.9999Z" fill="white"></path>
                        </g>
                    </svg>

                    <nav className="hidden md:flex space-x-6">
                        {session?.user && isAdminView ? (
                            <>
                                <Link href="/?view=admin" className={`${linkClasses} ${currentView === 'admin' ? activeLinkClasses : ''}`}>
                                    Painel Administrativo
                                </Link>
                                <a href="https://l0gik.com.br/" target="_blank" rel="noopener noreferrer" className={linkClasses}>
                                    Contato
                                </a>
                                <span onClick={handleLogout} className={linkClassesExit}>Sair</span>

                            </>) : (
                            <>
                                <Link href="/" className={`${linkClasses} ${!currentView ? activeLinkClasses : ''}`}>
                                    Formulário
                                </Link>
                                <Link href="/?view=admin" className={`${linkClasses} ${currentView === 'admin' ? activeLinkClasses : ''}`}>
                                    Painel Administrativo
                                </Link>
                                <a href="https://l0gik.com.br/" target="_blank" rel="noopener noreferrer" className={linkClasses}>
                                    Contato
                                </a>
                            </>

                        )}
                    </nav>

                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden p-2 rounded-md text-[#00FF00] hover:bg-gray-100"
                    >
                        {open ? <HiX size={24} /> : <HiMenu size={24} />}
                    </button>
                </div>
            </div>

            {open && (
                <div className="md:hidden bg-black border-t shadow-sm">
                    <nav className="flex flex-col p-4 space-y-3">
                        <Link href="/" className={`${linkClasses} ${!currentView ? activeLinkClasses : ''}`}>
                            Formulário
                        </Link>
                        <Link href="/?view=admin" className={`${linkClasses} ${currentView === 'admin' ? activeLinkClasses : ''}`}>
                            Painel Administrativo
                        </Link>
                        <a href="https://l0gik.com.br/" className="text-white hover:text-[#00FF00]">Contato</a>
                        {session?.user ? (
                            <span onClick={handleLogout} className={linkClassesExit}>Sair</span>
                        ) : null}
                    </nav>
                </div>
            )}
        </header>
    );
};
