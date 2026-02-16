import { Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";

export type PersonalInformation = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
};

type PersonalInformationFormProps = {
  onSubmit: (data: PersonalInformation) => void;
};

export const PersonalInformationForm = ({
  onSubmit,
}: PersonalInformationFormProps) => {
  const latestDataRef = React.useRef<PersonalInformation | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // todo: add form validation and error handling

    const formData = new FormData(event.currentTarget);
    const data: PersonalInformation = {
      firstName: String(formData.get("firstName") || ""),
      lastName: String(formData.get("lastName") || ""),
      email: String(formData.get("email") || ""),
      mobile: String(formData.get("mobile") || ""),
    };

    latestDataRef.current = data;
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        spacing={{ xs: 2, sm: 2.5, md: 3 }}
        sx={{
          mx: "auto",
          maxWidth: 720,
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, sm: 3 },
        }}
      >
        <section>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Personal Information
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please provide your contact details so we can create your account.
          </Typography>
        </section>
        <TextField
          label="First name"
          name="firstName"
          id="firstName"
          autoComplete="given-name"
          fullWidth
          required
        />
        <TextField
          label="Last name"
          name="lastName"
          id="lastName"
          autoComplete="family-name"
          fullWidth
          required
        />
        <TextField
          label="Email"
          name="email"
          id="email"
          type="email"
          autoComplete="email"
          fullWidth
          required
        />
        <TextField
          label="Mobile"
          name="mobile"
          id="mobile"
          type="tel"
          autoComplete="tel"
          fullWidth
          required
        />
        <Button type="submit" variant="contained" fullWidth>
          Submit
        </Button>
      </Stack>
    </form>
  );
};
