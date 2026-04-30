import { useState } from "react";
import { TimePicker } from "./TimePicker";

export const Example = () => {
  const [time, setTime] = useState("09:00");

  return (
    <s-page inlineSize="small">
      <s-section padding="base">
        <s-stack direction="block" gap="base">
          <TimePicker label="Select a time" value={time} onChange={setTime} />
          <s-text tone="subdued">Selected (24h): {time}</s-text>
        </s-stack>
      </s-section>
    </s-page>
  );
};
