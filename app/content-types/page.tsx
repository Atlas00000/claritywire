"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Clock, ThumbsUp, ArrowRight, FileText, BarChart, MessageSquare } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { PageTransition } from "@/components/ui/page-transition"
import { contentTypes } from "@/lib/mock-data"

export default function ContentTypesPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-10 bg-muted rounded w-1/3"></div>
          <div className="h-6 bg-muted rounded w-1/4"></div>
          <div className="h-[200px] bg-muted rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[300px] bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation>
            <div className="space-y-4 mb-12">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Content Types</h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                ClarityWire clearly distinguishes between different types of content to help readers understand the
                nature of what they're reading.
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader className="pb-2">
                  <div className="mb-4">
                    <FileText className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle>Fact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Our fact-based reporting presents verified information with minimal interpretation. These articles
                    focus on what happened, when, where, and who was involved, with rigorous fact-checking and multiple
                    source verification.
                  </p>
                  <Badge className="badge badge-fact">Fact</Badge>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="#fact-examples">View Examples</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader className="pb-2">
                  <div className="mb-4">
                    <BarChart className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle>Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Our analysis pieces go beyond reporting facts to examine patterns, contexts, and implications.
                    Written by subject matter experts, these articles help readers understand the significance of events
                    and developments.
                  </p>
                  <Badge className="badge badge-analysis">Analysis</Badge>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="#analysis-examples">View Examples</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader className="pb-2">
                  <div className="mb-4">
                    <MessageSquare className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle>Opinion</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Our opinion pieces present personal views and arguments on various topics. These articles are
                    authored by columnists, guest contributors, or members of our editorial board, offering a range of
                    perspectives.
                  </p>
                  <Badge className="badge badge-opinion">Opinion</Badge>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="#opinion-examples">View Examples</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={0.2}>
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">How We Approach Content</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600&text=Editorial+Process"
                    alt="Editorial Process"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Our Editorial Process</h3>
                  <p className="text-muted-foreground">
                    At ClarityWire, we believe in transparency about how our content is created and reviewed. Every
                    piece of content goes through a rigorous editorial process designed to ensure accuracy, clarity, and
                    fairness.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary p-1 rounded mr-2 mt-0.5">1</span>
                      <span>
                        <strong>Research & Reporting:</strong> Our journalists gather information from primary sources,
                        conduct interviews, and review relevant data.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary p-1 rounded mr-2 mt-0.5">2</span>
                      <span>
                        <strong>Fact-Checking:</strong> All factual claims are verified by our fact-checking team using
                        multiple reliable sources.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary p-1 rounded mr-2 mt-0.5">3</span>
                      <span>
                        <strong>Editorial Review:</strong> Content is reviewed by editors for accuracy, clarity, and
                        adherence to our editorial standards.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary/10 text-primary p-1 rounded mr-2 mt-0.5">4</span>
                      <span>
                        <strong>Content Labeling:</strong> We clearly label content as Fact, Analysis, or Opinion to
                        help readers understand its nature.
                      </span>
                    </li>
                  </ul>
                  <Button asChild className="mt-4">
                    <Link href="/about/editorial-standards">
                      Learn More About Our Standards <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          <div id="fact-examples" className="scroll-mt-20">
            <ScrollAnimation delay={0.3}>
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6">Fact Reporting Examples</h2>
                <Tabs defaultValue="examples" className="w-full">
                  <TabsList className="w-full mb-6">
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                    <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
                  </TabsList>
                  <TabsContent value="examples" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {contentTypes.fact.map((article) => (
                        <Link key={article.id} href={`/article/${article.slug}`}>
                          <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="relative h-48 w-full overflow-hidden">
                              <Image
                                src={article.image || "/placeholder.svg"}
                                alt={article.title}
                                fill
                                className="object-cover transition-transform duration-300 hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                              <div className="absolute top-2 left-2">
                                <Badge variant="secondary" className="badge badge-fact">
                                  {article.badge}
                                </Badge>
                              </div>
                            </div>
                            <CardHeader className="p-4">
                              <div className="text-sm text-muted-foreground">{article.category}</div>
                              <CardTitle className="line-clamp-2 text-lg">{article.title}</CardTitle>
                            </CardHeader>
                            <CardFooter className="flex items-center justify-between p-4 pt-0">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="mr-1 h-3 w-3" />
                                {article.readTime}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <ThumbsUp className="mr-1 h-3 w-3" />
                                {article.likes}
                              </div>
                            </CardFooter>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="guidelines" className="mt-0">
                    <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                      <h3 className="text-xl font-bold">Fact Reporting Guidelines</h3>
                      <p>
                        Our fact-based reporting adheres to strict journalistic standards to ensure accuracy and
                        reliability. Here's what defines our fact reporting:
                      </p>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>
                          <strong>Verified Information:</strong> All facts are verified through multiple reliable
                          sources before publication.
                        </li>
                        <li>
                          <strong>Clear Attribution:</strong> We clearly attribute information to its sources, allowing
                          readers to assess credibility.
                        </li>
                        <li>
                          <strong>Minimal Interpretation:</strong> Facts are presented with minimal interpretation,
                          focusing on what happened rather than opinions about it.
                        </li>
                        <li>
                          <strong>Contextual Accuracy:</strong> Facts are presented in their proper context to avoid
                          misleading readers.
                        </li>
                        <li>
                          <strong>Transparent Methodology:</strong> We explain how information was gathered and verified
                          when relevant.
                        </li>
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </ScrollAnimation>
          </div>

          <div id="analysis-examples" className="scroll-mt-20">
            <ScrollAnimation delay={0.4}>
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6">Analysis Content Examples</h2>
                <Tabs defaultValue="examples" className="w-full">
                  <TabsList className="w-full mb-6">
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                    <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
                  </TabsList>
                  <TabsContent value="examples" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {contentTypes.analysis.map((article) => (
                        <Link key={article.id} href={`/article/${article.slug}`}>
                          <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="relative h-48 w-full overflow-hidden">
                              <Image
                                src={article.image || "/placeholder.svg"}
                                alt={article.title}
                                fill
                                className="object-cover transition-transform duration-300 hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                              <div className="absolute top-2 left-2">
                                <Badge variant="secondary" className="badge badge-analysis">
                                  {article.badge}
                                </Badge>
                              </div>
                            </div>
                            <CardHeader className="p-4">
                              <div className="text-sm text-muted-foreground">{article.category}</div>
                              <CardTitle className="line-clamp-2 text-lg">{article.title}</CardTitle>
                            </CardHeader>
                            <CardFooter className="flex items-center justify-between p-4 pt-0">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="mr-1 h-3 w-3" />
                                {article.readTime}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <ThumbsUp className="mr-1 h-3 w-3" />
                                {article.likes}
                              </div>
                            </CardFooter>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="guidelines" className="mt-0">
                    <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                      <h3 className="text-xl font-bold">Analysis Content Guidelines</h3>
                      <p>
                        Our analysis content goes beyond reporting facts to examine patterns, contexts, and
                        implications. Here's what defines our analysis content:
                      </p>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>
                          <strong>Expert Interpretation:</strong> Analysis is provided by subject matter experts with
                          relevant credentials and experience.
                        </li>
                        <li>
                          <strong>Evidence-Based:</strong> All analysis is grounded in verifiable facts and evidence.
                        </li>
                        <li>
                          <strong>Multiple Perspectives:</strong> We consider different viewpoints and interpretations
                          of the facts.
                        </li>
                        <li>
                          <strong>Clear Reasoning:</strong> The logic and reasoning behind analytical conclusions are
                          made transparent.
                        </li>
                        <li>
                          <strong>Distinction from Opinion:</strong> Analysis focuses on explaining what facts mean
                          rather than advocating for specific positions.
                        </li>
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </ScrollAnimation>
          </div>

          <div id="opinion-examples" className="scroll-mt-20">
            <ScrollAnimation delay={0.5}>
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6">Opinion Content Examples</h2>
                <Tabs defaultValue="examples" className="w-full">
                  <TabsList className="w-full mb-6">
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                    <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
                  </TabsList>
                  <TabsContent value="examples" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {contentTypes.opinion.map((article) => (
                        <Link key={article.id} href={`/article/${article.slug}`}>
                          <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="relative h-48 w-full overflow-hidden">
                              <Image
                                src={article.image || "/placeholder.svg"}
                                alt={article.title}
                                fill
                                className="object-cover transition-transform duration-300 hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                              <div className="absolute top-2 left-2">
                                <Badge variant="secondary" className="badge badge-opinion">
                                  {article.badge}
                                </Badge>
                              </div>
                            </div>
                            <CardHeader className="p-4">
                              <div className="text-sm text-muted-foreground">{article.category}</div>
                              <CardTitle className="line-clamp-2 text-lg">{article.title}</CardTitle>
                            </CardHeader>
                            <CardFooter className="flex items-center justify-between p-4 pt-0">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="mr-1 h-3 w-3" />
                                {article.readTime}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <ThumbsUp className="mr-1 h-3 w-3" />
                                {article.likes}
                              </div>
                            </CardFooter>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="guidelines" className="mt-0">
                    <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                      <h3 className="text-xl font-bold">Opinion Content Guidelines</h3>
                      <p>
                        Our opinion content presents personal views and arguments on various topics. Here's what defines
                        our opinion content:
                      </p>
                      <ul className="space-y-2 list-disc pl-5">
                        <li>
                          <strong>Clear Labeling:</strong> All opinion content is clearly labeled as such to distinguish
                          it from fact reporting and analysis.
                        </li>
                        <li>
                          <strong>Diverse Perspectives:</strong> We publish opinions from across the political and
                          ideological spectrum.
                        </li>
                        <li>
                          <strong>Factual Foundation:</strong> While opinions reflect personal views, they must be
                          grounded in accurate facts.
                        </li>
                        <li>
                          <strong>Author Transparency:</strong> Opinion authors are clearly identified along with
                          relevant background information.
                        </li>
                        <li>
                          <strong>Reasoned Arguments:</strong> Opinions must present coherent, reasoned arguments rather
                          than mere assertions.
                        </li>
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </ScrollAnimation>
          </div>

          <ScrollAnimation delay={0.6}>
            <div className="bg-muted/50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Have Questions About Our Content Types?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                If you have questions about how we categorize content or our editorial standards, we're here to help.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild>
                  <Link href="/about/editorial-standards">Editorial Standards</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </PageTransition>
  )
}
