import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import healthConditions from "@/assets/health-conditions.json";

export type HealthInfoDisclaimerData = {
  selectedConditionIds: string[];
};

type HealthInfoDisclaimerFormProps = {
  initialSelectedConditionIds?: string[];
  onSubmit: (data: HealthInfoDisclaimerData) => void;
  onBack: () => void;
};

export const HealthInfoDisclaimerForm = ({
  initialSelectedConditionIds,
  onSubmit,
  onBack,
}: HealthInfoDisclaimerFormProps) => {
  const [selectedConditionIds, setSelectedConditionIds] = React.useState<
    string[]
  >(initialSelectedConditionIds ?? []);

  const canSubmit = selectedConditionIds.length > 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    onSubmit({ selectedConditionIds });
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
            Health Information Disclaimer
          </Typography>
          <Typography variant="body1" color="text.secondary">
            We collect your health information to tailor your program and keep
            you safe. Your data is protected in accordance with applicable
            regulations and acts.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Select any conditions that apply. If none apply, choose “None of the
            above” from the list.
          </Typography>
        </section>

        <FormControl fullWidth>
          <InputLabel id="health-conditions-label">
            Health conditions
          </InputLabel>
          <Select
            labelId="health-conditions-label"
            id="health-conditions"
            multiple
            value={selectedConditionIds}
            label="Health conditions"
            onChange={(event) =>
              setSelectedConditionIds(event.target.value as string[])
            }
            renderValue={(selected) =>
              (selected as string[])
                .map(
                  (id) =>
                    healthConditions.find((condition) => condition.id === id)
                      ?.name || id,
                )
                .join(", ")
            }
          >
            {healthConditions.map((condition) => (
              <MenuItem key={condition.id} value={condition.id}>
                <Checkbox
                  checked={selectedConditionIds.includes(condition.id)}
                />
                <ListItemText primary={condition.name} />
              </MenuItem>
            ))}
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
            disabled={!canSubmit}
            fullWidth
          >
            Continue
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
