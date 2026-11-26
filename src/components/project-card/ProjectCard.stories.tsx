import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProjectCard } from './ProjectCard';

const meta = {
  title: 'Components/ProjectCard',
  component: ProjectCard,
  tags: ['autodocs'],
  // The card colours are made for the canvas background, also inside the docs page.
  decorators: [
    (Story) => (
      <div className="bg-canvas p-6">
        <div className="max-w-page">
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Картка одного проєкту: обкладинка, номер, назва, тип проєкту і посилання на кейс.

### Параметри
- \`index\`: номер, наприклад \`01\`.
- \`title\`: назва проєкту.
- \`kind\`: короткий опис типу, наприклад «Web platform · Study project».
- \`href\`: адреса сторінки кейсу. Без неї картка не клікається.
- \`cover\`: картинка обкладинки (імпортується з \`src/assets\`). Без неї показується заглушка.
- \`coverAlt\`: альтернативний текст обкладинки.
- \`disabled\`: сторінка кейсу ще не готова, замість посилання текст «Case coming soon».

### Варіанти і стани
Заглушка або картинка, активна чи вимкнена (\`disabled\`). Hover (підкреслення назви) і focus-visible (контур) справжні: наведіть мишу або пройдіть клавішею Tab. Для вузького екрана є Viewport у тулбарі.

### Токени
\`aspect-cover\`, \`rounded-card\`, \`surface\`, \`ink\`, \`ink-muted\`, \`accent\`, \`font-display\`, \`font-body\`, \`text-card-title\`, \`text-body\`, \`text-caption\`. Відступи: \`gap-6\`, \`gap-4\`, \`gap-2\`.

### Коли використовувати
Для проєктів у блоці «Три проєкти» на головній. Ширину задає батьківський елемент: картка займає всю доступну ширину, пропорція обкладинки 5:6.

### Як брати в код
\`\`\`tsx
import { ProjectCard } from "@/components/project-card/ProjectCard";

<ProjectCard
  index="01"
  title="Group Fitness booking"
  kind="Web platform · Study project"
  href="/projects/group-fitness-booking"
/>
\`\`\`
`,
      },
    },
  },
  argTypes: {
    index: { control: 'text' },
    title: { control: 'text' },
    kind: { control: 'text' },
    href: { control: 'text' },
    coverAlt: { control: 'text' },
    disabled: { control: 'boolean' },
    cover: { control: false },
  },
  args: {
    index: '01',
    title: 'Group Fitness booking',
    kind: 'Web platform · Study project',
    href: '/projects/group-fitness-booking',
    disabled: false,
  },
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
