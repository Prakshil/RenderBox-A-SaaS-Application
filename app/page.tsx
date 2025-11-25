import Link from "next/link";
import { ArrowRight, Video, Image as ImageIcon, Share2, Zap, Shield, Cloud } from "lucide-react";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Navbar */}
      <nav className="navbar bg-base-100 border-b border-base-300 sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 btn btn-ghost normal-case text-2xl font-display font-bold text-primary px-0">
            <Cloud className="w-8 h-8" />
            RenderBox
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/sign-in" className="btn btn-ghost">
              Sign In
            </Link>
            <Link href="/sign-up" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="badge badge-primary badge-lg mb-6">New Feature Available</div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-base-content">
              Transform Your Media
              <span className="text-primary"> Effortlessly</span>
            </h1>
            <p className="text-xl text-base-content/70 mb-8 leading-relaxed">
              Upload, optimize, and share your videos and images with powerful cloud-based tools.
              Compress files, create social media assets, and manage your media library all in one place.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/sign-up" className="btn btn-primary btn-lg">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/home" className="btn btn-outline btn-lg">
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-base-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Everything you need to manage and transform your media files
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="card-body items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <Video className="w-12 h-12 text-primary" />
                </div>
                <h3 className="card-title font-display">Video Compression</h3>
                <p className="text-base-content/70">
                  Automatically compress and optimize your videos while maintaining quality. 
                  Save storage space and bandwidth.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="card-body items-center text-center">
                <div className="p-4 bg-secondary/10 rounded-full mb-4">
                  <Share2 className="w-12 h-12 text-secondary" />
                </div>
                <h3 className="card-title font-display">Social Media Ready</h3>
                <p className="text-base-content/70">
                  Transform images to perfect dimensions for Instagram, Twitter, Facebook, 
                  and more platforms instantly.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="card-body items-center text-center">
                <div className="p-4 bg-accent/10 rounded-full mb-4">
                  <Zap className="w-12 h-12 text-accent" />
                </div>
                <h3 className="card-title font-display">Lightning Fast</h3>
                <p className="text-base-content/70">
                  Powered by Cloudinary's CDN network for blazing-fast uploads 
                  and transformations worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">How It Works</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-content rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">Upload Your Files</h3>
              <p className="text-base-content/70">
                Drag and drop your videos or images, or browse to select files from your device.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary text-secondary-content rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">Automatic Processing</h3>
              <p className="text-base-content/70">
                Our system automatically optimizes and transforms your media using AI-powered tools.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent text-accent-content rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">Download & Share</h3>
              <p className="text-base-content/70">
                Download your optimized files or share them directly to your favorite platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-content">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Ready to Transform Your Media?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of creators who trust our platform for their media needs.
          </p>
          <Link href="/sign-up" className="btn btn-secondary btn-lg">
            Start Your Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}