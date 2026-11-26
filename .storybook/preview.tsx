import { useEffect, type ComponentProps } from 'react';
import type { Preview } from '@storybook/nextjs-vite';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { fontVariables } from '../src/app/fonts';
import '../src/app/globals.css';

// On the site the font variables sit on <html>; do the same in Storybook.
function useFontVariables() {
  useEffect(() => {
    document.documentElement.classList.add(...fontVariables.split(' '));
  }, []);
}

// Docs pages made only of MDX (like Tokens) have no story, so the story
// decorator never runs there. The docs container covers that case.
function FontDocsContainer(props: ComponentProps<typeof DocsContainer>) {
  useFontVariables();
  return <DocsContainer {...props} />;
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: { container: FontDocsContainer },
  },
  decorators: [
    (Story) => {
      useFontVariables();
      return <Story />;
    },
  ],
};

export default preview;
