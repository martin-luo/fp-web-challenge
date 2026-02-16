"use client";

import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const REDIRECT_SECONDS = 4;

export default function ConfirmationPage() {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    const timeoutId = window.setTimeout(() => {
      router.replace("/");
    }, REDIRECT_SECONDS * 1000);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [router]);

  return (
    <Stack
      spacing={{ xs: 2, sm: 2.5, md: 3 }}
      sx={{
        minHeight: "100vh",
        mx: "auto",
        maxWidth: 720,
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 6, sm: 8 },
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Welcome aboard!
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Your registration is complete. We are getting your account ready.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Redirecting to the landing page in {secondsLeft}s.
      </Typography>
      <Button variant="contained" onClick={() => router.replace("/")}>
        Go to landing page
      </Button>
    </Stack>
  );
}
