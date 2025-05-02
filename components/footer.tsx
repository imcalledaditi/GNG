import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Phone, Mail, Linkedin, MapPin } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer id="contact-us" className="bg-green-900 text-white py-20 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Newsletter */}
          <div className="md:col-span-4">
            <h3 className="text-2xl font-bold mb-6">Subscribe Newsletter</h3>
            <p className="mb-6 text-gray-300">
              Sign up today and take the first step towards a healthier, more balanced lifestyle.
            </p>

            <div className="mb-4">
              <Input type="email" placeholder="Enter email" className="bg-white text-black h-12" />
            </div>

            <Button className="btn-animated bg-yellow-500 hover:bg-yellow-600 text-black w-full font-medium">
              Subscribe Now
            </Button>
          </div>

          {/* All Courses */}
          <div className="md:col-span-4 md:flex md:justify-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">All Courses</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="#" className="hover:text-green-300 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Daily Exercise
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-300 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Find Your Balance
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-300 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Personal Program
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-300 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Natural Process
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-300 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Immune System
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-300 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Gives You Energy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Us */}
          <div className="md:col-span-4">
            <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center group">
                <Phone className="mr-3 text-green-400 group-hover:text-green-300 transition-colors" size={20} />
                <span className="group-hover:text-green-300 transition-colors">+91 9830355603</span>
              </li>
              <li className="flex items-center group">
                <Mail className="mr-3 text-green-400 group-hover:text-green-300 transition-colors" size={20} />
                <span className="group-hover:text-green-300 transition-colors">royaditiindia@gmail.com</span>
              </li>
              <li className="flex items-center group">
                <Linkedin className="mr-3 text-green-400 group-hover:text-green-300 transition-colors" size={20} />
                <span className="group-hover:text-green-300 transition-colors">LinkedIn</span>
              </li>
              <li className="flex items-center group">
                <MapPin className="mr-3 text-green-400 group-hover:text-green-300 transition-colors" size={20} />
                <span className="group-hover:text-green-300 transition-colors">Chennai, Tamil Nadu, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mantis Artwork */}
      <div className="absolute bottom-10 right-10 w-64 h-64">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/300px-Mantis_Prestige_Artwork-lpaTKsld8QpKzzL6EsjgRDHAsFH2OX.png"
          alt="Mantis Prestige Artwork"
          width={300}
          height={300}
        />
      </div>

      {/* Copyright */}
      <div className="mt-8 pt-4 border-t border-green-800 text-center text-sm text-gray-300">
        <p>© {new Date().getFullYear()} Grub & Grind. All rights reserved.</p>
      </div>
    </footer>
  )
}
