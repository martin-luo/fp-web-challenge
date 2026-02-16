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
      <section>
        <Typography>Please enter your personal information</Typography>
      </section>
      <Stack spacing={2} sx={{ mt: 2 }}>
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
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </form>
  );
};
