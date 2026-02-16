import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import membershipTiers from "@/assets/membership-tiers.json";

export type MembershipSelection = {
  membershipId: string;
};

type MembershipFormProps = {
  requiresMedicalClearance: boolean;
  initialMembershipId?: string;
  onSubmit: (data: MembershipSelection) => void;
  onBack: () => void;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const MembershipForm = ({
  requiresMedicalClearance,
  initialMembershipId,
  onSubmit,
  onBack,
}: MembershipFormProps) => {
  const [selectedMembershipId, setSelectedMembershipId] = useState(
    initialMembershipId ?? "",
  );
  const [warningOpen, setWarningOpen] = useState(false);

  const isRestrictedTier = (tier: (typeof membershipTiers)[number]) =>
    requiresMedicalClearance && tier.accessHours === "24/7";

  const handleSelect = (event: SelectChangeEvent<string>) => {
    const value = String(event.target.value || "");
    const tier = membershipTiers.find((item) => item.id === value);

    if (tier && isRestrictedTier(tier)) {
      setWarningOpen(true);
      return;
    }

    setSelectedMembershipId(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedMembershipId) return;

    onSubmit({ membershipId: selectedMembershipId });
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
            Choose Your Membership
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Select a plan that matches your schedule and goals.
          </Typography>
          {requiresMedicalClearance && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Some 24/7 memberships require medical clearance based on your
              health selections.
            </Typography>
          )}
        </section>

        <FormControl fullWidth>
          <InputLabel id="membership-tier-label">Membership</InputLabel>
          <Select
            labelId="membership-tier-label"
            id="membership-tier"
            value={selectedMembershipId}
            label="Membership"
            onChange={handleSelect}
            renderValue={(selected) => {
              const tier = membershipTiers.find((item) => item.id === selected);
              return tier ? tier.name : "";
            }}
          >
            {membershipTiers.map((tier) => {
              const restricted = isRestrictedTier(tier);
              return (
                <MenuItem
                  key={tier.id}
                  value={tier.id}
                  aria-disabled={restricted}
                  sx={{
                    opacity: restricted ? 0.5 : 1,
                  }}
                >
                  <ListItemText
                    primary={tier.name}
                    secondary={`${currencyFormatter.format(
                      tier.price,
                    )} / ${tier.billingPeriod} • ${tier.accessHours}`}
                  />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

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
            disabled={!selectedMembershipId}
            fullWidth
          >
            Continue
          </Button>
        </Stack>
      </Stack>

      <Snackbar
        open={warningOpen}
        autoHideDuration={5000}
        onClose={() => setWarningOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="warning" onClose={() => setWarningOpen(false)}>
          24/7 memberships require medical clearance based on your health
          selections. Please choose a staffed-hours plan so our team can assist
          you safely.
        </Alert>
      </Snackbar>
    </form>
  );
};
