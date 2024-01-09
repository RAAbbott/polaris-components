import { Button, useBreakpoints } from "@shopify/polaris";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const breakpoints = useBreakpoints();
  return (
    <main className="flex flex-col items-center justify-start gap-4 text-center">
      <h1
        className={`${breakpoints.mdUp ? "text-5xl" : ""} ${
          breakpoints.mdDown ? "text-4xl" : ""
        } font-bold text-center text-[rgba(26, 26, 26, 1)] mt-24`}
      >
        Polaris Components
      </h1>
      <p
        className={`${breakpoints.smUp ? "text-xl px-16" : ""} ${
          breakpoints.smDown ? "text-lg px-8" : ""
        } text-slate-500 mb-8`}
      >
        A collection of components for Shopify app developers, based on the Polaris UI library & design system
      </p>
      <Button variant="primary" size="large" onClick={() => router.push("/components/setup-guide")}>
        Start Exploring
      </Button>
    </main>
  );
}
