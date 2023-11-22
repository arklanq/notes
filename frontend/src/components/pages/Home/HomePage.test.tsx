import { render, RenderResult, within } from '@testing-library/react';
import HomePage from './HomePage';
import { PageProps } from 'next';
import { getAllNotes } from '@/lib/getAllNotes';
import { Note } from '@/models/Note';

jest.mock('@/lib/getAllNotes');

async function renderPage(): Promise<RenderResult> {
  // Define PageProps
  const props: PageProps = {
    params: {},
    searchParams: {}
  };

  // Await RSC resolution
  const RSC: JSX.Element = await HomePage(props);

  // Render result
  return render(RSC);
}

function generateSampleNotes(count: number): Note[] {
  const now: Date = new Date();
  return new Array(count).fill(null).map((_null, index: number) => ({
    id: index + 1,
    title: 'The standard Lorem Ipsum message',
    content: 'Lorem ipsum dolor sit amet',
    createDate: now,
    lastUpdateDate: now,
  }));
}

describe('Home', () => {
  beforeAll(() => {
    // Mock `getAllNotes()` function
    (getAllNotes as jest.MockedFunction<typeof getAllNotes>).mockResolvedValue([]);
  });

  test('renders without crashing', async () => {
    await renderPage();
  });

  describe('renders children correctly', () => {

    test('section', async () => {
      const screen: RenderResult = await renderPage();

      const sectionElement: HTMLElement = screen.getByTestId('section');
      expect(sectionElement).toBeInTheDocument();
    });

    test('cards', async () => {
      const notesCount: number = 4;
      const notes: Note[] = generateSampleNotes(notesCount);

      (getAllNotes as jest.MockedFunction<typeof getAllNotes>).mockResolvedValueOnce(notes);
      const screen: RenderResult = await renderPage();

      const sectionElement: HTMLElement = screen.getByTestId('section');

      const cardElements: HTMLElement[] = within(sectionElement).getAllByTestId('NoteCard');

      expect(cardElements).toHaveLength(notesCount);
    });
  });
});
