import logo from "../assets/logo2.png"
import { SOCIAL_MEDIA_LINKS } from "../constants"

const Footer = () => {
  return (
    <div className="mb-8 mt-20 px-4"> {/* Added px-4 for mobile padding */}
      <div className="flex items-center justify-center">
        <img
        src={logo} width={200} className="my-20" alt="logo" />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-8"> {/* Added flex-wrap */}
        {SOCIAL_MEDIA_LINKS.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl sm:text-2xl"
          >
            {link.icon}
          </a>
        ))}
      </div>
      <p className="mt-8 text-center text-sm tracking-wide text-gray-400">
        &copy; Dino@rmy. All rights reserved.
      </p>
    </div>
  )
}

export default Footer
