import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TextField } from './TextField';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  // The field colours are made for the canvas background, also inside the docs page.
  decorators: [
    (Story) => (
      <div className="bg-canvas p-6">
        <div className="grid grid-cols-3">
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Однорядкове поле з підписом, підказкою і станом помилки.

### Параметри
- \`label\`: підпис над полем (обов'язковий: плейсхолдер не замінює підпис).
- \`hint\`: підказка під полем.
- \`error\`: текст помилки. Якщо задано, межа стає \`danger\`, під полем з'являється іконка й повідомлення.
- \`disabled\`: поле вимкнене. Під ним завжди видно причину (\`disabledReason\`, за замовчуванням «Not available right now»).
- \`required\`: додає * до підпису й атрибут \`required\`.
- Решта атрибутів \`<input>\` (\`type\`, \`name\`, \`placeholder\`, \`defaultValue\` тощо) передаються далі.

### Варіанти і стани
Default, hover (межа світлішає до \`ink\`), focus-visible (контур \`accent\`), помилка (\`error\`) і disabled. Усе перемикається в Controls; hover і focus справжні: наведіть мишу або пройдіть клавішею Tab. Помилка завжди йде разом із текстом і іконкою, а не лише кольором.

### Токени
\`ink-muted\` (межа поля, 5,87:1 до \`canvas\`, і підказка), \`ink\`, \`danger\`, \`accent\` (контур фокуса), \`canvas\`, \`rounded-control\`, \`font-body\`, \`text-body\`, \`text-caption\`. Відступи: \`px-4 py-3\`, \`gap-2\`. Межа не береться з \`line\`: вона лише для декору.

### Коли використовувати
Для коротких текстових відповідей: ім'я, пошта, тема. Для довгого тексту потрібне окреме багаторядкове поле (його ще немає).

### Як брати в код
\`\`\`tsx
import { TextField } from "@/components/text-field/TextField";

<TextField label="Email" type="email" name="email" required hint="We reply within two days." />
<TextField label="Email" error="Enter an email like name@example.com" />
\`\`\`
`,
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    disabledReason: { control: 'text' },
    required: { control: 'boolean' },
    type: { control: 'select', options: ['text', 'email', 'tel', 'url'] },
  },
  args: {
    label: 'Email',
    placeholder: 'name@example.com',
    hint: 'We reply within two days.',
    error: '',
    disabled: false,
    disabledReason: 'Not available right now',
    required: false,
    type: 'email',
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
