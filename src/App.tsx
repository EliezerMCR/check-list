import { useState } from 'react';
import './App.css';
import { Header } from './components/layout/Header';
import { CheckListCard } from './components/checklist/CheckListCard';
import { AddListCard } from './components/checklist/AddListCard';
import { CheckListProvider } from './context/CheckListProvider';
import { useCheckList } from './hooks/useCheckList';

function CheckListGrid() {
  const { lists } = useCheckList();
  const [newListSlug, setNewListSlug] = useState<string | null>(null);

  const sortedLists = [...lists].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {sortedLists.map((checkList) => (
        <CheckListCard
          key={checkList.slug}
          checkList={checkList}
          isNew={checkList.slug === newListSlug}
          onAnimationEnd={() => setNewListSlug(null)}
        />
      ))}
      <AddListCard onListCreated={setNewListSlug} />
    </div>
  );
}

function App() {
  return (
    <CheckListProvider>
      <div className="min-h-screen bg-slate-900 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <CheckListGrid />
        </main>
      </div>
    </CheckListProvider>
  );
}

export default App;
