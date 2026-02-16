import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";

export type PasswordFormData = {
  password: string;
};

type PasswordFormProps = {
  onSubmit: (data: PasswordFormData) => void;
  onBack: () => void;
  isLoading?: boolean;
  error?: string;
};

export const PasswordForm = ({
  onSubmit,
  onBack,
  isLoading = false,
  error,
}: PasswordFormProps) => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!passwordsMatch) return;
    onSubmit({ password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        spacing={{ xs: 2, sm: 2.5, md: 3 }}
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, sm: 3 },
        }}
      >
        <section>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Almost there!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please create a password and store it securely. You will need it to
            sign in.
          </Typography>
        </section>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Password"
          name="password"
          id="password"
          type="password"
          autoComplete="new-password"
          fullWidth
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <TextField
          label="Confirm password"
          name="confirmPassword"
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          fullWidth
          required
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          error={confirmPassword.length > 0 && !passwordsMatch}
          helperText={
            confirmPassword.length > 0 && !passwordsMatch
              ? "Passwords must match."
              : " "
          }
        />

        <Stack
          direction={{ xs: "column-reverse", sm: "row" }}
          spacing={2}
          justifyContent="space-between"
        >
          <Button type="button" variant="outlined" onClick={onBack} fullWidth>
            Back
          </Button>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!passwordsMatch || isLoading}
          >
            {isLoading ? "Submitting..." : "Confirm & Submit"}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
