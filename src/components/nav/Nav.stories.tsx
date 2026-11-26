import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Nav } from './Nav';

const meta = {
  title: 'Components/Nav',
  component: Nav,
  tags: ['autodocs'],
  // The nav colours are made for the canvas background, also inside the docs page.
  decorators: [
    (Story) => (
      <div className="bg-canvas p-6 pb-8">
        <div className="flex justify-end">
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      // An iframe gives the docs story its own width and room for the open menu.
      story: { inline: false, iframeHeight: 420 },
      description: {
        component: `
Головна навігація: посилання в рядок на широких екранах і бургер-меню на вузьких (до 1024 px). Перший пункт може бути активним, останній вимкненим.

### Параметри
- \`items\`: посилання меню. У кожного \`label\`, \`href\`, а також \`active\` (поточна сторінка), \`disabled\` і \`disabledNote\` (видима примітка біля вимкненого пункту, за замовчуванням «soon»).
- \`actionLabel\`, \`actionHref\`: контурна кнопка після посилань, наприклад Resume.
- \`defaultOpen\`: відкрити меню на вузькому екрані одразу, щоб його побачити.

### Варіанти і стани
Широкий і вузький екран (перемикач Viewport у тулбарі), меню закрите або відкрите (\`defaultOpen\`). Hover (посилання стає \`accent\`), focus-visible (контур) і disabled (приглушений пункт із приміткою) справжні: наведіть мишу або пройдіть клавішею Tab. Меню закривається клавішею Escape та після вибору пункту. Активний пункт позначений кольором, підкресленням і \`aria-current="page"\`.

### Токени
\`ink\`, \`ink-muted\`, \`accent\`, \`line\` (розділювач і рамка меню, лише декор), \`canvas\`, \`font-body\`, \`text-body\`, \`text-caption\`, \`rounded-card\`, \`rounded-control\`. Відступи: \`gap-8\`, \`gap-6\`, \`gap-2\`, \`px-4 py-3\`, \`p-2\`.

### Коли використовувати
Одна головна навігація на сторінку, у шапці. Для дій усередині сторінки використовуйте \`Button\`, а не \`Nav\`.

### Як брати в код
\`\`\`tsx
import { Nav } from "@/components/nav/Nav";

<Nav
  items={[
    { label: "Projects", href: "#projects", active: true },
    { label: "About", href: "#about" },
  ]}
  actionLabel="Resume (PDF) ↓"
  actionHref="/resume.pdf"
/>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    items: { control: 'object' },
    actionLabel: { control: 'text' },
    actionHref: { control: 'text' },
    defaultOpen: { control: 'boolean' },
  },
  args: {
    items: [
      { label: 'Projects', href: '#projects', active: true },
      { label: 'How I think', href: '#how-i-think' },
      { label: 'About', href: '#about', disabled: true },
      { label: 'Contact', href: '#contact' },
    ],
    actionLabel: 'Resume (PDF) ↓',
    actionHref: '#resume',
    defaultOpen: false,
  },
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
