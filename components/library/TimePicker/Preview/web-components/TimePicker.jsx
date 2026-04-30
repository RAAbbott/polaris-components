import { useMemo } from "react";

const HOUR_OPTIONS = [
  { label: "12", value: "12" },
  ...Array.from({ length: 11 }, (_, i) => {
    const n = i + 1;
    return { label: String(n), value: String(n) };
  }),
];

const MINUTE_OPTIONS = Array.from({ length: 60 }, (_, i) => {
  const str = String(i).padStart(2, "0");
  return { label: str, value: str };
});

const AMPM_OPTIONS = [
  { label: "AM", value: "AM" },
  { label: "PM", value: "PM" },
];

// Converts "HH:mm" (24h) to { hour12, minute, ampm } for display.
// Special cases: midnight (0) → "12 AM", noon (12) → "12 PM".
function parse24to12(hhmm) {
  if (!hhmm || typeof hhmm !== "string") {
    return { hour12: "12", minute: "00", ampm: "AM" };
  }
  const [h, m] = hhmm.trim().split(":");
  const hour24 = Math.min(23, Math.max(0, parseInt(h, 10) || 0));
  const minute = Math.min(59, Math.max(0, parseInt(m, 10) || 0));
  const minuteStr = String(minute).padStart(2, "0");
  let hour12, ampm;
  if (hour24 === 0) {
    hour12 = "12"; // midnight
    ampm = "AM";
  } else if (hour24 < 12) {
    hour12 = String(hour24);
    ampm = "AM";
  } else if (hour24 === 12) {
    hour12 = "12"; // noon
    ampm = "PM";
  } else {
    hour12 = String(hour24 - 12);
    ampm = "PM";
  }
  return { hour12, minute: minuteStr, ampm };
}

// Converts { hour12, minute, ampm } back to "HH:mm" (24h).
// Special cases: 12 AM → 00, 12 PM → 12.
function format12to24(hour12, minute, ampm) {
  const h = parseInt(hour12, 10) || 12;
  const m = Math.min(59, Math.max(0, parseInt(minute, 10) || 0));
  const mStr = String(m).padStart(2, "0");
  let hour24;
  if (ampm === "AM") {
    hour24 = h === 12 ? 0 : h; // 12 AM = midnight = 00:xx
  } else {
    hour24 = h === 12 ? 12 : h + 12; // 12 PM = noon = 12:xx
  }
  return `${String(hour24).padStart(2, "0")}:${mStr}`;
}

export const TimePicker = ({
  value = "",
  onChange,
  label,
  error,
  disabled = false,
  idPrefix = "time-picker",
}) => {
  const { hour12, minute, ampm } = useMemo(() => parse24to12(value), [value]);

  const handleChange = (field, newVal) => {
    if (!onChange) return;
    if (field === "hour") onChange(format12to24(newVal, minute, ampm));
    else if (field === "minute") onChange(format12to24(hour12, newVal, ampm));
    else if (field === "ampm") onChange(format12to24(hour12, minute, newVal));
  };

  return (
    <s-stack direction="block" gap="small">
      {label && <s-text emphasis="bold">{label}</s-text>}
      <s-stack direction="inline" gap="small" alignItems="center">
        <div style={{ width: "10ch" }}>
          <s-select
            label="Hour"
            labelAccessibilityVisibility="exclusive"
            name={`${idPrefix}-hour`}
            value={hour12}
            onChange={(e) =>
              handleChange("hour", e.currentTarget?.value ?? e.target?.value ?? "12")
            }
            disabled={disabled}
          >
            {HOUR_OPTIONS.map((opt) => (
              <s-option key={opt.value} value={opt.value} selected={hour12 === opt.value}>
                {opt.label}
              </s-option>
            ))}
          </s-select>
        </div>
        <s-text tone="subdued">:</s-text>
        <div style={{ width: "10ch" }}>
          <s-select
            label="Minute"
            labelAccessibilityVisibility="exclusive"
            name={`${idPrefix}-minute`}
            value={minute}
            onChange={(e) =>
              handleChange("minute", e.currentTarget?.value ?? e.target?.value ?? "00")
            }
            disabled={disabled}
          >
            {MINUTE_OPTIONS.map((opt) => (
              <s-option key={opt.value} value={opt.value} selected={minute === opt.value}>
                {opt.label}
              </s-option>
            ))}
          </s-select>
        </div>
        <div style={{ width: "10ch" }}>
          <s-select
            label="AM/PM"
            labelAccessibilityVisibility="exclusive"
            name={`${idPrefix}-ampm`}
            value={ampm}
            onChange={(e) =>
              handleChange("ampm", e.currentTarget?.value ?? e.target?.value ?? "AM")
            }
            disabled={disabled}
          >
            {AMPM_OPTIONS.map((opt) => (
              <s-option key={opt.value} value={opt.value} selected={ampm === opt.value}>
                {opt.label}
              </s-option>
            ))}
          </s-select>
        </div>
      </s-stack>
      {error && (
        <s-text tone="critical">
          {typeof error === "string" ? error : "Please select a valid time."}
        </s-text>
      )}
    </s-stack>
  );
};
