import Link from 'next/link'
import { TwitterIcon, FacebookIcon, InstagramIcon, GithubIcon } from 'lucide-react'

export default function Footer() {
	return (
		<footer className="bg-[#111111] py-12 mt-16">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div>
						<h3 className="text-[#ffffff] font-bold mb-4">About Us</h3>
						<p className="text-[#888888]">Cognify - see with eyes of the world</p>
					</div>
					<div>
						<h3 className="text-[#ffffff] font-bold mb-4">Sitemap</h3>
						<ul className="space-y-2">
							<li><Link href="/" className="text-[#888888] hover:text-[#ffffff]">Home</Link></li>
							<li><Link href="/about" className="text-[#888888] hover:text-[#ffffff]">About</Link></li>
							<li><Link href="/contact" className="text-[#888888] hover:text-[#ffffff]">Contact</Link></li>
						</ul>
					</div>
					<div>
						<h3 className="text-[#ffffff] font-bold mb-4">Contact</h3>
						<p className="text-[#888888]">Email: </p>
						<p className="text-[#888888]">Phone: </p>
					</div>
					<div>
						<h3 className="text-[#ffffff] font-bold mb-4">Follow Us</h3>
						<div className="flex space-x-4">
							<a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#888888] hover:text-[#ffffff]">
								<TwitterIcon size={24} />
							</a>
							<a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#888888] hover:text-[#ffffff]">
								<FacebookIcon size={24} />
							</a>
							<a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#888888] hover:text-[#ffffff]">
								<InstagramIcon size={24} />
							</a>
							<a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#888888] hover:text-[#ffffff]">
								<GithubIcon size={24} />
							</a>
						</div>
					</div>
				</div>
				<div className="mt-8 pt-8 border-t border-[#333333] text-center text-[#888888]">
					<p>© {new Date().getFullYear()} Cognify. All rights reserved.</p>
				</div>
			</div>
		</footer>
	)
}

