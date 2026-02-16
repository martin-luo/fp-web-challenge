import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { FormEvent } from "react";
import healthConditions from "@/assets/health-conditions.json";

export type HealthInfoDisclaimerData = {
  selectedConditionIds: string[];
};

type HealthInfoDisclaimerFormProps = {
  onSubmit: (data: HealthInfoDisclaimerData) => void;
  onBack: () => void;
};

export const HealthInfoDisclaimerForm = ({
  onSubmit,
  onBack,
}: HealthInfoDisclaimerFormProps) => {
  const [selectedConditionIds, setSelectedConditionIds] = React.useState<
    string[]
  >([]);

  const canSubmit = selectedConditionIds.length > 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    onSubmit({ selectedConditionIds });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <section>
          <Typography>
            We collect your health information to tailor your program and keep
            you safe. Your data is protected in accordance with applicable
            regulations and acts.
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

        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button type="button" variant="outlined" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" variant="contained" disabled={!canSubmit}>
            Continue
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
