import { register } from "@/_actions/auth";
import {
  Alert,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import healthConditions from "@/assets/health-conditions.json";
import membershipTiers from "@/assets/membership-tiers.json";
import { HealthInfoDisclaimerData } from "./health-info-disclaimer-form";
import { MembershipSelection } from "./membership-form";
import { PasswordFormData } from "./password-form";
import { PersonalInformation } from "./personal-information-form";

type ReviewFormProps = {
  personalInfo: PersonalInformation | null;
  healthInfo: HealthInfoDisclaimerData | null;
  membership: MembershipSelection | null;
  onBack: () => void;
};

const getConditionNames = (ids: string[]) =>
  ids.map(
    (id) =>
      healthConditions.find((condition) => condition.id === id)?.name || id,
  );

const getMembershipDetails = (id: string) =>
  membershipTiers.find((tier) => tier.id === id);

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const ReviewForm = ({
  personalInfo,
  healthInfo,
  membership,
  onBack,
}: ReviewFormProps) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleConfirm = async () => {
    if (!personalInfo || !membership) {
      setError("Missing required information. Please review your details.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { token } = await register({
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        email: personalInfo.email,
        membershipId: membership.membershipId,
      });
      localStorage.setItem("auth_token", token);
      // todo: redirect to confirmation page
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const healthConditionNames = getConditionNames(
    healthInfo?.selectedConditionIds ?? [],
  );

  return (
    <Stack
      spacing={{ xs: 2, sm: 2.5, md: 3 }}
      sx={{
        mx: "auto",
        maxWidth: 860,
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2, sm: 3 },
      }}
    >
      <section>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Review and Confirm
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please confirm your details before submitting your registration.
        </Typography>
      </section>

      {error && <Alert severity="error">{error}</Alert>}

      <Stack spacing={2}>
        <Paper variant="outlined" sx={{ p: { xs: 2, sm: 2.5 } }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
            Personal Information
          </Typography>
          <Stack spacing={0.5}>
            <Typography variant="body2" color="text.secondary">
              {personalInfo
                ? `${personalInfo.firstName} ${personalInfo.lastName}`.trim()
                : "Not provided"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {personalInfo?.email || "Not provided"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {personalInfo?.mobile || "Not provided"}
            </Typography>
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: { xs: 2, sm: 2.5 } }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
            Health Information
          </Typography>
          {healthConditionNames.length > 0 ? (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {healthConditionNames.map((name) => (
                <Chip key={name} label={name} size="small" />
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              None selected
            </Typography>
          )}
        </Paper>

        <Paper variant="outlined" sx={{ p: { xs: 2, sm: 2.5 } }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
            Membership
          </Typography>
          {membership?.membershipId ? (
            (() => {
              const tier = getMembershipDetails(membership.membershipId);
              if (!tier) {
                return (
                  <Typography variant="body2" color="text.secondary">
                    {membership.membershipId}
                  </Typography>
                );
              }
              return (
                <Stack spacing={0.5}>
                  <Typography variant="body2" color="text.secondary">
                    {tier.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currencyFormatter.format(tier.price)} /{" "}
                    {tier.billingPeriod}
                  </Typography>
                </Stack>
              );
            })()
          ) : (
            <Typography variant="body2" color="text.secondary">
              Not selected
            </Typography>
          )}
        </Paper>
      </Stack>

      <Stack
        direction={{ xs: "column-reverse", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
      >
        <Button type="button" variant="outlined" onClick={onBack} fullWidth>
          Back
        </Button>
        <Button
          type="button"
          variant="contained"
          fullWidth
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Confirm & Submit"}
        </Button>
      </Stack>
    </Stack>
  );
};
