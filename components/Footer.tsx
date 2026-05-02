export default function Footer() {
  return (
    <footer className="border-t border-[#1e1e1e] w-full px-6 md:px-10 py-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center font-mono text-[10px] tracking-widest">
        <div className="text-outline">© 2025 Noah Zuppiger</div>
        <ul className="flex gap-6">
          <li>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-outline hover:text-primary transition-colors duration-150"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-outline hover:text-primary transition-colors duration-150"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="mailto:noah@example.com"
              className="text-outline hover:text-primary transition-colors duration-150"
            >
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
