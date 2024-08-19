'use client'
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Box, Grid, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { origin: "http://localhost:3000" },
    });
    const checkoutSessionJson = await checkoutSession.json();

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link
          href="/"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <h2 className="text-2xl font-bold">A Level Flash</h2>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <SignedOut>
            <Link color="inherit" href="/sign-in">
              Login
            </Link>
            <Link color="inherit" href="/sign-up">
              Sign Up
            </Link>
          </SignedOut>
          <SignedIn className="flex items-center">
            <Link
              href="/learn"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Dashboard
            </Link>
            <UserButton />
          </SignedIn>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 sm:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Ace Your A Levels with AI-Powered Flashcards
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our AI-driven flashcard generator creates personalized study
                    materials to help you master your A Level subjects and
                    achieve top grades.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <img
                src="/hero.webp"
                width="600"
                height="600"
                alt="Hero"
                className="mx-auto  overflow-hidden rounded-xl object-bottom lg:w-[800px] lg:order-last object-cover"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Unlock Your A Level Potential
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI-powered flashcard generator provides the ultimate study
                  tool to help you conquer your A Level exams.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Personalized Content
                      </h3>
                      <p className="text-muted-foreground">
                        Our AI analyzes your strengths and weaknesses to create
                        tailored flashcards and study plans.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Adaptive Learning</h3>
                      <p className="text-muted-foreground">
                        The app adjusts the difficulty and frequency of
                        flashcards based on your progress, ensuring efficient
                        and effective learning.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Gamified Experience</h3>
                      <p className="text-muted-foreground">
                        Earn points, badges, and compete with friends to make
                        studying fun and engaging.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <img
                src="/subsction.webp"
                width="550"
                height="310"
                alt="Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-4 px-4 md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Take the Stress Out of A Level Prep
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our AI-powered flashcard generator makes studying for your A
                Levels easier and more effective than ever before.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex gap-2">
                <Button type="submit">Get Started</Button>
              </form>
              <p className="text-xs text-muted-foreground">
                Sign up to start using our AI-powered flashcard generator today.{" "}
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 A Level Flashcard Generator. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function BookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}
{
  /* <main className="flex min-h-screen flex-col items-center justify-between p-24">
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        Flashcard SaaS
      </Typography>
      <SignedOut>
        <Button color="inherit" href="/sign-in">
          Login
        </Button>
        <Button color="inherit" href="/sign-up">
          Sign Up
        </Button>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </Toolbar>
  </AppBar>

  <Box sx={{ textAlign: "center", my: 4 }}>
    <Typography variant="h2" component="h1" gutterBottom>
      Welcome to Flashcard SaaS
    </Typography>
    <Typography variant="h5" component="h2" gutterBottom>
      The easiest way to create flashcards from your text.
    </Typography>
    <Button
      variant="contained"
      color="primary"
      sx={{ mt: 2, mr: 2 }}
      href="/generate"
    >
      Get Started
    </Button>
    <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
      Learn More
    </Button>
  </Box>

      <Box sx={{ my: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs = {12} md  = {4}>
            <Typography variant = "h6">Easy text input</Typography> 
            <Typography>
              {''}
              Simply put your input and let our software do the rest
              </Typography>
          </Grid>
          <Grid item xs = {12} md  = {4}>
            <Typography variant = "h6">Smart Flashcards</Typography> 
            <Typography>
              {''}
              Simply put your input and let our software do the rest
              </Typography>
          </Grid>
          <Grid item xs = {12} md  = {4}>
            <Typography variant = "h6">Accessible Anywhere</Typography> 
            <Typography>
              {''}
              Simply put your input and let our software do the rest
              </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs = {12} md  = {6}>
            <Box sx = {{
              p:3,
              border:'1px solid',
              borderColor:'grey.300',
              borderRadius:2,
            }}>
              <Typography variant = "h5" gutterBottom>Basic</Typography>
              <Typography variant = "h6">$5/month</Typography> 
              <Typography>
                {''}
                Access to basic flashcard features and limited storage 
              </Typography>
              <Button variant = "contained" color = "primary">Choose Basic</Button>
            </Box>
            
          </Grid>
          <Grid item xs = {12} md  = {6}>
            <Box sx = {{
              p:3,
              border:'1px solid',
              borderColor:'grey.300',
              borderRadius:2,
            }}>
              <Typography variant = "h5" gutterBottom>Pro</Typography>
              <Typography variant = "h6">$10/month</Typography> 
              <Typography>
                {''}
                Access to unlimited flashcard features and storage, an priority support.
              </Typography>
              <Button variant = "contained" color = "primary" onClick = {handleSubmit}>Choose Pro</Button>
            </Box>  
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
