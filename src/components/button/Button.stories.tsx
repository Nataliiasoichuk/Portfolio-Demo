import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  // The button colours are made for the canvas background, also inside the docs page.
  decorators: [
    (Story) => (
      <div className="bg-canvas p-6">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Кнопка дії: основна, друга або контурна (наприклад, Resume). Якщо передати \`href\`, це посилання.

### Параметри
- \`variant\`: \`primary\` (за замовчуванням), \`secondary\`, \`outline\`.
- \`size\`: \`md\` (за замовчуванням) або \`sm\`.
- \`arrow\`: стрілка → у правому краї (за замовчуванням вимкнена).
- \`disabled\`: вимкнена, без кліків і приглушена (за замовчуванням вимкнено).
- \`href\`: якщо задано, рендериться посилання.

### Варіанти і стани
Варіанти й розміри перемикаються в Controls. Hover (у контурної кнопки текст світлішає до \`ink\`) і focus-visible справжні: наведіть мишу або пройдіть клавішею Tab. Для вузького екрана є Viewport у тулбарі.

### Токени
\`accent\`, \`canvas\`, \`ink\`, \`ink-muted\` (рамка кнопок без заливки), \`rounded-control\`, \`font-body\`, \`text-body\`, \`text-caption\`. Відступи: \`px-6 py-4\` (md), \`px-3 py-2\` (sm).

### Коли використовувати
\`primary\` для головної дії на екрані (одна на екран), \`secondary\` для другої дії поруч, \`outline\` для малих дій у шапці. Не використовуйте для навігації всередині тексту: для цього звичайне посилання.

### Як брати в код
\`\`\`tsx
import { Button } from "@/components/button/Button";

<Button href="#projects" arrow>View projects</Button>
<Button variant="secondary" href="#contact">Contact me</Button>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'outline'] },
    size: { control: 'select', options: ['md', 'sm'] },
    arrow: { control: 'boolean' },
    disabled: { control: 'boolean' },
    href: { control: 'text' },
    children: { control: 'text' },
  },
  args: {
    children: 'View projects',
    variant: 'primary',
    size: 'md',
    arrow: true,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
