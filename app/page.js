'use client'
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Box, Grid, Toolbar, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Image from "next/image";

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
