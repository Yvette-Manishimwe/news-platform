import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import RelatedArticles from "@/components/related-articles"

// This would normally come from an API based on the article ID
const getArticleData = (id: string) => {
  const articles = {
    "1": {
      title: "Global Climate Summit Reaches Historic Agreement",
      category: "Politics",
      author: "Jane Smith",
      date: "March 10, 2025",
      readTime: "8 min read",
      imageUrl: "/placeholder.svg?height=400&width=800",
      content: `
        <p>World leaders have reached a groundbreaking agreement at the Global Climate Summit, pledging to reduce carbon emissions by 50% before 2030.</p>
        
        <p>The historic pact, signed by 195 countries, represents the most ambitious climate action plan to date and signals a unified global response to the escalating climate crisis.</p>
        
        <h2>Unprecedented Cooperation</h2>
        
        <p>The agreement comes after two weeks of intense negotiations, during which developed and developing nations bridged long-standing divides on responsibility and financing.</p>
        
        <p>"This is a defining moment for our planet," said UN Secretary-General in his closing remarks. "For the first time, we have a truly global commitment that matches the scale of the challenge we face."</p>
        
        <p>Key provisions of the agreement include:</p>
        
        <ul>
          <li>A binding commitment to reduce global carbon emissions by 50% from 2010 levels by 2030</li>
          <li>A $100 billion annual fund to help developing nations transition to clean energy</li>
          <li>Phasing out coal power in developed countries by 2030 and globally by 2040</li>
          <li>Accelerated deployment of renewable energy, with a target of 70% of global electricity from clean sources by 2035</li>
        </ul>
        
        <h2>Economic Transformation</h2>
        
        <p>The agreement is expected to accelerate the global transition to a green economy, creating millions of jobs in renewable energy, sustainable agriculture, and clean transportation.</p>
        
        <p>Market analysts predict the pact will drive unprecedented investment in climate solutions, potentially unlocking over $3 trillion in green infrastructure spending over the next decade.</p>
        
        <p>"This agreement sends a clear signal to markets and investors that the future is low-carbon," said the EU Climate Commissioner. "The economic opportunities are enormous for those who lead this transition."</p>
        
        <h2>Challenges Ahead</h2>
        
        <p>Despite the historic nature of the agreement, implementation challenges remain. Countries must now translate their commitments into national policies and investment plans.</p>
        
        <p>Climate activists have welcomed the agreement while emphasizing the need for accountability mechanisms to ensure countries follow through on their pledges.</p>
        
        <p>"This is a crucial first step, but the real work begins now," said Greenpeace International's Executive Director. "We need to see these promises turned into immediate action."</p>
        
        <p>The agreement establishes a robust monitoring and reporting system, with countries required to submit progress reports every two years and face international review of their climate actions.</p>
        
        <h2>Public Response</h2>
        
        <p>Public reaction to the agreement has been overwhelmingly positive, with polls showing strong support across both developed and developing nations.</p>
        
        <p>A recent global survey found that 78% of respondents consider climate change a "major threat" and 82% support stronger government action to address it.</p>
        
        <p>The agreement's ambitious targets align with scientific consensus on what's needed to limit global warming to 1.5°C above pre-industrial levels and avoid the most catastrophic impacts of climate change.</p>
        
        <p>As nations begin implementing the agreement, the next five years will be critical in determining whether this historic moment truly marks a turning point in humanity's response to the climate crisis.</p>
      `,
    },
    "2": {
      title: "Tech Giant Unveils Revolutionary AI Assistant",
      category: "Technology",
      author: "Michael Chen",
      date: "March 10, 2025",
      readTime: "6 min read",
      imageUrl: "/placeholder.svg?height=400&width=800",
      content: `
        <p>A leading tech company has announced a breakthrough in artificial intelligence, launching an assistant that can understand and respond to complex human emotions.</p>
        
        <p>The new AI system, called "Empathia," represents a quantum leap in emotional intelligence for digital assistants and could transform how humans interact with technology.</p>
        
        <h2>Beyond Voice Commands</h2>
        
        <p>Unlike conventional AI assistants that primarily respond to direct commands, Empathia can detect subtle emotional cues in a user's voice, facial expressions, and language patterns.</p>
        
        <p>"This isn't just about understanding what users are saying, but how they're feeling when they say it," explained the company's Chief AI Officer during the product launch. "Empathia can recognize frustration, excitement, confusion, or distress, and adapt its responses accordingly."</p>
        
        <p>The system utilizes a new neural network architecture that processes multiple data streams simultaneously, creating what developers call an "emotional context layer" that informs all interactions.</p>
        
        <h2>Real-World Applications</h2>
        
        <p>The company envisions wide-ranging applications for the technology, from customer service and healthcare to education and entertainment.</p>
        
        <p>In healthcare settings, early trials show Empathia can help monitor patients' emotional states, potentially identifying signs of depression or anxiety that might otherwise go unnoticed.</p>
        
        <p>Educational applications allow the AI to detect when students are confused or disengaged, adjusting teaching methods in real-time to improve learning outcomes.</p>
        
        <p>For everyday users, the assistant aims to provide more natural and supportive interactions, from offering encouragement during difficult tasks to recognizing when humor might help defuse tension.</p>
        
        <h2>Privacy and Ethical Considerations</h2>
        
        <p>The launch has prompted discussion about the privacy implications of AI systems that can analyze emotional states.</p>
        
        <p>The company emphasizes that all emotional processing occurs on-device, with no data sent to cloud servers without explicit user permission. Users can also disable emotional analysis features entirely while retaining the assistant's basic functionality.</p>
        
        <p>An independent ethics board was established during Empathia's development to address concerns about manipulation or psychological impact.</p>
        
        <p>"We've implemented strict guidelines to ensure Empathia never exploits emotional vulnerabilities or attempts to artificially influence users' emotional states," said the head of the ethics board.</p>
        
        <h2>Market Impact and Competition</h2>
        
        <p>Industry analysts predict Empathia could reshape the competitive landscape for AI assistants, potentially giving the company a significant advantage in the rapidly evolving market.</p>
        
        <p>"This represents the next frontier in human-computer interaction," noted a leading tech analyst. "Companies that can't match this level of emotional intelligence may find themselves struggling to remain relevant."</p>
        
        <p>Competitors are reportedly accelerating their own emotional AI research in response to the announcement, though most are believed to be at least 18-24 months behind in development.</p>
        
        <p>The company's stock surged 15% following the announcement, adding billions to its market capitalization as investors recognized the potential long-term impact of the technology.</p>
        
        <h2>Looking Ahead</h2>
        
        <p>Empathia will be rolled out gradually over the next six months, beginning with a limited beta program for developers and enterprise customers.</p>
        
        <p>The company has announced plans to open portions of the emotional recognition framework to third-party developers, potentially spurring innovation across multiple industries.</p>
        
        <p>"We're just scratching the surface of what's possible when AI can truly understand human emotions," said the company's CEO. "This technology has the potential to make digital experiences fundamentally more human."</p>
        
        <p>As AI continues to evolve from tool to companion, Empathia represents a significant milestone in creating technology that responds not just to what we say, but to how we feel.</p>
      `,
    },
    "3": {
      title: "Sports Championship Ends with Unexpected Victory",
      category: "Sports",
      author: "Robert Johnson",
      date: "March 9, 2025",
      readTime: "5 min read",
      imageUrl: "/placeholder.svg?height=400&width=800",
      content: `
        <p>In a stunning turn of events, the underdog team claimed victory in the championship final, overcoming the defending champions with a last-minute score.</p>
        
        <p>The dramatic conclusion to the season-long tournament has been hailed as one of the greatest upsets in the sport's history, captivating fans worldwide.</p>
        
        <h2>Against All Odds</h2>
        
        <p>Entering the championship as 15-to-1 underdogs, few gave the challengers any chance against the dominant defending champions, who had lost only two matches all season.</p>
        
        <p>"Nobody believed in us except the people in our locker room," said the team's captain after lifting the trophy. "We used that doubt as fuel every single day."</p>
        
        <p>The underdogs' journey to the final was itself remarkable, requiring three consecutive away victories against higher-ranked opponents in the playoff rounds.</p>
        
        <h2>A Match for the Ages</h2>
        
        <p>The final lived up to its billing as a classic, with momentum swinging dramatically throughout the contest.</p>
        
        <p>The defending champions started strongly, building what seemed an insurmountable lead in the first half. But the challengers mounted a methodical comeback, narrowing the gap point by point.</p>
        
        <p>With just 30 seconds remaining and trailing by two points, the underdogs executed a perfectly planned play that resulted in the championship-winning score as time expired.</p>
        
        <p>"That final sequence is something we've practiced hundreds of times," revealed the head coach. "The players executed under immense pressure exactly as we had prepared."</p>
        
        <h2>A Star Is Born</h2>
        
        <p>The match also marked the emergence of a new sporting star, as the underdogs' 21-year-old rookie delivered a performance for the ages on the biggest stage.</p>
        
        <p>Contributing directly to over half the team's points, including the decisive final play, the young athlete set a new championship record and was unanimously named Most Valuable Player.</p>
        
        <p>"This is beyond any dream I had growing up," said the emotional young star during the post-match ceremony. "But this was a complete team effort – every single person contributed to this moment."</p>
        
        <h2>Celebrations and Looking Ahead</h2>
        
        <p>Thousands of fans greeted the team upon their return home, with a victory parade scheduled through the city center later this week.</p>
        
        <p>The championship victory caps a remarkable turnaround for an organization that finished at the bottom of the standings just three years ago before embarking on an ambitious rebuilding program.</p>
        
        <p>Sports analysts are already debating whether this victory represents a changing of the guard or a one-time upset, with the defending champions vowing to reclaim their title next season.</p>
        
        <p>"We'll celebrate this achievement, but we're not satisfied with just one championship," declared the team owner. "This is the beginning of what we're building, not the end."</p>
        
        <p>For now, though, the underdogs have their moment in the spotlight – proof that in sports, as in life, the seemingly impossible sometimes happens.</p>
      `,
    },
  }

  return articles[id as keyof typeof articles] || null
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const article = getArticleData(params.id)

  if (!article) {
    return (
      <div className="container flex h-[50vh] flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Article not found</h1>
        <p className="mt-2 text-muted-foreground">The article you're looking for doesn't exist or has been removed.</p>
        <Button asChild className="mt-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">NewsHub</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Register</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all articles
          </Link>

          <div className="mb-4">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {article.category}
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{article.title}</h1>

          <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>{article.readTime}</span>
            </div>
          </div>

          <div className="mb-8 aspect-video overflow-hidden rounded-lg">
            <img
              src={article.imageUrl || "/placeholder.svg"}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <Separator className="my-12" />

          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
            <RelatedArticles currentArticleId={params.id} />
          </div>
        </div>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 NewsHub. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/about" className="underline underline-offset-4 hover:text-foreground">
              About
            </Link>
            <Link href="/contact" className="underline underline-offset-4 hover:text-foreground">
              Contact
            </Link>
            <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

