import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { RenderComponent } from '@/components/RenderComponent';
import { PageComponent } from '@/types';

const formatRouteToComponent = (componentName: string) => {
  return (
    componentName
      // Split the string by hyphens
      .split('-')
      // Capitalize the first letter of each segment
      .map((segment: string) => segment.charAt(0).toUpperCase() + segment.slice(1))
      // Join the segments back together
      .join('')
  );
};

export default function Component() {
  const router = useRouter();
  const { component } = router.query;
  const [pageComponent, setPageComponent] = useState<PageComponent | null>(null);

  useEffect(() => {
    if (component) {
      const loadComponent = async () => {
        try {
          const componentName = formatRouteToComponent(component as string);
          const Component = await import(`@/components/library/${componentName}`);
          setPageComponent(Component);
        } catch (err) {
          console.error('Component not found:', err);
        }
      };

      loadComponent();
    }
  }, [component]);

  if (!pageComponent) {
    return null; // Todo: add a fallback UI here if no component found
  }

  return <RenderComponent {...pageComponent} />;
}
