import { useState, useEffect, useMemo, useRef } from 'react';
import './App.css';
import { Header } from './components/layout/Header';
import { CheckListCard } from './components/checklist/CheckListCard';
import { AddListCard } from './components/checklist/AddListCard';
import { CheckListProvider } from './context/CheckListProvider';
import { useCheckList } from './hooks/useCheckList';

function CheckListGrid({ scrollToAddListRef }: { scrollToAddListRef: React.RefObject<(() => void) | null> }) {
  const { lists } = useCheckList();
  const [newListSlug, setNewListSlug] = useState<string | null>(null);
  const addListRef = useRef<HTMLDivElement | HTMLButtonElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const sortedLists = useMemo(() =>
    [...lists].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ),
    [lists]
  );

  useEffect(() => {
    scrollToAddListRef.current = () => {
      addListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
  }, [scrollToAddListRef]);

  useEffect(() => {
    if (newListSlug) {
      const cardElement = cardRefs.current.get(newListSlug);
      cardElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [newListSlug]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {sortedLists.map((checkList) => (
        <CheckListCard
          key={checkList.slug}
          ref={(el) => {
            if (el) {
              cardRefs.current.set(checkList.slug, el);
            } else {
              cardRefs.current.delete(checkList.slug);
            }
          }}
          checkList={checkList}
          isNew={checkList.slug === newListSlug}
          onAnimationEnd={() => setNewListSlug(null)}
        />
      ))}
      <AddListCard ref={addListRef} onListCreated={setNewListSlug} />
    </div>
  );
}

function App() {
  const scrollToAddListRef = useRef<(() => void) | null>(null);

  const handleScrollToAddList = () => {
    scrollToAddListRef.current?.();
  };

  return (
    <CheckListProvider>
      <div className="min-h-screen bg-slate-900 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
        <Header onScrollToAddList={handleScrollToAddList} />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <CheckListGrid scrollToAddListRef={scrollToAddListRef} />
        </main>
      </div>
    </CheckListProvider>
  );
}

export default App;
