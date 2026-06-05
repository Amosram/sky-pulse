import React from 'react'
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="text-center py-6 bg-blue-900 text-white/60 text-xs w-full">
        <p>
        Built with{" "}
        <Link href="https://weather-ai.co" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            WeatherAI API
        </Link>{" "}
        · Next.js · Tailwind CSS
        </p>
    </footer>

  )
}

export default Footer
