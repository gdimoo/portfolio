import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center pt-20 pb-16 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-primary font-mono text-sm tracking-wide">
              Hello, I am
            </p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground text-balance">
              Siripra Kingchan
            </h1>
          </div>

          <p className="text-muted-foreground leading-relaxed max-w-2xl text-pretty">
            I am a <span className="text-foreground font-medium">Digital Innovation Lead</span> and
            <span className="text-foreground font-medium">Computer Science Educator</span> at Ubon Ratchathani University,
            specializing in <span className="text-foreground font-medium">Artificial Intelligence</span> and
            <span className="text-foreground font-medium">Full Stack Development</span>.
            With a background as a <span className="text-foreground font-medium">Team Lead</span> in enterprise-level manufacturing,
            my mission is to bridge the gap between academic research and industrial applications.
            I leverage AI and <span className="text-foreground font-medium">Data Pipelines</span> to drive digital transformation,
            particularly in healthcare and smart logistics, to foster sustainable economic growth in my home province.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Button asChild className="group">
              <Link href="#projects">
                View Projects
                <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="#experience">Experience</Link>
            </Button>
          </div>

          <div className="flex items-center gap-4 pt-6">
            <Link
              href="https://github.com/gdimoo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://linkedin.com/in/siripra-kingchan-973387211"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="mailto:siripra.k@ubu.ac.th"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
