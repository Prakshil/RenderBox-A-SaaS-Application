import React from 'react';
import Link from 'next/link';
import { ImageIcon, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-12 py-10">
          <aside className="flex flex-col gap-2 md:col-span-1">
            <ImageIcon className="w-12 h-12 text-primary mb-1" />
            <p className="font-display font-bold text-xl mb-1">RenderBox</p>
            <p className="text-sm opacity-70">Transform and optimize your media<br />Trusted since 2025</p>
          </aside>
          <nav className="flex flex-col gap-1">
            <h6 className="footer-title mb-2">SERVICES</h6>
            <Link href="/video-upload" className="link link-hover">Video Upload</Link>
            <Link href="/social-share" className="link link-hover">Social Share</Link>
            <Link href="/background-removal" className="link link-hover">Background Removal</Link>
            <Link href="/ai-enhancer" className="link link-hover">AI Enhancer</Link>
            <Link href="/home" className="link link-hover">Gallery</Link>
          </nav>
          <nav className="flex flex-col gap-1">
            <h6 className="footer-title mb-2">COMPANY</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>

          </nav>
          <nav className="flex flex-col gap-1">
            <h6 className="footer-title mb-2">LEGAL</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-base-300 py-6 gap-4">
          <div className="flex gap-4">
          
            <a className="btn btn-ghost btn-circle" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
            <a className="btn btn-ghost btn-circle" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          <p className="text-sm opacity-70 text-center md:text-right w-full md:w-auto">
            In case of any issues, contact us at <a href="mailto:prakshilmpatel@gmail.com">prakshilmpatel@gmail.com</a>
          </p>
          <p className="text-sm opacity-70 text-center md:text-right w-full md:w-auto">
            Copyright © 2025 - All rights reserved by RenderBox
          </p>
        </div>
      </div>
    </footer>
  );
}
