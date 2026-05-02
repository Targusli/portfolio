export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 w-full px-6 md:px-10 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center font-mono text-[10px] tracking-widest uppercase">
        <div className="text-neutral-500">© 2024 NOAH ZUPPIGER ALL RIGHTS RESERVED</div>
        <ul className="flex gap-6">
          <li>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-blue-400 transition-colors duration-150"
            >
              LINKEDIN
            </a>
          </li>
          <li>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-blue-400 transition-colors duration-150"
            >
              GITHUB
            </a>
          </li>
          <li>
            <a
              href="mailto:noah@example.com"
              className="text-neutral-500 hover:text-blue-400 transition-colors duration-150"
            >
              EMAIL
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
