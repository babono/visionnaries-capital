'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { NavigationItem } from '../types/index';

const navigation: NavigationItem[] = [
	{
		title: 'ABOUT',
		href: '/about'
	},
	{
		title: 'SERVICES',
		href: '/services'
	},
	{ title: 'TRACK RECORD', href: '/track-record' },
	{ title: 'LIVE TRANSACTIONS', href: '/current-transactions' },
	{ title: 'CONTACT', href: '/contact' },
];

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-lg ${
				isMenuOpen ? 'bg-blue-900' : ''
			}`}
			style={{ backgroundColor: isMenuOpen ? '#1e3a8a' : '#fff' }}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16 lg:h-20">
					{/* Logo */}
					<Link href="/" className="flex-shrink-0">
						<Image
							src="/v_logo_hi.png"
							alt="Visionnaires Capital"
							width={200}
							height={40}
							className="h-8 lg:h-10"
							style={{
								width: "auto",
								height: "auto",
								filter: isMenuOpen 
									? "drop-shadow(0px 100px 0 #ffffff) brightness(0) invert(1)"
									: "drop-shadow(0px 100px 0 #0077C6)",
								transform: "translateY(-100px)"
							}}
							priority={false}
						/>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden lg:flex items-center space-x-8">
						{navigation.map((item) => (
							<div key={item.title} className="relative group">								
								<Link
								href={item.href}
								className="flex items-center text-sm transition-colors duration-200 text-sky-600 hover:text-sky-700 border-b-2 border-transparent hover:border-sky-600"
								>
								{item.title}                  
								</Link>												
							</div>
						))}
					</nav>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className={`lg:hidden p-2 rounded-md transition-colors ${
							isMenuOpen 
								? "text-white hover:bg-white/10" 
								: "text-sky-600 hover:bg-white/10"
						}`}
					>
						{isMenuOpen ? (
							<X className="h-6 w-6" />
						) : (
							<Menu className="h-6 w-6" />
						)}
					</button>
				</div>
			</div>

			{/* Mobile Navigation */}
			<div 
				className={`lg:hidden fixed top-16 lg:top-20 right-0 h-screen w-full bg-blue-900 transform transition-transform duration-500 ease-in-out z-40 ${
					isMenuOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				<div className="flex flex-col h-full">
					{/* Navigation Links */}
					<div className="pt-16 px-8">
						{navigation.map((item, index) => (
							<Link 
								key={item.title} 
								href={item.href}
								onClick={() => setIsMenuOpen(false)}
								className={`block text-white text-2xl font-light tracking-wider hover:text-blue-200 transition-all duration-500 transform mb-8 ${
									isMenuOpen 
										? 'translate-x-0 opacity-100' 
										: 'translate-x-8 opacity-0'
								}`}
								style={{
									transitionDelay: isMenuOpen ? `${index * 100}ms` : '0ms'
								}}
							>
								{item.title}
							</Link>
						))}
					</div>
				</div>
			</div>
		</header>
	);
}